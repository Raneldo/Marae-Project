import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import CustomCard from './CustomCard'
import { Space, Download } from 'lucide-react'

const MaraeDataDisplay = ({ data }) => {
  const [selected, setSelected] = useState(null)
  const [toCsvBtnIcon, setToCsvBtnIcon] = useState(<Space size={20} />)
  const handleSelect = selectedEvent => {
    setSelected(selectedEvent ? selectedEvent : data[0])
  }
  useEffect(() => {
    setSelected(data[data.length - 1])
  }, [data])

  const handleToCsv = () => {
    if (!data) {
      return
    }

    console.log(data)

    // Step 1: Define the CSV header (keys) based on the structure of your data
    const headers = [
      'EventID',
      'LocationID',
      'VehicleID',
      'EntryDate',
      'EntryTime',
      'ExitDate',
      'ExitTime'
    ]

    const csvRows = data.map(item => {
      return headers.map(header => item[header] || '').join(',')
    })
    const csvContent = [headers.join(','), ...csvRows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'events_data.csv'
    a.style.display = 'none'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <CustomCard title='Parking Events' id='parking-events'>
      <div className='border rounded-lg bg-card px-12 py-8 flex flex-col justify-start shadow-md'>
        {selected ? (
          <div className='flex flex-row justify-between'>
            <div className='space-y-2 tracking-wide'>
              <p>
                <strong>Event ID:</strong> {selected.EventID}
              </p>
              <p>
                <strong>Vehicle ID:</strong> {selected.VehicleID}
              </p>

              <p>
                <strong>Entry Time:</strong>{' '}
                {selected.EntryTime
                  ? new Date(selected.EntryTime).toLocaleTimeString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Exit Date:</strong>{' '}
                {selected.ExitDate
                  ? new Date(selected.ExitDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Exit Time:</strong>{' '}
                {selected.ExitTime
                  ? new Date(selected.ExitTime).toLocaleTimeString()
                  : 'N/A'}
              </p>
            </div>
            <p className='text-7xl my-auto p-0'>🚗</p>
          </div>
        ) : (
          <div className='flex flex-row justify-evenly items-center'>
            <h1>No data..</h1>
            <p className='text-6xl'>🤷‍♂️</p>
          </div>
        )}
      </div>
      <div className='shadow-md rounded-lg'>
        <div className='px-14 text-xl pt-3 pb-2 bg-card w-[400px] font-bold text-secondary-foreground border-t rounded-t-lg shadow-md'>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-secondary-foreground/[0.6]'>Entries</h1>
            <p className='text-xs'>
              <span className='text-secondary-foreground/[0.6]'>
                Click an entry for details
              </span>
              &nbsp;&nbsp;👇
            </p>
          </div>
          <hr />
        </div>
        <div className='h-[200px] w-[400px] bg-card overflow-auto flex flex-col items-center scroll'>
          {data &&
            data
              .slice()
              .reverse()
              .map(event => (
                <Button
                  key={event.EventID}
                  onClick={() => handleSelect(event)}
                  className='tracking-wide group rounded-lg w-max border-none hover:border-y py-7 px-4'
                  variant={
                    event && selected && event.EventID === selected?.EventID
                      ? 'default'
                      : 'outline'
                  }
                >
                  <strong>Event ID:</strong>&nbsp;{event && event.EventID}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <strong>Entry Date:</strong>&nbsp;
                  {event && event.EntryDate
                    ? new Date(event.EntryDate).toLocaleDateString()
                    : 'N/A'}
                  &nbsp;&nbsp;
                  <span className='group-hover:translate-x-1 transition-transform'>
                    {event && selected && event.EventID === selected.EventID
                      ? '✓'
                      : '→'}
                  </span>
                </Button>
              ))}
        </div>
        <div className='px-14 text-xl pt-3 pb-3 bg-card w-[400px] font-bold text-secondary-foreground border-b rounded-b-lg shadow-md space-y-2'>
          <hr />
          <Button
            className='text-secondary-foreground/[0.6] text-sm w-full group'
            variant='ghost'
            onMouseEnter={() =>
              setToCsvBtnIcon(<Download size={20} color='#22c55e' />)
            }
            onMouseLeave={() => setToCsvBtnIcon(<Space size={20} />)}
            onClick={() => handleToCsv()}
          >
            {toCsvBtnIcon}&nbsp; Export data to&nbsp;
            <span className='text-green-500 group-hover:border-b group-hover:border-b-green-500'>
              csv
            </span>
          </Button>
        </div>
      </div>
    </CustomCard>
  )
}

export default MaraeDataDisplay