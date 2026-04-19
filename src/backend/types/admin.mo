module {
  /// An active admin session token mapped to its creation timestamp.
  public type AdminSession = {
    token : Text;
    createdAt : Int;
  };
};
