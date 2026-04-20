import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { ImageIcon, Loader2, UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  /** Currently stored file ID (from backend imageIds / imageUrl). Pass empty string if none. */
  fileId: string;
  /** Called with the new file ID after a successful upload, or "" when cleared. */
  onChange: (fileId: string) => void;
  /** Accessible label shown above the upload zone */
  label?: string;
  /** data-ocid for the root element */
  ocid?: string;
}

/** Resolves a stored fileId → display URL via backend getFileUrl */
async function resolveFileUrl(
  actor: ReturnType<typeof createActor>,
  fileId: string,
): Promise<string> {
  if (!fileId) return "";
  // If it's already a full URL (legacy data), return as-is
  if (fileId.startsWith("http://") || fileId.startsWith("https://")) {
    return fileId;
  }
  const url = await actor.getFileUrl(fileId);
  return url ?? "";
}

export function ImageUpload({
  fileId,
  onChange,
  label,
  ocid,
}: ImageUploadProps) {
  const { actor } = useActor(createActor);
  const inputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isResolving, setIsResolving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Resolve existing fileId → preview URL on mount or when fileId changes
  useEffect(() => {
    if (!fileId) {
      setPreviewUrl("");
      return;
    }
    if (!actor) return;

    let cancelled = false;
    setIsResolving(true);
    resolveFileUrl(actor, fileId)
      .then((url) => {
        if (!cancelled) setPreviewUrl(url);
      })
      .catch(() => {
        if (!cancelled) setPreviewUrl("");
      })
      .finally(() => {
        if (!cancelled) setIsResolving(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fileId, actor]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!actor) {
      toast.error("Not connected to backend. Please try again.");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, WebP, etc.)");
      return;
    }
    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const token = localStorage.getItem("adminSessionToken");
      const result = await actor.getUploadUrl(file.name, file.type, token);

      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }

      const { uploadUrl, fileId: newFileId } = result.ok;

      // PUT the file directly to the upload URL
      const putResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!putResponse.ok) {
        throw new Error(`Upload failed (${putResponse.status})`);
      }

      // Show local preview immediately
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      onChange(newFileId);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      // Reset so same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleClear() {
    setPreviewUrl("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  }

  const showLoading = isResolving || isUploading;

  return (
    <div className="space-y-2" data-ocid={ocid}>
      {label && <p className="text-xs font-medium text-foreground">{label}</p>}

      {/* Preview area */}
      <div className="relative w-full h-36 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
        {showLoading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 size={22} className="animate-spin" />
            <span className="text-xs">
              {isUploading ? "Uploading…" : "Loading…"}
            </span>
          </div>
        ) : previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Selected file preview"
              className="w-full h-full object-cover"
              onError={() => setPreviewUrl("")}
            />
            {/* Clear button */}
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Remove image"
              data-ocid={ocid ? `${ocid}-clear` : undefined}
            >
              <X size={12} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-muted-foreground/50">
            <ImageIcon size={28} />
            <span className="text-xs">No image selected</span>
          </div>
        )}
      </div>

      {/* Upload button */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 h-8 text-xs"
          disabled={showLoading}
          onClick={() => inputRef.current?.click()}
          data-ocid={ocid ? `${ocid}-upload-button` : undefined}
        >
          {isUploading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <UploadCloud size={12} />
          )}
          {isUploading ? "Uploading…" : "Choose Image"}
        </Button>
        {previewUrl && !showLoading && (
          <span className="text-xs text-muted-foreground">Image ready ✓</span>
        )}
      </div>

      <p className="text-xs text-muted-foreground">JPG, PNG, WebP — max 5 MB</p>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
