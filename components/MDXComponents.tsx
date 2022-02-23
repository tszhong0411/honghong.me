/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import { ComponentMap, getMDXComponent } from "mdx-bundler/client";
import CustomLink from "./Link";
import Image from "./PostImage";
import TOCInline from "./TOCInline";
import Pre from "./Pre";
import { BlogNewsletterForm } from "./NewsletterForm";

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default;
  return <Layout {...rest} />;
};

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: Wrapper,
};

interface Props {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
