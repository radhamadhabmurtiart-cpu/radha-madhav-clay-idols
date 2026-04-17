import { CategoryPage } from "./CategoryPage";
import type { CategoryPageConfig } from "./CategoryPage";

const config: CategoryPageConfig = {
  seoTitle: "Clay Kali Idol Wholesale | Bardhaman Manufacturer",
  metaDescription:
    "Order handmade clay Kali idols wholesale for Kali Puja & Diwali. Bulk supply to puja committees & shops in Bardhaman, Kolkata, Asansol, Durgapur & all India.",
  canonicalPath: "/clay-kali-idol",
  h1En: "Clay Kali Idol",
  h1Bn: "মাটির কালী মূর্তি",
  descEn:
    "Our clay Kali idols are crafted by skilled artisans for Kali Puja and Shyama Puja celebrations. We offer wholesale supply to puja committees, mandaps, and retailers in Bardhaman, Kolkata, Durgapur, Asansol, Bankura, Purulia, and Dhanbad. Bulk orders available for all-India delivery. We supply clay idols across India.",
  descBn:
    "আমাদের মাটির কালী মূর্তি দক্ষ শিল্পীদের হাতে তৈরি — কালী পূজা ও শ্যামা পূজার জন্য আদর্শ। বর্ধমান, কলকাতা, দুর্গাপুর সহ সারা ভারতে পাইকারি সরবরাহ। বাল্ক অর্ডার গ্রহণযোগ্য।",
  altTexts: [
    "clay Kali idol manufacturer in Bardhaman West Bengal",
    "wholesale Kali puja idol supplier India",
    "Kali Maa idol maker near me bulk order",
  ],
  faqs: [
    {
      q: "Do you supply clay Kali idols for Kali Puja in bulk?",
      a: "Yes, we supply clay Kali Maa idols wholesale for Kali Puja to committees across West Bengal and India. Call +91 6295466310.",
    },
  ],
  backendCategories: ["custom"],
};

export function ClayKaliPage() {
  return <CategoryPage config={config} />;
}
