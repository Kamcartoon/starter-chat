"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT_PX = 72; // adjust if you want

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
    <main className="relative h-screen w-screen bg-black">
      {/* Header overlay */}
      <header
        className="fixed left-0 right-0 top-0 z-[9999] flex items-center justify-between px-5"
        style={{ height: HEADER_HEIGHT_PX }}
      >
        <div className="text-white">
          <div className="text-lg font-semibold tracking-tight">
            Clark Audio Instant Support
          </div>
          <div className="text-xs text-white/60">
            AI-powered help for plugins & downloads
          </div>
        </div>

        <a
          href="https://clarkaudio.com/contact/"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/15"
        >
          Talk to human
        </a>
      </header>

      {/* Push chat down so it never hides behind header */}
      <div style={{ paddingTop: HEADER_HEIGHT_PX }} className="h-full w-full">
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

}


