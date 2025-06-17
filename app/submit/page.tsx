"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Upload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  "fellowship",
  "accelerator",
  "grant",
  "hackathon",
  "internship",
  "competition",
];

const regions = [
  "Global",
  "United States",
  "Europe",
  "Asia",
  "India",
  "Canada",
  "Australia",
];

const availableTags = [
  "remote",
  "equity-free",
  "mentorship",
  "funding",
  "research",
  "early-stage",
  "technical-support",
  "networking",
  "academic",
];

export default function SubmitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organizer: "",
    description: "",
    fullDescription: "",
    openDate: "",
    closeDate: "",
    category: "",
    region: "",
    eligibility: "",
    applyLink: "",
    tags: [] as string[],
    benefits: [""],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) =>
        i === index ? value : benefit
      ),
    }));
  };

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }));
  };

  const removeBenefit = (index: number) => {
    if (formData.benefits.length > 1) {
      setFormData((prev) => ({
        ...prev,
        benefits: prev.benefits.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.organizer.trim())
      newErrors.organizer = "Organizer is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.fullDescription.trim())
      newErrors.fullDescription = "Full description is required";
    if (!formData.openDate) newErrors.openDate = "Open date is required";
    if (!formData.closeDate) newErrors.closeDate = "Close date is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.eligibility.trim())
      newErrors.eligibility = "Eligibility is required";
    if (!formData.applyLink.trim())
      newErrors.applyLink = "Application link is required";

    // Date validation
    if (formData.openDate && formData.closeDate) {
      const openDate = new Date(formData.openDate);
      const closeDate = new Date(formData.closeDate);
      if (closeDate <= openDate) {
        newErrors.closeDate = "Close date must be after open date";
      }
    }

    // URL validation
    if (formData.applyLink) {
      try {
        new URL(formData.applyLink);
      } catch {
        newErrors.applyLink = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would send this to your API
      console.log("Submitting opportunity:", {
        ...formData,
        benefits: formData.benefits.filter((b) => b.trim()),
      });

      // Show success message and redirect
      alert(
        "Opportunity submitted successfully! It will be reviewed before being published."
      );
      router.push("/browse");
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "There was an error submitting your opportunity. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Submit an Opportunity
          </h1>
          <p className="text-xl text-muted-foreground">
            Help others discover amazing opportunities by sharing what you know
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Opportunity Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Y Combinator W25"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="organizer">Organizer *</Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) =>
                      handleInputChange("organizer", e.target.value)
                    }
                    placeholder="e.g., Y Combinator"
                    className={errors.organizer ? "border-red-500" : ""}
                  />
                  {errors.organizer && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.organizer}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Brief description of the opportunity (1-2 sentences)"
                  rows={2}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="fullDescription">Full Description *</Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) =>
                    handleInputChange("fullDescription", e.target.value)
                  }
                  placeholder="Detailed description of the opportunity, what it offers, and what participants can expect"
                  rows={4}
                  className={errors.fullDescription ? "border-red-500" : ""}
                />
                {errors.fullDescription && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.fullDescription}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dates and Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="openDate">Application Opens *</Label>
                  <Input
                    id="openDate"
                    type="date"
                    value={formData.openDate}
                    onChange={(e) =>
                      handleInputChange("openDate", e.target.value)
                    }
                    className={errors.openDate ? "border-red-500" : ""}
                  />
                  {errors.openDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.openDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="closeDate">Application Closes *</Label>
                  <Input
                    id="closeDate"
                    type="date"
                    value={formData.closeDate}
                    onChange={(e) =>
                      handleInputChange("closeDate", e.target.value)
                    }
                    className={errors.closeDate ? "border-red-500" : ""}
                  />
                  {errors.closeDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.closeDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="region">Region *</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) =>
                      handleInputChange("region", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.region ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.region && (
                    <p className="text-sm text-red-500 mt-1">{errors.region}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <Label className="text-sm text-muted-foreground mb-3 block">
                Select all tags that apply to this opportunity
              </Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={formData.tags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <Label
                      htmlFor={`tag-${tag}`}
                      className="text-sm cursor-pointer"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.tags.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Selected tags:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="text-sm text-muted-foreground">
                List the key benefits or what participants will receive
              </Label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    placeholder={`Benefit ${index + 1}`}
                  />
                  {formData.benefits.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeBenefit(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addBenefit}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Benefit
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="eligibility">Eligibility Requirements *</Label>
                <Textarea
                  id="eligibility"
                  value={formData.eligibility}
                  onChange={(e) =>
                    handleInputChange("eligibility", e.target.value)
                  }
                  placeholder="Who is eligible to apply? Include any specific requirements, age limits, location restrictions, etc."
                  rows={3}
                  className={errors.eligibility ? "border-red-500" : ""}
                />
                {errors.eligibility && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.eligibility}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="applyLink">Application Link *</Label>
                <Input
                  id="applyLink"
                  type="url"
                  value={formData.applyLink}
                  onChange={(e) =>
                    handleInputChange("applyLink", e.target.value)
                  }
                  placeholder="https://example.com/apply"
                  className={errors.applyLink ? "border-red-500" : ""}
                />
                {errors.applyLink && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.applyLink}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Opportunity"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
