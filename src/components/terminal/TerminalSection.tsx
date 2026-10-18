import type { ReactNode } from "react";
import PromptLine from "./PromptLine";
import type { Command } from "./commands";

interface TerminalSectionProps {
  id: string;
  cmd: Command;
  /** 실제 h2 (번역 텍스트). 섹션 aria-labelledby 대상 */
  title: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalSection({ id, cmd, title, children, className }: TerminalSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={`py-12 md:py-[72px] ${className ?? ""}`}>
      <div className="mx-auto max-w-[1040px] px-4 md:px-8">
        <PromptLine cmd={cmd} />
        <h2 id={titleId} className="sec-title">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
