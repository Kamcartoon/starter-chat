"use client";

import { useCallback } from "react";
import Image from "next/image";
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
    <main className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#0b1220]">
      {/* Header */}
      <header className="sticky top-0 z-[9999] w-full border-b border-white/10 bg-[#0b1220]/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo + subtitle */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Clark Audio"
              width={140}
              height={32}
              priority
              className="h-[28px] w-auto object-contain"
            />

            <div className="hidden sm:block">
              <div className="text-xs text-white/60">Instant help</div>
            </div>
          </div>

          {/* Button */}
          <a
            href="https://clarkaudio.com/contact/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur hover:bg-white/15 sm:px-4 sm:text-sm"
          >
            Talk to human
          </a>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 min-h-0 w-full">
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









