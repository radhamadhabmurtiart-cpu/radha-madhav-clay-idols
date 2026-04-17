import Types "../types/category";
import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  public type CategoryImage = Types.CategoryImage;

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
};
