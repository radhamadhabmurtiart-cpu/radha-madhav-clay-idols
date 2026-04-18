import Types "../types/category";
import CategoryLib "../lib/category";
import Map "mo:core/Map";

mixin (
  categoryImages : Map.Map<Text, Text>,
  isOwner : (Principal) -> Bool,
) {
  public query func getCategoryImages() : async [Types.CategoryImage] {
    CategoryLib.getAll(categoryImages)
  };

  public query func getCategoryImage(slug : Text) : async ?Text {
    CategoryLib.getOne(categoryImages, slug)
  };

  public shared ({ caller }) func updateCategoryImage(slug : Text, imageUrl : Text) : async Bool {
    if (not isOwner(caller)) {
      return false;
    };
    CategoryLib.update(categoryImages, slug, imageUrl)
  };

  public query func getCategoryList() : async [Types.CategoryInfo] {
    CategoryLib.getAllCategoryInfo()
  };
};
