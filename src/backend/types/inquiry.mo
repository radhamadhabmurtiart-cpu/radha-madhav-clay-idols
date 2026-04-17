module {
  public type InquiryRecord = {
    id : Nat;
    name : Text;
    phone : Text;
    productInterest : Text;
    message : Text;
    timestamp : Int;
  };

  public type VisitorProfile = {
    principal : Text;
    name : Text;
    phone : Text;
    registeredAt : Int;
  };
};
