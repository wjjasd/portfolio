import type { ReactNode } from "react";

interface DiffBlockProps {
  /** `-` 줄 (개선 전). 전부 먼저 출력된다 */
  before: ReactNode[];
  /** `+` 줄 (개선 후) */
  after: ReactNode[];
  /** sr-only 접두어 (예: { before: "개선 전:", after: "개선 후:" }) */
  srLabels: { before: string; after: string };
  label?: string;
  className?: string;
}

export default function DiffBlock({ before, after, srLabels, label, className }: DiffBlockProps) {
  return (
    <ul className={className ? `diff ${className}` : "diff"} aria-label={label}>
      {before.map((content, i) => (
        <li key={`del-${i}`} className="del">
          <span aria-hidden="true">- </span>
          <span className="sr-only">{srLabels.before} </span>
          {content}
        </li>
      ))}
      {after.map((content, i) => (
        <li key={`add-${i}`} className="add">
          <span aria-hidden="true">+ </span>
          <span className="sr-only">{srLabels.after} </span>
          {content}
        </li>
      ))}
    </ul>
  );
}
