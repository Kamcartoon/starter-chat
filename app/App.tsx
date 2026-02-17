"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const headerRef = useRef<HTMLElement | null>(null);
  const [headerH, setHeaderH] = useState(0);

  // Measure header height (handles mobile wrapping, dynamic font sizes, etc.)
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => setHeaderH(el.getBoundingClientRect().height);

    measure();

    // Re-measure on resize/orientation changes
    window.addEventListener("resize", measure);

    // Re-measure if the header content wraps (ResizeObserver is best for this)
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main
      className="w-screen overflow-hidden"
      style={{
        // mobile-safe viewport height
        height: "100dvh",
        background: "#000",
      }}
    >
      {/* Sticky header (no overlap) */}
      <header
        ref={headerRef}
        className="sticky top-0 z-[9999] w-full border-b border-white/10 bg-slate-950/40 backdrop-blur"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0 text-white">
            <div className="truncate text-base font-semibold tracking-tight sm:text-lg">
              Clark Audio Bot
            </div>
            <div className="truncate text-xs text-white/60">
              Instant help
            </div>
          </div>

          <a
            href="https://clarkaudio.com/contact/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/15"
          >
            Talk to human
          </a>
        </div>
      </header>

      {/* Chat fills EXACT remaining height */}
      <div
        className="w-full"
        style={{
          height: headerH ? `calc(100dvh - ${headerH}px)` : "calc(100dvh - 72px)",
        }}
      >
        <ChatKitPanel
          theme={scheme}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}







