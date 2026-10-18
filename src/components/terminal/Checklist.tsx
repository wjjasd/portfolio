import type { ReactNode } from "react";
import Glyph, { type GlyphName } from "./Glyph";

export type ChecklistStatus = "done" | "doing" | "todo";

export interface ChecklistItem {
  status: ChecklistStatus;
  text: ReactNode;
}

interface ChecklistProps {
  items: ChecklistItem[];
  /** sr-only 상태 접두어 (terminal 네임스페이스 번역, 예: { done: "완료:", ... }) */
  srLabels: Record<ChecklistStatus, string>;
  className?: string;
}

const BOX: Record<ChecklistStatus, GlyphName> = {
  done: "box-checked",
  doing: "box-half",
  todo: "box",
};

export default function Checklist({ items, srLabels, className }: ChecklistProps) {
  return (
    <ul className={className ? `check ${className}` : "check"}>
      {items.map((item, i) => (
        <li key={i} data-status={item.status}>
          <span className="box">
            <Glyph name={BOX[item.status]} />
          </span>
          <span>
            <span className="sr-only">{srLabels[item.status]} </span>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
