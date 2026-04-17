import { b as useQuery, t as useQueryClient, a as useActor, d as createActor } from "./index-DOyg_51M.js";
import { u as useMutation } from "./useMutation-BmzX82yr.js";
function useProductActor() {
  return useActor(createActor);
}
const PRODUCT_KEYS = {
  all: ["products"],
  detail: (id) => ["products", id.toString()]
};
function useProducts() {
  const { actor, isFetching } = useProductActor();
  return useQuery({
    queryKey: PRODUCT_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching
  });
}
function useProduct(id) {
  const { actor, isFetching } = useProductActor();
  return useQuery({
    queryKey: id ? PRODUCT_KEYS.detail(id) : ["products", "null"],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useAddProduct() {
  const { actor } = useProductActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addProduct(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    }
  });
}
function useUpdateProduct() {
  const { actor } = useProductActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateProduct(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, input) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.detail(input.id)
      });
    }
  });
}
function useDeleteProduct() {
  const { actor } = useProductActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteProduct(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    }
  });
}
const INQUIRY_KEYS = {
  all: ["inquiries"]
};
function useInquiries() {
  const { actor, isFetching } = useProductActor();
  return useQuery({
    queryKey: INQUIRY_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getInquiries();
      if (Array.isArray(raw)) return raw;
      if (raw && raw.__kind__ === "ok") return raw.ok;
      if (raw && raw.__kind__ === "err") throw new Error(raw.err);
      return [];
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useProduct as a,
  useInquiries as b,
  useDeleteProduct as c,
  useAddProduct as d,
  useUpdateProduct as e,
  useProducts as u
};
