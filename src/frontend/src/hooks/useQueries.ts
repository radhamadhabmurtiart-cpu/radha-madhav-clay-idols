import type { InquiryFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";

// Backend submitInquiry mutation
// Note: Backend interface is minimal; inquiry submissions are handled via
// WhatsApp/phone for this B2B business. This hook scaffolds the pattern.
export function useSubmitInquiry() {
  return useMutation<void, Error, InquiryFormData>({
    mutationFn: async (_data: InquiryFormData) => {
      // WhatsApp-based inquiry flow — no backend submission required
      // for initial launch. Backend integration ready when needed.
      return Promise.resolve();
    },
  });
}
