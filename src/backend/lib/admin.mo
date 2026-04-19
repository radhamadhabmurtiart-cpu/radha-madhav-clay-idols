import Types "../types/admin";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

module {
  public type AdminSession = Types.AdminSession;

  let ADMIN_PHONE : Text = "6295466310";
  let ADMIN_PASSWORD : Text = "98516189@Paul";

  /// Validates credentials and returns a fresh token, or null on failure.
  public func login(
    sessions : Map.Map<Text, Int>,
    phone : Text,
    password : Text,
    now : Int,
  ) : ?Text {
    Runtime.trap("not implemented");
  };

  /// Returns true if the token is present in the sessions map.
  public func validate(sessions : Map.Map<Text, Int>, token : Text) : Bool {
    Runtime.trap("not implemented");
  };

  /// Removes the token from the sessions map.
  public func logout(sessions : Map.Map<Text, Int>, token : Text) {
    Runtime.trap("not implemented");
  };
};
