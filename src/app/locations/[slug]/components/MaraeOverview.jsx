import CustomCard from './CustomCard'

const MaraeOverview = ({ maraeAbout, entryAmount }) => {
  return (
    <CustomCard title='Overview' id='marae-info'>
      <div className='mx-auto border rounded-lg bg-card shadow-md px-12 py-8 text-wrap md:text-nowrap'>
        <h2 className='text-lg text-secondary-foreground/[0.6] font-bold mb-2'>
          {maraeAbout?.Name}
        </h2>
        <h3 className='text-2xl tracking-wide'>
          {maraeAbout?.Address?.split('|').join(', ')}
        </h3>
        <p className='text-sm mb-6'>
          Capacity:&nbsp;{maraeAbout?.Capacity}&nbsp;|&nbsp;Number of Events:{' '}
          {entryAmount}
        </p>
        {/* <p className='text-wrap tracking-wide p-2 border border-muted rounded-lg bg-muted max-w-[450px]'>
          {maraeAbout?.Description}
        </p> */}
      </div>
    </CustomCard>
  )
}

export default MaraeOverview
