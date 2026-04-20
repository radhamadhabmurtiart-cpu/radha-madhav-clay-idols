import Types "../types/inquiry";
import InquiryLib "../lib/inquiry";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  inquiries : List.List<Types.InquiryRecord>,
  nextInquiryId : { var value : Nat },
  visitorProfiles : Map.Map<Principal, Types.VisitorProfile>,
  isOwner : (Principal) -> Bool,
  validateSession : (Text) -> Bool,
) {
  public func submitInquiry(
    name : Text,
    phone : Text,
    productInterest : Text,
    message : Text,
  ) : async { #ok : Text; #err : Text } {
    if (name.size() == 0) {
      return #err("Name is required");
    };
    if (phone.size() == 0) {
      return #err("Phone number is required");
    };
    if (productInterest.size() == 0) {
      return #err("Product interest is required");
    };
    let (_, newId) = InquiryLib.submit(
      inquiries,
      nextInquiryId.value,
      name,
      phone,
      productInterest,
      message,
    );
    nextInquiryId.value := newId;
    #ok("Inquiry submitted successfully");
  };

  public shared ({ caller }) func getInquiries(sessionToken : ?Text) : async { #ok : [Types.InquiryRecord]; #err : Text } {
    let authorized = isOwner(caller) or (
      switch (sessionToken) {
        case (?t) validateSession(t);
        case null false;
      }
    );
    if (not authorized) {
      return #err("Unauthorized");
    };
    #ok(InquiryLib.list(inquiries));
  };

  /// Register a visitor with their name and phone. Keyed by caller Principal.
  /// Can be called by any authenticated (non-anonymous) user.
  public shared ({ caller }) func registerVisitor(
    name : Text,
    phone : Text,
  ) : async { #ok : Types.VisitorProfile; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to register");
    };
    if (name.size() == 0) {
      return #err("Name is required");
    };
    if (phone.size() == 0) {
      return #err("Phone number is required");
    };
    let profile = InquiryLib.register(visitorProfiles, caller, name, phone);
    #ok(profile);
  };

  /// Returns the profile of the calling visitor (name, phone).
  public shared query ({ caller }) func getMyProfile() : async { #ok : Types.VisitorProfile; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in");
    };
    switch (InquiryLib.getProfile(visitorProfiles, caller)) {
      case (?profile) { #ok(profile) };
      case null { #err("Profile not found") };
    };
  };

  /// Owner-only: returns all registered visitor profiles for sales follow-up.
  public shared ({ caller }) func getVisitors(sessionToken : ?Text) : async { #ok : [Types.VisitorProfile]; #err : Text } {
    let authorized = isOwner(caller) or (
      switch (sessionToken) {
        case (?t) validateSession(t);
        case null false;
      }
    );
    if (not authorized) {
      return #err("Unauthorized");
    };
    #ok(InquiryLib.listProfiles(visitorProfiles));
  };
};
