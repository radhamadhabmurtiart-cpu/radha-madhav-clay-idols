import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CategoryInfo {
    nameBn: string;
    nameEn: string;
    slug: string;
}
export interface VisitorProfile {
    principal: string;
    name: string;
    phone: string;
    registeredAt: bigint;
}
export interface BannerImage {
    id: string;
    title: string;
    displayOrder: bigint;
    imageUrl: string;
}
export interface AddProductInput {
    nameBn: string;
    nameEn: string;
    descriptionBn: string;
    descriptionEn: string;
    sizes: Array<string>;
    imageIds: Array<string>;
    bulkAvailable: boolean;
    category: ProductCategory;
    priceRangeMax: bigint;
    priceRangeMin: bigint;
}
export interface CategoryImage {
    slug: string;
    imageUrl: string;
}
export interface InquiryRecord {
    id: bigint;
    name: string;
    message: string;
    timestamp: bigint;
    productInterest: string;
    phone: string;
}
export interface Product {
    id: bigint;
    nameBn: string;
    nameEn: string;
    descriptionBn: string;
    descriptionEn: string;
    createdAt: bigint;
    sizes: Array<string>;
    updatedAt: bigint;
    imageIds: Array<string>;
    bulkAvailable: boolean;
    category: ProductCategory;
    priceRangeMax: bigint;
    priceRangeMin: bigint;
}
export interface UpdateProductInput {
    id: bigint;
    nameBn: string;
    nameEn: string;
    descriptionBn: string;
    descriptionEn: string;
    sizes: Array<string>;
    imageIds: Array<string>;
    bulkAvailable: boolean;
    category: ProductCategory;
    priceRangeMax: bigint;
    priceRangeMin: bigint;
}
export enum ProductCategory {
    diwaliLakshmiGanesh = "diwaliLakshmiGanesh",
    radhaKrishna = "radhaKrishna",
    lakshmi = "lakshmi",
    vishwakarma = "vishwakarma",
    custom = "custom",
    saraswati = "saraswati",
    kali = "kali",
    ganesh = "ganesh",
    banglaLakshmiGanesh = "banglaLakshmiGanesh",
    durga = "durga",
    kartik = "kartik"
}
export interface backendInterface {
    addProduct(input: AddProductInput, sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: Product;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLogin(phone: string, password: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLogout(token: string): Promise<void>;
    deleteFile(fileId: string, sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProduct(id: bigint, sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBannerImages(): Promise<Array<BannerImage>>;
    getCategoryImage(slug: string): Promise<string | null>;
    getCategoryImages(): Promise<Array<CategoryImage>>;
    getCategoryList(): Promise<Array<CategoryInfo>>;
    getFeaturedProductIds(): Promise<Array<bigint>>;
    getFileUrl(fileId: string): Promise<string | null>;
    getInquiries(sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: Array<InquiryRecord>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMyProfile(): Promise<{
        __kind__: "ok";
        ok: VisitorProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getOwnerPrincipal(): Promise<string>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(slug: string): Promise<Array<Product>>;
    getUploadUrl(filename: string, contentType: string, sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: {
            uploadUrl: string;
            fileId: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    getVisitors(sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: Array<VisitorProfile>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    isAdminCaller(): Promise<boolean>;
    registerVisitor(name: string, phone: string): Promise<{
        __kind__: "ok";
        ok: VisitorProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitInquiry(name: string, phone: string, productInterest: string, message: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateBannerImages(images: Array<BannerImage>, sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateCategoryImage(slug: string, imageUrl: string, sessionToken: string | null): Promise<boolean>;
    updateFeaturedProductIds(ids: Array<bigint>, sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProduct(input: UpdateProductInput, sessionToken: string | null): Promise<{
        __kind__: "ok";
        ok: Product;
    } | {
        __kind__: "err";
        err: string;
    }>;
    validateAdminSession(token: string): Promise<boolean>;
}
