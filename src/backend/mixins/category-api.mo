import Types "../types/category";
import CategoryLib "../lib/category";
import Map "mo:core/Map";

mixin (
  categoryImages : Map.Map<Text, Text>,
  isOwner : (Principal) -> Bool,
  validateSession : (Text) -> Bool,
) {
  public query func getCategoryImages() : async [Types.CategoryImage] {
    CategoryLib.getAll(categoryImages)
  };

  public query func getCategoryImage(slug : Text) : async ?Text {
    CategoryLib.getOne(categoryImages, slug)
  };

  public shared ({ caller }) func updateCategoryImage(slug : Text, imageUrl : Text, sessionToken : ?Text) : async Bool {
    let authorized = isOwner(caller) or (
      switch (sessionToken) {
        case (?t) validateSession(t);
        case null false;
      }
    );
    if (not authorized) {
      return false;
    };
    CategoryLib.update(categoryImages, slug, imageUrl)
  };

  public query func getCategoryList() : async [Types.CategoryInfo] {
    CategoryLib.getAllCategoryInfo()
  };
};
