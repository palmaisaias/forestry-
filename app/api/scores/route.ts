// web/app/api/scores/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

type ScoreRow = { name: string; points: number; created_at: string };

export async function GET() {
  try {
    const { rows } = await sql<ScoreRow>`
      select name, points, created_at
      from scores
      where created_at > now() - interval '24 hours'
      order by points desc
      limit 50;
    `;
    return NextResponse.json({ ok: true, scores: rows });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: unknown; points?: unknown };
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 40) : '';
    const pointsNum =
      typeof body.points === 'number' ? body.points : Number(body.points);

    if (!name || !Number.isFinite(pointsNum) || pointsNum < 0) {
      return NextResponse.json({ ok: false, error: 'bad_input' }, { status: 400 });
    }

    await sql`insert into scores (name, points) values (${name}, ${pointsNum})`;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}