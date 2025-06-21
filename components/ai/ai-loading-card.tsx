interface AILoadingCardProps {
  isOpen: boolean;
}

export function AILoadingCard({ isOpen }: AILoadingCardProps) {
  return (
    <div
      className={`fixed top-[20%] left-1/2 -translate-x-1/2 transform transition-opacity duration-300 ease-in-out z-40 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-background/95 border rounded-xl shadow-lg p-4 w-[90vw] max-w-lg relative mx-auto">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl -z-10 animate-pulse" />

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 bg-muted animate-pulse" />
            <div className="flex-1">
              <div className="h-6 w-2/3 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-muted rounded mt-2 animate-pulse" />
            </div>
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
          </div>
          <div className="pt-2 border-t">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
