module {
  public type ProductCategory = {
    #ganesh;
    #lakshmi;
    #durga;
    #saraswati;
    #hanuman;
    #custom;
  };

  public type Product = {
    id : Nat;
    nameBn : Text;
    nameEn : Text;
    category : ProductCategory;
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

  public type AddProductInput = {
    nameBn : Text;
    nameEn : Text;
    category : ProductCategory;
    sizes : [Text];
    priceRangeMin : Nat;
    priceRangeMax : Nat;
    descriptionBn : Text;
    descriptionEn : Text;
    bulkAvailable : Bool;
    imageIds : [Text];
  };

  public type UpdateProductInput = {
    id : Nat;
    nameBn : Text;
    nameEn : Text;
    category : ProductCategory;
    sizes : [Text];
    priceRangeMin : Nat;
    priceRangeMax : Nat;
    descriptionBn : Text;
    descriptionEn : Text;
    bulkAvailable : Bool;
    imageIds : [Text];
  };
};
