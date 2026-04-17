import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VisitorProfile {
    principal: string;
    name: string;
    phone: string;
    registeredAt: bigint;
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
    lakshmi = "lakshmi",
    custom = "custom",
    saraswati = "saraswati",
    hanuman = "hanuman",
    ganesh = "ganesh",
    durga = "durga"
}
export interface backendInterface {
    addProduct(input: AddProductInput): Promise<{
        __kind__: "ok";
        ok: Product;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProduct(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCategoryImage(slug: string): Promise<string | null>;
    getCategoryImages(): Promise<Array<CategoryImage>>;
    getInquiries(): Promise<{
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
    getVisitors(): Promise<{
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
    updateCategoryImage(slug: string, imageUrl: string): Promise<boolean>;
    updateProduct(input: UpdateProductInput): Promise<{
        __kind__: "ok";
        ok: Product;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
