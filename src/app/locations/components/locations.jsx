import './location.css'
import Image from 'next/image'
import Link from 'next/link'

const LocationImage = ({
  passedKey,
  id,
  img,
  title,
  address,
  capacity,
  occupied,
  suburb,
  region,
  description
}) => {
  return (
    <div className='program group' key={passedKey}>
      <Link href={'/locations/' + id}>
        <Image src={img} alt='' className='' />
        <div className='group-hover:100 group-hover:bg-black/55 caption md:space-y-2 rounded group'>
          <div className='space-y-1 mb-1 text-wrap tracking-wide max-w-[300px] text-[10px] sm:text-[12px] md:text-s 2xl:text-sm mt-8'>
            {address.split('|').slice(0, -1).map((add, i) => (
              <p className={i === 0 ? 'font-bold' : ''} key={add + i}>
                {add}
              </p>
            ))}
          </div>
          <p className='text-wrap tracking-wide max-w-[450px] text-[10px] sm:text-[12px] md:text-s 2xl:text-sm'>
            Total Capacity:&nbsp;<strong>{capacity}</strong>
          </p>
          <p className='text-wrap tracking-wide max-w-[450px] text-[10px] sm:text-[12px] md:text-s 2xl:text-sm'>
            Carparks Occupied:&nbsp;<strong>{occupied}</strong>
          </p>
          <p className='text-wrap tracking-wide max-w-[450px] text-[10px] sm:text-[12px] md:text-s 2xl:text-sm'>
            {description}
          </p>
        </div>
        <h3 className='group-hover:opacity-1 group-hover:bg-primary group-hover:text-white tracking-wide font-bold transition duration-500 absolute top-4 left-4 text-primary px-4 py-3 md:py-2 lg:py-3 sm:px-5 lg:px-5 rounded-full bg-primary-foreground w-max sm:text-base md:text-l shadow-2xl'>
          {title}
        </h3>
      </Link>
    </div>
  )
}

export default LocationImage
