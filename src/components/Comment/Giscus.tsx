import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect, useState } from 'react';

export const giscusConfig = {
  // Visit the link below, and follow the steps in the 'configuration' section
  // https://giscus.app/
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  mapping: 'pathname', // supported options: pathname, url, title
  reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
  // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
  metadata: '0',
  // theme example: light, dark, dark_dimmed, dark_high_contrast
  // transparent_dark, preferred_color_scheme, custom
  theme: 'light',
  // theme when dark mode
  darkTheme: 'dark',
  // If the theme option above is set to 'custom`
  // please provide a link below to your custom theme css file.
  // example: https://giscus.app/themes/custom_example.css
  themeURL: '',
  // Place the comment box above the comments. options: bottom, top
  inputPosition: 'bottom',
  // Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc (locale for i18n)
  lang: 'locale',
};

const Giscus = ({ mapping }) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [enableLoadComments, setEnabledLoadComments] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  const commentsTheme =
    giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? giscusConfig.darkTheme
        : giscusConfig.theme
      : giscusConfig.themeURL;

  const COMMENTS_ID = 'comments-container';

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false);

    const {
      repo,
      repositoryId,
      category,
      categoryId,
      reactions,
      metadata,
      inputPosition,
      lang,
    } = giscusConfig;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repositoryId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-reactions-enabled', reactions);
    script.setAttribute('data-emit-metadata', metadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-lang', lang === 'locale' ? locale : lang);
    script.setAttribute('data-theme', commentsTheme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = '';
    };
  }, [commentsTheme, locale, mapping]);

  // Reload on theme change
  useEffect(() => {
    !enableLoadComments && LoadComments();
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    enableLoadComments && LoadComments();
  }, [LoadComments, enableLoadComments]);

  return (
    <div className='py-6 text-center'>
      {enableLoadComments && (
        <button onClick={LoadComments}>{t('common:loadComments')}</button>
      )}
      <div className='giscus' id={COMMENTS_ID} />
    </div>
  );
};

export default Giscus;
