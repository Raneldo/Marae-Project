import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req, { params }) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { status: 405 },
      { message: "Method Not Allowed" }
    );
  }

  const { id } = params;
  const locationId = parseInt(id, 10);
  if (isNaN(locationId)) {
    console.log("Invalid id")
    return NextResponse.json(
      { error: "Invalid LocationID. Must be a number" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("No session")
    return NextResponse.json(
      { error: "Unauthorized. Please log in to access this resource" },
      { status: 401 }
    );
  }

  console.log()

  try {
    const locations = await db.locations.findUnique({
      where: { LocationID: locationId }
    });

    if (!locations) {
      console.log("Invalid location")
      return NextResponse.json(
        { error: "Location not found" },
        { status: 400 }
      );
    }
    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
