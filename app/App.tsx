"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(72);

  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerRef.current);

    return () => observer.disconnect();
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
    <main className="h-[100dvh] w-screen overflow-hidden bg-[#0b1220]">
      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-[9999] flex w-full items-center justify-between border-b border-white/10 bg-[#0b1220]/90 px-4 py-3 backdrop-blur"
      >
        <div className="text-white">
          <div className="text-base font-semibold tracking-tight sm:text-lg">
            Clark Audio Instant Support
          </div>
          <div className="text-xs text-white/60 sm:text-sm">
            AI-powered help for plugins & downloads
          </div>
        </div>

        <a
          href="https://clarkaudio.com/contact/"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur hover:bg-white/15 sm:px-4 sm:text-sm"
        >
          Talk to human
        </a>
      </header>

      {/* Chat area */}
      <div
        style={{ height: `calc(100dvh - ${headerHeight}px)` }}
        className="w-full"
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







