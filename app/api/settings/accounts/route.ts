import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, "accountId", "providerId", "userId", "createdAt" FROM "account" WHERE "userId" = $1',
        [session.user.id]
      );

      const sanitizedAccounts = result.rows.map((account: any) => ({
        id: account.id,
        providerId: account.providerId,
        createdAt: account.createdAt,
      }));

      return NextResponse.json({ 
        accounts: sanitizedAccounts
      });
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Accounts fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}