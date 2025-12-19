import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  buildIdFilter,
  getOpportunitiesCollection,
  mapOpportunityDocument,
  normalizeOpportunityPayload,
} from "@/lib/opportunity-admin";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const collection = await getOpportunitiesCollection();
    if (id) {
      const document = await collection.findOne(buildIdFilter(id));
      if (!document) {
        return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
      }
      return NextResponse.json(mapOpportunityDocument(document), { status: 200 });
    }

    const documents = await collection.find({}).sort({ updatedAt: -1 }).toArray();

    return NextResponse.json(documents.map(mapOpportunityDocument), { status: 200 });
  } catch (error) {
    console.error("Error listing opportunities:", error);
    return NextResponse.json(
      { error: "Failed to list opportunities" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    if (!(logoFile instanceof File)) {
      return NextResponse.json(
        { error: "Logo file is required" },
        { status: 400 }
      );
    }

    let parsedPayload: Record<string, unknown>;
    try {
      parsedPayload = JSON.parse(payload) as Record<string, unknown>;
    } catch (parseError) {
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

    const id =
      typeof parsedPayload.id === "string" && parsedPayload.id.trim().length > 0
        ? parsedPayload.id.trim()
        : randomUUID();

    const [logoUrl, shareImageUrl] = await Promise.all([
      uploadFileToCloudinary(logoFile, `fellows/${id}/logo`),
      bannerFile instanceof File && bannerFile.size > 0
        ? uploadFileToCloudinary(bannerFile, `fellows/${id}/share-image`)
        : Promise.resolve<string | undefined>(undefined),
    ]);

    const now = new Date().toISOString();
    const document = {
      ...normalizedPayload,
      id,
      logoUrl,
      ...(shareImageUrl ? { shareImageUrl } : {}),
      createdAt: now,
      updatedAt: now,
    };

    const collection = await getOpportunitiesCollection();

    // Avoid duplicate IDs if an existing document is found
    const existing = await collection.findOne(buildIdFilter(id));
    if (existing) {
      return NextResponse.json(
        { error: "An opportunity with this id already exists" },
        { status: 409 }
      );
    }

    const insertResult = await collection.insertOne(document);
    const savedDocument = { ...document, _id: insertResult.insertedId };

    return NextResponse.json(mapOpportunityDocument(savedDocument), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating opportunity:", error);
    return NextResponse.json(
      { error: "Failed to create opportunity" },
      { status: 500 }
    );
  }
}
