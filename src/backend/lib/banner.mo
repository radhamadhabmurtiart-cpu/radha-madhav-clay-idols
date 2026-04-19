import Types "../types/banner";
import Runtime "mo:core/Runtime";

module {
  public type BannerImage = Types.BannerImage;

  /// Returns all stored banner images.
  public func getAll(bannerImages : [BannerImage]) : [BannerImage] {
    Runtime.trap("not implemented");
  };

  /// Replaces banner image list with the provided array.
  public func setAll(images : [BannerImage]) : [BannerImage] {
    Runtime.trap("not implemented");
  };

  /// Returns all stored featured product IDs.
  public func getFeatured(featuredProductIds : [Nat]) : [Nat] {
    Runtime.trap("not implemented");
  };

  /// Replaces featured product ID list with the provided array.
  public func setFeatured(ids : [Nat]) : [Nat] {
    Runtime.trap("not implemented");
  };
};
