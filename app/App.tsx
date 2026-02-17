"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

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
        // Fixes iOS Safari "100vh" issues (address bar)
        height: "100dvh",
      }}
    >
      {/* Header (sticky so it doesn't break layout height on mobile) */}
      <header className="sticky top-0 z-[9999] w-full border-b border-white/10 bg-slate-950/40 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0 text-white">
            <div className="truncate text-base font-semibold tracking-tight sm:text-lg">
              Clark Audio Instant Support
            </div>
            <div className="truncate text-xs text-white/60">
              Instant help for Clark Audio customers
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

      {/* Chat area: takes the remaining height below the sticky header */}
      <div
        className="w-full"
        style={{
          height: "calc(100dvh - var(--header-h, 0px))",
        }}
      >
        {/* We measure header height via CSS variable by setting it here with a known value.
            Since header content can wrap on mobile, we avoid hardcoding by letting the page flow.
            So instead, we just make the chat fill the remaining space using flex below. */}
        <div className="flex h-[calc(100dvh-64px)] w-full flex-col sm:h-[calc(100dvh-72px)]">
          <ChatKitPanel
            theme={scheme}
            onWidgetAction={handleWidgetAction}
            onResponseEnd={handleResponseEnd}
            onThemeRequest={setScheme}
          />
        </div>
      </div>
    </main>
  );
}






