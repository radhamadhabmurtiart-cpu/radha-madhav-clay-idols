import { a as useQuery, w as useQueryClient, u as useActor, b as createActor } from "./index-CyyY0WO7.js";
import { u as useMutation } from "./useMutation-BSyKkTRz.js";
function useProductActor() {
  return useActor(createActor);
}
const PRODUCT_KEYS = {
  all: ["products"],
  detail: (id) => ["products", id.toString()],
  byCategory: (slug) => ["products", "category", slug]
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
function useProductsByCategory(slug) {
  const { actor, isFetching } = useProductActor();
  return useQuery({
    queryKey: PRODUCT_KEYS.byCategory(slug),
    queryFn: async () => {
      if (!actor || !slug) return [];
      return actor.getProductsByCategory(slug);
    },
    enabled: !!actor && !isFetching && !!slug
  });
}
function useAddProduct() {
  const { actor } = useProductActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      const token = localStorage.getItem("adminSessionToken");
      const result = await actor.addProduct(input, token);
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
      if (!actor)
        throw new Error("Actor not ready — please wait and try again.");
      const token = localStorage.getItem("adminSessionToken");
      const result = await actor.updateProduct(input, token);
      if (result.__kind__ === "err") {
        const msg = typeof result.err === "string" ? result.err : "Update failed on server.";
        console.error("updateProduct backend error:", msg);
        throw new Error(msg);
      }
      return result.ok;
    },
    onSuccess: (_data, input) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.detail(input.id)
      });
    },
    onError: (err) => {
      console.error("useUpdateProduct mutation error:", err);
    }
  });
}
function useDeleteProduct() {
  const { actor } = useProductActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      const token = localStorage.getItem("adminSessionToken");
      const result = await actor.deleteProduct(id, token);
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
      const token = localStorage.getItem("adminSessionToken");
      const raw = await actor.getInquiries(token ? [token] : []);
      if (Array.isArray(raw)) return raw;
      if (raw && raw.__kind__ === "ok") return raw.ok;
      if (raw && raw.__kind__ === "err") throw new Error(raw.err);
      return [];
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useProductsByCategory as a,
  useProduct as b,
  useInquiries as c,
  useDeleteProduct as d,
  useAddProduct as e,
  useUpdateProduct as f,
  useProducts as u
};
