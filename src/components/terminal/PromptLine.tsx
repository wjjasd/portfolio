import Glyph from "./Glyph";
import type { Command } from "./commands";
import type { CSSVars } from "./cssVars";

interface PromptLineProps {
  cmd: Command;
  /** section: 스크롤 진입 시 타이핑(TerminalRuntime 관찰 대상) · hero: 첫 진입 CSS 타임라인 */
  variant?: "section" | "hero";
  className?: string;
}

export default function PromptLine({ cmd, variant = "section", className }: PromptLineProps) {
  const classes = ["prompt", variant === "hero" && "prompt-hero", className].filter(Boolean).join(" ");
  const vars: CSSVars = { "--n": cmd.length };

  return (
    // --n은 .cmd 형제인 .caret 애니메이션 길이에도 쓰이므로 부모에 둔다
    <p className={classes} style={vars} aria-hidden="true" data-cmd={variant === "section" ? "" : undefined}>
      <span className="ps1">
        <Glyph name="prompt" />
      </span>{" "}
      <span className="cmd">
        {cmd}
      </span>
      <span className="caret" />
    </p>
  );
}
