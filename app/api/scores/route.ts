export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import crypto from "crypto";

function hashIp(ip: string) {
  const salt = process.env.IP_SALT || "dev_salt";
  return crypto.createHash("sha256").update(ip + salt).digest("hex");
}

function getClientIp(req: Request) {
  // Vercel supplies x-forwarded-for
  const fwd = req.headers.get("x-forwarded-for") || "";
  return fwd.split(",")[0].trim() || "0.0.0.0";
}

function isAllowedOrigin(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allow = [
    process.env.NEXT_PUBLIC_BASE_URL || "",
    "http://localhost:3000",
  ].filter(Boolean);
  return allow.some((o) => origin.startsWith(o));
}

export async function GET() {
  try {
    const { rows } = await sql`
      select name, points, created_at
      from scores
      where created_at > now() - interval '24 hours'
      order by points desc
      limit 50;
    `;
    return NextResponse.json({ ok: true, scores: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim().slice(0, 40);
    const points = Number(body?.points);
    if (!name || !Number.isFinite(points) || points < 0) {
      return NextResponse.json({ ok: false, error: "bad_input" }, { status: 400 });
    }
    await sql`insert into scores (name, points) values (${name}, ${points})`;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || "db_error") }, { status: 500 });
  }
}