'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

export default function InstagramEmbedLoader() {
  useEffect(() => {
    const processEmbeds = () => window.instgrm?.Embeds?.process();
    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]');

    if (existingScript) {
      processEmbeds();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.instagram.com/embed.js';
    script.onload = processEmbeds;
    document.body.appendChild(script);
  }, []);

  return null;
}