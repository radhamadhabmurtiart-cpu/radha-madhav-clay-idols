import Types "../types/admin";
import Map "mo:core/Map";

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
    if (phone != ADMIN_PHONE or password != ADMIN_PASSWORD) {
      return null;
    };
    // Generate a unique token from the current timestamp
    let token = "admin-" # now.toText();
    sessions.add(token, now);
    ?token;
  };

  /// Returns true if the token is present in the sessions map.
  public func validate(sessions : Map.Map<Text, Int>, token : Text) : Bool {
    sessions.containsKey(token);
  };

  /// Removes the token from the sessions map.
  public func logout(sessions : Map.Map<Text, Int>, token : Text) {
    sessions.remove(token);
  };
};
