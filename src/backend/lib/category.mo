import Types "../types/category";
import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  public type CategoryImage = Types.CategoryImage;
  public type CategoryInfo = Types.CategoryInfo;

  let defaultSlugs : [Text] = [
    "bangla-lakshmi-ganesh-idol-hal-khata",
    "clay-ganesh-idol-wholesale",
    "clay-vishwakarma-idol",
    "clay-lakshmi-idol",
    "diwali-lakshmi-ganesh-idol",
    "clay-kali-idol",
    "small-durga-idol",
    "radha-krishna-clay-idol",
    "clay-kartik-idol",
    "clay-saraswati-idol",
    "custom-clay-idol",
  ];

  let categoryList : [CategoryInfo] = [
    { slug = "bangla-lakshmi-ganesh-idol-hal-khata"; nameEn = "Bangla Lakshmi Ganesh Idol (Hal Khata)"; nameBn = "বাংলা লক্ষ্মী গণেশ মূর্তি (হালখাতা)" },
    { slug = "clay-ganesh-idol-wholesale"; nameEn = "Clay Ganesh Idol (Wholesale)"; nameBn = "মাটির গণেশ মূর্তি পাইকারি" },
    { slug = "clay-vishwakarma-idol"; nameEn = "Clay Vishwakarma Idol"; nameBn = "মাটির বিশ্বকর্মা মূর্তি" },
    { slug = "clay-lakshmi-idol"; nameEn = "Clay Lakshmi Idol"; nameBn = "মাটির লক্ষ্মী মূর্তি" },
    { slug = "diwali-lakshmi-ganesh-idol"; nameEn = "Diwali Lakshmi Ganesh Idol"; nameBn = "দীপাবলি লক্ষ্মী গণেশ মূর্তি" },
    { slug = "clay-kali-idol"; nameEn = "Clay Kali Idol"; nameBn = "মাটির কালী মূর্তি" },
    { slug = "small-durga-idol"; nameEn = "Small Durga Idol"; nameBn = "ছোট দুর্গা মূর্তি" },
    { slug = "radha-krishna-clay-idol"; nameEn = "Radha Krishna Clay Idol"; nameBn = "রাধা কৃষ্ণ মাটির মূর্তি" },
    { slug = "clay-kartik-idol"; nameEn = "Clay Kartik Idol"; nameBn = "মাটির কার্তিক মূর্তি" },
    { slug = "clay-saraswati-idol"; nameEn = "Clay Saraswati Idol"; nameBn = "মাটির সরস্বতী মূর্তি" },
    { slug = "custom-clay-idol"; nameEn = "Custom Clay Idol"; nameBn = "কাস্টম মাটির মূর্তি" },
  ];

  public func initDefaults(store : Map.Map<Text, Text>) {
    for (slug in defaultSlugs.values()) {
      if (store.get(slug) == null) {
        store.add(slug, "");
      };
    };
  };

  public func getAll(store : Map.Map<Text, Text>) : [CategoryImage] {
    let entries = store.entries();
    var result : [CategoryImage] = [];
    for ((slug, imageUrl) in entries) {
      result := result.concat([{ slug; imageUrl }]);
    };
    result
  };

  public func getOne(store : Map.Map<Text, Text>, slug : Text) : ?Text {
    store.get(slug)
  };

  public func update(store : Map.Map<Text, Text>, slug : Text, imageUrl : Text) : Bool {
    // Only allow known slugs
    let isKnown = store.containsKey(slug);
    if (isKnown) {
      store.add(slug, imageUrl);
      true
    } else {
      false
    }
  };

  public func getAllCategoryInfo() : [CategoryInfo] {
    categoryList
  };
};
