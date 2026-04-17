import { ProductCategory } from "../backend";
import type { backendInterface } from "../backend";

// Extended mock interface that includes isAdminCaller (may not be in generated types yet)
type ExtendedBackend = backendInterface & { isAdminCaller: () => Promise<boolean> };

export const mockBackend: ExtendedBackend = {
  isAdminCaller: async () => true,
  getInquiries: async () => ({
    __kind__: "ok" as const,
    ok: [
      {
        id: BigInt(1),
        name: "রাম কুমার",
        phone: "+91 9876543210",
        productInterest: "Ganesh Idol",
        message: "আমি ১০টি গণেশ মূর্তির জন্য পাইকারি মূল্য জানতে চাই।",
        timestamp: BigInt(1712000000),
      },
    ],
  }),
  submitInquiry: async (_name, _phone, _productInterest, _message) => ({
    __kind__: "ok",
    ok: "আপনার অনুসন্ধান সফলভাবে জমা হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
  }),
  getProducts: async () => [],
  getProduct: async (_id) => null,
  addProduct: async (_input) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      nameBn: "",
      nameEn: "",
      descriptionBn: "",
      descriptionEn: "",
      category: ProductCategory.ganesh,
      sizes: [],
      imageIds: [],
      bulkAvailable: true,
      priceRangeMin: BigInt(0),
      priceRangeMax: BigInt(0),
      createdAt: BigInt(Date.now()),
      updatedAt: BigInt(Date.now()),
    },
  }),
  updateProduct: async (_input) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      nameBn: "",
      nameEn: "",
      descriptionBn: "",
      descriptionEn: "",
      category: ProductCategory.ganesh,
      sizes: [],
      imageIds: [],
      bulkAvailable: true,
      priceRangeMin: BigInt(0),
      priceRangeMax: BigInt(0),
      createdAt: BigInt(Date.now()),
      updatedAt: BigInt(Date.now()),
    },
  }),
  deleteProduct: async (_id) => ({ __kind__: "ok", ok: null }),
  getCategoryImages: async () => [],
  getCategoryImage: async (_slug) => null,
  updateCategoryImage: async (_slug, _imageUrl) => true,
  getOwnerPrincipal: async () => "khuxn-trxys-ugzje-zumyw-k7nyc-igd7r-zqmyy-lnfy2-imbhm-nmn7r-wae",
  getMyProfile: async () => ({ __kind__: "err", err: "no profile" }),
  getVisitors: async () => ({ __kind__: "ok" as const, ok: [] }),
  registerVisitor: async (_name, _phone) => ({
    __kind__: "ok" as const,
    ok: {
      principal: "mock-principal",
      name: _name,
      phone: _phone,
      registeredAt: BigInt(Date.now()),
    },
  }),
};
