import Types "../types/product";
import ProductLib "../lib/product";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  products : List.List<Types.Product>,
  nextProductId : { var value : Nat },
  isOwner : (Principal) -> Bool,
  validateSession : (Text) -> Bool,
) {
  public shared ({ caller }) func addProduct(input : Types.AddProductInput, sessionToken : ?Text) : async { #ok : Types.Product; #err : Text } {
    let authorized = isOwner(caller) or (
      switch (sessionToken) {
        case (?t) validateSession(t);
        case null false;
      }
    );
    if (not authorized) {
      return #err("Unauthorized");
    };
    let now = Time.now();
    let (product, newId) = ProductLib.add(products, nextProductId.value, input, now);
    nextProductId.value := newId;
    #ok(product)
  };

  public shared ({ caller }) func updateProduct(input : Types.UpdateProductInput, sessionToken : ?Text) : async { #ok : Types.Product; #err : Text } {
    let authorized = isOwner(caller) or (
      switch (sessionToken) {
        case (?t) validateSession(t);
        case null false;
      }
    );
    if (not authorized) {
      return #err("Unauthorized");
    };
    let now = Time.now();
    switch (ProductLib.update(products, input, now)) {
      case (?updated) { #ok(updated) };
      case null { #err("Product not found") };
    }
  };

  public shared ({ caller }) func deleteProduct(id : Nat, sessionToken : ?Text) : async { #ok; #err : Text } {
    let authorized = isOwner(caller) or (
      switch (sessionToken) {
        case (?t) validateSession(t);
        case null false;
      }
    );
    if (not authorized) {
      return #err("Unauthorized");
    };
    if (ProductLib.delete(products, id)) { #ok }
    else { #err("Product not found") }
  };

  public query func getProducts() : async [Types.Product] {
    ProductLib.getAll(products)
  };

  public query func getProduct(id : Nat) : async ?Types.Product {
    ProductLib.getById(products, id)
  };

  public query func getProductsByCategory(slug : Text) : async [Types.Product] {
    ProductLib.getBySlug(products, slug)
  };
};
