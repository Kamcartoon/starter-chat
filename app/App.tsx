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
    <main className="relative h-screen w-screen bg-black">
      {/* Top-right button */}
      <a
        href="https://clarkaudio.com/contact/"
        target="_blank"
        rel="noreferrer"
        className="fixed right-5 top-5 z-[9999] rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/15"
      >
        Talk to human
      </a>

      {/* Full-screen chat */}
      <div className="h-full w-full">
        <ChatKitPanel
          theme={scheme}            // leave as-is so your ChatKitPanel can still theme itself
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}

