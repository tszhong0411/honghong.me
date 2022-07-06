import cn from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ArrowUp, BrandHipchat } from 'tabler-icons-react';

export default function ScrollTopAndComment() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    smoothscroll.polyfill();
    const handlePageScroll = () => {
      if (window.scrollY > 50) setShow(true);
      else setShow(false);
    };

    window.addEventListener('scroll', handlePageScroll);
    return () => window.removeEventListener('scroll', handlePageScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleScrollToComment = () => {
    window.scroll(0, document.getElementById('comment').offsetTop - (322 + 64)); // iframe height + navbar height
  };

  const variants = {
    show: { opacity: 1, display: 'flex' },
    notShow: { opacity: 0, display: 'none' },
  };

  return (
    <motion.div
      className={cn('fixed right-4 bottom-16 z-50 flex-col gap-3')}
      animate={show ? 'show' : 'notShow'}
      variants={variants}
    >
      <button
        className='btn btn-square btn-sm rounded-md p-2'
        aria-label='Scroll To Comment'
        type='button'
        onClick={handleScrollToComment}
      >
        <BrandHipchat size={15} />
      </button>
      <button
        aria-label='Scroll To Top'
        type='button'
        onClick={handleScrollTop}
        className='btn btn-square btn-sm rounded-md p-2'
      >
        <ArrowUp size={15} />
      </button>
    </motion.div>
  );
}
