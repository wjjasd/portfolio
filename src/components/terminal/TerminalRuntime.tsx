"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// 섹션 명령 타이핑 트리거 (ADR ③-6). 마운트 시점에 뷰포트 안/위의 명령은 그대로 두고
// 아래쪽만 pending → 진입 시 run. 도중에 실패하면 아무것도 숨기지 않는다(fail-open).
export default function TerminalRuntime() {
  const pathname = usePathname();
  const firstPath = useRef<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (firstPath.current === null) firstPath.current = pathname;

    // 언어 전환 같은 클라이언트 내비게이션 뒤에는 재생하지 않고 정적 화면으로 둔다
    if (firstPath.current !== pathname) {
      root.removeAttribute("data-term");
      return;
    }
    if (root.getAttribute("data-term") !== "play" || !("IntersectionObserver" in window)) return;

    const pending: HTMLElement[] = [];
    let io: IntersectionObserver | null = null;
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute("data-typed", "run");
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io = observer;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".prompt[data-cmd]").forEach((el) => {
        if (el.dataset.typed || el.getBoundingClientRect().top <= vh) return;
        el.setAttribute("data-typed", "pending");
        pending.push(el);
        observer.observe(el);
      });
    } catch {
      io?.disconnect();
      pending.forEach((el) => el.removeAttribute("data-typed"));
      return;
    }

    return () => {
      io?.disconnect();
      pending.forEach((el) => {
        if (el.dataset.typed === "pending") el.removeAttribute("data-typed");
      });
    };
  }, [pathname]);

  return null;
}
