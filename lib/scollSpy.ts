import throttle from 'lodash/throttle';
import * as React from 'react';

// originally based on
// https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/block.tsx#L128-L161

export default function useScrollSpy() {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  const throttleMs = 100;

  const actionSectionScrollSpy = throttle(() => {
    const sections = document.getElementsByClassName('hash-anchor');

    let prevBBox = null;
    let currentSectionId = activeSection;

    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i];

      if (!currentSectionId) {
        currentSectionId = section.getAttribute('href')?.split('#')[1] ?? null;
      }

      const bbox = section.getBoundingClientRect();
      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
      const offset = Math.max(200, prevHeight / 4);

      // GetBoundingClientRect returns values relative to viewport
      if (bbox.top - offset < 0) {
        currentSectionId = section.getAttribute('href')?.split('#')[1] ?? null;

        prevBBox = bbox;
        continue;
      }

      // No need to continue loop, if last element has been detected
      break;
    }

    setActiveSection(currentSectionId);
  }, throttleMs);

  React.useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy);

    actionSectionScrollSpy();

    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
}
