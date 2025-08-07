import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { NextRequest, NextResponse } from "next/server";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.trim().length > 2000) {
      return NextResponse.json({ error: "Message too long (max 2000 characters)" }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO feedback (user_id, message) VALUES ($1, $2) RETURNING id, created_at',
        [session.user.id, message.trim()]
      );

      return NextResponse.json({ 
        success: true,
        feedback: result.rows[0]
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}