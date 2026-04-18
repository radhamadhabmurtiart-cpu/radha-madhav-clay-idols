import {
  type AddProductInput,
  type Product,
  ProductCategory,
  type UpdateProductInput,
} from "@/backend.d";

// Re-export backend types for admin use
export { ProductCategory };
export type { Product, AddProductInput, UpdateProductInput };

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
  banglaLakshmiGanesh: {
    bn: "বাংলা লক্ষ্মী গণেশ মূর্তি",
    en: "Bangla Lakshmi Ganesh (Hal Khata)",
  },
  ganesh: { bn: "মাটির গণেশ মূর্তি (পাইকারি)", en: "Clay Ganesh Idol (Wholesale)" },
  vishwakarma: { bn: "মাটির বিশ্বকর্মা মূর্তি", en: "Clay Vishwakarma Idol" },
  lakshmi: { bn: "মাটির লক্ষ্মী মূর্তি", en: "Clay Lakshmi Idol" },
  diwaliLakshmiGanesh: {
    bn: "দীপাবলি লক্ষ্মী গণেশ মূর্তি",
    en: "Diwali Lakshmi Ganesh Idol",
  },
  kali: { bn: "মাটির কালী মূর্তি", en: "Clay Kali Idol" },
  durga: { bn: "ছোট দুর্গা মূর্তি", en: "Small Durga Idol" },
  radhaKrishna: { bn: "রাধা কৃষ্ণ মাটির মূর্তি", en: "Radha Krishna Clay Idol" },
  kartik: { bn: "মাটির কার্তিক মূর্তি", en: "Clay Kartik Idol" },
  saraswati: { bn: "মাটির সরস্বতী মূর্তি", en: "Clay Saraswati Idol" },
  custom: { bn: "কাস্টম মাটির মূর্তি", en: "Custom Clay Idol" },
};

export const EMPTY_PRODUCT_FORM: ProductFormData = {
  nameBn: "",
  nameEn: "",
  descriptionBn: "",
  descriptionEn: "",
  category: ProductCategory.ganesh,
  sizes: "",
  priceRangeMin: "",
  priceRangeMax: "",
  bulkAvailable: true,
  imageIds: [],
};

// Safe BigInt parser — handles empty strings, NaN, and decimals gracefully
function parsePrice(v: string): bigint {
  const n = Number.parseInt(v, 10);
  return BigInt(Number.isNaN(n) || n < 0 ? 0 : n);
}

export function formDataToAddInput(
  data: ProductFormData,
  imageIdsOverride?: string[],
): AddProductInput {
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
    priceRangeMin: parsePrice(data.priceRangeMin),
    priceRangeMax: parsePrice(data.priceRangeMax),
    bulkAvailable: data.bulkAvailable,
    // Use override when provided (avoids async state race on submit)
    imageIds: imageIdsOverride ?? data.imageIds,
  };
}

export function formDataToUpdateInput(
  id: bigint,
  data: ProductFormData,
  imageIdsOverride?: string[],
): UpdateProductInput {
  return {
    id,
    ...formDataToAddInput(data, imageIdsOverride),
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
