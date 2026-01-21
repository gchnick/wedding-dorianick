import type { PropsWithChildren } from "react";

import "@/components/react/Anchor.css";

type Props = PropsWithChildren<{
  id: string;
}>;

export function Anchor({ children, id }: Props) {
  return (
    <>
      <span className="anchor" id={id}>
        {children}
      </span>
      {children}
    </>
  );
}
