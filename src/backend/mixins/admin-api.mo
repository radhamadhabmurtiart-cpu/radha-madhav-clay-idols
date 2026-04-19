import AdminLib "../lib/admin";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  adminSessions : Map.Map<Text, Int>,
  isOwner : (Principal) -> Bool,
) {
  /// Validates hardcoded phone+password credentials.
  /// Returns a session token on success, error text on failure.
  public func adminLogin(phone : Text, password : Text) : async { #ok : Text; #err : Text } {
    let now = Time.now();
    switch (AdminLib.login(adminSessions, phone, password, now)) {
      case (?token) { #ok(token) };
      case null { #err("Invalid phone number or password") };
    };
  };

  /// Returns true if the supplied token is a valid active session.
  public query func validateAdminSession(token : Text) : async Bool {
    AdminLib.validate(adminSessions, token);
  };

  /// Removes a session token, effectively logging out.
  public func adminLogout(token : Text) : async () {
    AdminLib.logout(adminSessions, token);
  };
};
