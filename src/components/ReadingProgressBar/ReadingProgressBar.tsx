import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    const percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;

    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  });

  return (
    <div
      className='fixed top-[60px] z-50 h-[6px] bg-red-500'
      style={{ width: width + '%' }}
    ></div>
  );
}
