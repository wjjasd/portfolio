import Glyph, { type GlyphName } from "./Glyph";
import type { CSSVars } from "./cssVars";

// 핑퐁 10프레임: 0 1 2 3 4 5 4 3 2 1
const FRAMES: readonly GlyphName[] = [
  "spin-0", "spin-1", "spin-2", "spin-3", "spin-4",
  "spin-5", "spin-4", "spin-3", "spin-2", "spin-1",
];

interface SpinnerProps {
  label: string;
  /** 정적 경과시간 텍스트 (예: "(1s)") */
  elapsed?: string;
  /** ms */
  start?: number;
  /** ms, 10프레임 한 바퀴 */
  cycle?: number;
  iterations?: number | "infinite";
  /** Hero 전용: 첫 출력 줄 자리에 absolute로 겹치고 play 모드에서만 0.6–1.2s 보인다 */
  intro?: boolean;
  className?: string;
}

export default function Spinner({
  label,
  elapsed,
  start = 0,
  cycle = 600,
  iterations = "infinite",
  intro = false,
  className,
}: SpinnerProps) {
  const classes = ["spin", intro && "spin-intro", className].filter(Boolean).join(" ");
  const vars: CSSVars = {
    "--spin-start": `${start}ms`,
    "--spin-cycle": `${cycle}ms`,
    "--spin-iter": iterations,
  };

  return (
    <span className={classes} aria-hidden="true">
      <span className="frames" style={vars}>
        {FRAMES.map((name, f) => {
          const frameVars: CSSVars = { "--f": f };
          return (
            <span key={f} style={frameVars}>
              <Glyph name={name} />
            </span>
          );
        })}
      </span>{" "}
      <span className="shimmer">{label}</span>
      {elapsed && <span className="text-fg-dim"> {elapsed}</span>}
    </span>
  );
}
