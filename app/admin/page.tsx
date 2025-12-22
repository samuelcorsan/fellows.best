"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Pencil, Plus, RefreshCw, Trash2, ExternalLink, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import type { Opportunity } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AdminOpportunity = Opportunity & {
  mongoId?: string;
  createdAt?: string;
  updatedAt?: string;
};

type FeedbackItem = {
  id: number;
  message: string;
  section: string;
  opportunity_id: string;
  issues?: string[] | null;
  suggestion?: string | null;
  created_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
};

export default function AdminPage() {
  const [opportunities, setOpportunities] = useState<AdminOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/opportunities", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch opportunities");
      }
      const data = (await response.json()) as AdminOpportunity[];
      setOpportunities(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOpportunities();
  }, []);

  const openDeleteDialog = (id: string) => {
    setPendingDeleteId(id);
    setConfirmText("");
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    setDeletingId(pendingDeleteId);
    try {
      const response = await fetch(`/api/admin/opportunities/${pendingDeleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete opportunity");
      }

      setOpportunities((prev) => prev.filter((item) => item.id !== pendingDeleteId));
      toast.success("Opportunity deleted");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete opportunity"
      );
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
      setConfirmOpen(false);
      setConfirmText("");
    }
  };

  const handleOpenFeedback = async (opportunityId: string) => {
    setSelectedOpportunityId(opportunityId);
    setFeedbackOpen(true);
    setFeedbackLoading(true);
    setFeedback([]);

    try {
      const response = await fetch(`/api/admin/feedback/${opportunityId}`);
      if (response.ok) {
        const data = await response.json();
        setFeedback(data.feedback || []);
      } else {
        toast.error("Failed to load feedback");
      }
    } catch (error) {
      console.error("Error loading feedback:", error);
      toast.error("Failed to load feedback");
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage fellowships. Add or edit using the dedicated create page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setSuggestionsOpen(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Suggestions
          </Button>
          <Button variant="outline" onClick={loadOpportunities}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/admin/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add opportunity
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Opportunities</CardTitle>
            <div className="text-sm text-muted-foreground">
              {opportunities.length} total
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading opportunities...
            </div>
          ) : opportunities.length === 0 ? (
            <div className="text-muted-foreground text-sm">
              No opportunities found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {opportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col relative"
                >
                  <Link
                    href={`/opportunity/${opportunity.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-md hover:bg-muted transition-colors"
                    title="View fellowship page"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </Link>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start gap-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                        <Image
                          src={opportunity.logoUrl}
                          alt={opportunity.name}
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold leading-tight line-clamp-1">
                            {opportunity.name}
                          </p>
                          <Badge variant="outline">{opportunity.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {opportunity.description || opportunity.organizer}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {opportunity.tags?.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                          {opportunity.tags?.length > 3 && (
                            <Badge variant="outline">
                              +{opportunity.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="px-4 pb-4 flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenFeedback(opportunity.id)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Feedback
                    </Button>
                    <Link href={`/admin/new?id=${opportunity.id}`}>
                      <Button size="sm" variant="outline">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteDialog(opportunity.id)}
                      disabled={deletingId === opportunity.id}
                    >
                      {deletingId === opportunity.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                      )}
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete opportunity</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent. Type CONFIRM to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type CONFIRM"
          />
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setConfirmText("");
                setPendingDeleteId(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={confirmText !== "CONFIRM" || !pendingDeleteId}
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription>
              Feedback for this opportunity
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {feedbackLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : feedback.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No feedback yet for this opportunity.
              </p>
            ) : (
              feedback.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={item.user.image || undefined} />
                      <AvatarFallback>
                        {item.user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{item.user.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {item.user.email}
                        </span>
                      </div>
                      {item.issues && Array.isArray(item.issues) && item.issues.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            Issues reported:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.issues.map((issue: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {issue}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.suggestion && (
                        <div className="mb-2">
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            Suggestion:
                          </p>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {item.suggestion}
                          </p>
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {item.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <SuggestionsModal
        isOpen={suggestionsOpen}
        onOpenChange={setSuggestionsOpen}
      />
    </div>
  );
}

function SuggestionsModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"pending" | "accepted" | "rejected">("pending");

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/suggestions?status=${statusFilter}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } else {
        toast.error("Failed to load suggestions");
      }
    } catch (error) {
      console.error("Error loading suggestions:", error);
      toast.error("Failed to load suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch("/api/admin/suggestions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "accepted" }),
      });
      if (response.ok) {
        toast.success("Suggestion accepted");
        loadSuggestions();
      } else {
        toast.error("Failed to accept suggestion");
      }
    } catch (error) {
      console.error("Error accepting suggestion:", error);
      toast.error("Failed to accept suggestion");
    }
  };

  const handleDislike = async (id: string) => {
    try {
      const response = await fetch("/api/admin/suggestions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "rejected" }),
      });
      if (response.ok) {
        // Delete rejected suggestions
        await fetch(`/api/admin/suggestions?id=${id}`, {
          method: "DELETE",
        });
        toast.success("Suggestion rejected and removed");
        loadSuggestions();
      } else {
        toast.error("Failed to reject suggestion");
      }
    } catch (error) {
      console.error("Error rejecting suggestion:", error);
      toast.error("Failed to reject suggestion");
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      loadSuggestions();
    }
  }, [isOpen, statusFilter]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Opportunity Suggestions</DialogTitle>
          <DialogDescription>
            Review and manage submitted opportunity suggestions
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "accepted" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("accepted")}
            >
              Accepted
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("rejected")}
            >
              Rejected
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : suggestions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No {statusFilter} suggestions.
            </p>
          ) : (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {suggestion.type === "url" ? (
                            <a
                              href={suggestion.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {suggestion.url}
                            </a>
                          ) : (
                            suggestion.name
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {suggestion.type === "url"
                            ? "URL Submission"
                            : `${suggestion.organizer} • ${suggestion.category} • ${suggestion.region}`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Submitted: {new Date(suggestion.created_at).toLocaleString()}
                        </p>
                      </div>
                      {statusFilter === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleLike(suggestion.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDislike(suggestion.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {statusFilter === "accepted" && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Accepted
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  {suggestion.type === "full" && (
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Description</p>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </p>
                      </div>
                      {suggestion.full_description && (
                        <div>
                          <p className="text-sm font-medium mb-1">Full Description</p>
                          <p className="text-sm text-muted-foreground">
                            {suggestion.full_description}
                          </p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Opens:</p>
                          <p className="text-muted-foreground">
                            {suggestion.open_date
                              ? new Date(suggestion.open_date).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Closes:</p>
                          <p className="text-muted-foreground">
                            {suggestion.close_date
                              ? new Date(suggestion.close_date).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      {suggestion.eligibility && (
                        <div>
                          <p className="text-sm font-medium mb-1">Eligibility</p>
                          <p className="text-sm text-muted-foreground">
                            {suggestion.eligibility}
                          </p>
                        </div>
                      )}
                      {suggestion.tags && suggestion.tags.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.tags.map((tag: string, idx: number) => (
                              <Badge key={idx} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {suggestion.benefits && suggestion.benefits.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Benefits</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {suggestion.benefits.map((benefit: string, idx: number) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {suggestion.apply_link && (
                        <div>
                          <p className="text-sm font-medium mb-1">Apply Link</p>
                          <a
                            href={suggestion.apply_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {suggestion.apply_link}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
