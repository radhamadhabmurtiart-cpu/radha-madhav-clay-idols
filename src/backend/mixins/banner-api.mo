import Types "../types/banner";
import BannerLib "../lib/banner";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

mixin (
  bannerImages : { var value : [Types.BannerImage] },
  featuredProductIds : { var value : [Nat] },
  isOwner : (Principal) -> Bool,
  validateSession : (Text) -> Bool,
) {
  /// Returns all active banner images in display order.
  public query func getBannerImages() : async [Types.BannerImage] {
    Runtime.trap("not implemented");
  };

  /// Replaces the full banner image list. Owner-gated (caller principal OR session token).
  public func updateBannerImages(images : [Types.BannerImage], sessionToken : ?Text) : async { #ok; #err : Text } {
    Runtime.trap("not implemented");
  };

  /// Returns the list of featured product IDs.
  public query func getFeaturedProductIds() : async [Nat] {
    Runtime.trap("not implemented");
  };

  /// Replaces the featured product ID list. Owner-gated (caller principal OR session token).
  public func updateFeaturedProductIds(ids : [Nat], sessionToken : ?Text) : async { #ok; #err : Text } {
    Runtime.trap("not implemented");
  };
};
