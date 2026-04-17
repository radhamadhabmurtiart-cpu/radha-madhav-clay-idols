import type {
  AddProductInput,
  Product,
  ProductCategory,
  UpdateProductInput,
} from "@/backend.d";

// Re-export backend types for admin use
export type { Product, AddProductInput, UpdateProductInput, ProductCategory };

// Form data with string prices (converted to bigint before sending)
export interface ProductFormData {
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  descriptionEn: string;
  category: ProductCategory;
  sizes: string; // comma-separated input → split to array
  priceRangeMin: string; // number as string for input
  priceRangeMax: string; // number as string for input
  bulkAvailable: boolean;
  imageIds: string[]; // uploaded image IDs
}

export const PRODUCT_CATEGORY_LABELS: Record<
  ProductCategory,
  { bn: string; en: string }
> = {
  ganesh: { bn: "গণেশ মূর্তি", en: "Ganesh Idol" },
  lakshmi: { bn: "লক্ষ্মী মূর্তি", en: "Lakshmi Idol" },
  durga: { bn: "দুর্গা মূর্তি", en: "Durga Idol" },
  saraswati: { bn: "সরস্বতী মূর্তি", en: "Saraswati Idol" },
  hanuman: { bn: "হনুমান মূর্তি", en: "Hanuman Idol" },
  custom: { bn: "কাস্টম মূর্তি", en: "Custom Idol" },
};

export const EMPTY_PRODUCT_FORM: ProductFormData = {
  nameBn: "",
  nameEn: "",
  descriptionBn: "",
  descriptionEn: "",
  category: "ganesh" as ProductCategory,
  sizes: "",
  priceRangeMin: "",
  priceRangeMax: "",
  bulkAvailable: true,
  imageIds: [],
};

export function formDataToAddInput(data: ProductFormData): AddProductInput {
  return {
    nameBn: data.nameBn.trim(),
    nameEn: data.nameEn.trim(),
    descriptionBn: data.descriptionBn.trim(),
    descriptionEn: data.descriptionEn.trim(),
    category: data.category,
    sizes: data.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    priceRangeMin: BigInt(Number.parseInt(data.priceRangeMin, 10) || 0),
    priceRangeMax: BigInt(Number.parseInt(data.priceRangeMax, 10) || 0),
    bulkAvailable: data.bulkAvailable,
    imageIds: data.imageIds,
  };
}

export function formDataToUpdateInput(
  id: bigint,
  data: ProductFormData,
): UpdateProductInput {
  return {
    id,
    ...formDataToAddInput(data),
  };
}

export function productToFormData(product: Product): ProductFormData {
  return {
    nameBn: product.nameBn,
    nameEn: product.nameEn,
    descriptionBn: product.descriptionBn,
    descriptionEn: product.descriptionEn,
    category: product.category,
    sizes: product.sizes.join(", "),
    priceRangeMin: product.priceRangeMin.toString(),
    priceRangeMax: product.priceRangeMax.toString(),
    bulkAvailable: product.bulkAvailable,
    imageIds: product.imageIds,
  };
}
