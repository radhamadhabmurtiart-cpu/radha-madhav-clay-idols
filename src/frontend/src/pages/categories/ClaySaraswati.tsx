import { CategoryPage } from "./CategoryPage";
import type { CategoryPageConfig } from "./CategoryPage";

const config: CategoryPageConfig = {
  seoTitle: "Clay Saraswati Idol Wholesale | Bardhaman",
  metaDescription:
    "Order clay Saraswati idols wholesale for Saraswati Puja. Bulk supply to schools, colleges & puja committees in Bardhaman, Kolkata, Durgapur & across India.",
  canonicalPath: "/clay-saraswati-idol",
  h1En: "Clay Saraswati Idol",
  h1Bn: "মাটির সরস্বতী মূর্তি",
  descEn:
    "Our clay Saraswati idols are crafted for Saraswati Puja celebrations in schools, colleges, and households. We supply wholesale to educational institutions, puja committees, and event organizers in Bardhaman, Kolkata, Durgapur, Asansol, Bankura, Purulia, and Dhanbad. Bulk orders available — we supply clay idols across India.",
  descBn:
    "আমাদের মাটির সরস্বতী মূর্তি স্কুল, কলেজ ও বাড়ির সরস্বতী পূজার জন্য তৈরি। বর্ধমান, কলকাতা, দুর্গাপুর সহ সারা ভারতে পাইকারি সরবরাহ। বাল্ক অর্ডার গ্রহণযোগ্য।",
  altTexts: [
    "clay Saraswati idol manufacturer Bardhaman",
    "wholesale Saraswati idol supplier West Bengal",
    "Saraswati puja idol maker near me bulk order",
  ],
  faqs: [
    {
      q: "Can schools and colleges order clay Saraswati idols in bulk?",
      a: "Yes, we supply clay Saraswati idols wholesale to schools, colleges, and puja committees across India. Call +91 6295466310.",
    },
  ],
  backendCategories: ["saraswati"],
};

export function ClaySaraswatiPage() {
  return <CategoryPage config={config} />;
}
