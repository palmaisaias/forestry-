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
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const name = String(body?.name || "").trim().slice(0, 40);
    const points = Math.max(0, Math.min(9999, Number(body?.points)));
    if (!name || !Number.isFinite(points)) {
      return NextResponse.json({ ok: false, error: "bad_input" }, { status: 400 });
    }

    // Very light rate limit: max 3 submissions per 10 seconds per IP
    const ip = getClientIp(req);
    const ipHash = hashIp(ip);
    const { rows: [{ count }] } = await sql`
      select count(*)::int as count
      from scores
      where ip_hash = ${ipHash}
        and created_at > now() - interval '10 seconds'
    `;
    if (count >= 3) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    await sql`insert into scores (name, points, ip_hash) values (${name}, ${points}, ${ipHash})`;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}