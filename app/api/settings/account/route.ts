import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      await client.query('DELETE FROM "session" WHERE "userId" = $1', [session.user.id]);
      
      await client.query('DELETE FROM "account" WHERE "userId" = $1', [session.user.id]);
      
      await client.query('DELETE FROM "verification" WHERE identifier = $1', [session.user.email]);
      
      await client.query('DELETE FROM "user" WHERE id = $1', [session.user.id]);
      
      await client.query('COMMIT');
      
      return NextResponse.json({ 
        message: 'Account deleted successfully'
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}