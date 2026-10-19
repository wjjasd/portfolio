// 명령어는 번역하지 않는다(ADR ④). `ch` 단위 타이핑이라 ASCII 전용, 360px 한 줄 기준 28자 이하.
export const MAX_CMD_LENGTH = 28;

type FitsIn<S extends string, Max extends number, Acc extends 0[] = []> =
  Acc["length"] extends Max
    ? S extends "" ? true : false
    : S extends `${string}${infer Rest}`
      ? FitsIn<Rest, Max, [...Acc, 0]>
      : true;

type Checked<T extends Record<string, string>> = {
  readonly [K in keyof T]: FitsIn<T[K], typeof MAX_CMD_LENGTH> extends true
    ? T[K]
    : `ERROR: "${T[K]}" exceeds ${typeof MAX_CMD_LENGTH} chars`;
};

const checked = <const T extends Record<string, string>>(table: T & Checked<T>): T => table;

export const CMD = checked({
  hero: "whoami",
  projects: "ls projects/",
  skills: "ls skills/",
  experience: "git log --graph career",
  github: "./contrib.sh 52w",
  blog: "head -5 blog.rss",
  contact: "cat ~/.contacts",
  mail: "mail --to kjyang",
} as const);

export type Command = (typeof CMD)[keyof typeof CMD];

export const TOOL = {
  read: "Read",
  send: "Send",
} as const;

export type Tool = (typeof TOOL)[keyof typeof TOOL];

export const SPIN_LABEL = {
  thinking: "Thinking…",
  sending: "Sending…",
} as const;
