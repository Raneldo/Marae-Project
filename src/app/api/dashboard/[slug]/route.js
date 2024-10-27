import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in to access this resource." },
        { status: 401 }
      );
    }

    const locationId = session.user.locationId;

    if (!locationId) {
      return NextResponse.json(
        { message: "Location ID not found for this user." },
        { status: 400 }
      );
    }

    //  Fetch parking events for the location
    const parkingEvents = await db.parkingEvents.findMany({
      where: { LocationID: locationId },
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

    // Step 2: Extract unique VehicleIDs from the parking events
    const vehicleIds = parkingEvents.map((event) => event.VehicleID);
    const uniqueVehicleIds = [...new Set(vehicleIds)];

    // Step 3: Fetch vehicles matching the VehicleIDs
    const vehicles = await db.vehicles.findMany({
      where: { VehicleID: { in: uniqueVehicleIds } },
      select: {
        VehicleID: true,
        LicensePlate: true,
      },
    });

    // Step 4: Create a lookup object for vehicles by VehicleID
    const vehicleLookup = vehicles.reduce((acc, vehicle) => {
      acc[vehicle.VehicleID] = vehicle.LicensePlate;
      return acc;
    }, {});

    // Step 5: Format the parking events with vehicle license plates
    const formattedEvents = parkingEvents.map((event) => ({
      ...event,
      LicensePlate: vehicleLookup[event.VehicleID] || 'N/A', // Add license plate
      EntryTime: event.EntryTime.toISOString().split("T")[1].split('.')[0],
      ExitTime: event.ExitTime
        ? event.ExitTime.toISOString().split("T")[1].split('.')[0].split('.')[0]
        : null,
    }));

    // Step 6: Return the formatted events
    return NextResponse.json({ items: formattedEvents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Parking Events:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
