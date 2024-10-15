import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart'
import { useState, useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const chartConfig = {
  count: {
    color: '#f97316',
    label: 'Date'
  }
}

const ParkingEventsChart = ({ data }) => {
  const [finalData, setFinalData] = useState([])
  useEffect(() => {
    const formatData = () => {
      const countMap = data.reduce((acc, item) => {
        if (!item.EntryDate) {
          return acc
        }
        const date = new Date(item.EntryDate).toISOString().split('T')[0]
        if (acc.has(date)) {
          acc.set(date, acc.get(date) + 1)
        } else {
          acc.set(date, 1)
        }
        return acc
      }, new Map())

      const result = Array.from(countMap, ([date, count]) => ({ date, count }))

      result.sort((a, b) => new Date(a.date) - new Date(b.date))

      return result
    }
    if (data) {
      const formattedData = formatData()
      setFinalData(formattedData)
    } else {
      setFinalData([])
    }
  }, [data])

  return (
    <ChartContainer
      config={chartConfig}
      className='min-h-[400px] border px-12 py-8 rounded-lg bg-card shadow-md '
    >
      <BarChart data={finalData}>
        <XAxis
          dataKey='date'
          tickLine={true}
          tickMargin={10}
          axisLine={true}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent labelKey='Occupied Parks' />} />
        <ChartLegend content={<ChartLegendContent />} />
        <CartesianGrid vertical={false} />
        <Bar dataKey='count' fill='#f97316' radius={2} />
      </BarChart>
    </ChartContainer>
  )
}

export default ParkingEventsChart
