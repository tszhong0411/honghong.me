import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  [key: string]: unknown;
}

export default function PageTitle({ children, ...rest }: Props) {
  return (
    <h1
      className="text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl"
      {...rest}
    >
      {children}
    </h1>
  );
}
