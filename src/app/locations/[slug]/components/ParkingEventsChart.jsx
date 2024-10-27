import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts'; // Import Legend

const chartConfig = {
  count: {
    color: '#f97316',
    label: 'Count',
  },
};

const ParkingEventsChart = ({ data }) => {
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    const formatData = () => {
      const countMap = data.reduce((acc, item) => {
        if (!item.EntryDate) {
          return acc;
        }
        const date = new Date(item.EntryDate).toISOString().split('T')[0];
        acc.set(date, (acc.get(date) || 0) + 1);
        return acc;
      }, new Map());

      const result = Array.from(countMap, ([date, count]) => ({
        date,
        count,
      }));

      result.sort((a, b) => new Date(a.date) - new Date(b.date));

      return result;
    };

    setFinalData(data ? formatData() : []);
  }, [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className="max-w-[800px] w-full border px-0 py-0 sm:px-4 sm:py-4 rounded-lg bg-card shadow-md"
    >
      <BarChart data={finalData} margin={{ top: 20, right: 30, bottom: 30, left: 30 }}>
        {/* X-Axis with Label and Padding */}
        <XAxis 
          dataKey="date" 
          tickLine={true} 
          tickMargin={10} 
          axisLine={true}
          label={{ value: 'Date', position: 'insideBottom', dy: 10 }}
        />

        {/* Y-Axis with Label and Padding */}
        <YAxis 
          label={{ value: 'Amount', angle: -90, position: 'insideLeft', dy: -10 }}
        />

        <ChartTooltip 
          content={<ChartTooltipContent labelKey="Occupied Parks" />} 
        />

        {/* Legend Positioned at Top-Right */}
        <Legend 
          verticalAlign="top" 
          align="right" 
          wrapperStyle={{ paddingBottom: '20px' }} 
        />

        <CartesianGrid vertical={false} />
        <Bar dataKey="count" fill="#f97316" radius={2} />
      </BarChart>
    </ChartContainer>
  );
};

export default ParkingEventsChart;
