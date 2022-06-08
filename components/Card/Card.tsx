import { motion } from 'framer-motion'

import openInNewTab from '@/lib/utils/openInNewTab'

const Card = ({ title, description, href }) => {
  return (
    <motion.button
      transition={{
        duration: 0.3,
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="w-full select-none rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 text-left"
      onClick={() => openInNewTab(href)}
    >
      <div className="h-full rounded-md bg-body-secondary/75 dark:bg-body-secondary-dark/75">
        <div className="overflow-hidden rounded-md">
          <div className="p-6">
            <h2 className="mb-3 text-2xl font-bold">{title}</h2>
            <p className="mb-3 max-w-none text-base text-typeface-secondary dark:text-typeface-secondary-dark">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export default Card
