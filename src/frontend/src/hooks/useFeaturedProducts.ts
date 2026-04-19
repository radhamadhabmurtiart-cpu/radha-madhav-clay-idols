import { createActor } from "@/backend";
import type { Product } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export const FEATURED_KEYS = {
  ids: ["featuredProductIds"] as const,
  products: ["featuredProducts"] as const,
};

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: FEATURED_KEYS.products,
    queryFn: async () => {
      if (!actor) return [];

      const [featuredIds, allProducts] = await Promise.all([
        actor.getFeaturedProductIds(),
        actor.getProducts(),
      ]);

      if (featuredIds.length > 0) {
        const idSet = new Set(featuredIds.map((id) => id.toString()));
        const featured = allProducts.filter((p) => idSet.has(p.id.toString()));
        if (featured.length > 0) return featured;
      }

      // Fallback: first 4 products
      return allProducts.slice(0, 4);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}
