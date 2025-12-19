import { NextRequest, NextResponse } from "next/server";
import {
  buildIdFilter,
  getOpportunitiesCollection,
  mapOpportunityDocument,
  normalizeOpportunityPayload,
} from "@/lib/opportunity-admin";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    const collection = await getOpportunitiesCollection();
    const filters = buildIdFilter(paramId);

    const existing = await collection.findOne(filters);
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

    const updates: Record<string, unknown> = {
      ...normalizedPayload,
      updatedAt: new Date().toISOString(),
    };

    if (logoFile instanceof File && logoFile.size > 0) {
      updates.logoUrl = await uploadFileToCloudinary(
        logoFile,
        `fellows/${id}/logo`
      );
    } else {
      updates.logoUrl = existing.logoUrl;
    }

    if (bannerFile instanceof File && bannerFile.size > 0) {
      updates.shareImageUrl = await uploadFileToCloudinary(
        bannerFile,
        `fellows/${id}/share-image`
      );
    } else if (existing.shareImageUrl) {
      updates.shareImageUrl = existing.shareImageUrl;
    }

    const updated = await collection.findOneAndUpdate(
      filters,
      { $set: updates },
      { returnDocument: "after" }
    );

    if (!updated) {
      console.error("[admin:PUT] update returned no value", { paramId, filters });
      return NextResponse.json(
        { error: "Failed to update opportunity" },
        { status: 500 }
      );
    }

    return NextResponse.json(mapOpportunityDocument(updated));
  } catch (error) {
    console.error("Error updating opportunity:", error);
    return NextResponse.json(
      {
        error: "Failed to update opportunity",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
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
