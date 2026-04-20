import InquiryTypes "types/inquiry";
import ProductTypes "types/product";
import BannerTypes "types/banner";
import InquiryMixin "mixins/inquiry-api";
import ProductMixin "mixins/product-api";
import CategoryMixin "mixins/category-api";
import AdminMixin "mixins/admin-api";
import BannerMixin "mixins/banner-api";
import ObjectStorageMixin "mixins/object-storage-api";
import ProductLib "lib/product";
import CategoryLib "lib/category";

import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";




actor {
  let ownerPrincipal : Principal = Principal.fromText("khuxn-trxys-ugzje-zumyw-k7nyc-igd7r-zqmyy-lnfy2-imbhm-nmn7r-wae");

  func isOwner(caller : Principal) : Bool {
    caller == ownerPrincipal;
  };

  let inquiries = List.empty<InquiryTypes.InquiryRecord>();
  var _nextInquiryId : Nat = 0;
  let nextInquiryId = { var value = _nextInquiryId };
  let visitorProfiles = Map.empty<Principal, InquiryTypes.VisitorProfile>();

  let products = List.empty<ProductTypes.Product>();
  var _nextProductId : Nat = 0;
  let nextProductId = { var value = _nextProductId };

  let categoryImages = Map.empty<Text, Text>();
  do { CategoryLib.initDefaults(categoryImages) };

  // Admin session store: token -> creation timestamp
  let adminSessions = Map.empty<Text, Int>();

  // Banner image list and featured product IDs
  let bannerImages = { var value : [BannerTypes.BannerImage] = [] };
  let featuredProductIds = { var value : [Nat] = [] };

  func validateSession(token : Text) : Bool {
    adminSessions.containsKey(token)
  };

  include InquiryMixin(inquiries, nextInquiryId, visitorProfiles, isOwner, validateSession);
  include ProductMixin(products, nextProductId, isOwner, validateSession);
  include CategoryMixin(categoryImages, isOwner, validateSession);
  include AdminMixin(adminSessions, isOwner);
  include BannerMixin(bannerImages, featuredProductIds, isOwner, validateSession);
  include ObjectStorageMixin(isOwner, validateSession);

  public query func getOwnerPrincipal() : async Text {
    ownerPrincipal.toText();
  };

  public shared query ({ caller }) func isAdminCaller() : async Bool {
    caller == ownerPrincipal;
  };

  do {
    let now = Time.now();
    let seeds : [ProductTypes.AddProductInput] = [
      {
        nameEn = "Sitting Ganesh Clay Idol – 6 Inch Traditional Bengali Style";
        nameBn = "বসা গণেশ মাটির মূর্তি – ৬ ইঞ্চি ঐতিহ্যবাহী বাংলা স্টাইল";
        descriptionEn = "A beautifully crafted 6-inch sitting Ganesh clay idol in traditional Bengali style. Made from pure mitti, this handmade Ganesha murti is perfect for home puja and festive decoration. Available for bulk orders and wholesale supply across India.";
        descriptionBn = "ঐতিহ্যবাহী বাংলা স্টাইলে তৈরি ৬ ইঞ্চি বসা গণেশ মাটির মূর্তি। বিশুদ্ধ মিট্টি দিয়ে হাতে তৈরি এই গণেশ মূর্তি পুজো ও উৎসবের জন্য আদর্শ। পাইকারি ও বাল্ক অর্ডারে সারা ভারতে সরবরাহ করা হয়।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Idol_of_Lord_Ganesha_worshipped_on_the_occasion_of_Ganesh_Chaturthi.jpg/400px-Idol_of_Lord_Ganesha_worshipped_on_the_occasion_of_Ganesh_Chaturthi.jpg"];
      },
      {
        nameEn = "Standing Ganesh Idol Handmade Clay – 8 Inch Natural Mitti Finish";
        nameBn = "দাঁড়ানো গণেশ মাটির মূর্তি হাতে তৈরি – ৮ ইঞ্চি প্রাকৃতিক মিট্টি ফিনিশ";
        descriptionEn = "A graceful 8-inch standing Ganesh idol crafted by skilled artisans from natural clay. The raw mitti finish gives it an earthy, authentic look ideal for eco-conscious buyers. Wholesale prices available for retailers and puja committees.";
        descriptionBn = "দক্ষ কারিগরদের দ্বারা তৈরি ৮ ইঞ্চি দাঁড়ানো গণেশ মাটির মূর্তি। প্রাকৃতিক মিট্টির ফিনিশ এটিকে পরিবেশ সচেতন ক্রেতাদের জন্য আদর্শ করে তোলে। পাইকারি মূল্যে পুজো কমিটি ও দোকানদারদের জন্য উপলব্ধ।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Idol_of_Lord_Ganesha_worshipped_on_the_occasion_of_Ganesh_Chaturthi.jpg/400px-Idol_of_Lord_Ganesha_worshipped_on_the_occasion_of_Ganesh_Chaturthi.jpg"];
      },
      {
        nameEn = "Dancing Ganesh Eco-Friendly Mitti Idol – 10 Inch Ganesh Chaturthi Special";
        nameBn = "নাচের ভঙ্গিতে ইকো-ফ্রেন্ডলি মিট্টি গণেশ মূর্তি – ১০ ইঞ্চি গণেশ চতুর্থী স্পেশাল";
        descriptionEn = "A vibrant 10-inch dancing Ganesha made from eco-friendly clay, specially designed for Ganesh Chaturthi celebrations. Dissolves easily in water, making it the ideal choice for environment-friendly puja. Bulk orders available from our Bardhaman factory.";
        descriptionBn = "পরিবেশ বান্ধব মিট্টি থেকে তৈরি ১০ ইঞ্চি নাচের ভঙ্গিতে গণেশ মূর্তি, বিশেষভাবে গণেশ চতুর্থীর জন্য ডিজাইন করা হয়েছে। জলে সহজে বিলীন হয়, পরিবেশ-বান্ধব পুজোর জন্য আদর্শ। বর্ধমানের কারখানা থেকে বাল্ক অর্ডার নেওয়া হয়।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Blessing Pose Ganesh Clay Idol – 12 Inch Hand-Painted Glossy Finish";
        nameBn = "আশীর্বাদের ভঙ্গিতে গণেশ মাটির মূর্তি – ১২ ইঞ্চি হাতে আঁকা গ্লসি ফিনিশ";
        descriptionEn = "A stunning 12-inch Ganesh idol in blessing pose with intricate hand-painted detailing and glossy finish. Crafted in Bardhaman by master craftsmen, this mitti ganesh is a favourite for retail shops and puja stores. Wholesale rates for bulk buyers.";
        descriptionBn = "হাতে আঁকা বিস্তারিত কাজ ও গ্লসি ফিনিশ সহ ১২ ইঞ্চি আশীর্বাদের ভঙ্গিতে গণেশ মূর্তি। বর্ধমানের দক্ষ কারিগরদের তৈরি এই মিট্টি গণেশ পুজোর দোকান ও রিটেইলারদের পছন্দের। বাল্ক ক্রেতাদের জন্য পাইকারি মূল্য উপলব্ধ।";
        category = #ganesh;
        sizes = ["12 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "1 Foot Ganesh Clay Idol Wholesale – Matte Finish Traditional Design";
        nameBn = "১ ফুট গণেশ মাটির মূর্তি পাইকারি – ম্যাট ফিনিশ ঐতিহ্যবাহী ডিজাইন";
        descriptionEn = "A 1-foot traditional Ganesh clay idol with smooth matte finish, perfect for temple installation and large puja events. Made from premium quality clay in Bardhaman, West Bengal. Ideal for bulk Ganesh idol suppliers and wholesale distributors across India.";
        descriptionBn = "স্মুথ ম্যাট ফিনিশ সহ ১ ফুট ঐতিহ্যবাহী গণেশ মাটির মূর্তি, মন্দির স্থাপন ও বড় পুজো অনুষ্ঠানের জন্য আদর্শ। বর্ধমান, পশ্চিমবঙ্গে প্রিমিয়াম মানের মাটি দিয়ে তৈরি। সারা ভারতে পাইকারি বিতরণকারীদের জন্য উপলব্ধ।";
        category = #ganesh;
        sizes = ["1 foot"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "2 Foot Large Ganesh Idol Clay – Handmade Painted Murti West Bengal";
        nameBn = "২ ফুট বড় গণেশ মাটির মূর্তি – হাতে আঁকা পশ্চিমবঙ্গ মূর্তি";
        descriptionEn = "A grand 2-foot handmade Ganesh clay murti with vibrant hand-painted colours, crafted in the traditional West Bengal style. Ideal for community puja pandals, temple decorations, and festival organizers. Bulk supply available across West Bengal and India.";
        descriptionBn = "জীবন্ত হাতে আঁকা রঙ সহ ২ ফুট হাতে তৈরি গণেশ মাটির মূর্তি, ঐতিহ্যবাহী পশ্চিমবঙ্গ স্টাইলে তৈরি। সম্প্রদায়িক পুজো প্যান্ডেল, মন্দির সজ্জা ও উৎসব আয়োজকদের জন্য আদর্শ। পশ্চিমবঙ্গ ও সারা ভারতে বাল্ক সরবরাহ উপলব্ধ।";
        category = #ganesh;
        sizes = ["2 foot"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol Sitting on Lotus Clay – 8 Inch Artistic Painted Design";
        nameBn = "পদ্মের উপর বসা গণেশ মাটির মূর্তি – ৮ ইঞ্চি শিল্পসম্মত আঁকা ডিজাইন";
        descriptionEn = "An artistic 8-inch Ganesh idol seated on a lotus, painted with bright acrylic colours and intricate detailing. This unique handmade ganesh statue from Bardhaman is a bestseller for retail shops during Ganesh festivals. Wholesale prices for bulk buyers.";
        descriptionBn = "উজ্জ্বল রঙ ও বিস্তারিত কাজ সহ পদ্মের উপর বসা ৮ ইঞ্চি শিল্পসম্মত গণেশ মূর্তি। বর্ধমানের এই অনন্য হাতে তৈরি গণেশ মূর্তি গণেশ উৎসবে রিটেইল দোকানে সবচেয়ে বেশি বিক্রি হয়। বাল্ক ক্রেতাদের জন্য পাইকারি মূল্য।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Eco-Friendly Ganesh Murti – 6 Inch Seedling Ganesh Natural Clay";
        nameBn = "ইকো-ফ্রেন্ডলি গণেশ মূর্তি – ৬ ইঞ্চি বীজ গণেশ প্রাকৃতিক মাটি";
        descriptionEn = "A unique 6-inch eco-friendly Ganesh murti embedded with plant seeds, made from 100% natural mitti. Plant it after puja for a green celebration. Perfect for eco-conscious bulk buyers, NGOs, and green festival organizers. Manufactured in Bardhaman, West Bengal.";
        descriptionBn = "১০০% প্রাকৃতিক মিট্টি থেকে তৈরি উদ্ভিদ বীজ সমৃদ্ধ ৬ ইঞ্চি ইকো-ফ্রেন্ডলি গণেশ মূর্তি। পুজোর পর মাটিতে পুঁতুন সবুজ উদযাপনের জন্য। পরিবেশ সচেতন বাল্ক ক্রেতা, এনজিও ও সবুজ উৎসব আয়োজকদের জন্য আদর্শ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Modak Clay – 10 Inch Bengali Puja Murti Wholesale";
        nameBn = "মোদক সহ গণেশ মাটির মূর্তি – ১০ ইঞ্চি বাংলা পুজোর মূর্তি পাইকারি";
        descriptionEn = "A traditional 10-inch Ganesh idol holding modak, crafted in authentic Bengali puja style. The natural clay finish preserves the divine appearance and makes it ideal for home altars and puja pandals. Available for wholesale supply to retailers and distributors.";
        descriptionBn = "মোদক ধরা ঐতিহ্যবাহী বাংলা পুজোর স্টাইলে তৈরি ১০ ইঞ্চি গণেশ মূর্তি। প্রাকৃতিক মাটির ফিনিশ দিব্য রূপ বজায় রাখে এবং গৃহ মন্দির ও পুজো প্যান্ডেলের জন্য উপযুক্ত করে তোলে। রিটেইলার ও পরিবেশকদের জন্য পাইকারি সরবরাহ উপলব্ধ।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Modern Minimalist Ganesh Clay Idol – 6 Inch Matte White Finish";
        nameBn = "আধুনিক মিনিমালিস্ট গণেশ মাটির মূর্তি – ৬ ইঞ্চি ম্যাট সাদা ফিনিশ";
        descriptionEn = "A contemporary 6-inch Ganesh idol in modern minimalist design with smooth matte white finish. Ideal for gifting, home decor, and corporate events. Manufactured in Bardhaman from fine clay. Bulk order supply available across India for wholesalers and retailers.";
        descriptionBn = "স্মুথ ম্যাট সাদা ফিনিশ সহ আধুনিক মিনিমালিস্ট ডিজাইনে ৬ ইঞ্চি গণেশ মূর্তি। গিফটিং, হোম ডেকোর ও কর্পোরেট ইভেন্টের জন্য আদর্শ। বর্ধমানে মৃদু মাটি দিয়ে তৈরি। পাইকারি ও রিটেইলারদের জন্য সারা ভারতে বাল্ক অর্ডার সরবরাহ উপলব্ধ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Musical Instrument Clay – 8 Inch Painted Mitti";
        nameBn = "বাদ্যযন্ত্র সহ গণেশ মাটির মূর্তি – ৮ ইঞ্চি রঙিন মিট্টি";
        descriptionEn = "A playful 8-inch Ganesh idol playing a musical instrument, hand-painted in vibrant colours on natural clay. This unique handmade ganesh murti adds a festive touch to any puja. Available wholesale from Radha Madhav Mrit Shilpalay, Bardhaman.";
        descriptionBn = "জীবন্ত রঙে হাতে আঁকা প্রাকৃতিক মাটির ৮ ইঞ্চি বাদ্যযন্ত্র বাজানো গণেশ মূর্তি। এই অনন্য হাতে তৈরি গণেশ মূর্তি যেকোনো পুজোতে উৎসবমুখর পরিবেশ তৈরি করে। রাধামাধব মৃৎশিল্পালয়, বর্ধমান থেকে পাইকারিতে উপলব্ধ।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Chaturthi Special Clay Idol – 1.5 Foot Painted Natural Clay";
        nameBn = "গণেশ চতুর্থী স্পেশাল মাটির মূর্তি – ১.৫ ফুট রঙিন প্রাকৃতিক মাটি";
        descriptionEn = "A festival-ready 1.5-foot Ganesh idol specially designed for Ganesh Chaturthi puja with vibrant painting on natural clay. Crafted by expert artisans in Bardhaman, West Bengal. Suitable for bulk orders by puja committees and event organizers across India.";
        descriptionBn = "প্রাকৃতিক মাটিতে প্রাণবন্ত রঙ সহ গণেশ চতুর্থী পুজোর জন্য বিশেষভাবে ডিজাইন করা ১.৫ ফুট উৎসব-প্রস্তুত গণেশ মূর্তি। বর্ধমান, পশ্চিমবঙ্গে বিশেষজ্ঞ কারিগরদের তৈরি। সারা ভারতে পুজো কমিটি ও ইভেন্ট আয়োজকদের বাল্ক অর্ডারের জন্য উপযুক্ত।";
        category = #ganesh;
        sizes = ["1.5 foot"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol on Elephant Clay – 12 Inch Glossy Painted West Bengal";
        nameBn = "হাতির উপর গণেশ মাটির মূর্তি – ১২ ইঞ্চি গ্লসি রঙিন পশ্চিমবঙ্গ";
        descriptionEn = "A majestic 12-inch Ganesh idol mounted on an elephant, with glossy finish and detailed hand-painting. This Bengali style ganesh murti is a premium product for wholesale buyers and temple stores. Manufactured in Bardhaman with pure clay by skilled craftsmen.";
        descriptionBn = "গ্লসি ফিনিশ ও বিস্তারিত হাত-পেইন্টিং সহ হাতির উপর আরোহণ করা ১২ ইঞ্চি রাজসিক গণেশ মূর্তি। এই বাংলা স্টাইলের গণেশ মূর্তি পাইকারি ক্রেতা ও মন্দিরের দোকানের জন্য একটি প্রিমিয়াম পণ্য।";
        category = #ganesh;
        sizes = ["12 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Panchmukhi Ganesh Clay Idol – 10 Inch Five-Faced Mitti Murti Wholesale";
        nameBn = "পঞ্চমুখী গণেশ মাটির মূর্তি – ১০ ইঞ্চি পাঁচ মুখের মিট্টি মূর্তি পাইকারি";
        descriptionEn = "A rare and auspicious 10-inch Panchmukhi (five-faced) Ganesh clay idol, handcrafted by master artisans in Bardhaman. Highly sought after by temples and spiritual stores. Wholesale and bulk supply available to retailers across India.";
        descriptionBn = "বর্ধমানের দক্ষ কারিগরদের হাতে তৈরি বিরল ও শুভ ১০ ইঞ্চি পঞ্চমুখী (পাঁচ মুখের) গণেশ মাটির মূর্তি। মন্দির ও আধ্যাত্মিক দোকানগুলি দ্বারা অত্যন্ত চাহিদাযুক্ত। সারা ভারতে রিটেইলারদের কাছে পাইকারি ও বাল্ক সরবরাহ উপলব্ধ।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Reclining Ganesh Idol Clay – 8 Inch Matte Natural Mitti Home Decor";
        nameBn = "শায়িত গণেশ মাটির মূর্তি – ৮ ইঞ্চি ম্যাট প্রাকৃতিক মিট্টি হোম ডেকোর";
        descriptionEn = "A relaxed and charming 8-inch reclining Ganesh idol crafted from natural mitti with smooth matte finish. A unique design for home decor, gift shops, and puja store collections. Wholesale prices available for bulk orders from Bardhaman factory.";
        descriptionBn = "স্মুথ ম্যাট ফিনিশ সহ প্রাকৃতিক মিট্টি থেকে তৈরি আরামদায়ক ও আকর্ষণীয় ৮ ইঞ্চি শায়িত গণেশ মূর্তি। হোম ডেকোর, গিফট শপ ও পুজো স্টোরের কালেকশনের জন্য অনন্য ডিজাইন। বর্ধমান কারখানা থেকে বাল্ক অর্ডারে পাইকারি মূল্য উপলব্ধ।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Book Clay Murti – 6 Inch Saraswati Puja Style";
        nameBn = "বই সহ গণেশ মাটির মূর্তি – ৬ ইঞ্চি সরস্বতী পুজোর স্টাইল";
        descriptionEn = "A scholarly 6-inch Ganesh idol holding a book, perfect for educational institutions, schools, and Saraswati Puja celebrations. Made from natural clay with a painted finish. Available in bulk for wholesale buyers across West Bengal and India.";
        descriptionBn = "বই ধরা পণ্ডিত ৬ ইঞ্চি গণেশ মূর্তি, শিক্ষা প্রতিষ্ঠান, স্কুল ও সরস্বতী পুজোর জন্য আদর্শ। রঙিন ফিনিশ সহ প্রাকৃতিক মাটি দিয়ে তৈরি। পশ্চিমবঙ্গ ও সারা ভারতে পাইকারি ক্রেতাদের জন্য বাল্কে উপলব্ধ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Bengali Traditional Ganesh Idol Clay – 12 Inch Durga Puja Season";
        nameBn = "বাংলা ঐতিহ্যবাহী গণেশ মাটির মূর্তি – ১২ ইঞ্চি দুর্গা পুজোর সিজন";
        descriptionEn = "A classically beautiful 12-inch Ganesh clay idol in authentic Bengali style, specially created for Durga Puja season. Crafted in Bardhaman from pure mitti, this idol is in high demand by puja pandals and community committees. Bulk orders welcome.";
        descriptionBn = "খাঁটি বাংলা স্টাইলে তৈরি শাস্ত্রীয়ভাবে সুন্দর ১২ ইঞ্চি গণেশ মাটির মূর্তি, বিশেষভাবে দুর্গাপুজোর মৌসুমের জন্য তৈরি। বর্ধমানে খাঁটি মিট্টি থেকে তৈরি, পুজো প্যান্ডেল ও কমিউনিটি কমিটির মধ্যে ব্যাপক চাহিদা রয়েছে। বাল্ক অর্ডার স্বাগত।";
        category = #ganesh;
        sizes = ["12 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol on Rat Mount Clay – 8 Inch Painted Mitti Manufacturer";
        nameBn = "মূষিক বাহনে গণেশ মাটির মূর্তি – ৮ ইঞ্চি রঙিন মিট্টি প্রস্তুতকারক";
        descriptionEn = "A traditional 8-inch Ganesh idol seated on his rat mount (mushak), hand-painted in vivid colours on natural clay. This mythologically significant design is popular among temple shops and religious stores. Wholesale bulk supply from Bardhaman, West Bengal.";
        descriptionBn = "প্রাকৃতিক মাটিতে উজ্জ্বল রঙে হাতে আঁকা ঐতিহ্যবাহী ৮ ইঞ্চি মূষিক বাহনে গণেশ মূর্তি। পৌরাণিকভাবে তাৎপর্যপূর্ণ এই ডিজাইনটি মন্দিরের দোকান ও ধর্মীয় প্রতিষ্ঠানে জনপ্রিয়। বর্ধমান, পশ্চিমবঙ্গ থেকে পাইকারি বাল্ক সরবরাহ।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Small Ganesh Clay Idol Set of 12 – 4 Inch Wholesale Pack Gift";
        nameBn = "ছোট গণেশ মাটির মূর্তির ১২ পিসের সেট – ৪ ইঞ্চি পাইকারি প্যাক গিফট";
        descriptionEn = "A wholesale pack of 12 miniature 4-inch Ganesh clay idols, ideal for bulk gifting, return gifts at weddings, and corporate events. Made from natural mitti in Bardhaman. Each piece is individually hand-finished. Best price for bulk orders across India.";
        descriptionBn = "পাইকারি ১২ পিসের ক্ষুদ্র ৪ ইঞ্চি গণেশ মাটির মূর্তির সেট, বাল্ক গিফটিং, বিয়েতে রিটার্ন গিফট ও কর্পোরেট ইভেন্টের জন্য আদর্শ। বর্ধমানে প্রাকৃতিক মিট্টি থেকে তৈরি। প্রতিটি টুকরো আলাদাভাবে হাতে ফিনিশ করা। সারা ভারতে বাল্ক অর্ডারে সেরা মূল্য।";
        category = #ganesh;
        sizes = ["4 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Tri-Coloured Ganesh Mitti Idol – 10 Inch Artistic Indian Festival Murti";
        nameBn = "ত্রি-বর্ণের গণেশ মিট্টি মূর্তি – ১০ ইঞ্চি শিল্পসম্মত ভারতীয় উৎসব মূর্তি";
        descriptionEn = "A striking 10-inch Ganesh idol painted in traditional saffron, white, and green colours representing the Indian tricolour. An artistic handmade ganesh murti from Bardhaman, perfect for national festivals and Republic Day celebrations. Wholesale rates available.";
        descriptionBn = "ভারতীয় তিরঙ্গার প্রতিনিধিত্বকারী ঐতিহ্যবাহী জাফরান, সাদা ও সবুজ রঙে আঁকা ১০ ইঞ্চি গণেশ মূর্তি। বর্ধমানের শিল্পসম্মত হাতে তৈরি গণেশ মূর্তি, জাতীয় উৎসব ও প্রজাতন্ত্র দিবস অনুষ্ঠানের জন্য আদর্শ। পাইকারি মূল্য উপলব্ধ।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Trishul Clay – 12 Inch Premium Hand-Painted Murti";
        nameBn = "ত্রিশূল সহ গণেশ মাটির মূর্তি – ১২ ইঞ্চি প্রিমিয়াম হাতে আঁকা মূর্তি";
        descriptionEn = "A premium 12-inch Ganesh clay idol holding a trishul, intricately hand-painted with gold and red detailing. This high-value handmade ganesh statue is perfect for premium retail stores and temple gift shops. Bulk orders accepted from all India.";
        descriptionBn = "সোনালি ও লাল বিস্তারিত কাজ সহ হাতে সূক্ষ্মভাবে আঁকা ত্রিশূল ধরা ১২ ইঞ্চি প্রিমিয়াম গণেশ মাটির মূর্তি। এই উচ্চ-মূল্যের হাতে তৈরি গণেশ মূর্তি প্রিমিয়াম রিটেইল স্টোর ও মন্দিরের গিফট শপের জন্য আদর্শ। সারা ভারত থেকে বাল্ক অর্ডার গ্রহণ করা হয়।";
        category = #ganesh;
        sizes = ["12 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Eco Clay Ganesh Idol for Immersion – 8 Inch Natural Mitti Visarjan";
        nameBn = "বিসর্জনের জন্য ইকো মাটির গণেশ মূর্তি – ৮ ইঞ্চি প্রাকৃতিক মিট্টি বিসর্জন";
        descriptionEn = "An 8-inch natural mitti Ganesh idol specially made for water immersion (visarjan), dissolving cleanly without polluting water bodies. Ideal for eco-friendly puja committees and Green Ganesh campaigns. Bulk orders from Bardhaman factory at wholesale prices.";
        descriptionBn = "জল বিসর্জনের জন্য বিশেষভাবে তৈরি ৮ ইঞ্চি প্রাকৃতিক মিট্টি গণেশ মূর্তি, জলাশয় দূষণ না করে পরিষ্কারভাবে দ্রবীভূত হয়। পরিবেশ-বান্ধব পুজো কমিটি ও গ্রিন গণেশ প্রচারণার জন্য আদর্শ। বর্ধমান কারখানা থেকে পাইকারি মূল্যে বাল্ক অর্ডার।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol Dhokra Style Clay – 6 Inch Tribal Art Mitti Murti";
        nameBn = "ধোকরা স্টাইল গণেশ মাটির মূর্তি – ৬ ইঞ্চি উপজাতীয় শিল্প মিট্টি মূর্তি";
        descriptionEn = "A distinctive 6-inch Ganesh clay idol inspired by Dhokra tribal art from West Bengal, with geometric patterns and earthy tones. A collector's piece for art galleries, craft stores, and cultural events. Wholesale supply from Bardhaman, West Bengal.";
        descriptionBn = "জ্যামিতিক নকশা ও মাটির রঙ সহ পশ্চিমবঙ্গের ধোকরা উপজাতীয় শিল্প থেকে অনুপ্রাণিত ৬ ইঞ্চি গণেশ মাটির মূর্তি। আর্ট গ্যালারি, ক্র্যাফট স্টোর ও সাংস্কৃতিক অনুষ্ঠানের জন্য একটি সংগ্রহযোগ্য মূর্তি। বর্ধমান, পশ্চিমবঙ্গ থেকে পাইকারি সরবরাহ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Lotus and Conch Clay – 10 Inch Puja Wholesale";
        nameBn = "পদ্ম ও শঙ্খ সহ গণেশ মাটির মূর্তি – ১০ ইঞ্চি পুজো পাইকারি";
        descriptionEn = "A spiritually rich 10-inch Ganesh clay idol holding both a lotus and conch shell, hand-painted with traditional Bengali motifs. Highly popular during auspicious puja occasions. Bulk order supply available at wholesale prices from Bardhaman.";
        descriptionBn = "ঐতিহ্যবাহী বাংলা নকশায় হাতে আঁকা পদ্ম ও শঙ্খ উভয় ধারণকারী আধ্যাত্মিকভাবে সমৃদ্ধ ১০ ইঞ্চি গণেশ মাটির মূর্তি। শুভ পুজো অনুষ্ঠানে অত্যন্ত জনপ্রিয়। বর্ধমান থেকে পাইকারি মূল্যে বাল্ক অর্ডার সরবরাহ উপলব্ধ।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Crown Clay – 1 Foot Painted Mukut Design";
        nameBn = "মুকুট সহ গণেশ মাটির মূর্তি – ১ ফুট রঙিন মুকুট ডিজাইন";
        descriptionEn = "A regal 1-foot Ganesh clay idol wearing an elaborately painted crown (mukut), adding grandeur to any puja setting. Crafted by experienced artisans in Bardhaman from premium clay. Suitable for wholesale buyers, retailers, and puja equipment stores.";
        descriptionBn = "বিস্তারিত রঙিন মুকুট পরা রাজকীয় ১ ফুট গণেশ মাটির মূর্তি, যেকোনো পুজোর পরিবেশে মহিমা যোগ করে। বর্ধমানে অভিজ্ঞ কারিগরদের দ্বারা প্রিমিয়াম মাটি থেকে তৈরি। পাইকারি ক্রেতা, রিটেইলার ও পুজো সরঞ্জামের দোকানের জন্য উপযুক্ত।";
        category = #ganesh;
        sizes = ["1 foot"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Baby Idol Clay – 5 Inch Cute Small Mitti Murti for Gift";
        nameBn = "গণেশ শিশু মূর্তি মাটির – ৫ ইঞ্চি ছোট মিট্টি মূর্তি গিফটের জন্য";
        descriptionEn = "An adorable 5-inch baby-style Ganesh clay idol with a cute expression and soft painting, perfect for return gifts and new baby celebrations. Lightweight and compact, manufactured in Bardhaman. Wholesale rates for bulk gifting orders across India.";
        descriptionBn = "মনোরম ভাব ও নরম রঙ সহ আদুরে ৫ ইঞ্চি শিশু-স্টাইলের গণেশ মাটির মূর্তি, রিটার্ন গিফট ও নতুন শিশু উদযাপনের জন্য আদর্শ। হালকা ও কমপ্যাক্ট, বর্ধমানে তৈরি। সারা ভারতে বাল্ক গিফটিং অর্ডারে পাইকারি মূল্য।";
        category = #ganesh;
        sizes = ["5 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol Meditating Clay – 12 Inch Peaceful Yoga Pose Mitti";
        nameBn = "ধ্যানরত গণেশ মাটির মূর্তি – ১২ ইঞ্চি শান্তিপূর্ণ যোগ ভঙ্গি মিট্টি";
        descriptionEn = "A serene 12-inch meditating Ganesh idol in peaceful yoga pose, crafted from natural clay with a matte finish. Ideal for meditation centres, yoga studios, wellness stores, and corporate gifting. Wholesale bulk supply available from Bardhaman, West Bengal.";
        descriptionBn = "প্রাকৃতিক মাটি থেকে ম্যাট ফিনিশে তৈরি শান্তিপূর্ণ যোগ ভঙ্গিতে ১২ ইঞ্চি প্রশান্ত ধ্যানরত গণেশ মূর্তি। মেডিটেশন সেন্টার, যোগ স্টুডিও, ওয়েলনেস স্টোর ও কর্পোরেট গিফটিংয়ের জন্য আদর্শ। বর্ধমান, পশ্চিমবঙ্গ থেকে পাইকারি বাল্ক সরবরাহ উপলব্ধ।";
        category = #ganesh;
        sizes = ["12 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Fruit Offering Clay – 8 Inch Prasad Style Murti";
        nameBn = "ফল নৈবেদ্য সহ গণেশ মাটির মূর্তি – ৮ ইঞ্চি প্রসাদ স্টাইল মূর্তি";
        descriptionEn = "A devotional 8-inch Ganesh clay idol depicting the deity receiving fruit offerings (prasad), hand-painted in warm tones. A beautiful choice for household puja rooms and small temples. Available wholesale from our Bardhaman factory with competitive bulk pricing.";
        descriptionBn = "উষ্ণ রঙে হাতে আঁকা ফল নৈবেদ্য গ্রহণরত দেবতার ৮ ইঞ্চি ভক্তিমূলক গণেশ মাটির মূর্তি। গৃহস্থালি পুজোর ঘর ও ছোট মন্দিরের জন্য সুন্দর পছন্দ। আমাদের বর্ধমান কারখানা থেকে প্রতিযোগিতামূলক বাল্ক মূল্যে পাইকারিতে উপলব্ধ।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Colourful Festival Ganesh Clay Idol – 6 Inch Bright Glossy Painted";
        nameBn = "বর্ণময় উৎসব গণেশ মাটির মূর্তি – ৬ ইঞ্চি উজ্জ্বল গ্লসি রঙিন";
        descriptionEn = "A bright and festive 6-inch Ganesh clay idol painted in multiple vibrant colours with glossy finish, designed to stand out during celebrations. Loved by retailers and gift shop owners across West Bengal. Wholesale and bulk orders available from Bardhaman.";
        descriptionBn = "গ্লসি ফিনিশে একাধিক প্রাণবন্ত রঙে আঁকা উজ্জ্বল ও উৎসবমুখর ৬ ইঞ্চি গণেশ মাটির মূর্তি, উদযাপনে আলাদা হয়ে দাঁড়াতে ডিজাইন করা হয়েছে। পশ্চিমবঙ্গের রিটেইলার ও গিফট শপ মালিকদের প্রিয়। বর্ধমান থেকে পাইকারি ও বাল্ক অর্ডার উপলব্ধ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Antique Gold Finish Ganesh Clay Idol – 10 Inch Vintage Mitti Design";
        nameBn = "অ্যান্টিক গোল্ড ফিনিশ গণেশ মাটির মূর্তি – ১০ ইঞ্চি ভিনটেজ মিট্টি ডিজাইন";
        descriptionEn = "A luxurious 10-inch Ganesh clay idol with antique gold finish, giving it a timeless vintage appearance. Crafted in Bardhaman from fine clay with skilled golden painting techniques. Highly popular with premium gift stores and wedding decoration suppliers.";
        descriptionBn = "অ্যান্টিক সোনালি ফিনিশ সহ বিলাসবহুল ১০ ইঞ্চি গণেশ মাটির মূর্তি, কালজয়ী ভিনটেজ চেহারা দেয়। দক্ষ সোনালি পেইন্টিং কৌশলে বর্ধমানে মৃদু মাটি থেকে তৈরি। প্রিমিয়াম গিফট স্টোর ও বিয়ের সজ্জা সরবরাহকারীদের মধ্যে অত্যন্ত জনপ্রিয়।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Peacock Feather Clay – 8 Inch Decorative Bengali Murti";
        nameBn = "ময়ূরের পালক সহ গণেশ মাটির মূর্তি – ৮ ইঞ্চি সজ্জামূলক বাংলা মূর্তি";
        descriptionEn = "A decorative 8-inch Ganesh clay idol adorned with peacock feathers, painted in vibrant blue and green tones. Unique to the Bengali craft tradition, this murti stands out in any puja collection. Wholesale orders accepted from retailers across India.";
        descriptionBn = "প্রাণবন্ত নীল ও সবুজ রঙে আঁকা ময়ূরের পালকে সজ্জিত ৮ ইঞ্চি সজ্জামূলক গণেশ মাটির মূর্তি। বাংলা কারুশিল্প ঐতিহ্যে অনন্য, এই মূর্তি যেকোনো পুজো কালেকশনে আলাদা হয়ে দাঁড়ায়। সারা ভারতে রিটেইলারদের কাছ থেকে পাইকারি অর্ডার গৃহীত।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Terracotta Style Ganesh Idol Clay – 6 Inch Unglazed Mitti Handicraft";
        nameBn = "টেরাকোটা স্টাইল গণেশ মাটির মূর্তি – ৬ ইঞ্চি আনগ্লেজড মিট্টি হস্তশিল্প";
        descriptionEn = "A 6-inch Ganesh idol in traditional terracotta style, with unglazed natural clay surface inspired by West Bengal's rich pottery heritage. Perfect for handicraft stores and art lovers. Wholesale quantities available at competitive prices from Bardhaman.";
        descriptionBn = "পশ্চিমবঙ্গের সমৃদ্ধ মৃৎশিল্প ঐতিহ্য থেকে অনুপ্রাণিত আনগ্লেজড প্রাকৃতিক মাটির পৃষ্ঠ সহ ঐতিহ্যবাহী টেরাকোটা স্টাইলে ৬ ইঞ্চি গণেশ মূর্তি। হস্তশিল্পের দোকান ও শিল্প প্রেমীদের জন্য আদর্শ। বর্ধমান থেকে প্রতিযোগিতামূলক মূল্যে পাইকারি পরিমাণ উপলব্ধ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol Writing Posture Clay – 10 Inch Vidhyarambh Special Murti";
        nameBn = "লেখার ভঙ্গিতে গণেশ মাটির মূর্তি – ১০ ইঞ্চি বিদ্যারম্ভ স্পেশাল মূর্তি";
        descriptionEn = "A spiritually significant 10-inch Ganesh clay idol in writing posture, specially created for Vidhyarambh ceremonies and new academic beginnings. Hand-painted in traditional colours from Bardhaman factory. Wholesale prices for schools, institutions, and bulk buyers.";
        descriptionBn = "বিদ্যারম্ভ অনুষ্ঠান ও নতুন শিক্ষা শুরুর জন্য বিশেষভাবে তৈরি লেখার ভঙ্গিতে আধ্যাত্মিকভাবে তাৎপর্যপূর্ণ ১০ ইঞ্চি গণেশ মাটির মূর্তি। বর্ধমান কারখানা থেকে ঐতিহ্যবাহী রঙে হাতে আঁকা। স্কুল, প্রতিষ্ঠান ও বাল্ক ক্রেতাদের জন্য পাইকারি মূল্য।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Lotus Pedestal Clay – 2 Foot Puja Pandal Murti";
        nameBn = "পদ্ম পাদপীঠে গণেশ মাটির মূর্তি – ২ ফুট পুজো প্যান্ডেল মূর্তি";
        descriptionEn = "A grand 2-foot Ganesh clay murti on an ornate lotus pedestal, handcrafted for puja pandals and community festivals. The vibrant hand-painted detailing makes it a centrepiece for any celebration. Bulk supply from Bardhaman to pandal organizers across India.";
        descriptionBn = "অলঙ্কৃত পদ্ম পাদপীঠে পুজো প্যান্ডেল ও সম্প্রদায়িক উৎসবের জন্য হাতে তৈরি ২ ফুট মহাকায় গণেশ মাটির মূর্তি। প্রাণবন্ত হাতে আঁকা বিস্তারিত কাজ এটিকে যেকোনো উদযাপনের কেন্দ্রবিন্দু করে তোলে। বর্ধমান থেকে সারা ভারতে প্যান্ডেল আয়োজকদের কাছে বাল্ক সরবরাহ।";
        category = #ganesh;
        sizes = ["2 foot"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol Wall Hanging Clay – 8 Inch Flat Back Bengali Decor";
        nameBn = "দেয়ালে ঝোলানো গণেশ মাটির মূর্তি – ৮ ইঞ্চি ফ্ল্যাট ব্যাক বাংলা ডেকোর";
        descriptionEn = "A unique 8-inch flat-back Ganesh clay idol designed for wall mounting, painted in rich Bengali folk art style. Perfect for home entrances, offices, and puja rooms. Wholesale orders available for interior decor shops and gift retailers from Bardhaman factory.";
        descriptionBn = "সমৃদ্ধ বাংলা লোকশিল্পের স্টাইলে আঁকা দেয়াল মাউন্টিংয়ের জন্য ডিজাইন করা অনন্য ৮ ইঞ্চি ফ্ল্যাট-ব্যাক গণেশ মাটির মূর্তি। গৃহের প্রবেশদ্বার, অফিস ও পুজোর ঘরের জন্য আদর্শ। বর্ধমান কারখানা থেকে ইন্টেরিয়র ডেকোর শপ ও গিফট রিটেইলারদের জন্য পাইকারি অর্ডার উপলব্ধ।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh with Shree Yantra Clay Idol – 6 Inch Vastu Puja Murti";
        nameBn = "শ্রী যন্ত্র সহ গণেশ মাটির মূর্তি – ৬ ইঞ্চি বাস্তু পুজো মূর্তি";
        descriptionEn = "A vastu-friendly 6-inch Ganesh clay idol combined with Shree Yantra symbol, designed for prosperity and positive energy. Ideal for office spaces, new home puja, and business openings. Wholesale bulk orders available from Bardhaman, West Bengal.";
        descriptionBn = "সমৃদ্ধি ও ইতিবাচক শক্তির জন্য শ্রী যন্ত্র চিহ্ন সহ বাস্তু-বান্ধব ৬ ইঞ্চি গণেশ মাটির মূর্তি। অফিস স্পেস, নতুন গৃহ পুজো ও ব্যবসায়িক উদ্বোধনের জন্য আদর্শ। বর্ধমান, পশ্চিমবঙ্গ থেকে পাইকারি বাল্ক অর্ডার উপলব্ধ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Clay Ganesh Idol with Kalash – 12 Inch Auspicious Mangalmurti Wholesale";
        nameBn = "কলশ সহ মাটির গণেশ মূর্তি – ১২ ইঞ্চি শুভ মঙ্গলমূর্তি পাইকারি";
        descriptionEn = "A 12-inch auspicious Ganesh murti holding a kalash, symbolizing abundance and prosperity. Hand-painted with gold and red motifs on natural clay from Bardhaman. Popular for Griha Pravesh ceremonies and business inaugurations. Bulk order pricing available.";
        descriptionBn = "প্রাচুর্য ও সমৃদ্ধির প্রতীকী কলশ ধারণকারী ১২ ইঞ্চি শুভ গণেশ মূর্তি। বর্ধমানের প্রাকৃতিক মাটিতে সোনালি ও লাল নকশায় হাতে আঁকা। গৃহ প্রবেশ অনুষ্ঠান ও ব্যবসায়িক উদ্বোধনে জনপ্রিয়। বাল্ক অর্ডার মূল্য নির্ধারণ উপলব্ধ।";
        category = #ganesh;
        sizes = ["12 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Navratri Special Ganesh Mitti Idol – 10 Inch Colourful Festival Murti";
        nameBn = "নবরাত্রি স্পেশাল গণেশ মিট্টি মূর্তি – ১০ ইঞ্চি বর্ণময় উৎসব মূর্তি";
        descriptionEn = "A colourful 10-inch Ganesh mitti idol created specially for Navratri and festival seasons, with bright multi-colour hand-painted detailing. Manufactured in Bardhaman for wholesale supply to festival organizers, decorators, and puja committees across India.";
        descriptionBn = "নবরাত্রি ও উৎসবের মৌসুমের জন্য বিশেষভাবে তৈরি উজ্জ্বল বহু-রঙের হাতে আঁকা বিস্তারিত কাজ সহ ১০ ইঞ্চি বর্ণময় গণেশ মিট্টি মূর্তি। সারা ভারতে উৎসব আয়োজক, ডেকোরেটর ও পুজো কমিটিতে পাইকারি সরবরাহের জন্য বর্ধমানে তৈরি।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Swan Clay – 8 Inch Unique Artistic Mitti Wholesale";
        nameBn = "রাজহাঁস সহ গণেশ মাটির মূর্তি – ৮ ইঞ্চি অনন্য শিল্পসম্মত মিট্টি পাইকারি";
        descriptionEn = "A unique 8-inch artistic Ganesh clay idol with a decorative swan companion, crafted in pure mitti with folk art painting. An exclusive design from Bardhaman artisans not commonly found elsewhere. Wholesale supply available for art stores and gift shops.";
        descriptionBn = "শুদ্ধ মিট্টিতে লোকশিল্পের পেইন্টিং সহ সজ্জামূলক রাজহাঁস সঙ্গী সহ অনন্য ৮ ইঞ্চি শিল্পসম্মত গণেশ মাটির মূর্তি। বর্ধমান কারিগরদের একচেটিয়া ডিজাইন যা অন্যত্র সহজে পাওয়া যায় না। আর্ট স্টোর ও গিফট শপের জন্য পাইকারি সরবরাহ উপলব্ধ।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Diwali Special Ganesh Clay Murti – 6 Inch Deepavali Puja Idol";
        nameBn = "দিওয়ালি স্পেশাল গণেশ মাটির মূর্তি – ৬ ইঞ্চি দীপাবলি পুজো আইডল";
        descriptionEn = "A 6-inch Diwali special Ganesh clay murti decorated with lamp and diya motifs, perfect for Deepavali celebrations. Available in large quantities at wholesale prices from Bardhaman for retailers, puja stores, and bulk buyers ahead of the Diwali season.";
        descriptionBn = "দীপাবলি উদযাপনের জন্য প্রদীপ ও দীয়ার নকশায় সজ্জিত ৬ ইঞ্চি দিওয়ালি স্পেশাল গণেশ মাটির মূর্তি। দিওয়ালি মৌসুমের আগে রিটেইলার, পুজো স্টোর ও বাল্ক ক্রেতাদের জন্য বর্ধমান থেকে পাইকারি মূল্যে বড় পরিমাণে উপলব্ধ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Sitar Clay – 8 Inch Classical Music Theme Mitti";
        nameBn = "সিতার সহ গণেশ মাটির মূর্তি – ৮ ইঞ্চি ক্লাসিক্যাল মিউজিক থিম মিট্টি";
        descriptionEn = "An elegant 8-inch Ganesh clay idol playing a sitar, celebrating India's classical music heritage. Hand-painted in rich saffron and gold tones. A must-have for music academies, cultural institutions, and gift shop collections. Wholesale pricing from Bardhaman.";
        descriptionBn = "ভারতের ধ্রুপদী সংগীত ঐতিহ্যের উদযাপনে সিতার বাজানো মার্জিত ৮ ইঞ্চি গণেশ মাটির মূর্তি। সমৃদ্ধ জাফরান ও সোনালি রঙে হাতে আঁকা। সংগীত একাডেমি, সাংস্কৃতিক প্রতিষ্ঠান ও গিফট শপের কালেকশনের জন্য অপরিহার্য। বর্ধমান থেকে পাইকারি মূল্য।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Palanquin Clay – 12 Inch Royal Procession Murti";
        nameBn = "পালকিতে গণেশ মাটির মূর্তি – ১২ ইঞ্চি রাজকীয় শোভাযাত্রা মূর্তি";
        descriptionEn = "A spectacular 12-inch Ganesh clay idol depicted riding a royal palanquin, hand-crafted with elaborate Bengali folk paintings. This statement piece is ideal for large puja exhibitions, cultural shows, and premium wholesale buyers. Manufactured in Bardhaman.";
        descriptionBn = "বিস্তারিত বাংলা লোকচিত্রে হাতে তৈরি রাজকীয় পালকিতে আরোহণরত দর্শনীয় ১২ ইঞ্চি গণেশ মাটির মূর্তি। এই স্টেটমেন্ট পিস বড় পুজো প্রদর্শনী, সাংস্কৃতিক শো ও প্রিমিয়াম পাইকারি ক্রেতাদের জন্য আদর্শ। বর্ধমানে তৈরি।";
        category = #ganesh;
        sizes = ["12 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol With Flowers Clay – 8 Inch Floral Painted Mitti Murti";
        nameBn = "ফুল সহ গণেশ মাটির মূর্তি – ৮ ইঞ্চি ফুলেল রঙিন মিট্টি মূর্তি";
        descriptionEn = "An 8-inch Ganesh clay idol surrounded by handpainted floral garlands and rose motifs, bringing natural beauty to puja settings. A favourite among florist shops, puja material retailers, and home decoration stores. Wholesale from Bardhaman, West Bengal.";
        descriptionBn = "প্রাকৃতিক সৌন্দর্য এনে পুজোর পরিবেশে হাতে আঁকা ফুলের মালা ও গোলাপের নকশায় ঘেরা ৮ ইঞ্চি গণেশ মাটির মূর্তি। ফুল বিক্রেতার দোকান, পুজো উপকরণ রিটেইলার ও হোম ডেকোরেশন স্টোরের পছন্দের। বর্ধমান, পশ্চিমবঙ্গ থেকে পাইকারি।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Large Ganesh Clay Idol Wholesale – 3 Foot Pandal Puja Festival Murti";
        nameBn = "বড় গণেশ মাটির মূর্তি পাইকারি – ৩ ফুট প্যান্ডেল পুজো উৎসব মূর্তি";
        descriptionEn = "A commanding 3-foot large Ganesh clay idol crafted for major puja pandals and community festivals. Painted by expert artisans in Bardhaman with traditional motifs. Perfect for large puja committees, temple trusts, and festival organizers. Bulk orders accepted.";
        descriptionBn = "বড় পুজো প্যান্ডেল ও সম্প্রদায়িক উৎসবের জন্য তৈরি আধিপত্যময় ৩ ফুট বড় গণেশ মাটির মূর্তি। ঐতিহ্যবাহী নকশায় বর্ধমানে বিশেষজ্ঞ কারিগরদের দ্বারা আঁকা। বড় পুজো কমিটি, মন্দির ট্রাস্ট ও উৎসব আয়োজকদের জন্য আদর্শ। বাল্ক অর্ডার গৃহীত।";
        category = #ganesh;
        sizes = ["3 foot"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol Natural Red Clay – 6 Inch Unpolished Mitti Murti Wholesale";
        nameBn = "প্রাকৃতিক লাল মাটির গণেশ মূর্তি – ৬ ইঞ্চি অপালিশড মিট্টি মূর্তি পাইকারি";
        descriptionEn = "A pure and authentic 6-inch Ganesh idol made from natural red clay with unpolished finish, preserving the raw earthy texture. Ideal for traditional households and purists who prefer natural mitti over painted idols. Wholesale supply from Bardhaman factory.";
        descriptionBn = "কাঁচা মাটির গঠন সংরক্ষণ করে অপালিশড ফিনিশ সহ প্রাকৃতিক লাল মাটি থেকে তৈরি বিশুদ্ধ ও খাঁটি ৬ ইঞ্চি গণেশ মূর্তি। রঙিন মূর্তির চেয়ে প্রাকৃতিক মিট্টি পছন্দকারী ঐতিহ্যবাহী পরিবার ও বিশুদ্ধবাদীদের জন্য আদর্শ। বর্ধমান কারখানা থেকে পাইকারি সরবরাহ।";
        category = #ganesh;
        sizes = ["6 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol with Nouka Clay – 8 Inch Boat Ride Design Bengali Festival";
        nameBn = "নৌকায় গণেশ মাটির মূর্তি – ৮ ইঞ্চি নৌকা ভ্রমণ ডিজাইন বাংলা উৎসব";
        descriptionEn = "A unique and festive 8-inch Ganesh clay idol depicted riding a traditional Bengali boat (nouka), celebrating Bengal's river culture. A collector's item for art lovers and cultural events. Wholesale orders for cultural stores and Bengal-themed gift shops from Bardhaman.";
        descriptionBn = "বাংলার নদী সংস্কৃতির উদযাপনে ঐতিহ্যবাহী বাংলা নৌকায় ভ্রমণরত অনন্য ও উৎসবমুখর ৮ ইঞ্চি গণেশ মাটির মূর্তি। শিল্প প্রেমী ও সাংস্কৃতিক অনুষ্ঠানের জন্য সংগ্রহযোগ্য। বর্ধমান থেকে সাংস্কৃতিক দোকান ও বাংলা-থিম গিফট শপের জন্য পাইকারি অর্ডার।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Clay Ganesh Idol Dual Colour – 10 Inch Red and Gold Wholesale Murti";
        nameBn = "দুই রঙের মাটির গণেশ মূর্তি – ১০ ইঞ্চি লাল ও সোনালি পাইকারি মূর্তি";
        descriptionEn = "A striking 10-inch Ganesh clay idol painted in contrasting red and gold — the most auspicious colour combination in Hindu tradition. Crafted in Bardhaman by skilled mitti artisans. Wholesale bulk supply for puja shops, temples, and distributors across West Bengal.";
        descriptionBn = "হিন্দু ঐতিহ্যে সবচেয়ে শুভ রঙের সমন্বয় বিপরীত লাল ও সোনালিতে আঁকা দর্শনীয় ১০ ইঞ্চি গণেশ মাটির মূর্তি। বর্ধমানে দক্ষ মিট্টি কারিগরদের দ্বারা তৈরি। পশ্চিমবঙ্গের পুজোর দোকান, মন্দির ও পরিবেশকদের জন্য পাইকারি বাল্ক সরবরাহ।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol Raised Trunk Clay – 12 Inch Good Luck Murti Wholesale";
        nameBn = "উত্থিত শুঁড়ের গণেশ মাটির মূর্তি – ১২ ইঞ্চি সৌভাগ্যের মূর্তি পাইকারি";
        descriptionEn = "A 12-inch Ganesh clay idol with raised trunk (Valampiri), believed to bring immense good luck and prosperity. Hand-painted with intricate patterns by master craftsmen in Bardhaman. High demand product for bulk orders by puja stores and retail chains across India.";
        descriptionBn = "অপার সৌভাগ্য ও সমৃদ্ধি আনতে বিশ্বাসী উত্থিত শুঁড় (ভালাম্পিরি) সহ ১২ ইঞ্চি গণেশ মাটির মূর্তি। বর্ধমানে দক্ষ কারিগরদের দ্বারা জটিল নকশায় হাতে আঁকা। সারা ভারতে পুজোর দোকান ও রিটেইল চেইনের বাল্ক অর্ডারে উচ্চ চাহিদার পণ্য।";
        category = #ganesh;
        sizes = ["12 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ganesh Idol Sitting Cross-Legged Clay – 10 Inch Om Symbol Mitti";
        nameBn = "পালতি দিয়ে বসা গণেশ মাটির মূর্তি – ১০ ইঞ্চি ওম প্রতীক মিট্টি";
        descriptionEn = "A spiritually powerful 10-inch Ganesh clay idol sitting cross-legged with the Om symbol on the chest, symbolizing cosmic consciousness. Made from fine mitti in Bardhaman. Ideal for meditation rooms, spiritual stores, and bulk puja kit suppliers across India.";
        descriptionBn = "মহাজাগতিক চেতনার প্রতীক বুকে ওম প্রতীক সহ পালতি দিয়ে বসা আধ্যাত্মিকভাবে শক্তিশালী ১০ ইঞ্চি গণেশ মাটির মূর্তি। বর্ধমানে মৃদু মিট্টি দিয়ে তৈরি। সারা ভারতে মেডিটেশন কক্ষ, আধ্যাত্মিক দোকান ও বাল্ক পুজো কিট সরবরাহকারীদের জন্য আদর্শ।";
        category = #ganesh;
        sizes = ["10 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
      {
        nameEn = "Ashta Vinayaka Ganesh Clay Idol Set – 8 Inch Eight-Form Mitti Collection";
        nameBn = "অষ্ট বিনায়ক গণেশ মাটির মূর্তির সেট – ৮ ইঞ্চি আট রূপের মিট্টি কালেকশন";
        descriptionEn = "A rare and complete set of 8-inch Ashta Vinayaka Ganesh clay idols depicting all eight divine forms, handcrafted from natural mitti in Bardhaman. This collector's edition set is perfect for temples, spiritual organizations, and premium gift packs. Wholesale pricing available.";
        descriptionBn = "বর্ধমানে প্রাকৃতিক মিট্টি থেকে হাতে তৈরি আটটি ঐশ্বরিক রূপ চিত্রিত বিরল ও সম্পূর্ণ ৮ ইঞ্চি অষ্ট বিনায়ক গণেশ মাটির মূর্তির সেট। এই কালেক্টর্স এডিশন সেট মন্দির, আধ্যাত্মিক সংগঠন ও প্রিমিয়াম গিফট প্যাকের জন্য আদর্শ। পাইকারি মূল্য উপলব্ধ।";
        category = #ganesh;
        sizes = ["8 inch"];
        priceRangeMin = 0;
        priceRangeMax = 0;
        bulkAvailable = true;
        imageIds = ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg/640px-Clay_images_of_God_Ganesh_on_display_at_a_Ganesh_Chaturthi_shop.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg/400px-Eco_friendly_Ganesha_-_An_eco_friendly_Ganesh_idol_made_of_clay.jpg"];
      },
    ];

    var currentId = nextProductId.value;
    for (input in seeds.values()) {
      let (_, newId) = ProductLib.add(products, currentId, input, now);
      currentId := newId;
    };
    nextProductId.value := currentId;
  };
};
