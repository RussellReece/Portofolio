'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface PdfThumbnailModalProps {
  title: string;
  url: string;
}

export default function PdfThumbnailModal({ title, url }: PdfThumbnailModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open ${title} PDF`}
        className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >
        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
          title={`${title} PDF preview`}
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none h-full min-h-[420px] w-full bg-white transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute inset-x-4 bottom-4 rounded-xl bg-black/70 px-3 py-2 text-center text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          Click to view full document
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} full document`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative h-[min(92vh,1100px)] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close document"
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-white transition-colors hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              src={`${url}#toolbar=1&navpanes=1&view=FitH`}
              title={title}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}