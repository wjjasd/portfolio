import type { ReactNode } from "react";
import type { CSSVars } from "./cssVars";

interface OutputBlockProps {
  children: ReactNode;
  className?: string;
}

export default function OutputBlock({ children, className }: OutputBlockProps) {
  return <div className={className ? `out ${className}` : "out"}>{children}</div>;
}

/** Hero 출력 줄 stagger용 props. play 모드에서만 `1200ms + i * 80ms` 뒤에 나타난다 */
export function reveal(i: number): { "data-reveal": ""; style: CSSVars } {
  return { "data-reveal": "", style: { "--i": i } };
}
