import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export const CATEGORY_IMAGE_KEYS = {
  all: ["categoryImages"] as const,
};

export function useCategoryImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: CATEGORY_IMAGE_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategoryImages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes — category images don't change often
  });
}
