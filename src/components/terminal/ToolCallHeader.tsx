import type { ReactNode } from "react";
import Glyph from "./Glyph";
import type { Tool } from "./commands";

interface ToolCallHeaderProps {
  tool: Tool;
  args: string;
  /** ⎿ 줄. 영문 고정(ADR ⑦). 폼 전송 중에는 Spinner를 넣을 수 있다 */
  summary?: ReactNode;
  state?: "pending" | "ok" | "fail";
  className?: string;
}

export default function ToolCallHeader({ tool, args, summary, state = "ok", className }: ToolCallHeaderProps) {
  return (
    <div className={className} aria-hidden="true">
      <p className="toolcall" data-state={state}>
        <span className="dot">
          <Glyph name="record" />
        </span>
        <span className="tc-call">
          <span className="tc-name">{tool}</span>
          <span className="tc-arg">({args})</span>
        </span>
      </p>
      {summary != null && (
        <p className="tc-result">
          <span className="elbow">
            <Glyph name="elbow" />
          </span>
          <span>{summary}</span>
        </p>
      )}
    </div>
  );
}
