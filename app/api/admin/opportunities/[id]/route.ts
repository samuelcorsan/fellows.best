import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  buildIdFilter,
  getOpportunitiesCollection,
  mapOpportunityDocument,
  normalizeOpportunityPayload,
} from "@/lib/opportunity-admin";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

// Configure route for larger file uploads
export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds for file uploads

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id: paramId } = await params;
  console.error("[admin:PUT] updating", paramId);

  try {
    const formData = await request.formData();
    const payload = formData.get("payload");
    const logoFile = formData.get("logo");
    const bannerFile = formData.get("banner");

    if (!payload || typeof payload !== "string") {
      return NextResponse.json(
        { error: "Missing payload in request" },
        { status: 400 }
      );
    }

    let parsedPayload: Record<string, unknown>;
    try {
      parsedPayload = JSON.parse(payload) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { error: "Invalid payload format" },
        { status: 400 }
      );
    }

    let normalizedPayload;
    try {
      normalizedPayload = normalizeOpportunityPayload(parsedPayload);
    } catch (validationError) {
      return NextResponse.json(
        { error: (validationError as Error).message },
        { status: 400 }
      );
    }

    let collection;
    try {
      collection = await getOpportunitiesCollection();
    } catch (dbError) {
      console.error("Error connecting to database:", dbError);
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      return NextResponse.json(
        { 
          error: "Database connection failed",
          details: errorMessage.includes("MONGODB") 
            ? "MongoDB configuration is missing or invalid"
            : errorMessage
        },
        { status: 500 }
      );
    }

    const filters = buildIdFilter(paramId);

    let existing;
    try {
      existing = await collection.findOne(filters);
    } catch (dbError) {
      console.error("Error finding opportunity:", dbError);
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      return NextResponse.json(
        { 
          error: "Database query failed",
          details: errorMessage
        },
        { status: 500 }
      );
    }

    if (!existing) {
      console.error("[admin:PUT] not found", paramId);
      return NextResponse.json(
        { error: "Opportunity not found" },
        { status: 404 }
      );
    }

    const id =
      typeof parsedPayload.id === "string" && parsedPayload.id.trim().length > 0
        ? parsedPayload.id.trim()
        : existing.id || paramId;

    const now = new Date().toISOString();
    const updates: Record<string, unknown> = {
      ...normalizedPayload,
      updatedAt: now,
    };

    if (logoFile instanceof File && logoFile.size > 0) {
      try {
        updates.logoUrl = await uploadFileToCloudinary(
          logoFile,
          `fellows/${id}/logo`
        );
      } catch (uploadError) {
        console.error("Error uploading logo to Cloudinary:", uploadError);
        const errorMessage = uploadError instanceof Error ? uploadError.message : String(uploadError);
        return NextResponse.json(
          { 
            error: "Failed to upload logo",
            details: errorMessage.includes("CLOUDINARY_URL") 
              ? "Cloudinary configuration is missing or invalid"
              : errorMessage
          },
          { status: 500 }
        );
      }
    } else {
      updates.logoUrl = existing.logoUrl;
    }

    if (bannerFile instanceof File && bannerFile.size > 0) {
      try {
        updates.shareImageUrl = await uploadFileToCloudinary(
          bannerFile,
          `fellows/${id}/share-image`
        );
      } catch (uploadError) {
        console.error("Error uploading banner to Cloudinary:", uploadError);
        // Banner is optional, so we log but continue
        const errorMessage = uploadError instanceof Error ? uploadError.message : String(uploadError);
        console.warn("Banner upload failed, continuing without banner:", errorMessage);
        // Keep existing banner if upload fails
        if (existing.shareImageUrl) {
          updates.shareImageUrl = existing.shareImageUrl;
        }
      }
    } else if (existing.shareImageUrl) {
      updates.shareImageUrl = existing.shareImageUrl;
    }

    let updated;
    try {
      updated = await collection.findOneAndUpdate(
        filters,
        { $set: updates },
        { returnDocument: "after" }
      );
    } catch (dbError) {
      console.error("Error updating opportunity in database:", dbError);
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      return NextResponse.json(
        { 
          error: "Failed to save opportunity to database",
          details: errorMessage
        },
        { status: 500 }
      );
    }

    if (!updated) {
      console.error("[admin:PUT] update returned no value", { paramId, filters });
      return NextResponse.json(
        { error: "Failed to update opportunity" },
        { status: 500 }
      );
    }

    try {
      revalidatePath(`/opportunity/${id}`);
    } catch (revalidateError) {
      // Revalidation failure shouldn't block the response
      console.warn("Failed to revalidate path:", revalidateError);
    }

    return NextResponse.json(mapOpportunityDocument(updated));
  } catch (error) {
    console.error("Error updating opportunity:", error);
    const errorDetails = error instanceof Error 
      ? {
          message: error.message,
          stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
          name: error.name,
        }
      : { message: String(error) };
    
    return NextResponse.json(
      {
        error: "Failed to update opportunity",
        details: errorDetails.message,
        ...(process.env.NODE_ENV === "development" && { fullError: errorDetails })
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = await params;

  try {
    const collection = await getOpportunitiesCollection();
    const deleteResult = await collection.deleteOne(buildIdFilter(id));

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { error: "Opportunity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting opportunity:", error);
    return NextResponse.json(
      { error: "Failed to delete opportunity" },
      { status: 500 }
    );
  }
}
