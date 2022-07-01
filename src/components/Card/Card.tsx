import useTranslation from 'next-translate/useTranslation';

import Link from '@/components/Link';

const Card = ({ title, description, href }) => {
  const { t } = useTranslation();

  return (
    <div className='card w-full bg-base-100 shadow-lg dark:bg-base-200'>
      <div className='card-body gap-4'>
        <h2 className='card-title'>{title}</h2>
        <p>{description}</p>
        <div className='card-actions mt-2 justify-start'>
          <Link className='btn btn-primary' href={href}>
            {t('common:visit')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
