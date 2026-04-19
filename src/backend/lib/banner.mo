import Types "../types/banner";

module {
  public type BannerImage = Types.BannerImage;

  let DEFAULT_BANNERS : [BannerImage] = [
    { id = "banner-1"; imageUrl = "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=1920&q=80"; title = ""; displayOrder = 0 },
    { id = "banner-2"; imageUrl = "https://images.unsplash.com/photo-1604607764660-e4d36706a1f9?w=1920&q=80"; title = ""; displayOrder = 1 },
    { id = "banner-3"; imageUrl = "https://images.unsplash.com/photo-1583364963890-adf7ea7c7297?w=1920&q=80"; title = ""; displayOrder = 2 },
    { id = "banner-4"; imageUrl = "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80"; title = ""; displayOrder = 3 },
    { id = "banner-5"; imageUrl = "https://images.unsplash.com/photo-1567603452239-8e09bef6a697?w=1920&q=80"; title = ""; displayOrder = 4 },
  ];

  /// Returns all stored banner images, initializing defaults if empty.
  public func getAll(bannerImages : [BannerImage]) : [BannerImage] {
    if (bannerImages.size() == 0) {
      DEFAULT_BANNERS;
    } else {
      bannerImages;
    };
  };

  /// Returns the provided images (caller stores them in state).
  public func setAll(images : [BannerImage]) : [BannerImage] {
    images;
  };

  /// Returns all stored featured product IDs.
  public func getFeatured(featuredProductIds : [Nat]) : [Nat] {
    featuredProductIds;
  };

  /// Returns the provided IDs (caller stores them in state).
  public func setFeatured(ids : [Nat]) : [Nat] {
    ids;
  };
};
