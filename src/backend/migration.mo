import NewProductTypes "types/product";
import InquiryTypes "types/inquiry";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  // Old ProductCategory — 6 variants including #hanuman
  type OldProductCategory = {
    #ganesh;
    #lakshmi;
    #durga;
    #saraswati;
    #hanuman;
    #custom;
  };

  // Old Product — uses OldProductCategory
  type OldProduct = {
    id : Nat;
    nameBn : Text;
    nameEn : Text;
    category : OldProductCategory;
    sizes : [Text];
    priceRangeMin : Nat;
    priceRangeMax : Nat;
    descriptionBn : Text;
    descriptionEn : Text;
    bulkAvailable : Bool;
    imageIds : [Text];
    createdAt : Int;
    updatedAt : Int;
  };

  type OldActor = {
    inquiries : List.List<InquiryTypes.InquiryRecord>;
    nextInquiryId : { var value : Nat };
    visitorProfiles : Map.Map<Principal, InquiryTypes.VisitorProfile>;
    products : List.List<OldProduct>;
    nextProductId : { var value : Nat };
    categoryImages : Map.Map<Text, Text>;
  };

  type NewActor = {
    inquiries : List.List<InquiryTypes.InquiryRecord>;
    nextInquiryId : { var value : Nat };
    visitorProfiles : Map.Map<Principal, InquiryTypes.VisitorProfile>;
    products : List.List<NewProductTypes.Product>;
    nextProductId : { var value : Nat };
    categoryImages : Map.Map<Text, Text>;
  };

  func migrateCategory(old : OldProductCategory) : NewProductTypes.ProductCategory {
    switch (old) {
      case (#ganesh) { #ganesh };
      case (#lakshmi) { #lakshmi };
      case (#durga) { #durga };
      case (#saraswati) { #saraswati };
      case (#hanuman) { #custom }; // #hanuman removed — map to #custom
      case (#custom) { #custom };
    };
  };

  func migrateProduct(old : OldProduct) : NewProductTypes.Product {
    {
      old with
      category = migrateCategory(old.category);
    }
  };

  public func run(old : OldActor) : NewActor {
    let products = old.products.map<OldProduct, NewProductTypes.Product>(
      func(p) { migrateProduct(p) }
    );
    {
      inquiries = old.inquiries;
      nextInquiryId = old.nextInquiryId;
      visitorProfiles = old.visitorProfiles;
      products;
      nextProductId = old.nextProductId;
      categoryImages = old.categoryImages;
    }
  };
};
