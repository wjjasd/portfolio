"use client";

import { useEffect } from "react";

// Hero 선택 메뉴 숫자키 단축키 (ADR ⑦). 입력 중이거나 모달이 열려 있으면 무시
export default function MenuHotkeys() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (!/^[1-9]$/.test(e.key)) return;
      const target = e.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select"))) return;
      if (document.querySelector('[aria-modal="true"], dialog[open]')) return;

      const link = document.querySelector<HTMLAnchorElement>(`.menu a[data-key="${e.key}"]`);
      if (!link) return;
      e.preventDefault();
      link.click();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
