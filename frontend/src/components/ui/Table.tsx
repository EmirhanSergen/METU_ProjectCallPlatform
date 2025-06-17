import { ReactNode } from "react";

export default function Table({ children }: { children: ReactNode }) {
  return (
    <table className="min-w-full border" cellPadding={8} cellSpacing={0}>
      {children}
    </table>
  );
}
