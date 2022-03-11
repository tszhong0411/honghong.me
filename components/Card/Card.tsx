import useTranslation from 'next-translate/useTranslation'

import Link from '@/components/Link'

const Card = ({ title, description, href }) => {
  const { t } = useTranslation()

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2">
      <div className="rounded-md bg-body-secondary/75 dark:bg-body-secondary-dark/75">
        <div className="overflow-hidden rounded-md">
          <div className="p-6">
            <h2 className="mb-3 text-2xl font-bold">{title}</h2>
            <p className="mb-3 max-w-none text-base text-typeface-secondary dark:text-typeface-secondary-dark">
              {description}
            </p>
            {href && (
              <Link href={href} aria-label={`Link to ${title}`}>
                {t('common:learnMore')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
