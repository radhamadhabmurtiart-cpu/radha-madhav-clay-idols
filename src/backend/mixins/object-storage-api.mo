import Runtime "mo:core/Runtime";

/// Exposes object-storage file upload and retrieval endpoints.
/// The caffeineai-object-storage package provides the core mixin;
/// this module re-exports any app-specific wrappers if needed.
///
/// Frontend upload flow:
///   1. Call `getUploadUrl(filename, contentType)` → get a pre-signed upload URL + fileId
///   2. PUT the file bytes directly to the returned URL
///   3. Store the returned fileId in product.imageIds / bannerImage.imageUrl / categoryImages
///
/// Frontend retrieval flow:
///   1. Call `getFileUrl(fileId)` → get the public URL to display the image

mixin (
  isOwner : (Principal) -> Bool,
  validateSession : (Text) -> Bool,
) {
  /// Returns a pre-signed upload URL and a stable file ID for a new file.
  /// The caller must PUT the file bytes to the returned uploadUrl.
  /// Store the returned fileId wherever image references are kept.
  public shared ({ caller }) func getUploadUrl(
    filename : Text,
    contentType : Text,
    sessionToken : ?Text,
  ) : async { #ok : { uploadUrl : Text; fileId : Text }; #err : Text } {
    Runtime.trap("not implemented");
  };

  /// Returns the public URL for a previously uploaded file by its ID.
  public query func getFileUrl(fileId : Text) : async ?Text {
    Runtime.trap("not implemented");
  };

  /// Deletes an uploaded file by its ID. Owner-only.
  public shared ({ caller }) func deleteFile(
    fileId : Text,
    sessionToken : ?Text,
  ) : async { #ok; #err : Text } {
    Runtime.trap("not implemented");
  };
};
