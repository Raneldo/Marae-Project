import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import location_1 from "@/assets/l1.jpeg";
import location_2 from "@/assets/l2.jpeg";
import location_3 from "@/assets/l3.jpeg";

import db from "@/lib/prisma";

const image_map = {
  1: location_1,
  2: location_2,
  3: location_3,
};

export async function GET(req) {
  if (req.method !== "GET") {
    return NextResponse.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const locations = await db.locations.findMany({
      select: {
        LocationID: true,
        Name: true,
        Address: true,
        Suburb: true,
        Region: true,
        Capacity: true,
        Description: true,
      },
    });

    console.log("Fetched locations from DB:", locations);

    const formatted_locations = locations.map((location, idx) => ({
      id: location.LocationID,
      marae_name: location.Name,
      occupied: location.Capacity,
      total_capacity: location.Capacity,
      address: location.Address,
      suburb: location.Suburb,
      region: location.Region,
      img: image_map[idx + 1] || image_map[1],
    }));

    return NextResponse.json(
      {
        items: formatted_locations,
        quantity: formatted_locations.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching locations: ", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
