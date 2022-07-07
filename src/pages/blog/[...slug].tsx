/* eslint-disable @typescript-eslint/no-explicit-any */
import { allBlogs } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { coreContent, sortedBlogPost } from '@/lib/utils/contentlayer';

import components from '@/components/MDXComponents';

import BlogLayout from '@/layouts/blog';

export const getServerSideProps = async ({ params, locale }) => {
  const slug = (params.slug as string[]).join('.');
  const sortedPosts = sortedBlogPost(
    allBlogs.filter(
      (p) => p.slug.split('.')[p.slug.split('.').length - 1] === locale
    )
  );
  const postIndex = sortedPosts.findIndex(
    (p) => p.slug === `${slug}.${locale}`
  );
  // TODO: Refactor this extraction of coreContent
  const prevContent = sortedPosts[postIndex + 1] || null;
  const prev = prevContent ? coreContent(prevContent) : null;
  const nextContent = sortedPosts[postIndex - 1] || null;
  const next = nextContent ? coreContent(nextContent) : null;
  const post = sortedPosts.find((p) => p.slug === `${slug}.${locale}`);

  return {
    props: {
      post,
      prev,
      next,
    },
  };
};

export default function Blog({ post, prev, next }) {
  const Component = useMDXComponent(post.body.code);

  return (
    <>
      {post && (
        <BlogLayout content={post} prev={prev} next={next}>
          <Component components={components} />
        </BlogLayout>
      )}
    </>
  );
}
