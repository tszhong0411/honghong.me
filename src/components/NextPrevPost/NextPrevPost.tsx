import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { ArrowRight } from 'tabler-icons-react';

import Link from '@/components/Link';

interface Props {
  heading: string;
  title: string;
  summary: string;
  slug: string;
}

export default function NextPrevPost({ heading, title, summary, slug }: Props) {
  const { t } = useTranslation();
  const [hover, setHover] = React.useState<boolean>(false);

  return (
    <div className='sm:w-1/2'>
      <span className='mb-10 block text-xl font-medium dark:text-primary-content'>
        {heading}
      </span>
      <div className='font-medium'>
        <Link href={`/blog/${slug}`} className='dark:text-primary-content'>
          {title}
        </Link>
        <div className='mb-6 mt-4'>
          <p>{summary}</p>
        </div>
        <Link
          href={`/blog/${slug}`}
          aria-label={`Read "${title}"`}
          className='btn btn-primary gap-2 font-medium'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {t('common:readMore')}
          <motion.div animate={{ x: hover ? 5 : 0 }}>
            <ArrowRight size={20} />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
