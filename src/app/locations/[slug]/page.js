"use client";
import { useState, useEffect } from "react";
import ParkingEventsChart from "./components/ParkingEventsChart";
import MaraeDataDisplay from "./components/ParkingDataDisplay";

const Page = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [parkingData, setParkingData] = useState([]);
  const [maraeData, setMaraeData] = useState([]);
  const [error, setError] = useState(null);

  console.log("Data:" , parkingData)

  useEffect(() => {
    const fetchParkingData = async () => {
      const apiURL = `/api/dashboard/${params.slug}`;
      try {
        const res = await fetch(apiURL, { method: "GET" });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setParkingData(data.items);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message);
      }
    };

    const fetchMaraeData = async () => {
      const response = await fetch(`/api/marae-locations/${params.slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        setMaraeData("No marae found");
      }
      const data = await response.json();
      setMaraeData(data);
    };
    setLoading(true);
    fetchParkingData();
    fetchMaraeData();
    setLoading(false);
  }, [params.slug]);

  if (loading)
    return (
      <div className="relative w-full h-full bg-[#f0f0f0]">
        <div className="loader absolute top-1/2 left-1/2"></div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-24 ">
      <header className="text-center mb-8 max-w-[600px] mx-auto py-6 px-12 shadow-lg bg-card border rounded-lg">
        <h1 className="text-primary text-2xl md:text-3xl 2xl:text-4xl font-bold mb-5">{maraeData.Name}</h1>
        <p className='text-[10px] md:text-base 2xl:text-base text-left'>
          {maraeData?.Address?.split('|').join(', ')}
        </p>
        <p className='text-m text-left font-thin'>
          Capacity:&nbsp;{maraeData?.Capacity}&nbsp;
        </p>
      </header>
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col md:flex-row justify-center gap-4 w-full flex-wrap">
          <ParkingEventsChart data={parkingData} />
          <MaraeDataDisplay 
            data={parkingData}
            maraeName={maraeData.Name}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
