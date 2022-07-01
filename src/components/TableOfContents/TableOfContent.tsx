// * Source: https://github.com/theodorusclarence/theodorusclarence.com/blob/main/src/components/content/TableOfContents.tsx

import { motion } from 'framer-motion';
import React from 'react';

import ReadingProgressBar from '@/components/ReadingProgressBar';

import { TableOfContentsProps } from './types';
import { TOCLink } from '../Link';

export default function TableOfContents({
  toc,
  activeSection,
  minLevel,
}: TableOfContentsProps) {
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
    <motion.div
      className='fixed top-[266px] left-[30px] flex'
      initial={{ x: '-200', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
      }}
    >
      <ReadingProgressBar />
      <div
        id='toc-container'
        className='mb-[1.45rem] ml-[1.45rem] hidden max-w-[200px] flex-col 2xl:flex'
      >
        <div className='mt-4 flex flex-col space-y-2 text-sm'>
          {toc &&
            toc.map(({ id, level, text }) => (
              <TOCLink
                id={id}
                key={id}
                activeSection={activeSection}
                level={level}
                minLevel={minLevel}
                text={text}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
}
