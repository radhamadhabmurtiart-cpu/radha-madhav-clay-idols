import Types "../types/product";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";

module {
  public type Product = Types.Product;
  public type ProductCategory = Types.ProductCategory;
  public type AddProductInput = Types.AddProductInput;
  public type UpdateProductInput = Types.UpdateProductInput;

  public func add(
    products : List.List<Product>,
    nextId : Nat,
    input : AddProductInput,
    now : Int,
  ) : (Product, Nat) {
    let product : Product = {
      id = nextId;
      nameEn = input.nameEn;
      nameBn = input.nameBn;
      descriptionEn = input.descriptionEn;
      descriptionBn = input.descriptionBn;
      category = input.category;
      sizes = input.sizes;
      priceRangeMin = input.priceRangeMin;
      priceRangeMax = input.priceRangeMax;
      bulkAvailable = input.bulkAvailable;
      imageIds = input.imageIds;
      createdAt = now;
      updatedAt = now;
    };
    products.add(product);
    (product, nextId + 1)
  };

  public func update(
    products : List.List<Product>,
    input : UpdateProductInput,
    now : Int,
  ) : ?Product {
    var found : ?Product = null;
    products.mapInPlace(
      func(p) {
        if (p.id == input.id) {
          let updated : Product = {
            id = p.id;
            nameEn = input.nameEn;
            nameBn = input.nameBn;
            descriptionEn = input.descriptionEn;
            descriptionBn = input.descriptionBn;
            category = input.category;
            sizes = input.sizes;
            priceRangeMin = input.priceRangeMin;
            priceRangeMax = input.priceRangeMax;
            bulkAvailable = input.bulkAvailable;
            imageIds = input.imageIds;
            createdAt = p.createdAt;
            updatedAt = now;
          };
          found := ?updated;
          updated
        } else { p }
      }
    );
    found
  };

  public func delete(
    products : List.List<Product>,
    id : Nat,
  ) : Bool {
    let sizeBefore = products.size();
    let filtered = products.filter(func(p) { p.id != id });
    products.clear();
    products.append(filtered);
    products.size() < sizeBefore
  };

  public func getAll(products : List.List<Product>) : [Product] {
    let arr = products.toArray();
    arr.sort(func(a : Product, b : Product) : Order.Order = Nat.compare(a.id, b.id))
  };

  public func getById(products : List.List<Product>, id : Nat) : ?Product {
    products.find(func(p) { p.id == id })
  };
};
