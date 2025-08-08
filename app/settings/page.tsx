"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, X } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const sidebarSections = [{ id: "account", label: "My account", active: true }];

export default function SettingsPage() {
  const { data: session } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("account");

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    location: "",
    website: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (session?.user) {
      loadUserData();
    }
  }, [session]);

  const loadUserData = async () => {
    try {
      const profileResponse = await fetch("/api/profile");
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setProfileData({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          location: profileData.user.location || "",
          website: profileData.user.website || "",
        });
      }

      const accountsResponse = await fetch("/api/settings/accounts");
      if (accountsResponse.ok) {
        const accountsData = await accountsResponse.json();
        setAccounts(accountsData.accounts || []);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
    setErrors({});
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
    setErrors({});
  };

  const validateWebsite = (
    url: string
  ): { isValid: boolean; error?: string } => {
    if (!url.trim()) return { isValid: true };

    try {
      const urlString = url.startsWith("http") ? url : `https://${url}`;
      const urlObj = new URL(urlString);

      if (!["http:", "https:"].includes(urlObj.protocol)) {
        return {
          isValid: false,
          error: "Website must be a valid HTTP/HTTPS URL",
        };
      }

      const hostname = urlObj.hostname;
      const tldMatch = hostname.match(/\.([a-z]{2,})$/i);
      if (!tldMatch) {
        return {
          isValid: false,
          error: "Website must have a valid top-level domain",
        };
      }

      if (
        !hostname.includes(".") ||
        hostname.startsWith(".") ||
        hostname.endsWith(".")
      ) {
        return { isValid: false, error: "Website must be a valid domain" };
      }

      return { isValid: true };
    } catch {
      return { isValid: false, error: "Website must be a valid URL" };
    }
  };

  const handleSave = async (field: string) => {
    const newErrors: { [key: string]: string } = {};

    if (field === "name" && !tempValue.trim()) {
      newErrors[field] = "Name is required";
    } else if (tempValue.length > 255) {
      newErrors[field] = "Value too long (max 255 characters)";
    }

    if (field === "website" && tempValue) {
      const websiteValidation = validateWebsite(tempValue);
      if (!websiteValidation.isValid) {
        newErrors[field] = websiteValidation.error || "Invalid website URL";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const websiteForValidation =
        field === "website" && tempValue
          ? tempValue.startsWith("http")
            ? tempValue
            : `https://${tempValue}`
          : field === "website"
            ? ""
            : profileData.website;

      const updateData = {
        name: field === "name" ? tempValue.trim() : profileData.name,
        location:
          field === "location" ? tempValue.trim() : profileData.location,
        website:
          field === "website" ? websiteForValidation : profileData.website,
      };

      const response = await fetch("/api/settings/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.user.name || "",
          email: session?.user?.email || "",
          location: data.user.location || "",
          website: data.user.website || "",
        });
        setEditingField(null);
        setTempValue("");
        setErrors({});
      } else {
        const errorData = await response.json();
        setErrors({ [field]: errorData.error || "Failed to update" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ [field]: "Error updating profile" });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/settings/account", {
        method: "DELETE",
      });

      if (response.ok) {
        await authClient.signOut();
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.error || "Failed to delete account" });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrors({ general: "Error deleting account" });
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) return;

    setFeedbackSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: feedbackText }),
      });

      if (response.ok) {
        setFeedbackText("");
        setFeedbackOpen(false);
        toast.success("Thank you for your feedback!");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.error || "Failed to send feedback" });
      }
    } catch (error) {
      setErrors({ general: "Failed to send feedback. Please try again." });
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const getProviderName = (providerId: string) => {
    const providers: { [key: string]: string } = {
      github: "GitHub",
      google: "Google",
    };
    return providers[providerId] || providerId;
  };

  if (isLoading) {
    return (
      <div className="bg-background pb-20 sm:pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                My account
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 px-6 border border-border/40 rounded-lg">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">Photo</p>
                    <p className="text-muted-foreground text-xs">
                      Update your profile photo
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg px-4 text-xs"
                  disabled
                >
                  Change photo
                </Button>
              </div>

              <div className="border border-border/40 rounded-lg">
                <div className="flex items-center justify-between py-4 px-6">
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">Full name</p>
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg px-4 text-xs"
                    disabled
                  >
                    Change name
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 px-6 border border-border/40 rounded-lg">
                <div>
                  <p className="font-medium text-sm mb-1">Email</p>
                  <Skeleton className="h-4 w-48" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg px-4 text-xs"
                  disabled
                >
                  Change email
                </Button>
              </div>

              <div className="border border-border/40 rounded-lg">
                <div className="flex items-center justify-between py-4 px-6">
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">Location</p>
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg px-4 text-xs"
                    disabled
                  >
                    Change location
                  </Button>
                </div>
              </div>

              <div className="border border-border/40 rounded-lg">
                <div className="flex items-center justify-between py-4 px-6">
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">Website</p>
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg px-4 text-xs"
                    disabled
                  >
                    Change website
                  </Button>
                </div>
              </div>

              <div className="border border-border/40 rounded-lg p-6">
                <div className="mb-4">
                  <p className="font-medium text-sm mb-1">
                    Connected providers
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Manage your authentication methods
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 border border-border/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-lg" />
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-12 rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="border border-red-500/40 rounded-lg p-6 bg-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm mb-1 text-red-600">
                      Delete my account
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-lg px-4 text-xs text-white"
                    disabled
                  >
                    Delete account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">Sign In Required</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Please sign in to access settings.
          </p>
          <Button onClick={() => (window.location.href = "/")}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
              My account
            </h2>
            <p className="text-muted-foreground text-sm">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-4 sm:px-6 border border-border/40 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback className="text-sm">
                    {session.user.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Photo</p>
                  <p className="text-muted-foreground text-xs">
                    Update your profile photo
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg px-4 text-xs w-full sm:w-auto"
              >
                Change photo
              </Button>
            </div>

            <div className="border border-border/40 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 py-4 px-4 sm:px-6">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Full name</p>
                  {editingField === "name" ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2">
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className={`text-sm h-8 ${errors.name ? "border-red-500" : ""}`}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave("name")}
                          className="h-8 px-3 flex-1 sm:flex-initial"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancel}
                          className="h-8 px-3 flex-1 sm:flex-initial"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm break-words">
                      {profileData.name}
                    </p>
                  )}
                </div>
                {editingField !== "name" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg px-4 text-xs w-full sm:w-auto"
                    onClick={() => handleEdit("name", profileData.name)}
                  >
                    Change name
                  </Button>
                )}
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs px-4 sm:px-6 pb-4">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-4 sm:px-6 border border-border/40 rounded-lg">
              <div className="min-w-0">
                <p className="font-medium text-sm mb-1">Email</p>
                <p className="text-muted-foreground text-sm break-all">
                  {profileData.email}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg px-4 text-xs w-full sm:w-auto"
                disabled
              >
                Change email
              </Button>
            </div>

            <div className="border border-border/40 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 py-4 px-4 sm:px-6">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Location</p>
                  {editingField === "location" ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2">
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className={`text-sm h-8 ${errors.location ? "border-red-500" : ""}`}
                        placeholder="Your location"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave("location")}
                          className="h-8 px-3 flex-1 sm:flex-initial"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancel}
                          className="h-8 px-3 flex-1 sm:flex-initial"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm break-words">
                      {profileData.location || "No location set"}
                    </p>
                  )}
                </div>
                {editingField !== "location" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg px-4 text-xs w-full sm:w-auto"
                    onClick={() => handleEdit("location", profileData.location)}
                  >
                    Change location
                  </Button>
                )}
              </div>
              {errors.location && (
                <p className="text-red-500 text-xs px-4 sm:px-6 pb-4">
                  {errors.location}
                </p>
              )}
            </div>

            <div className="border border-border/40 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 py-4 px-4 sm:px-6">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Website</p>
                  {editingField === "website" ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2">
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className={`text-sm h-8 ${errors.website ? "border-red-500" : ""}`}
                        placeholder="example.com"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave("website")}
                          className="h-8 px-3 flex-1 sm:flex-initial"
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancel}
                          className="h-8 px-3 flex-1 sm:flex-initial"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm break-all">
                      {profileData.website || "No website set"}
                    </p>
                  )}
                </div>
                {editingField !== "website" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg px-4 text-xs w-full sm:w-auto"
                    onClick={() => handleEdit("website", profileData.website)}
                  >
                    Change website
                  </Button>
                )}
              </div>
              {errors.website && (
                <p className="text-red-500 text-xs px-4 sm:px-6 pb-4">
                  {errors.website}
                </p>
              )}
            </div>

            <div className="border border-border/40 rounded-lg p-4 sm:p-6">
              <div className="mb-4">
                <p className="font-medium text-sm mb-1">Connected providers</p>
                <p className="text-muted-foreground text-xs">
                  Manage your authentication methods
                </p>
              </div>

              {accounts.length > 0 ? (
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 px-4 border border-border/20 rounded-lg"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted flex-shrink-0">
                          {account.providerId === "google" ? (
                            <FaGoogle className="h-4 w-4" />
                          ) : (
                            <FaGithub className="h-4 w-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm">
                            {getProviderName(account.providerId)}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Connected{" "}
                            {new Date(account.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="rounded-lg px-3 py-1 text-xs self-start sm:self-center"
                      >
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No connected providers found.
                </p>
              )}
            </div>

            <div className="border border-red-500/40 rounded-lg p-4 sm:p-6 bg-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-medium text-sm mb-1 text-red-600">
                    Delete my account
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Permanently delete your account and all associated data
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-lg px-4 text-xs text-white w-full sm:w-auto"
                    >
                      Delete account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Yes, delete my account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {errors.general && (
                <p className="text-red-500 text-xs mt-3">{errors.general}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
