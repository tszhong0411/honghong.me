import Image from './Image'
import Link from '../Link'

export type Items = {
  image: string
  name: string
  description: string
  url: string
}[]

type ItemGridProps = {
  items: Items
}

const ItemGrid = (props: ItemGridProps) => {
  const { items } = props

  return (
    <div className='mb-9 grid grid-cols-1 gap-4 sm:grid-cols-4'>
      {items.map((item, i) => (
        <div
          key={i}
          className='flex gap-6 rounded-lg border border-accent-2 p-4 sm:flex-col sm:gap-3'
        >
          <Image
            src={item.image}
            width={256}
            height={256}
            alt={item.name}
            className='m-0 h-24 w-24 sm:h-auto sm:w-auto'
          />
          <div className='flex flex-col justify-center gap-2'>
            <span>
              <Link
                href={item.url}
                icon={false}
                color='white'
                className='font-extrabold'
              >
                {item.name}
              </Link>
            </span>
            <div>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemGrid
