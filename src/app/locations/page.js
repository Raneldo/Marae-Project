"use client";
import { useEffect, useState } from "react";
import LocationImage from "./components/locations";
import { Button } from "@/components/ui/button";
import Title from "@/components/title/Title";

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
    <section className="mt-28">

      <Title subtitle="Marae Locations" title="Click the marae to see available car parks" />


      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-center mt-10 gap-4 w-full px-4">
        {/* Search Input + Clear Button */}
        <div className="flex w-full md:w-auto items-center">
          <input
            type="text"
            placeholder="Search by Marae name..."
            className="border border-gray-300 rounded-l-md p-2 flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="border border-gray-300 rounded-r-md border-l-0 h-[42px] px-4 text-secondary-foreground/[0.6]"
            variant="outline"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </Button>
        </div>

        {/* Region Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">All Regions</option>
            <option value="Northland">Northland</option>
            <option value="Auckland">Auckland</option>
            <option value="Waikato">Waikato</option>
            <option value="Wellington">Wellington</option>
          </select>
        </div>
      </div>



      {/* Locations Grid */}
      <div className="mt-16 mb-16 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-12">
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
            description={loc.description}
          />
        ))}
      </div>

    </section>
  );
};

export default Locations;
