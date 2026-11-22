// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Drops cached API responses on demand so admin edits show up at once instead
 * of after API_CACHE_SECONDS. Called by the backend after it saves something:
 *
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "tags": ["projects", "profile"] }
 *
 * Tags are the ones passed to apiFetch in src/lib/api (profile, projects,
 * blog-posts, services, skills, experiences, education, training, teams,
 * testimonials, settings, categories, ...).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = req.headers.get("x-revalidate-secret") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const tags: unknown = body?.tags;
  if (!Array.isArray(tags) || tags.length === 0 || tags.length > 50 || !tags.every((t) => typeof t === "string" && /^[\w-]{1,64}$/.test(t))) {
    return NextResponse.json({ ok: false, message: "Body must be { tags: string[] }" }, { status: 422 });
  }

  // expire: 0 drops the entry now, so the next visitor gets fresh data
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: tags });
}
