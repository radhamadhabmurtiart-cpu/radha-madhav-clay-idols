import { createActor } from "@/backend";
import type { InquiryRecord } from "@/backend";
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
