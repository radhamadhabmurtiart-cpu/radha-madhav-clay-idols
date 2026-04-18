module {
  public type ProductCategory = {
    #ganesh;
    #banglaLakshmiGanesh;
    #vishwakarma;
    #lakshmi;
    #diwaliLakshmiGanesh;
    #kali;
    #durga;
    #radhaKrishna;
    #kartik;
    #saraswati;
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
