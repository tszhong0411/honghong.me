import cn from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowUp, FaRegCommentDots } from 'react-icons/fa';
import smoothscroll from 'smoothscroll-polyfill';

export default function ScrollTopAndComment() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = document.querySelector('.drawer-content');

    smoothscroll.polyfill();
    const handlePageScroll = () => {
      if (el.scrollTop > 50) setShow(true);
      else setShow(false);
    };

    el.addEventListener('scroll', handlePageScroll);
    return () => el.removeEventListener('scroll', handlePageScroll);
  }, []);

  const handleScrollTop = () => {
    document
      .querySelector('.drawer-content')
      .scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleScrollToComment = () => {
    document
      .querySelector('.drawer-content')
      .scroll(0, document.getElementById('comment').offsetTop - (322 + 64)); // iframe height + navbar height
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
        className='rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600'
        aria-label='Scroll To Comment'
        type='button'
        onClick={handleScrollToComment}
      >
        <FaRegCommentDots size={15} />
      </button>
      <button
        aria-label='Scroll To Top'
        type='button'
        onClick={handleScrollTop}
        className='rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600'
      >
        <FaArrowUp size={15} />
      </button>
    </motion.div>
  );
}
