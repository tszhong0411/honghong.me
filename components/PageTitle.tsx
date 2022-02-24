import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="mb-[16px] text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
      {children}
    </h1>
  );
}
