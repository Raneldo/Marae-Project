import { NextResponse } from "next/server";
import db from "@/lib/prisma"

export async function GET(req) {
  // use id from user to get location
  try {
    const parkingEvents = await db.parkingEvents.findMany({
      where: {
        LocationID: req.query,
      },
      select: {
        EventID: true,
        LocationID: true,
        VehicleID: true,
        EntryDate: true,
        EntryTime: true,
        ExitDate: true,
        ExitTime: true,
      },
    });
    return NextResponse.json({ items: parkingEvents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Parking Events:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
