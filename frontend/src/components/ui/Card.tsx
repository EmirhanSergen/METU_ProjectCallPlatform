import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <div className="border rounded p-4 bg-white">{children}</div>;
}
