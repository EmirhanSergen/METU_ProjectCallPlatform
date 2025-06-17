import { ButtonHTMLAttributes } from "react";

export default function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="px-3 py-1 bg-blue-500 text-white rounded" {...props}>
      {children}
    </button>
  );
}
