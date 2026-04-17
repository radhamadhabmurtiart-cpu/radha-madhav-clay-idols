import Types "../types/inquiry";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

module {
  public type InquiryRecord = Types.InquiryRecord;
  public type VisitorProfile = Types.VisitorProfile;

  public func submit(
    inquiries : List.List<InquiryRecord>,
    nextId : Nat,
    name : Text,
    phone : Text,
    productInterest : Text,
    message : Text,
  ) : (InquiryRecord, Nat) {
    let record : InquiryRecord = {
      id = nextId;
      name = name;
      phone = phone;
      productInterest = productInterest;
      message = message;
      timestamp = Time.now();
    };
    inquiries.add(record);
    (record, nextId + 1);
  };

  public func list(inquiries : List.List<InquiryRecord>) : [InquiryRecord] {
    inquiries.toArray();
  };

  public func register(
    profiles : Map.Map<Principal, VisitorProfile>,
    caller : Principal,
    name : Text,
    phone : Text,
  ) : VisitorProfile {
    let profile : VisitorProfile = {
      principal = caller.toText();
      name = name;
      phone = phone;
      registeredAt = Time.now();
    };
    profiles.add(caller, profile);
    profile;
  };

  public func getProfile(
    profiles : Map.Map<Principal, VisitorProfile>,
    caller : Principal,
  ) : ?VisitorProfile {
    profiles.get(caller);
  };

  public func listProfiles(profiles : Map.Map<Principal, VisitorProfile>) : [VisitorProfile] {
    profiles.values().toArray();
  };
};
