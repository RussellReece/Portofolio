"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

export function LangToggle({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLang = () => {
    const newLang = currentLang === "en" ? "id" : "en";
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLang}
      className="px-3 py-1.5 rounded-full glass hover:bg-primary/20 hover:text-primary transition-all font-semibold text-sm"
    >
      {currentLang.toUpperCase()}
    </button>
  );
}
