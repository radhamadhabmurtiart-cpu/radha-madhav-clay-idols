import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/useLanguage";
import { useSubmitInquiry } from "@/hooks/useQueries";
import type { InquiryFormData } from "@/types";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";

const PHONE = "+91 6295466310";
const PHONE_RAW = "916295466310";
const WA_MSG = encodeURIComponent(
  "I want to make a bulk inquiry for clay idols",
);

const INQUIRY_PRODUCTS = [
  { value: "ganesh", bn: "গণেশ মূর্তি", en: "Ganesh Idol" },
  { value: "lakshmi", bn: "লক্ষ্মী মূর্তি", en: "Lakshmi Idol" },
  { value: "durga", bn: "দুর্গা মূর্তি", en: "Durga Idol" },
  { value: "saraswati", bn: "সরস্বতী মূর্তি", en: "Saraswati Idol" },
  { value: "hanuman", bn: "হনুমান মূর্তি", en: "Hanuman Idol" },
  { value: "custom", bn: "কাস্টম অর্ডার", en: "Custom Order" },
];

const QUANTITIES = [
  { value: "1-10", label: "1 – 10" },
  { value: "11-50", label: "11 – 50" },
  { value: "51-100", label: "51 – 100" },
  { value: "100+", label: "100+" },
];

const HOURS = [
  {
    day: { bn: "সোমবার – শনিবার", en: "Monday – Saturday" },
    time: "8:00 AM – 7:00 PM",
  },
  { day: { bn: "রবিবার", en: "Sunday" }, time: "9:00 AM – 5:00 PM" },
];

const FAQ_ITEMS = [
  {
    id: "delivery",
    question: {
      bn: "বার্ধমান থেকে কি সারা ভারতে ডেলিভারি দেওয়া হয়?",
      en: "Do you deliver clay idols across India?",
    },
    answer: {
      bn: "হ্যাঁ, আমরা পশ্চিমবঙ্গ ও সারা ভারতে বিশ্বস্ত পরিবহনের মাধ্যমে ডেলিভারি দিই। নিরাপদ প্যাকিং নিশ্চিত করা হয়।",
      en: "Yes, we deliver across West Bengal and all India via trusted transport partners. All idols are securely packed to ensure safe transit to any location.",
    },
  },
  {
    id: "minimum-order",
    question: {
      bn: "ন্যূনতম অর্ডার কতটি?",
      en: "What is the minimum bulk order quantity?",
    },
    answer: {
      bn: "পাইকারি মূল্যের জন্য ন্যূনতম ১০টি মূর্তির অর্ডার দিতে হবে। কাস্টম মূর্তির জন্য ন্যূনতম ২৫টি।",
      en: "Minimum bulk order is 10 idols for standard wholesale pricing. For custom orders, minimum is 25 pieces. Special pricing for larger quantities.",
    },
  },
  {
    id: "packaging",
    question: {
      bn: "মাটির মূর্তি কিভাবে প্যাক করা হয়?",
      en: "How are clay idols packaged for transport?",
    },
    answer: {
      bn: "সমস্ত মূর্তি ফোম ও কার্ডবোর্ডে নিরাপদভাবে প্যাক করা হয়। বাল্ক অর্ডার বিশেষ ক্রেটে প্যাক করা হয় — পরিবহনে কোনো ক্ষতি হয় না।",
      en: "All idols are securely packed in foam and corrugated cardboard. Bulk orders are crated for maximum protection. Zero breakage guarantee during transport.",
    },
  },
  {
    id: "custom",
    question: {
      bn: "কাস্টম মূর্তি তৈরি হয়?",
      en: "Do you make custom size or design clay idols?",
    },
    answer: {
      bn: "হ্যাঁ, কাস্টম মাপ ও ডিজাইনের অর্ডার গৃহীত হয়। যেকোনো দেবতা, যেকোনো মাপ। কর্পোরেট গিফটিং ও বিশেষ পূজার অর্ডারও গ্রহণযোগ্য। ডেলিভারি ৭–২১ কার্যদিবসের মধ্যে।",
      en: "Yes, custom size and design orders are accepted. Any deity, any size, any finish. Corporate gifting and special festival orders also accepted. Delivery within 7–21 working days.",
    },
  },
  {
    id: "wholesale",
    question: {
      bn: "পাইকারি মূল্যে কি মাটির মূর্তি পাওয়া যায়?",
      en: "Is wholesale pricing available for clay idols?",
    },
    answer: {
      bn: "হ্যাঁ, পাইকারি বিক্রেতা, পূজা কমিটি, ডেকোরেটর ও দোকানদারদের জন্য বিশেষ পাইকারি মূল্য আছে। সরাসরি প্রস্তুতকারকের কাছ থেকে কিনুন — কোনো মধ্যস্থতাকারী নেই।",
      en: "Yes, wholesale and bulk pricing is available for retailers, puja committees, decorators and shop owners. Buy directly from the manufacturer — no middlemen, maximum value.",
    },
  },
  {
    id: "cities",
    question: {
      bn: "কোন কোন শহরে মাটির মূর্তি সরবরাহ করা হয়?",
      en: "Which cities do you supply clay idols to?",
    },
    answer: {
      bn: "বর্ধমান, দুর্গাপুর, আসানসোল, বাঁকুড়া, পুরুলিয়া, ধানবাদ, কলকাতা সহ সারা ভারতে সরবরাহ করা হয়। পশ্চিমবঙ্গের যেকোনো জেলায় এবং ভারতের যেকোনো রাজ্যে অর্ডার পাঠানো হয়।",
      en: "We supply to Bardhaman, Durgapur, Asansol, Bankura, Purulia, Dhanbad, Kolkata and across all India. Orders delivered to any district in West Bengal and any state in India.",
    },
  },
];

const EMPTY: InquiryFormData = {
  name: "",
  phone: "",
  product: "",
  quantity: "",
  message: "",
};

function FaqAccordion() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3" data-ocid="faq-section">
      {FAQ_ITEMS.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full flex items-start justify-between gap-3 p-4 sm:p-5 text-left hover:bg-muted/40 transition-colors"
              aria-expanded={isOpen}
              data-ocid={`faq-toggle-${faq.id}`}
            >
              <span className="font-semibold text-foreground text-sm leading-snug flex-1">
                <span className="text-secondary mr-2">
                  {t({ bn: "প্রশ্ন:", en: "Q:" })}
                </span>
                {t(faq.question)}
              </span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 mt-0.5 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border bg-muted/20">
                <p className="text-sm text-muted-foreground leading-relaxed pt-3">
                  <span className="font-semibold text-foreground mr-2">
                    {t({ bn: "উত্তর:", en: "A:" })}
                  </span>
                  {t(faq.answer)}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ContactPage() {
  const { t } = useLanguage();
  const { mutateAsync, isPending } = useSubmitInquiry();
  const [form, setForm] = useState<InquiryFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<InquiryFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title =
      "যোগাযোগ করুন | Contact — Clay Idol Manufacturer Bardhaman Near Me | Radha Madhav Mrit Shilpalay";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Contact Radha Madhav Mrit Shilpalay for wholesale clay idol orders in Bardhaman. Call or WhatsApp +91 6295466310. Clay idol manufacturer near me — Bardhaman, West Bengal. Bulk orders for Ganesh, Lakshmi, Durga idols.",
      );
    }
  }, []);

  function set(field: keyof InquiryFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Partial<InquiryFormData> = {};
    if (!form.name.trim())
      e.name = t({ bn: "নাম আবশ্যক", en: "Name is required" });
    if (!form.phone.trim())
      e.phone = t({ bn: "ফোন নম্বর আবশ্যক", en: "Phone is required" });
    if (!form.product)
      e.product = t({ bn: "পণ্য নির্বাচন করুন", en: "Please select a product" });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    await mutateAsync(form);
    setSubmitted(true);
    setForm(EMPTY);
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-card border-b border-border py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent" />
        <div className="container max-w-3xl mx-auto px-4 relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">
            {t({ bn: "আমাদের সাথে যোগাযোগ", en: "Get In Touch" })}
          </p>
          <h1 className="text-display-lg text-foreground mb-4">
            {t({ bn: "যোগাযোগ করুন", en: "Contact Us" })}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t({
              bn: "পাইকারি মূর্তি অর্ডার, কাস্টম ডিজাইন বা যেকোনো তথ্যের জন্য আজই যোগাযোগ করুন।",
              en: "For wholesale idol orders, custom designs, or any inquiry — reach us today.",
            })}
          </p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="bg-background py-14 sm:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading
            title={{ bn: "আমাদের বিবরণ", en: "Our Details" }}
            subtitle={{
              bn: "বার্ধমানের বিশ্বস্ত মাটির মূর্তি প্রস্তুতকারক — সরাসরি ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।",
              en: "Trusted clay idol manufacturer in Bardhaman — reach us by phone or WhatsApp.",
            }}
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Info Cards */}
            <div className="space-y-6">
              {/* Call */}
              <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {t({ bn: "ফোন", en: "Phone" })}
                  </p>
                  <a
                    href={`tel:+${PHONE_RAW}`}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    data-ocid="contact-phone-link"
                  >
                    {PHONE}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t({ bn: "সরাসরি কল করুন", en: "Call us directly" })}
                  </p>
                  <a
                    href={`tel:+${PHONE_RAW}`}
                    className="mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                    data-ocid="contact-call-btn"
                  >
                    <Phone className="w-4 h-4" />
                    {t({ bn: "এখনই কল করুন", en: "Call Now" })}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    WhatsApp
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {PHONE}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t({
                      bn: "হোয়াটসঅ্যাপে বার্তা পাঠান",
                      en: "Send us a WhatsApp message",
                    })}
                  </p>
                  <a
                    href={`https://wa.me/${PHONE_RAW}?text=${WA_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors"
                    data-ocid="contact-whatsapp-btn"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t({ bn: "WhatsApp করুন", en: "WhatsApp Us" })}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-accent/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {t({ bn: "ঠিকানা", en: "Address" })}
                  </p>
                  <p className="text-foreground font-medium leading-relaxed">
                    {t({
                      bn: "মির্চোবা, পালপাড়া, ছোটনীলপুর",
                      en: "Mirchoba, Palpara, Chhotonilpur",
                    })}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t({
                      bn: "বর্ধমান, পশ্চিমবঙ্গ – ৭১৩১০৩",
                      en: "Bardhaman, West Bengal – 713103",
                    })}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t({ bn: "ভারত", en: "India" })}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    {t({ bn: "ব্যবসার সময়", en: "Business Hours" })}
                  </p>
                  <div className="space-y-2">
                    {HOURS.map((h) => (
                      <div
                        key={h.day.en}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-foreground font-medium">
                          {t(h.day)}
                        </span>
                        <span className="text-sm text-muted-foreground tabular-nums">
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Google Map */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-[420px] lg:h-full min-h-[420px]">
              <iframe
                title="Radha Madhav Mrit Shilpalay — Mirchoba, Bardhaman"
                src="https://maps.google.com/maps?q=23.2324,87.8615&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-ocid="contact-map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="bg-muted/30 py-14 sm:py-20 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4">
          <SectionHeading
            title={{ bn: "বাল্ক অর্ডার ইনকোয়ারি", en: "Bulk Order Inquiry" }}
            subtitle={{
              bn: "আপনার প্রয়োজনীয়তা জানান — আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব।",
              en: "Tell us your requirements — we will contact you within 24 hours.",
            }}
          />

          <div className="mt-10 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            {submitted ? (
              <SuccessMessage />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 space-y-6"
                noValidate
              >
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">
                      {t({ bn: "পূর্ণ নাম", en: "Full Name" })}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder={t({
                        bn: "আপনার নাম লিখুন",
                        en: "Enter your name",
                      })}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      data-ocid="contact-form-name"
                    />
                    {errors.name && (
                      <p
                        id="err-name"
                        className="text-destructive text-xs mt-1"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">
                      {t({ bn: "ফোন নম্বর", en: "Phone Number" })}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                      data-ocid="contact-form-phone"
                    />
                    {errors.phone && (
                      <p
                        id="err-phone"
                        className="text-destructive text-xs mt-1"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product + Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-product">
                      {t({ bn: "পণ্যের ধরন", en: "Product Interest" })}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <select
                        id="contact-product"
                        value={form.product}
                        onChange={(e) => set("product", e.target.value)}
                        aria-invalid={!!errors.product}
                        aria-describedby={
                          errors.product ? "err-product" : undefined
                        }
                        className="w-full h-10 rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                        data-ocid="contact-form-product"
                      >
                        <option value="">
                          {t({ bn: "মূর্তি নির্বাচন করুন", en: "Select an idol" })}
                        </option>
                        {INQUIRY_PRODUCTS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {t({ bn: p.bn, en: p.en })}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {errors.product && (
                      <p
                        id="err-product"
                        className="text-destructive text-xs mt-1"
                      >
                        {errors.product}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-qty">
                      {t({ bn: "আনুমানিক পরিমাণ", en: "Estimated Quantity" })}
                    </Label>
                    <div className="relative">
                      <select
                        id="contact-qty"
                        value={form.quantity}
                        onChange={(e) => set("quantity", e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                        data-ocid="contact-form-quantity"
                      >
                        <option value="">
                          {t({ bn: "পরিমাণ বেছে নিন", en: "Select quantity" })}
                        </option>
                        {QUANTITIES.map((q) => (
                          <option key={q.value} value={q.value}>
                            {q.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="contact-message">
                    {t({ bn: "বার্তা / প্রয়োজনীয়তা", en: "Message / Requirements" })}
                  </Label>
                  <Textarea
                    id="contact-message"
                    rows={4}
                    placeholder={t({
                      bn: "আপনার মূর্তির মাপ, ডিজাইন বা বিশেষ চাহিদা লিখুন...",
                      en: "Describe your size, design preferences, or special requirements...",
                    })}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    data-ocid="contact-form-message"
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="flex-1 sm:flex-none sm:min-w-[200px] font-semibold"
                    data-ocid="contact-form-submit"
                  >
                    {isPending
                      ? t({ bn: "পাঠানো হচ্ছে...", en: "Sending..." })
                      : t({ bn: "ইনকোয়ারি পাঠান", en: "Send Inquiry" })}
                  </Button>
                  <a
                    href={`https://wa.me/${PHONE_RAW}?text=${WA_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-6 py-2.5 rounded-md hover:bg-[#1ebe5d] transition-colors"
                    data-ocid="contact-form-whatsapp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t({ bn: "WhatsApp করুন", en: "WhatsApp Inquiry" })}
                  </a>
                </div>

                <p className="text-xs text-muted-foreground">
                  {t({
                    bn: "* চিহ্নিত ক্ষেত্রগুলি অবশ্যই পূরণ করতে হবে।",
                    en: "* Required fields must be filled.",
                  })}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="bg-background py-14 sm:py-20 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-1.5 text-sm font-semibold text-secondary mb-4">
              <HelpCircle size={15} />
              {t({ bn: "সাধারণ প্রশ্ন", en: "Frequently Asked Questions" })}
            </div>
            <h2 className="text-display-sm text-foreground mb-3">
              {t({
                bn: "আপনার মনে কি প্রশ্ন আছে?",
                en: "Have Questions? We've Got Answers",
              })}
            </h2>
            <p className="text-muted-foreground text-base">
              {t({
                bn: "মাটির মূর্তির অর্ডার, ডেলিভারি ও পাইকারি বিষয়ে সাধারণ প্রশ্নের উত্তর নিচে দেওয়া হয়েছে।",
                en: "Common questions about ordering, delivery and wholesale pricing answered below.",
              })}
            </p>
          </div>

          <FaqAccordion />

          {/* WhatsApp CTA after FAQ */}
          <div
            className="mt-8 bg-card border border-border rounded-2xl p-6 text-center shadow-sm"
            data-ocid="faq-whatsapp-cta"
          >
            <p className="text-foreground font-semibold mb-2">
              {t({
                bn: "আরও প্রশ্ন আছে? সরাসরি WhatsApp করুন!",
                en: "Still have questions? Chat with us on WhatsApp!",
              })}
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              {t({
                bn: "আমরা সাধারণত কয়েক মিনিটের মধ্যে উত্তর দিই।",
                en: "We typically respond within a few minutes.",
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${PHONE_RAW}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#1ebe5d] transition-colors"
                data-ocid="faq-whatsapp-btn"
              >
                <MessageCircle className="w-5 h-5" />
                {t({ bn: "WhatsApp-এ জিজ্ঞাসা করুন", en: "Ask on WhatsApp" })}
              </a>
              <a
                href={`tel:+${PHONE_RAW}`}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                data-ocid="faq-call-btn"
              >
                <Phone className="w-5 h-5" />
                {t({ bn: "কল করুন", en: "Call Now" })}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-primary py-8">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🏺", bn: "হস্তনির্মিত মূর্তি", en: "Handmade Clay Idols" },
              {
                icon: "📦",
                bn: "বাল্ক অর্ডার গ্রহণযোগ্য",
                en: "Bulk Orders Accepted",
              },
              {
                icon: "📍",
                bn: "বর্ধমানের বিশ্বস্ত প্রস্তুতকারক",
                en: "Trusted Bardhaman Manufacturer",
              },
            ].map((item) => (
              <div
                key={item.en}
                className="flex items-center justify-center gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-primary-foreground font-semibold text-sm">
                  {t({ bn: item.bn, en: item.en })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SuccessMessage() {
  const { t } = useLanguage();
  return (
    <div
      className="p-8 sm:p-12 text-center space-y-4"
      data-ocid="contact-form-success"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl font-display font-bold text-foreground">
        {t({ bn: "ধন্যবাদ!", en: "Thank You!" })}
      </h3>
      <p className="text-foreground font-medium">
        {t({
          bn: "আপনার ইনকোয়ারি সফলভাবে পাঠানো হয়েছে।",
          en: "Your inquiry has been submitted successfully.",
        })}
      </p>
      <p className="text-muted-foreground text-sm max-w-md mx-auto">
        {t({
          bn: "আমরা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব। দ্রুত উত্তরের জন্য সরাসরি WhatsApp বা ফোন করুন।",
          en: "We will contact you within 24 hours. For faster response, call or WhatsApp us directly.",
        })}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <a
          href={`tel:+${PHONE_RAW}`}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
        >
          <Phone className="w-4 h-4" />
          {t({ bn: "কল করুন", en: "Call Now" })}
        </a>
        <a
          href={`https://wa.me/${PHONE_RAW}?text=${WA_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1ebe5d] transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
