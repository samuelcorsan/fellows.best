"use client";

import { useEffect, useState } from "react";
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
import { Loader2, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import type { Opportunity } from "@/lib/data";

type AdminOpportunity = Opportunity & {
  mongoId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminPage() {
  const [opportunities, setOpportunities] = useState<AdminOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

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
                  className="hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col"
                >
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
    </div>
  );
}
