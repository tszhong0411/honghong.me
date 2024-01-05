import { SiNextdotjs } from '@icons-pack/react-simple-icons'
import { IconHeartFilled } from '@tabler/icons-react'

const FavouriteFramework = () => {
  return (
    <div className='flex flex-col gap-6 rounded-xl bg-background-lighter/60 p-4 shadow-card-border lg:p-6'>
      <div className='flex items-center gap-2'>
        <IconHeartFilled size={18} />
        <h2 className='text-sm font-light'>Fav. framework</h2>
      </div>
      <div className='flex items-center justify-center'>
        <SiNextdotjs size={80} className='text-zinc-400' />
      </div>
    </div>
  )
}

export default FavouriteFramework
