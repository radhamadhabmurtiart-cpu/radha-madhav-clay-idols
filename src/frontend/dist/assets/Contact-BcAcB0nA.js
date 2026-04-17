import { c as createLucideIcon, u as useLanguage, r as reactExports, j as jsxRuntimeExports, P as Phone, M as MessageCircle, e as MapPin, h as Label, I as Input, C as ChevronDown, B as Button } from "./index-DOyg_51M.js";
import { S as SectionHeading } from "./SectionHeading-ND4ihHU7.js";
import { T as Textarea } from "./textarea-CgX1Kasv.js";
import { u as useMutation } from "./useMutation-BmzX82yr.js";
import { C as Clock } from "./clock-DzC85f1T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode);
function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (_data) => {
      return Promise.resolve();
    }
  });
}
const PHONE = "+91 6295466310";
const PHONE_RAW = "916295466310";
const WA_MSG = encodeURIComponent(
  "I want to make a bulk inquiry for clay idols"
);
const INQUIRY_PRODUCTS = [
  { value: "ganesh", bn: "গণেশ মূর্তি", en: "Ganesh Idol" },
  { value: "lakshmi", bn: "লক্ষ্মী মূর্তি", en: "Lakshmi Idol" },
  { value: "durga", bn: "দুর্গা মূর্তি", en: "Durga Idol" },
  { value: "saraswati", bn: "সরস্বতী মূর্তি", en: "Saraswati Idol" },
  { value: "hanuman", bn: "হনুমান মূর্তি", en: "Hanuman Idol" },
  { value: "custom", bn: "কাস্টম অর্ডার", en: "Custom Order" }
];
const QUANTITIES = [
  { value: "1-10", label: "1 – 10" },
  { value: "11-50", label: "11 – 50" },
  { value: "51-100", label: "51 – 100" },
  { value: "100+", label: "100+" }
];
const HOURS = [
  {
    day: { bn: "সোমবার – শনিবার", en: "Monday – Saturday" },
    time: "8:00 AM – 7:00 PM"
  },
  { day: { bn: "রবিবার", en: "Sunday" }, time: "9:00 AM – 5:00 PM" }
];
const FAQ_ITEMS = [
  {
    id: "delivery",
    question: {
      bn: "বার্ধমান থেকে কি সারা ভারতে ডেলিভারি দেওয়া হয়?",
      en: "Do you deliver clay idols across India?"
    },
    answer: {
      bn: "হ্যাঁ, আমরা পশ্চিমবঙ্গ ও সারা ভারতে বিশ্বস্ত পরিবহনের মাধ্যমে ডেলিভারি দিই। নিরাপদ প্যাকিং নিশ্চিত করা হয়।",
      en: "Yes, we deliver across West Bengal and all India via trusted transport partners. All idols are securely packed to ensure safe transit to any location."
    }
  },
  {
    id: "minimum-order",
    question: {
      bn: "ন্যূনতম অর্ডার কতটি?",
      en: "What is the minimum bulk order quantity?"
    },
    answer: {
      bn: "পাইকারি মূল্যের জন্য ন্যূনতম ১০টি মূর্তির অর্ডার দিতে হবে। কাস্টম মূর্তির জন্য ন্যূনতম ২৫টি।",
      en: "Minimum bulk order is 10 idols for standard wholesale pricing. For custom orders, minimum is 25 pieces. Special pricing for larger quantities."
    }
  },
  {
    id: "packaging",
    question: {
      bn: "মাটির মূর্তি কিভাবে প্যাক করা হয়?",
      en: "How are clay idols packaged for transport?"
    },
    answer: {
      bn: "সমস্ত মূর্তি ফোম ও কার্ডবোর্ডে নিরাপদভাবে প্যাক করা হয়। বাল্ক অর্ডার বিশেষ ক্রেটে প্যাক করা হয় — পরিবহনে কোনো ক্ষতি হয় না।",
      en: "All idols are securely packed in foam and corrugated cardboard. Bulk orders are crated for maximum protection. Zero breakage guarantee during transport."
    }
  },
  {
    id: "custom",
    question: {
      bn: "কাস্টম মূর্তি তৈরি হয়?",
      en: "Do you make custom size or design clay idols?"
    },
    answer: {
      bn: "হ্যাঁ, কাস্টম মাপ ও ডিজাইনের অর্ডার গৃহীত হয়। যেকোনো দেবতা, যেকোনো মাপ। কর্পোরেট গিফটিং ও বিশেষ পূজার অর্ডারও গ্রহণযোগ্য। ডেলিভারি ৭–২১ কার্যদিবসের মধ্যে।",
      en: "Yes, custom size and design orders are accepted. Any deity, any size, any finish. Corporate gifting and special festival orders also accepted. Delivery within 7–21 working days."
    }
  },
  {
    id: "wholesale",
    question: {
      bn: "পাইকারি মূল্যে কি মাটির মূর্তি পাওয়া যায়?",
      en: "Is wholesale pricing available for clay idols?"
    },
    answer: {
      bn: "হ্যাঁ, পাইকারি বিক্রেতা, পূজা কমিটি, ডেকোরেটর ও দোকানদারদের জন্য বিশেষ পাইকারি মূল্য আছে। সরাসরি প্রস্তুতকারকের কাছ থেকে কিনুন — কোনো মধ্যস্থতাকারী নেই।",
      en: "Yes, wholesale and bulk pricing is available for retailers, puja committees, decorators and shop owners. Buy directly from the manufacturer — no middlemen, maximum value."
    }
  },
  {
    id: "cities",
    question: {
      bn: "কোন কোন শহরে মাটির মূর্তি সরবরাহ করা হয়?",
      en: "Which cities do you supply clay idols to?"
    },
    answer: {
      bn: "বর্ধমান, দুর্গাপুর, আসানসোল, বাঁকুড়া, পুরুলিয়া, ধানবাদ, কলকাতা সহ সারা ভারতে সরবরাহ করা হয়। পশ্চিমবঙ্গের যেকোনো জেলায় এবং ভারতের যেকোনো রাজ্যে অর্ডার পাঠানো হয়।",
      en: "We supply to Bardhaman, Durgapur, Asansol, Bankura, Purulia, Dhanbad, Kolkata and across all India. Orders delivered to any district in West Bengal and any state in India."
    }
  }
];
const EMPTY = {
  name: "",
  phone: "",
  product: "",
  quantity: "",
  message: ""
};
function FaqAccordion() {
  const { t } = useLanguage();
  const [openId, setOpenId] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "faq-section", children: FAQ_ITEMS.map((faq) => {
    const isOpen = openId === faq.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOpenId(isOpen ? null : faq.id),
              className: "w-full flex items-start justify-between gap-3 p-4 sm:p-5 text-left hover:bg-muted/40 transition-colors",
              "aria-expanded": isOpen,
              "data-ocid": `faq-toggle-${faq.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground text-sm leading-snug flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary mr-2", children: t({ bn: "প্রশ্ন:", en: "Q:" }) }),
                  t(faq.question)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 18,
                    className: `flex-shrink-0 text-muted-foreground transition-transform duration-200 mt-0.5 ${isOpen ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground mr-2", children: t({ bn: "উত্তর:", en: "A:" }) }),
            t(faq.answer)
          ] }) })
        ]
      },
      faq.id
    );
  }) });
}
function ContactPage() {
  const { t } = useLanguage();
  const { mutateAsync, isPending } = useSubmitInquiry();
  const [form, setForm] = reactExports.useState(EMPTY);
  const [errors, setErrors] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    document.title = "যোগাযোগ করুন | Contact — Clay Idol Manufacturer Bardhaman Near Me | Radha Madhav Mrit Shilpalay";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Contact Radha Madhav Mrit Shilpalay for wholesale clay idol orders in Bardhaman. Call or WhatsApp +91 6295466310. Clay idol manufacturer near me — Bardhaman, West Bengal. Bulk orders for Ganesh, Lakshmi, Durga idols."
      );
    }
  }, []);
  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  }
  function validate() {
    const e = {};
    if (!form.name.trim())
      e.name = t({ bn: "নাম আবশ্যক", en: "Name is required" });
    if (!form.phone.trim())
      e.phone = t({ bn: "ফোন নম্বর আবশ্যক", en: "Phone is required" });
    if (!form.product)
      e.product = t({ bn: "পণ্য নির্বাচন করুন", en: "Please select a product" });
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    await mutateAsync(form);
    setSubmitted(true);
    setForm(EMPTY);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border-b border-border py-14 sm:py-20 text-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-4 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-secondary mb-3", children: t({ bn: "আমাদের সাথে যোগাযোগ", en: "Get In Touch" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground mb-4", children: t({ bn: "যোগাযোগ করুন", en: "Contact Us" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg leading-relaxed", children: t({
          bn: "পাইকারি মূর্তি অর্ডার, কাস্টম ডিজাইন বা যেকোনো তথ্যের জন্য আজই যোগাযোগ করুন।",
          en: "For wholesale idol orders, custom designs, or any inquiry — reach us today."
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14 sm:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          title: { bn: "আমাদের বিবরণ", en: "Our Details" },
          subtitle: {
            bn: "বার্ধমানের বিশ্বস্ত মাটির মূর্তি প্রস্তুতকারক — সরাসরি ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।",
            en: "Trusted clay idol manufacturer in Bardhaman — reach us by phone or WhatsApp."
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: t({ bn: "ফোন", en: "Phone" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `tel:+${PHONE_RAW}`,
                  className: "text-lg font-semibold text-foreground hover:text-primary transition-colors",
                  "data-ocid": "contact-phone-link",
                  children: PHONE
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t({ bn: "সরাসরি কল করুন", en: "Call us directly" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:+${PHONE_RAW}`,
                  className: "mt-3 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors",
                  "data-ocid": "contact-call-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                    t({ bn: "এখনই কল করুন", en: "Call Now" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: "WhatsApp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground", children: PHONE }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t({
                bn: "হোয়াটসঅ্যাপে বার্তা পাঠান",
                en: "Send us a WhatsApp message"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://wa.me/${PHONE_RAW}?text=${WA_MSG}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "mt-3 inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors",
                  "data-ocid": "contact-whatsapp-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                    t({ bn: "WhatsApp করুন", en: "WhatsApp Us" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-accent/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: t({ bn: "ঠিকানা", en: "Address" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium leading-relaxed", children: t({
                bn: "মির্চোবা, পালপাড়া, ছোটনীলপুর",
                en: "Mirchoba, Palpara, Chhotonilpur"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t({
                bn: "বর্ধমান, পশ্চিমবঙ্গ – ৭১৩১০৩",
                en: "Bardhaman, West Bengal – 713103"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t({ bn: "ভারত", en: "India" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 flex items-start gap-4 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-3", children: t({ bn: "ব্যবসার সময়", en: "Business Hours" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: HOURS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between items-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: t(h.day) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground tabular-nums", children: h.time })
                  ]
                },
                h.day.en
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-border shadow-sm h-[420px] lg:h-full min-h-[420px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            title: "Radha Madhav Mrit Shilpalay — Mirchoba, Bardhaman",
            src: "https://maps.google.com/maps?q=23.2324,87.8615&z=15&output=embed",
            width: "100%",
            height: "100%",
            style: { border: 0, minHeight: "420px" },
            allowFullScreen: true,
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
            "data-ocid": "contact-map"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-14 sm:py-20 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeading,
        {
          title: { bn: "বাল্ক অর্ডার ইনকোয়ারি", en: "Bulk Order Inquiry" },
          subtitle: {
            bn: "আপনার প্রয়োজনীয়তা জানান — আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব।",
            en: "Tell us your requirements — we will contact you within 24 hours."
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 bg-card border border-border rounded-2xl shadow-sm overflow-hidden", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessMessage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "p-6 sm:p-8 space-y-6",
          noValidate: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact-name", children: [
                  t({ bn: "পূর্ণ নাম", en: "Full Name" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "contact-name",
                    type: "text",
                    placeholder: t({
                      bn: "আপনার নাম লিখুন",
                      en: "Enter your name"
                    }),
                    value: form.name,
                    onChange: (e) => set("name", e.target.value),
                    "aria-invalid": !!errors.name,
                    "aria-describedby": errors.name ? "err-name" : void 0,
                    "data-ocid": "contact-form-name"
                  }
                ),
                errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    id: "err-name",
                    className: "text-destructive text-xs mt-1",
                    children: errors.name
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact-phone", children: [
                  t({ bn: "ফোন নম্বর", en: "Phone Number" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "contact-phone",
                    type: "tel",
                    placeholder: "+91 XXXXXXXXXX",
                    value: form.phone,
                    onChange: (e) => set("phone", e.target.value),
                    "aria-invalid": !!errors.phone,
                    "aria-describedby": errors.phone ? "err-phone" : void 0,
                    "data-ocid": "contact-form-phone"
                  }
                ),
                errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    id: "err-phone",
                    className: "text-destructive text-xs mt-1",
                    children: errors.phone
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact-product", children: [
                  t({ bn: "পণ্যের ধরন", en: "Product Interest" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "contact-product",
                      value: form.product,
                      onChange: (e) => set("product", e.target.value),
                      "aria-invalid": !!errors.product,
                      "aria-describedby": errors.product ? "err-product" : void 0,
                      className: "w-full h-10 rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                      "data-ocid": "contact-form-product",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t({ bn: "মূর্তি নির্বাচন করুন", en: "Select an idol" }) }),
                        INQUIRY_PRODUCTS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.value, children: t({ bn: p.bn, en: p.en }) }, p.value))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" })
                ] }),
                errors.product && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    id: "err-product",
                    className: "text-destructive text-xs mt-1",
                    children: errors.product
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-qty", children: t({ bn: "আনুমানিক পরিমাণ", en: "Estimated Quantity" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "contact-qty",
                      value: form.quantity,
                      onChange: (e) => set("quantity", e.target.value),
                      className: "w-full h-10 rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                      "data-ocid": "contact-form-quantity",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t({ bn: "পরিমাণ বেছে নিন", en: "Select quantity" }) }),
                        QUANTITIES.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: q.value, children: q.label }, q.value))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-message", children: t({ bn: "বার্তা / প্রয়োজনীয়তা", en: "Message / Requirements" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "contact-message",
                  rows: 4,
                  placeholder: t({
                    bn: "আপনার মূর্তির মাপ, ডিজাইন বা বিশেষ চাহিদা লিখুন...",
                    en: "Describe your size, design preferences, or special requirements..."
                  }),
                  value: form.message,
                  onChange: (e) => set("message", e.target.value),
                  "data-ocid": "contact-form-message"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  size: "lg",
                  disabled: isPending,
                  className: "flex-1 sm:flex-none sm:min-w-[200px] font-semibold",
                  "data-ocid": "contact-form-submit",
                  children: isPending ? t({ bn: "পাঠানো হচ্ছে...", en: "Sending..." }) : t({ bn: "ইনকোয়ারি পাঠান", en: "Send Inquiry" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://wa.me/${PHONE_RAW}?text=${WA_MSG}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-6 py-2.5 rounded-md hover:bg-[#1ebe5d] transition-colors",
                  "data-ocid": "contact-form-whatsapp",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                    t({ bn: "WhatsApp করুন", en: "WhatsApp Inquiry" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t({
              bn: "* চিহ্নিত ক্ষেত্রগুলি অবশ্যই পূরণ করতে হবে।",
              en: "* Required fields must be filled."
            }) })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14 sm:py-20 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-1.5 text-sm font-semibold text-secondary mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { size: 15 }),
          t({ bn: "সাধারণ প্রশ্ন", en: "Frequently Asked Questions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-sm text-foreground mb-3", children: t({
          bn: "আপনার মনে কি প্রশ্ন আছে?",
          en: "Have Questions? We've Got Answers"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: t({
          bn: "মাটির মূর্তির অর্ডার, ডেলিভারি ও পাইকারি বিষয়ে সাধারণ প্রশ্নের উত্তর নিচে দেওয়া হয়েছে।",
          en: "Common questions about ordering, delivery and wholesale pricing answered below."
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaqAccordion, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-8 bg-card border border-border rounded-2xl p-6 text-center shadow-sm",
          "data-ocid": "faq-whatsapp-cta",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold mb-2", children: t({
              bn: "আরও প্রশ্ন আছে? সরাসরি WhatsApp করুন!",
              en: "Still have questions? Chat with us on WhatsApp!"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: t({
              bn: "আমরা সাধারণত কয়েক মিনিটের মধ্যে উত্তর দিই।",
              en: "We typically respond within a few minutes."
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://wa.me/${PHONE_RAW}?text=${WA_MSG}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#1ebe5d] transition-colors",
                  "data-ocid": "faq-whatsapp-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
                    t({ bn: "WhatsApp-এ জিজ্ঞাসা করুন", en: "Ask on WhatsApp" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:+${PHONE_RAW}`,
                  className: "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors",
                  "data-ocid": "faq-call-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }),
                    t({ bn: "কল করুন", en: "Call Now" })
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 text-center", children: [
      { icon: "🏺", bn: "হস্তনির্মিত মূর্তি", en: "Handmade Clay Idols" },
      {
        icon: "📦",
        bn: "বাল্ক অর্ডার গ্রহণযোগ্য",
        en: "Bulk Orders Accepted"
      },
      {
        icon: "📍",
        bn: "বর্ধমানের বিশ্বস্ত প্রস্তুতকারক",
        en: "Trusted Bardhaman Manufacturer"
      }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-semibold text-sm", children: t({ bn: item.bn, en: item.en }) })
        ]
      },
      item.en
    )) }) }) })
  ] });
}
function SuccessMessage() {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-8 sm:p-12 text-center space-y-4",
      "data-ocid": "contact-form-success",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-display font-bold text-foreground", children: t({ bn: "ধন্যবাদ!", en: "Thank You!" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: t({
          bn: "আপনার ইনকোয়ারি সফলভাবে পাঠানো হয়েছে।",
          en: "Your inquiry has been submitted successfully."
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-md mx-auto", children: t({
          bn: "আমরা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব। দ্রুত উত্তরের জন্য সরাসরি WhatsApp বা ফোন করুন।",
          en: "We will contact you within 24 hours. For faster response, call or WhatsApp us directly."
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `tel:+${PHONE_RAW}`,
              className: "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                t({ bn: "কল করুন", en: "Call Now" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `https://wa.me/${PHONE_RAW}?text=${WA_MSG}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1ebe5d] transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                "WhatsApp"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ContactPage
};
