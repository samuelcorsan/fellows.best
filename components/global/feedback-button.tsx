"use client";

import { useState } from "react";
import { FileText, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { SignInDialog } from "@/components/global/sign-in-dialog";
import { toast } from "sonner";

interface FeedbackButtonProps {
  section: "home" | "browse" | "opportunity" | "general";
  opportunityId?: string;
  variant?: "floating" | "inline" | "button";
  className?: string;
}

export function FeedbackButton({
  section,
  opportunityId,
  variant = "floating",
  className,
}: FeedbackButtonProps) {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For opportunity feedback onboarding
  const isOpportunity = section === "opportunity" && opportunityId;
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState("");

  const issues = [
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
    { id: "eligibility", label: "Eligibility" },
    { id: "dates", label: "Dates" },
    { id: "others", label: "Others" },
  ];

  const handleClick = () => {
    if (!session) {
      setIsSignInOpen(true);
      return;
    }
    setIsOpen(true);
    // Reset state when opening
    if (isOpportunity) {
      setStep(1);
      setSelectedIssues([]);
      setSuggestion("");
    } else {
      setMessage("");
    }
  };

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleNext = () => {
    if (selectedIssues.length === 0) {
      toast.error("Please select at least one issue");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (isOpportunity) {
      // Opportunity feedback flow
      if (step === 1) {
        handleNext();
        return;
      }

      if (!suggestion.trim()) {
        toast.error("Please tell us what you would change");
        return;
      }

      if (suggestion.trim().length > 2000) {
        toast.error("Suggestion is too long (max 2000 characters)");
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Issues: ${selectedIssues.join(", ")}\n\nWhat I would change: ${suggestion.trim()}`,
            section,
            opportunity_id: opportunityId,
            issues: selectedIssues,
            suggestion: suggestion.trim(),
          }),
        });

        if (response.ok) {
          toast.success("Thank you for your feedback!");
          setIsOpen(false);
          setStep(1);
          setSelectedIssues([]);
          setSuggestion("");
        } else {
          const errorData = await response.json().catch(() => ({}));
          toast.error(errorData.error || "Failed to submit feedback");
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        toast.error("Failed to submit feedback. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Regular feedback flow
      if (!message.trim()) {
        toast.error("Please enter your feedback");
        return;
      }

      if (message.trim().length > 2000) {
        toast.error("Feedback is too long (max 2000 characters)");
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message.trim(),
            section,
            opportunity_id: opportunityId,
          }),
        });

        if (response.ok) {
          toast.success("Thank you for your feedback!");
          setMessage("");
          setIsOpen(false);
        } else {
          const errorData = await response.json().catch(() => ({}));
          toast.error(errorData.error || "Failed to submit feedback");
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        toast.error("Failed to submit feedback. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (variant === "floating") {
    return (
      <>
        <Button
          onClick={handleClick}
          className={`fixed bottom-6 right-6 z-50 h-auto px-4 py-3 rounded-full shadow-lg flex items-center gap-2 ${className || ""}`}
          aria-label="Share feedback"
        >
          <FileText className="h-5 w-5" />
          <span className="text-sm font-medium">Send Feedback</span>
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className={isOpportunity ? "max-w-lg" : ""}>
            {isOpportunity ? (
              // Opportunity feedback onboarding flow
              <>
                <DialogHeader>
                  <DialogTitle>
                    {step === 1 ? "What's wrong?" : "What would you change?"}
                  </DialogTitle>
                  <DialogDescription>
                    {step === 1
                      ? "Select what needs to be improved in this opportunity"
                      : "Tell us how you would improve it"}
                  </DialogDescription>
                </DialogHeader>
                {step === 1 ? (
                  <div className="space-y-4 py-4">
                    <div className="space-y-3">
                      {issues.map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => handleIssueToggle(issue.id)}
                        >
                          <Checkbox
                            id={issue.id}
                            checked={selectedIssues.includes(issue.id)}
                            onCheckedChange={() => handleIssueToggle(issue.id)}
                          />
                          <Label
                            htmlFor={issue.id}
                            className="text-sm font-medium cursor-pointer flex-1"
                          >
                            {issue.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    <Textarea
                      placeholder="Describe what you would change and how..."
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      rows={6}
                      maxLength={2000}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {suggestion.length}/2000 characters
                    </p>
                  </div>
                )}
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      setStep(1);
                      setSelectedIssues([]);
                      setSuggestion("");
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  {step === 1 ? (
                    <Button onClick={handleNext} disabled={selectedIssues.length === 0}>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={isSubmitting}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  )}
                </DialogFooter>
              </>
            ) : (
              // Regular feedback flow
              <>
                <DialogHeader>
                  <DialogTitle>Share your feedback</DialogTitle>
                  <DialogDescription>
                    Help us improve by sharing your thoughts and suggestions.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Textarea
                    placeholder="What would you like to share with us?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    maxLength={2000}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {message.length}/2000 characters
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
        <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
      </>
    );
  }

  if (variant === "inline") {
    return (
      <>
        <Button
          onClick={handleClick}
          variant="outline"
          className={className}
        >
          <FileText className="mr-2 h-4 w-4" />
          Send Feedback
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className={isOpportunity ? "max-w-lg" : ""}>
            {isOpportunity ? (
              // Opportunity feedback onboarding flow
              <>
                <DialogHeader>
                  <DialogTitle>
                    {step === 1 ? "What's wrong?" : "What would you change?"}
                  </DialogTitle>
                  <DialogDescription>
                    {step === 1
                      ? "Select what needs to be improved in this opportunity"
                      : "Tell us how you would improve it"}
                  </DialogDescription>
                </DialogHeader>
                {step === 1 ? (
                  <div className="space-y-4 py-4">
                    <div className="space-y-3">
                      {issues.map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => handleIssueToggle(issue.id)}
                        >
                          <Checkbox
                            id={issue.id}
                            checked={selectedIssues.includes(issue.id)}
                            onCheckedChange={() => handleIssueToggle(issue.id)}
                          />
                          <Label
                            htmlFor={issue.id}
                            className="text-sm font-medium cursor-pointer flex-1"
                          >
                            {issue.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    <Textarea
                      placeholder="Describe what you would change and how..."
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      rows={6}
                      maxLength={2000}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {suggestion.length}/2000 characters
                    </p>
                  </div>
                )}
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      setStep(1);
                      setSelectedIssues([]);
                      setSuggestion("");
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  {step === 1 ? (
                    <Button onClick={handleNext} disabled={selectedIssues.length === 0}>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={isSubmitting}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  )}
                </DialogFooter>
              </>
            ) : (
              // Regular feedback flow
              <>
                <DialogHeader>
                  <DialogTitle>Share your feedback</DialogTitle>
                  <DialogDescription>
                    Help us improve by sharing your thoughts and suggestions.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Textarea
                    placeholder="What would you like to share with us?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    maxLength={2000}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {message.length}/2000 characters
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
        <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
      </>
    );
  }

  // button variant
  return (
    <>
      <Button onClick={handleClick} className={className}>
        <FileText className="mr-2 h-4 w-4" />
        Send Feedback
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={isOpportunity ? "max-w-md" : ""}>
          {isOpportunity ? (
            // Opportunity feedback onboarding flow
            <>
              <DialogHeader>
                <DialogTitle>
                  {step === 1 ? "What's wrong?" : "What would you change?"}
                </DialogTitle>
                <DialogDescription>
                  {step === 1
                    ? "Select what needs to be improved in this opportunity"
                    : "Tell us how you would improve it"}
                </DialogDescription>
              </DialogHeader>
              {step === 1 ? (
                <div className="space-y-4 py-4">
                  <div className="space-y-3">
                    {issues.map((issue) => (
                      <div
                        key={issue.id}
                        className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleIssueToggle(issue.id)}
                      >
                        <Checkbox
                          id={issue.id}
                          checked={selectedIssues.includes(issue.id)}
                          onCheckedChange={() => handleIssueToggle(issue.id)}
                        />
                        <Label
                          htmlFor={issue.id}
                          className="text-sm font-medium cursor-pointer flex-1"
                        >
                          {issue.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <Textarea
                    placeholder="Describe what you would change and how..."
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    rows={6}
                    maxLength={2000}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {suggestion.length}/2000 characters
                  </p>
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    setStep(1);
                    setSelectedIssues([]);
                    setSuggestion("");
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                {step === 1 ? (
                  <Button onClick={handleNext} disabled={selectedIssues.length === 0}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={isSubmitting}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </>
          ) : (
            // Regular feedback flow
            <>
              <DialogHeader>
                <DialogTitle>Share your feedback</DialogTitle>
                <DialogDescription>
                  Help us improve by sharing your thoughts and suggestions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="What would you like to share with us?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  maxLength={2000}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {message.length}/2000 characters
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <SignInDialog isOpen={isSignInOpen} onOpenChange={setIsSignInOpen} />
    </>
  );
}

