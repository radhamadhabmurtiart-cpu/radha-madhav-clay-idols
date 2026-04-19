import { createActor } from "@/backend";
import type { BannerImage } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export const BANNER_KEYS = {
  all: ["bannerImages"] as const,
};

export function useBannerImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BannerImage[]>({
    queryKey: BANNER_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      const images = await actor.getBannerImages();
      return [...images].sort(
        (a, b) => Number(a.displayOrder) - Number(b.displayOrder),
      );
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}
