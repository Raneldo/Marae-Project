"use client";
import { useEffect, useState } from "react";
import LocationImage from "./components/locations";
import { Button } from "@/components/ui/button";

const Locations = () => {
  const [loading, setLoading] = useState(true)
  const [locationsData, setLocationsData] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch("/api/marae-locations", {
        method: "GET",
      });

      const data = await res.json();
      setLocationsData(data.items);
      setFilteredLocations(data.items); // Initialize filtered locations
      setLoading(false)
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter locations by search term or region
    const filtered = locationsData.filter((loc) => {
      return (
        loc.marae_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (regionFilter === "" || loc.region === regionFilter)
      );
    });
    setFilteredLocations(filtered);
  }, [searchTerm, regionFilter, locationsData]);
  
  if(loading) {
    return <div className="loader absolute top-1/2 left-1/2"></div>
  }
  return (
    <section className="mt-36">
      <h1 id="title" className="text-center text-3xl text-[#9a6324] font-bold">
        Marae Locations
      </h1>
      <h3
        id="subtitle"
        className="text-center text-xl text-secondary-foreground font-thin"
      >
        Click the marae to see available car parks
      </h3>

      {/* Filter Section */}
      <div className="flex justify-center mt-10">
        <div className="flex flex-row gap-0 mr-4 items-center justify-center">
          <input
            type="text"
            placeholder="Search by Marae name..."
            className="border border-gray-300 rounded-md p-2 rounded-r-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="border-gray-300 rounded-md rounded-l-none border-l-0 h-[42px] py-2 text-secondary-foreground/[0.6]"
            variant="outline"
            onClick={() => setSearchTerm("")}
          >
            clear
          </Button>
        </div>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">All Regions</option>
          <option value="Northland">Northland</option>
          <option value="Waikato">Waikato</option>
          <option value="Wellington">Wellington</option>
          {/* Add more regions as needed */}
        </select>
      </div>

      {/* Locations Grid */}
      <div className="mt-16 mb-16 grid sm:grid-cols-3 auto-cols-min auto-rows-min gap-4 px-12">
        {filteredLocations.map((loc, idx) => (
          <LocationImage
            key={loc.id + idx}
            id={loc.id}
            img={loc.img}
            title={loc.marae_name}
            address={loc.address}
            capacity={loc.total_capacity}
            occupied={loc.occupied}
            suburb={loc.suburb}
            region={loc.region}
          />
        ))}
      </div>
    </section>
  );
};

export default Locations;
