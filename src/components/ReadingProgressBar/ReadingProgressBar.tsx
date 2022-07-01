import React from 'react';

export default function ReadingProgressBar() {
  const [width, setWidth] = React.useState(0);

  const scrollHeight = () => {
    const el = document.querySelector('.drawer-content'),
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    const percent = ScrollTop / (ScrollHeight - el.clientHeight);
    setWidth(percent);
  };

  React.useEffect(() => {
    const el = document.querySelector('.drawer-content');

    el.addEventListener('scroll', scrollHeight);

    return () => el.removeEventListener('scroll', scrollHeight);
  });

  return (
    <div className='hidden h-[calc(88vh-40px)] max-h-[425px] w-[2px] bg-slate-400 opacity-70 dark:bg-gray-700 lg:block'>
      <div
        className='h-full w-[2px] origin-top bg-slate-700 dark:bg-slate-400'
        style={{
          transform: `scaleY(${width})`,
        }}
      ></div>
    </div>
  );
}
