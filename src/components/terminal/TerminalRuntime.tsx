"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// 섹션 명령 타이핑 트리거 (ADR ③-6). 마운트 시점에 뷰포트 안/위의 명령은 그대로 두고
// 아래쪽만 pending → 섹션 진입 시 run(명령 타이핑 → 출력 등장, CSS).
// 앵커 점프·역스크롤로 명령이 이미 화면 위로 지나간 채 진입하면 재생 없이 완성 화면으로 둔다.
// 도중에 실패하면 아무것도 숨기지 않는다(fail-open).
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
    const promptOf = new Map<Element, HTMLElement>();
    let io: IntersectionObserver | null = null;
    try {
      // 섹션을 관찰하면 상단 패딩(48/72px)만큼 명령보다 먼저 걸린다. 별도 선행 rootMargin은 두지 않는다
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const prompt = promptOf.get(entry.target);
          if (!entry.isIntersecting || !prompt) continue;
          observer.unobserve(entry.target);
          if (prompt.getBoundingClientRect().bottom <= 0) prompt.removeAttribute("data-typed");
          else prompt.setAttribute("data-typed", "run");
        }
      });
      io = observer;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".prompt[data-cmd]").forEach((el) => {
        const section = el.closest("section");
        if (!section || el.dataset.typed || el.getBoundingClientRect().top <= vh) return;
        el.setAttribute("data-typed", "pending");
        pending.push(el);
        promptOf.set(section, el);
        observer.observe(section);
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
