import { Affix, Button, Group } from '@mantine/core';
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
    window.scroll(0, document.getElementById('comment').offsetTop - 60); // minus navbar height
  };

  const variants = {
    show: { opacity: 1, display: 'flex' },
    notShow: { opacity: 0, display: 'none' },
  };

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <motion.div animate={show ? 'show' : 'notShow'} variants={variants}>
        <Group direction='column' spacing='xs'>
          <Button
            onClick={handleScrollToComment}
            sx={{ width: 40, height: 40 }}
            p={0}
            radius='md'
          >
            <BrandHipchat size={25} />
          </Button>
          <Button
            onClick={handleScrollTop}
            sx={{ width: 40, height: 40 }}
            p={0}
            radius='md'
          >
            <ArrowUp size={25} />
          </Button>
        </Group>
      </motion.div>
    </Affix>
  );
}
