import Image from './Image'

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
      {items.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target='_blank'
          rel='noopener noreferrer'
          className='flex gap-6 rounded-lg border border-accent-2 p-4 transition-colors duration-300 hover:bg-accent-1 sm:flex-col sm:gap-3'
        >
          <Image
            src={item.image}
            width={256}
            height={256}
            alt={item.name}
            className='m-0 h-24 w-24 sm:h-full sm:w-full'
          />
          <div className='flex flex-col justify-center gap-2'>
            <div className='font-extrabold text-white'>{item.name}</div>
            <div>{item.description}</div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default ItemGrid
