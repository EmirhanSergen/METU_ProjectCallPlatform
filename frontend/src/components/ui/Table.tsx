import { ReactNode } from "react";
import { cn } from "../../lib/utils";
interface Props {
  children: ReactNode;
  className?: string;
}

export default function Table({ children, className }: Props) {
  return (
    <table
      className={cn("min-w-full border", className)}
      cellPadding={8}
      cellSpacing={0}
    >
      {children}
    </table>
  );
}
