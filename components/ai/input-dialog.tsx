import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { KeyboardEvent } from "react";

interface AIInputDialogProps {
  isOpen: boolean;
  aiQuery: string;
  isLoading: boolean;
  onQueryChange: (query: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function AIInputDialog({
  isOpen,
  aiQuery,
  isLoading,
  onQueryChange,
  onSubmit,
  onClose,
}: AIInputDialogProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.ctrlKey) {
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        const newValue =
          value.substring(0, start) + "\n" + value.substring(end);
        onQueryChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);

        e.preventDefault();
      } else {
        e.preventDefault();
        if (!isLoading) {
          onSubmit();
        }
      }
    }
  };

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 transform transition-all duration-300 ease-in-out z-40 ${
        isOpen
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="bg-background/95 border rounded-xl shadow-lg p-2.5 flex flex-col gap-2 w-[90vw] max-w-lg mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl -z-10 animate-pulse" />

        <Textarea
          value={aiQuery}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me your situation and I will find the best fellowships..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none bg-transparent min-h-[50px]"
          autoFocus
          disabled={isLoading}
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 hover:bg-gray-100/10"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="shrink-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Finding Fellowships...
              </div>
            ) : (
              "Find Fellowships"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
