import Types "../types/banner";
import BannerLib "../lib/banner";

mixin (
  bannerImages : { var value : [Types.BannerImage] },
  featuredProductIds : { var value : [Nat] },
  isOwner : (Principal) -> Bool,
  validateSession : (Text) -> Bool,
) {
  /// Returns all active banner images in display order.
  public query func getBannerImages() : async [Types.BannerImage] {
    BannerLib.getAll(bannerImages.value);
  };

  /// Replaces the full banner image list. Owner-gated (caller principal OR session token).
  public shared ({ caller }) func updateBannerImages(images : [Types.BannerImage], sessionToken : ?Text) : async { #ok; #err : Text } {
    let authorized = isOwner(caller) or (
      switch (sessionToken) {
        case (?t) validateSession(t);
        case null false;
      }
    );
    if (not authorized) {
      return #err("Unauthorized: admin access required");
    };
    bannerImages.value := BannerLib.setAll(images);
    #ok;
  };

  /// Returns the list of featured product IDs.
  public query func getFeaturedProductIds() : async [Nat] {
    BannerLib.getFeatured(featuredProductIds.value);
  };

  /// Replaces the featured product ID list. Owner-gated (caller principal OR session token).
  public shared ({ caller }) func updateFeaturedProductIds(ids : [Nat], sessionToken : ?Text) : async { #ok; #err : Text } {
    let authorized = isOwner(caller) or (
      switch (sessionToken) {
        case (?t) validateSession(t);
        case null false;
      }
    );
    if (not authorized) {
      return #err("Unauthorized: admin access required");
    };
    featuredProductIds.value := BannerLib.setFeatured(ids);
    #ok;
  };
};
