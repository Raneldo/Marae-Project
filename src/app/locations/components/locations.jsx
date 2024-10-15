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
  region
}) => {
  return (
    <div className='program group' key={passedKey}>
      <Link href={'/locations/' + id}>
        <Image src={img} alt='' className='' />
        <div className='caption space-y-4 rounded group'>
          <div className='space-y-1 mb-2'>
            {address.split('|').map((add, i) => (
              <p className={i === 0 ? 'font-bold' : ''} key={add + i}>
                {add},
              </p>
            ))}
          </div>
          <p>
            Total Capacity:&nbsp;<strong>{capacity}</strong>
          </p>
          <p>
            Carparks Occupied:&nbsp;<strong>{occupied}</strong>
          </p>
        </div>
        <h3 className='group-hover:opacity-1 group-hover:bg-primary group-hover:text-white tracking-wide font-bold transition duration-500 absolute top-8 left-4 text-primary py-3 px-5 rounded-full bg-primary-foreground w-max text-xl shadow-2xl'>
          {title}
        </h3>
      </Link>
    </div>
  )
}

export default LocationImage
