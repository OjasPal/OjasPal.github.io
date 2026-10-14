import { useState, useCallback } from "react";

export function useCopyToClipboard(resetDelay = 2500) {
  const [copied, setCopied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setFeedback("Copied to clipboard");
        } else {
          // Fallback using textarea selection
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          textArea.style.top = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textArea);

          if (successful) {
            setCopied(true);
            setFeedback("Copied to clipboard");
          } else {
            setFeedback("Failed to copy. Please copy manually.");
          }
        }

        setTimeout(() => {
          setCopied(false);
          setFeedback("");
        }, resetDelay);
      } catch (err) {
        console.error("Clipboard copy error:", err);
        setFeedback("Failed to copy. Please copy manually.");
        setTimeout(() => setFeedback(""), resetDelay);
      }
    },
    [resetDelay]
  );

  return { copied, copy, feedback };
}
