
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { team } = await params;
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5001";

    const response = await fetch(
      `${backendUrl}/api/teams/${encodeURIComponent(team)}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Error contacting NHL backend:", error);

    return NextResponse.json(
      { error: "Unable to retrieve team data" },
      { status: 502 }
    );
  }
}
