'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';

type TableOfContentsItem = {
  id: string;
  label: string;
  level: number;
};

const EMPTY_ITEMS: TableOfContentsItem[] = [];

function createHeadingId(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');
}

export default function DetailTableOfContents({ articleId, lang }: { articleId: string; lang: string }) {
  const snapshotRef = useRef<{ articleId: string; items: TableOfContentsItem[] } | null>(null);

  const getSnapshot = useCallback(
    () => snapshotRef.current?.articleId === articleId ? snapshotRef.current.items : EMPTY_ITEMS,
    [articleId],
  );
  const getServerSnapshot = useCallback(() => EMPTY_ITEMS, []);
  const subscribe = useCallback((onStoreChange: () => void) => {
    const article = document.getElementById(articleId);
    if (!article) return () => {};

    let currentItems = getSnapshot();
    const syncHeadings = () => {
      const usedIds = new Set<string>();
      const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>('h2, h3'));
      const nextItems = headings.flatMap((heading, index) => {
        const label = heading.textContent?.trim();
        if (!label) return [];

        const baseId = heading.id || createHeadingId(label) || `section-${index + 1}`;
        let id = baseId;
        let suffix = 2;

        while (usedIds.has(id) || (document.getElementById(id) && document.getElementById(id) !== heading)) {
          id = `${baseId}-${suffix}`;
          suffix += 1;
        }

        heading.id = id;
        usedIds.add(id);

        return [{ id, label, level: Number(heading.tagName.slice(1)) }];
      });

      const hasChanged = nextItems.length !== currentItems.length
        || nextItems.some((item, index) => {
          const current = currentItems[index];
          return item.id !== current.id || item.label !== current.label || item.level !== current.level;
        });

      if (hasChanged) {
        currentItems = nextItems;
        snapshotRef.current = { articleId, items: nextItems };
        onStoreChange();
      }
    };

    const observer = new MutationObserver(syncHeadings);
    observer.observe(article, { childList: true, subtree: true, characterData: true });
    syncHeadings();

    return () => observer.disconnect();
  }, [articleId, getSnapshot]);
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <nav
      aria-label={lang === 'id' ? 'Daftar Isi' : 'Table of Contents'}
      className="flex flex-col gap-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 pr-1"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${encodeURIComponent(item.id)}`}
          className={`hover:text-primary transition-colors leading-snug break-words ${item.level === 3 ? 'ml-3 text-xs text-gray-500 dark:text-gray-400' : ''}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
