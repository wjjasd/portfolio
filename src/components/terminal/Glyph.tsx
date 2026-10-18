import type { ReactNode } from "react";

export type GlyphName =
  | "prompt"
  | "record"
  | "elbow"
  | "check"
  | "cross"
  | "box"
  | "box-half"
  | "box-checked"
  | "bullet"
  | "bullet-hollow"
  | "target"
  | "spin-0"
  | "spin-1"
  | "spin-2"
  | "spin-3"
  | "spin-4"
  | "spin-5";

function spokes(count: number, inner: number, outer: number): string {
  let d = "";
  for (let k = 0; k < count; k++) {
    const a = (k * 2 * Math.PI) / count - Math.PI / 2;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    d += `M${(8 + inner * cos).toFixed(2)} ${(8 + inner * sin).toFixed(2)}L${(8 + outer * cos).toFixed(2)} ${(8 + outer * sin).toFixed(2)}`;
  }
  return d;
}

const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

const SHAPES: Record<GlyphName, ReactNode> = {
  prompt: <polyline points="5,3 11,8 5,13" {...line} strokeWidth={2} />,
  record: <circle cx={8} cy={8} r={4.5} fill="currentColor" />,
  elbow: <path d="M4 1V11H14" {...line} strokeWidth={1.25} />,
  check: <path d="M3 8.5L6.5 12L13 4.5" {...line} strokeWidth={1.75} />,
  cross: <path d="M4 4L12 12M12 4L4 12" {...line} strokeWidth={1.75} />,
  box: <rect x={2.5} y={2.5} width={11} height={11} rx={1.5} {...line} strokeWidth={1.25} />,
  "box-half": (
    <>
      <circle cx={8} cy={8} r={5.5} {...line} strokeWidth={1.25} />
      <path d="M8 2.5A5.5 5.5 0 0 0 8 13.5Z" fill="currentColor" />
    </>
  ),
  "box-checked": (
    <>
      <rect x={2.5} y={2.5} width={11} height={11} rx={1.5} {...line} strokeWidth={1.25} />
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" {...line} strokeWidth={1.25} />
    </>
  ),
  bullet: <circle cx={8} cy={8} r={3.5} fill="currentColor" />,
  "bullet-hollow": <circle cx={8} cy={8} r={3.5} {...line} strokeWidth={1.25} />,
  target: (
    <>
      <circle cx={8} cy={8} r={5.5} {...line} strokeWidth={1.25} />
      <circle cx={8} cy={8} r={2.5} fill="currentColor" />
    </>
  ),
  "spin-0": <circle cx={8} cy={8} r={1.5} fill="currentColor" />,
  "spin-1": <path d={spokes(4, 1, 4)} {...line} strokeWidth={1.5} />,
  "spin-2": <path d={spokes(8, 1.5, 5)} {...line} strokeWidth={1} />,
  "spin-3": <path d={spokes(6, 1, 5)} {...line} strokeWidth={1.5} />,
  "spin-4": <path d={spokes(8, 1.5, 5)} {...line} strokeWidth={1.5} />,
  "spin-5": <path d={spokes(8, 1.5, 6)} {...line} strokeWidth={2} />,
};

interface GlyphProps {
  name: GlyphName;
  className?: string;
}

export default function Glyph({ name, className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      className={className ? `glyph ${className}` : "glyph"}
    >
      {SHAPES[name]}
    </svg>
  );
}
