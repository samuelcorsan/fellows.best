import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  buildIdFilter,
  generateId,
  getOpportunitiesCollection,
  mapOpportunityDocument,
  normalizeOpportunityPayload,
} from "@/lib/opportunity-admin";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const maxDuration = 20

export async function GET(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
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
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
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
        { error: "Invalid opportunity data" },
        { status: 400 }
      );
    }

    const id =
      typeof parsedPayload.id === "string" && parsedPayload.id.trim().length > 0
        ? parsedPayload.id.trim()
        : generateId(normalizedPayload.name);

    let logoUrl: string;
    let shareImageUrl: string | undefined;

    try {
      logoUrl = await uploadFileToCloudinary(logoFile, `fellows/${id}/logo`);
    } catch (uploadError) {
      console.error("Error uploading logo to Cloudinary:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload logo" },
        { status: 500 }
      );
    }

    try {
      if (bannerFile instanceof File && bannerFile.size > 0) {
        shareImageUrl = await uploadFileToCloudinary(bannerFile, `fellows/${id}/share-image`);
      }
    } catch (uploadError) {
      console.error("Error uploading banner to Cloudinary:", uploadError);
    }

    const now = new Date().toISOString();
    const document = {
      ...normalizedPayload,
      id,
      logoUrl,
      ...(shareImageUrl ? { shareImageUrl } : {}),
      createdAt: now,
      updatedAt: now,
    };

    let collection;
    try {
      collection = await getOpportunitiesCollection();
    } catch (dbError) {
      console.error("Error connecting to database:", dbError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Avoid duplicate IDs if an existing document is found
    let existing;
    try {
      existing = await collection.findOne(buildIdFilter(id));
    } catch (dbError) {
      console.error("Error checking for existing opportunity:", dbError);
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        { error: "An opportunity with this id already exists" },
        { status: 409 }
      );
    }

    let insertResult;
    try {
      insertResult = await collection.insertOne(document);
    } catch (dbError) {
      console.error("Error inserting opportunity:", dbError);
      return NextResponse.json(
        { error: "Failed to save opportunity to database" },
        { status: 500 }
      );
    }

    const savedDocument = { ...document, _id: insertResult.insertedId };

    try {
      revalidatePath(`/opportunity/${id}`);
    } catch (revalidateError) {
      // Revalidation failure shouldn't block the response
      console.warn("Failed to revalidate path:", revalidateError);
    }

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
