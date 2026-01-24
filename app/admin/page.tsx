"use client";

import { Suspense, useEffect, useState } from "react";
import * as React from "react";
import { useSearchParams } from "next/navigation";
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
import { Loader2, Pencil, Plus, RefreshCw, Trash2, ExternalLink, MessageSquare, ThumbsUp, ThumbsDown, Search, LayoutList, LayoutGrid } from "lucide-react";
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

function AdminPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
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
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filteredOpportunities = opportunities.filter((op) =>
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const url = token ? `/api/admin/opportunities?token=${token}` : "/api/admin/opportunities";
      const response = await fetch(url, {
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
  }, [token]);

  const openDeleteDialog = (id: string) => {
    setPendingDeleteId(id);
    setConfirmText("");
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    setDeletingId(pendingDeleteId);
    try {
      const url = token ? `/api/admin/opportunities/${pendingDeleteId}?token=${token}` : `/api/admin/opportunities/${pendingDeleteId}`;
      const response = await fetch(url, {
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
      const url = token ? `/api/admin/feedback/${opportunityId}?token=${token}` : `/api/admin/feedback/${opportunityId}`;
      const response = await fetch(url);
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
      <div className="flex flex-col gap-4 border-b pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <h1 className="text-2xl font-bold tracking-tight whitespace-nowrap">Admin Dashboard</h1>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search opportunities..."
                className="pl-8 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-muted-foreground mr-2 hidden md:inline-block">
              {filteredOpportunities.length} found
            </span>
            <div className="h-4 w-px bg-border mx-1 hidden md:block" />
            <Button variant="outline" size="sm" onClick={() => setSuggestionsOpen(true)} className="h-9">
              <MessageSquare className="mr-2 h-4 w-4" />
              Suggestions
            </Button>
            <Button variant="ghost" size="icon" onClick={loadOpportunities} title="Refresh" className="h-9 w-9">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-border mx-1" />
            <div className="flex items-center gap-1 border rounded-md p-1 bg-muted/50">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="px-2 h-7"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="px-2 h-7"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
            <Link href={token ? `/admin/new?token=${token}` : "/admin/new"}>
              <Button size="sm" className="h-9">
                <Plus className="mr-2 h-4 w-4" />
                Add opportunity
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading opportunities...
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <Search className="h-10 w-10 mb-4 opacity-50" />
            <p className="text-lg font-medium">No opportunities found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" 
            : "space-y-2"
          }>
            {filteredOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className={`group relative transition-all duration-200 bg-card border rounded-lg ${
                  viewMode === "grid" 
                    ? "hover:shadow-md hover:-translate-y-1 flex flex-col" 
                    : "flex flex-row items-center p-3 hover:bg-muted/30"
                }`}
              >
                {viewMode === "grid" ? (
                  <>
                    <Link
                      href={`/opportunity/${opportunity.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 z-10 p-1.5 rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                      title="View fellowship page"
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                    <div className="p-4 flex-1 flex flex-col">
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
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="font-semibold leading-tight line-clamp-1">
                              {opportunity.name}
                            </p>
                            <Badge variant="outline" className="text-xs">{opportunity.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {opportunity.description || opportunity.organizer}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {opportunity.tags?.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                                {tag}
                              </Badge>
                            ))}
                            {opportunity.tags?.length > 3 && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                                +{opportunity.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-4 flex items-center justify-end gap-2 pt-2 border-t mt-auto bg-muted/10">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-xs"
                        onClick={() => handleOpenFeedback(opportunity.id)}
                      >
                        <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                        Feedback
                      </Button>
                      <Link href={token ? `/admin/new?id=${opportunity.id}&token=${token}` : `/admin/new?id=${opportunity.id}`}>
                        <Button size="sm" variant="ghost" className="h-8 text-xs">
                          <Pencil className="mr-1.5 h-3.5 w-3.5" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 text-xs"
                        onClick={() => openDeleteDialog(opportunity.id)}
                        disabled={deletingId === opportunity.id}
                      >
                        {deletingId === opportunity.id ? (
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </>
                ) : (
                  // List View
                  <>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted flex-shrink-0 mr-4">
                      <Image
                        src={opportunity.logoUrl}
                        alt={opportunity.name}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold truncate">{opportunity.name}</p>
                          <Badge variant="outline" className="text-xs shrink-0">{opportunity.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {opportunity.organizer}
                        </p>
                      </div>
                      <div className="md:col-span-4 hidden md:block">
                         <p className="text-sm text-muted-foreground truncate" title={opportunity.description}>
                           {opportunity.description}
                         </p>
                      </div>
                      <div className="md:col-span-4 flex items-center justify-end gap-3">
                         {opportunity.createdAt && (
                           <span className="text-xs text-muted-foreground hidden lg:inline-block mr-2">
                              {new Date(opportunity.createdAt).toLocaleDateString()}
                           </span>
                         )}
                        <Link
                          href={`/opportunity/${opportunity.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleOpenFeedback(opportunity.id)}
                          title="Feedback"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Link href={token ? `/admin/new?id=${opportunity.id}&token=${token}` : `/admin/new?id=${opportunity.id}`}>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-2"
                          onClick={() => openDeleteDialog(opportunity.id)}
                          disabled={deletingId === opportunity.id}
                        >
                          {deletingId === opportunity.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

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
        token={token}
      />
    </div>
  );
}

function SuggestionsModal({
  isOpen,
  onOpenChange,
  token,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  token: string | null;
}) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"pending" | "accepted" | "rejected">("pending");

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const url = token ? `/api/admin/suggestions?status=${statusFilter}&token=${token}` : `/api/admin/suggestions?status=${statusFilter}`;
      const response = await fetch(url);
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
      const url = token ? `/api/admin/suggestions?token=${token}` : "/api/admin/suggestions";
      const response = await fetch(url, {
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
      const url = token ? `/api/admin/suggestions?token=${token}` : "/api/admin/suggestions";
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "rejected" }),
      });
      if (response.ok) {
        // Delete rejected suggestions
        const deleteUrl = token ? `/api/admin/suggestions?id=${id}&token=${token}` : `/api/admin/suggestions?id=${id}`;
        await fetch(deleteUrl, {
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

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    }>
      <AdminPageContent />
    </Suspense>
  );
}
