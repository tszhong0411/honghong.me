import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { CgArrowRight } from 'react-icons/cg';

import { isProd } from '@/lib/isProduction';
import { PostsListProps } from '@/lib/types';
import formatDate from '@/lib/utils/formatDate';

import { CloudinaryImg } from '@/components/Image';
import Link from '@/components/Link';
import ViewCounter from '@/components/ViewCounter';

export default function PostsList({ post, divider }: PostsListProps) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { slug, date, title, summary, image } = post;
  const formattedSlug = slug.replace(`.${locale}`, '');
  const [hover, setHover] = React.useState<boolean>(false);

  return (
    <motion.li
      key={formattedSlug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
      }}
    >
      <article>
        <div className='py-12 xl:grid xl:grid-cols-3'>
          <div>
            <div className='mb-4 flex flex-row items-center gap-x-3'>
              <time dateTime={date}>{formatDate(date, locale)}</time>
              {' - '}
              {isProd && <ViewCounter slug={slug} text={false} type='GET' />}
            </div>
          </div>
          <div className='flex flex-col items-center md:flex-row xl:col-span-3'>
            <div className='my-8 w-full sm:my-0 sm:max-w-sm'>
              <Link href={`/blog/${formattedSlug}`}>
                <div className='overflow-hidden rounded-xl sm:px-0'>
                  <CloudinaryImg
                    noStyle
                    className='duration-500 hover:scale-110'
                    publicId={image}
                    alt={`${title} Cover`}
                    width={1280}
                    height={720}
                    preview={false}
                  />
                </div>
              </Link>
            </div>
            <div className='flex w-full flex-auto flex-col gap-2 py-8 sm:max-w-sm md:max-w-none md:p-8'>
              <div>
                <div>
                  <h2 className='text-2xl font-bold'>
                    <Link
                      href={`/blog/${formattedSlug}`}
                      className='link link-hover dark:text-primary-content'
                    >
                      {title}
                    </Link>
                  </h2>
                </div>
                <div className='mb-8 mt-6'>{summary}</div>
                <Link
                  href={`/blog/${formattedSlug}`}
                  aria-label={`Read "${title}"`}
                  className='btn btn-primary gap-2 font-medium'
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  {t('common:readMore')}
                  <motion.div animate={{ x: hover ? 5 : 0 }}>
                    <CgArrowRight size={20} />
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
      {divider && <div className='divider'></div>}
    </motion.li>
  );
}
