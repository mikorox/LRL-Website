import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getRegistrations } from "@/lib/data";

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const registrations = await getRegistrations();
  const headers = [
    "Submitted At",
    "Name",
    "Age",
    "Gender",
    "Weight",
    "Stroke Side / Bow Side",
    "Preferred Discipline",
    "Role",
    "Profile Picture URL",
    "NIC / Passport Image URL",
  ];
  const rows = registrations.map((r) =>
    [
      r.submittedAt, r.name, r.age, r.gender, r.weight, r.side, r.discipline, r.role,
      r.profilePictureUrl, r.nicPassportUrl,
    ]
      .map((v) => csvEscape(String(v)))
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lrl-registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
