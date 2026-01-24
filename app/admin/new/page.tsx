"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Upload, UploadCloud } from "lucide-react";
import type { Opportunity } from "@/lib/data";

type AdminOpportunity = Opportunity & {
  mongoId?: string;
  createdAt?: string;
  updatedAt?: string;
};

type FormState = {
  name: string;
  organizer: string;
  description: string;
  fullDescription: string;
  openDate: string;
  closeDate: string;
  category: Opportunity["category"] | "";
  region: string;
  country: string;
  eligibility: string;
  applyLink: string;
  tags: string;
  benefits: string;
};

const categories: Opportunity["category"][] = [
  "fellowship",
  "accelerator",
  "incubator",
  "venture_capital",
  "grant",
  "residency",
  "competition",
  "research",
  "developer_program",
];

const emptyForm: FormState = {
  name: "",
  organizer: "",
  description: "",
  fullDescription: "",
  openDate: "",
  closeDate: "",
  category: "",
  region: "",
  country: "",
  eligibility: "",
  applyLink: "",
  tags: "",
  benefits: "",
};

function formatDateForInput(value: Opportunity["openDate"]) {
  if (!value || value === "closed") return "";
  return value.split("T")[0];
}

function AdminNewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editingId = searchParams.get("id");
  const token = searchParams.get("token");

  const [form, setForm] = useState<FormState>(emptyForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonLoaded, setJsonLoaded] = useState(false);
  const [logoDragOver, setLogoDragOver] = useState(false);
  const [bannerDragOver, setBannerDragOver] = useState(false);

  const parsedTags = useMemo(
    () =>
      form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags]
  );

  const parsedBenefits = useMemo(
    () =>
      form.benefits
        .split("\n")
        .map((benefit) => benefit.trim())
        .filter(Boolean),
    [form.benefits]
  );

  useEffect(() => {
    const id = editingId;
    if (!id) return;
    const loadExisting = async () => {
      setLoadingExisting(true);
      try {
        const url = token ? `/api/admin/opportunities?id=${encodeURIComponent(id)}&token=${token}` : `/api/admin/opportunities?id=${encodeURIComponent(id)}`;
        const res = await fetch(url, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to load opportunity");
        }
        const data = (await res.json()) as AdminOpportunity;
        setForm({
          name: data.name || "",
          organizer: data.organizer || "",
          description: data.description || "",
          fullDescription: data.fullDescription || "",
          openDate: formatDateForInput(data.openDate),
          closeDate: formatDateForInput(data.closeDate),
          category: data.category || "",
          region: data.region || "",
          country: data.country || "",
          eligibility: data.eligibility || "",
          applyLink: data.applyLink || "",
          tags: data.tags?.join(", ") || "",
          benefits: data.benefits?.join("\n") || "",
        });
        setJsonLoaded(true);
      } catch (error) {
        toast.error("Could not load opportunity");
      } finally {
        setLoadingExisting(false);
      }
    };
    loadExisting();
  }, [editingId]);

  const loadJsonToForm = (raw: Record<string, unknown>) => {
    try {
      // Allow nested shapes like { opportunity: {...} } or { data: {...} }
      // Otherwise use the raw object directly
      let data: Record<string, unknown>;
      if (
        raw.opportunity &&
        typeof raw.opportunity === "object" &&
        !Array.isArray(raw.opportunity) &&
        raw.opportunity !== null
      ) {
        data = raw.opportunity as Record<string, unknown>;
      } else if (
        raw.data &&
        typeof raw.data === "object" &&
        !Array.isArray(raw.data) &&
        raw.data !== null
      ) {
        data = raw.data as Record<string, unknown>;
      } else {
        data = raw;
      }

      const normalizeTags = (value: unknown) => {
        if (Array.isArray(value)) return (value as unknown[]).map(String).join(", ");
        if (typeof value === "string") return value;
        return "";
      };

      const normalizeBenefits = (value: unknown) => {
        if (Array.isArray(value)) return (value as unknown[]).map(String).join("\n");
        if (typeof value === "string") return value;
        return "";
      };

      const normalizeDate = (value: unknown): string => {
        if (!value || value === "closed" || value === null) return "";
        if (typeof value === "string") {
          // Handle ISO date strings
          if (value.includes("T")) {
            return value.split("T")[0];
          }
          // Handle date-only strings (YYYY-MM-DD)
          if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return value;
          }
        }
        return "";
      };

      const normalizeCategory = (value: unknown): Opportunity["category"] | "" => {
        if (typeof value === "string") {
          const validCategories: Opportunity["category"][] = [
            "fellowship",
            "accelerator",
            "incubator",
            "venture_capital",
            "grant",
            "residency",
            "competition",
            "research",
            "developer_program",
          ];
          if (validCategories.includes(value as Opportunity["category"])) {
            return value as Opportunity["category"];
          }
        }
        return "";
      };

      setForm({
        name: String(data.name ?? ""),
        organizer: String(data.organizer ?? ""),
        description: String(data.description ?? ""),
        fullDescription: String(data.fullDescription ?? data.description ?? ""),
        openDate: normalizeDate(data.openDate),
        closeDate: normalizeDate(data.closeDate),
        category: normalizeCategory(data.category),
        region: String(data.region ?? ""),
        country: String(data.country ?? ""),
        eligibility: String(data.eligibility ?? ""),
        applyLink: String(data.applyLink ?? ""),
        tags: normalizeTags(data.tags),
        benefits: normalizeBenefits(data.benefits),
      });
      setJsonLoaded(true);
    } catch (error) {
      toast.error("Failed to load JSON data");
      throw error;
    }
  };

  const handleJsonPaste = () => {
    if (!jsonText.trim()) {
      toast.error("Paste JSON first");
      return;
    }
    try {
      const data = JSON.parse(jsonText) as Record<string, unknown>;
      loadJsonToForm(data);
      setJsonText("");
      toast.success("JSON loaded successfully");
    } catch (error) {
      toast.error(`Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingId && !logoFile) {
      toast.error("Logo is required when creating a new opportunity");
      return;
    }

    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!form.category) {
      toast.error("Category is required");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,
        tags: parsedTags,
        benefits: parsedBenefits,
        id: editingId ?? undefined,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      if (logoFile) formData.append("logo", logoFile);
      if (bannerFile) formData.append("banner", bannerFile);

      const endpoint = editingId
        ? (token ? `/api/admin/opportunities/${editingId}?token=${token}` : `/api/admin/opportunities/${editingId}`)
        : (token ? `/api/admin/opportunities?token=${token}` : "/api/admin/opportunities");
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorMessage = errorBody.details || errorBody.error || "Failed to save opportunity";
        throw new Error(errorMessage);
      }

      toast.success(editingId ? "Opportunity updated" : "Opportunity created");
      router.push(token ? `/admin?token=${token}` : "/admin");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  const submitLabel = editingId ? "Update opportunity" : "Create opportunity";
  const showJsonInput = !editingId && !jsonLoaded;
  const showForm = editingId || jsonLoaded;

  const handleFileDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setFile: (file: File | null) => void,
    setDragOver: (over: boolean) => void
  ) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
    } else {
      toast.error("Please drop an image file");
    }
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="-ml-3"
            onClick={() => router.push(token ? `/admin?token=${token}` : "/admin")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {editingId ? "Edit Opportunity" : "Add Opportunity"}
            </h1>
            {!showJsonInput && (
              <p className="text-muted-foreground">
                Review and edit the opportunity details, then upload logo and submit
              </p>
            )}
          </div>
        </div>
      </div>

      {showJsonInput && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Paste a JSON object with opportunity fields to prefill the form.
          </p>
          <div className="space-y-3">
            <Label htmlFor="jsonPaste">Paste JSON</Label>
            <Textarea
              id="jsonPaste"
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={12}
              placeholder='{"name":"Example","organizer":"Org","description":"...",...}'
              className="font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button type="button" onClick={handleJsonPaste} disabled={!jsonText.trim()}>
                Load JSON
              </Button>
              <Button type="button" variant="ghost" onClick={() => setJsonText("")}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <Card>
        <CardHeader>
          <CardTitle>Opportunity details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., YC Fellowship"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer *</Label>
                <Input
                  id="organizer"
                  value={form.organizer}
                  onChange={(e) =>
                    setForm({ ...form, organizer: e.target.value })
                  }
                  placeholder="Organization running the program"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm({ ...form, category: value as FormState["category"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Input
                  id="region"
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                  placeholder="Global, US, Europe, LATAM..."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openDate">Open date</Label>
                <Input
                  id="openDate"
                  type="date"
                  value={form.openDate}
                  onChange={(e) =>
                    setForm({ ...form, openDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closeDate">Close date</Label>
                <Input
                  id="closeDate"
                  type="date"
                  value={form.closeDate}
                  onChange={(e) =>
                    setForm({ ...form, closeDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short description *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="One or two sentences summarizing the opportunity"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full description *</Label>
              <Textarea
                id="fullDescription"
                value={form.fullDescription}
                onChange={(e) =>
                  setForm({ ...form, fullDescription: e.target.value })
                }
                placeholder="Everything applicants should know"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eligibility">Eligibility *</Label>
                <Textarea
                  id="eligibility"
                  value={form.eligibility}
                  onChange={(e) =>
                    setForm({ ...form, eligibility: e.target.value })
                  }
                  placeholder="Who can apply?"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applyLink">Apply link *</Label>
                <Input
                  id="applyLink"
                  type="url"
                  value={form.applyLink}
                  onChange={(e) =>
                    setForm({ ...form, applyLink: e.target.value })
                  }
                  placeholder="https://example.com/apply"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country (optional)</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="United States, Remote, ..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="remote, equity-free, research"
                />
                <div className="flex flex-wrap gap-2 mt-1">
                  {parsedTags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits (one per line)</Label>
              <Textarea
                id="benefits"
                value={form.benefits}
                onChange={(e) =>
                  setForm({ ...form, benefits: e.target.value })
                }
                placeholder="Stipend, mentorship, demo day..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Logo (required for new, keeps existing if empty)</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    logoDragOver
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-muted-foreground/50"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setLogoDragOver(true);
                  }}
                  onDragLeave={() => setLogoDragOver(false)}
                  onDrop={(e) => handleFileDrop(e, setLogoFile, setLogoDragOver)}
                  onClick={() => document.getElementById("logo-input")?.click()}
                >
                  <input
                    id="logo-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, setLogoFile)}
                  />
                  {logoFile ? (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-primary" />
                      <p className="text-sm font-medium">{logoFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click or drag to upload logo
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Banner (optional)</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    bannerDragOver
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-muted-foreground/50"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setBannerDragOver(true);
                  }}
                  onDragLeave={() => setBannerDragOver(false)}
                  onDrop={(e) => handleFileDrop(e, setBannerFile, setBannerDragOver)}
                  onClick={() => document.getElementById("banner-input")?.click()}
                >
                  <input
                    id="banner-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, setBannerFile)}
                  />
                  {bannerFile ? (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-primary" />
                      <p className="text-sm font-medium">{bannerFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click or drag to upload banner
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving || loadingExisting}>
                {(saving || loadingExisting) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <UploadCloud className="mr-2 h-4 w-4" />
                {submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      )}
    </div>
  );
}

export default function AdminNewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-48 items-center justify-center text-muted-foreground gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading form...
        </div>
      }
    >
      <AdminNewContent />
    </Suspense>
  );
}
