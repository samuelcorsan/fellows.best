import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, location, website } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (name.length > 255) {
      return NextResponse.json({ error: 'Name too long (max 255 characters)' }, { status: 400 });
    }
    
    if (location && location.length > 255) {
      return NextResponse.json({ error: 'Location too long (max 255 characters)' }, { status: 400 });
    }
    
    if (website && website.length > 500) {
      return NextResponse.json({ error: 'Website URL too long (max 500 characters)' }, { status: 400 });
    }

    if (website && website.trim()) {
      try {
        const urlString = website.startsWith('http') ? website : `https://${website}`;
        const url = new URL(urlString);
        
        if (!['http:', 'https:'].includes(url.protocol)) {
          return NextResponse.json({ error: "Website must be a valid HTTP/HTTPS URL" }, { status: 400 });
        }

        const hostname = url.hostname;
        const tldMatch = hostname.match(/\.([a-z]{2,})$/i);
        if (!tldMatch) {
          return NextResponse.json({ error: "Website must have a valid top-level domain" }, { status: 400 });
        }

        if (!hostname.includes('.') || hostname.startsWith('.') || hostname.endsWith('.')) {
          return NextResponse.json({ error: "Website must be a valid domain" }, { status: 400 });
        }
      } catch {
        return NextResponse.json({ error: "Website must be a valid URL" }, { status: 400 });
      }
    }

    const sanitizedLocation = location ? location.trim().substring(0, 255) : null;
    let sanitizedWebsite = null;
    if (website && website.trim()) {
      const trimmedWebsite = website.trim();
      sanitizedWebsite = trimmedWebsite.replace(/^https?:\/\//, '').substring(0, 500);
    }

    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE "user" SET name = $1, location = $2, website = $3, "updatedAt" = NOW() WHERE id = $4 RETURNING id, name, email, "emailVerified", image, location, website, "createdAt", "updatedAt"',
        [name.trim(), sanitizedLocation, sanitizedWebsite, session.user.id]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ 
        message: 'Profile updated successfully',
        user: result.rows[0]
      });
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}