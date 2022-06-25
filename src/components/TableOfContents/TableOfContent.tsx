// * Source: https://github.com/theodorusclarence/theodorusclarence.com/blob/main/src/components/content/TableOfContents.tsx

import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { TableOfContentsProps } from './types';
import { TOCLink } from '../Link';

export default function TableOfContents({
  toc,
  activeSection,
  minLevel,
}: TableOfContentsProps) {
  const { t } = useTranslation();

  //#region  //*=========== Scroll into view ===========
  const lastPosition = React.useRef<number>(0);

  React.useEffect(() => {
    const container = document.getElementById('toc-container');
    const activeLink = document.getElementById(`link-${activeSection}`);

    if (container && activeLink) {
      // Get container properties
      const cTop = container.scrollTop;
      const cBottom = cTop + container.clientHeight;

      // Get activeLink properties
      const lTop = activeLink.offsetTop - container.offsetTop;
      const lBottom = lTop + activeLink.clientHeight;

      // Check if in view
      const isTotal = lTop >= cTop && lBottom <= cBottom;

      const isScrollingUp = lastPosition.current > window.scrollY;
      lastPosition.current = window.scrollY;

      if (!isTotal) {
        // Scroll by the whole clientHeight
        const offset = 25;
        const top = isScrollingUp
          ? lTop - container.clientHeight + offset
          : lTop - offset;

        container.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [activeSection]);
  //#endregion  //*======== Scroll into view ===========

  return (
    <div
      id='toc-container'
      className='hidden max-h-[calc(100vh-9rem-113px)] overflow-auto pb-4 lg:block'
    >
      <h3 className='text-gray-900 dark:text-gray-100 md:text-xl'>
        {t('common:toc')}
      </h3>
      <div className='mt-4 flex flex-col space-y-2 text-sm'>
        {toc
          ? toc.map(({ id, level, text }) => (
              <TOCLink
                id={id}
                key={id}
                activeSection={activeSection}
                level={level}
                minLevel={minLevel}
                text={text}
              />
            ))
          : null}
      </div>
    </div>
  );
}
