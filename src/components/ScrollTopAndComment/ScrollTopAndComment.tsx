import cn from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowUp, FaRegCommentDots } from 'react-icons/fa';
import smoothscroll from 'smoothscroll-polyfill';

export default function ScrollTopAndComment() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    smoothscroll.polyfill();
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true);
      else setShow(false);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleScrollToComment = () => {
    window.scroll(0, document.getElementById('comment').offsetTop - 104);
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
        className='rounded-md bg-body-secondary p-2 text-typeface-primary hover:bg-gray-300 dark:bg-body-secondary-dark dark:text-typeface-primary-dark dark:hover:bg-gray-600'
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
        className='rounded-md bg-body-secondary p-2 text-typeface-primary hover:bg-gray-300 dark:bg-body-secondary-dark dark:text-typeface-primary-dark dark:hover:bg-gray-600'
      >
        <FaArrowUp size={15} />
      </button>
    </motion.div>
  );
}
