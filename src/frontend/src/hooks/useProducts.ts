import { createActor } from "@/backend";
import type { CategoryInfo, InquiryRecord, Product } from "@/backend";
import type { AddProductInput, UpdateProductInput } from "@/types/admin";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useProductActor() {
  return useActor(createActor);
}

// ─── Query Keys ───
export const PRODUCT_KEYS = {
  all: ["products"] as const,
  detail: (id: bigint) => ["products", id.toString()] as const,
  byCategory: (slug: string) => ["products", "category", slug] as const,
};

export const CATEGORY_KEYS = {
  all: ["categories"] as const,
};

// ─── Queries ───

export function useProducts() {
  const { actor, isFetching } = useProductActor();
  return useQuery({
    queryKey: PRODUCT_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: bigint | null) {
  const { actor, isFetching } = useProductActor();
  return useQuery({
    queryKey: id ? PRODUCT_KEYS.detail(id) : ["products", "null"],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCategories() {
  const { actor, isFetching } = useProductActor();
  return useQuery<CategoryInfo[]>({
    queryKey: CATEGORY_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategoryList();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // categories rarely change
  });
}

export function useProductsByCategory(slug: string) {
  const { actor, isFetching } = useProductActor();
  return useQuery<Product[]>({
    queryKey: PRODUCT_KEYS.byCategory(slug),
    queryFn: async () => {
      if (!actor || !slug) return [];
      return actor.getProductsByCategory(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

// ─── Mutations ───

export function useAddProduct() {
  const { actor } = useProductActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: AddProductInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addProduct(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useProductActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateProductInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateProduct(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, input) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.detail(input.id),
      });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useProductActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteProduct(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
}

// ─── Inquiries / Visitors ───

export const INQUIRY_KEYS = {
  all: ["inquiries"] as const,
};

export function useInquiries() {
  const { actor, isFetching } = useProductActor();
  return useQuery<InquiryRecord[]>({
    queryKey: INQUIRY_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      // Backend may return Array<InquiryRecord> OR {#ok: Array; #err: Text}.
      // Handle both shapes gracefully.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any = await actor.getInquiries();
      if (Array.isArray(raw)) return raw as InquiryRecord[];
      if (raw && raw.__kind__ === "ok") return raw.ok as InquiryRecord[];
      if (raw && raw.__kind__ === "err") throw new Error(raw.err as string);
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}
