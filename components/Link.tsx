/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

const CustomLink = ({
  href,
  children,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
      <span>
        <svg
          className="relative top-[-1px] ml-1 inline-block h-4 w-4 align-middle"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </span>
    </a>
  );
};

export default CustomLink;
