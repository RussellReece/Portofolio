import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, FileText, Calendar, Briefcase, Users, Tag, Trophy } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';
import InstagramEmbedLoader from './InstagramEmbedLoader';

/* ─── Types ──────────────────────────────────── */
interface DetailLink {
  label: string;
  url: string;
  type?: 'live' | 'prototype' | 'document' | 'github' | 'external';
}

interface DetailLayoutProps {
  lang: string;
  backHref: string;
  backLabel: string;
  kind: 'project' | 'competition' | 'experience';
  meta: {
    title: string;
    category?: string;
    year?: string;
    role?: string;
    duration?: string;
    team?: string;
    summary?: string;
    techStack?: string[];
    result?: string;
    event?: string;
    organizer?: string;
    product?: string;
    links?: DetailLink[];
    link?: string;          // legacy single link
  };
  children: React.ReactNode;
}

/* ─── Helpers ────────────────────────────────── */
function linkIcon(type?: string) {
  switch (type) {
    case 'live':
    case 'prototype':
      return <ExternalLink className="w-4 h-4" />;
    case 'document':
      return <FileText className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
}

/* ─── Component ──────────────────────────────── */
export default function DetailLayout({ lang, backHref, backLabel, kind, meta, children }: DetailLayoutProps) {
  const isCompetition = kind === 'competition';
  const isExperience = kind === 'experience';

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/20 p-1.5 shadow-lg backdrop-blur-xl sm:right-6 sm:top-6 dark:border-white/10 dark:bg-black/35">
        <ThemeToggle />
        <LangToggle currentLang={lang} />
      </div>

      {/* ── Hero header ──────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-indigo-600/80 to-blue-700/90 dark:from-violet-900/80 dark:via-indigo-900/70 dark:to-zinc-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMzBMMzAgMCA2MCAzMCAzMCA2MHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-50" />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28 md:pb-16 md:pt-32">
          {/* Top navigation row */}
          <div className="mb-8 flex items-center justify-between gap-4">
            {/* Back button */}
            <Link
              href={backHref}
              className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-white/70 transition-colors group hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {backLabel}
            </Link>

          </div>

          {/* Result badge (competitions) */}
          {isCompetition && meta.result && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-200 text-sm font-semibold">
                <Trophy className="w-4 h-4" />
                <span className="break-words">{meta.result}</span>
              </span>
            </div>
          )}

          {/* Category badge (projects) */}
          {!isCompetition && meta.category && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold">
                <Tag className="w-4 h-4" />
                {meta.category}
              </span>
            </div>
          )}

          {/* Title */}
          <div className="grid min-w-0 items-end gap-8 lg:grid-cols-[minmax(0,1fr),180px] lg:gap-10">
          <div>
          <h1 className="mb-4 break-words text-3xl font-extrabold leading-tight tracking-tight text-white animate-[rise-in_600ms_ease-out_both] sm:text-4xl md:text-5xl">
            {meta.title}
          </h1>

          {/* Summary */}
          {meta.summary && (
            <p className="mb-8 max-w-3xl break-words text-base leading-relaxed text-white/70 sm:text-lg">
              {meta.summary}
            </p>
          )}

          {/* ── Metadata grid ─────────────────────── */}
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm sm:gap-x-8">
            {meta.role && (
              <div className="flex items-center gap-2 text-white/80">
                <Briefcase className="w-4 h-4 text-white/50" />
                <span className="font-medium">{meta.role}</span>
              </div>
            )}
            {(meta.duration || meta.year) && (
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4 text-white/50" />
                <span className="font-medium">{meta.duration || meta.year}</span>
              </div>
            )}
            {meta.team && (
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-4 h-4 text-white/50" />
                <span className="font-medium">{meta.team}</span>
              </div>
            )}
            {isCompetition && meta.event && (
              <div className="flex items-center gap-2 text-white/80">
                <Trophy className="w-4 h-4 text-white/50" />
                <span className="font-medium">{meta.event}</span>
              </div>
            )}
            {isCompetition && meta.product && (
              <div className="flex items-center gap-2 text-white/80">
                <Tag className="w-4 h-4 text-white/50" />
                <span className="font-medium">{lang === 'id' ? 'Produk:' : 'Product:'} {meta.product}</span>
              </div>
            )}
          </div>

          {/* ── Tech stack pills ──────────────────── */}
          {meta.techStack && meta.techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {meta.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold
                           bg-white/15 text-white/90 border border-white/20
                           backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* ── Publication links ─────────────────── */}
          {((meta.links && meta.links.length > 0) || (meta.link && meta.link !== '#')) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {meta.link && meta.link !== '#' && (
                <a
                  href={meta.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-white text-indigo-700 font-semibold text-sm
                           hover:bg-white/90 transition-colors shadow-lg shadow-black/10"
                >
                  <ExternalLink className="w-4 h-4" />
                  {lang === 'id' ? 'Kunjungi Situs' : 'Live Website'}
                </a>
              )}
              {meta.links?.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                           bg-white/10 border border-white/20 text-white/90 text-sm font-medium
                           hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  {linkIcon(link.type)}
                  {link.label}
                </a>
              ))}
            </div>
          )}
          </div>
          <div className="hidden aspect-square place-items-center rounded-3xl border border-white/20 bg-white/10 text-3xl font-black tracking-tighter text-white/80 backdrop-blur lg:grid">RR</div>
          </div>
        </div>
      </div>

      {/* ── MDX article body ─────────────────────── */}
      <div className="mx-auto grid min-w-0 max-w-6xl gap-8 px-4 py-10 sm:px-6 md:gap-10 md:py-16 lg:grid-cols-[180px,minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 border-l-2 border-primary/30 pl-4 text-xs font-semibold uppercase tracking-widest text-gray-400">{isExperience ? (lang === 'id' ? 'Pengalaman' : 'Experience') : isCompetition ? (lang === 'id' ? 'Kompetisi' : 'Competition') : (lang === 'id' ? 'Proyek' : 'Project')}</div>
        </aside>
        <article className="min-w-0 max-w-none overflow-hidden prose prose-slate prose-lg dark:prose-invert
                          prose-headings:font-bold prose-headings:tracking-tight
                          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 prose-h2:dark:border-gray-800
                          prose-h3:text-xl prose-h3:mt-8
                          prose-p:leading-relaxed prose-p:text-gray-600 prose-p:dark:text-gray-400
                          prose-li:text-gray-600 prose-li:dark:text-gray-400
                          prose-strong:text-gray-900 prose-strong:dark:text-white
                          prose-a:text-violet-600 prose-a:dark:text-violet-400 prose-a:no-underline prose-a:hover:underline
                          prose-blockquote:border-violet-500 prose-blockquote:bg-violet-50 prose-blockquote:dark:bg-violet-950/30 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-2
                          prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap prose-pre:break-words prose-pre:bg-slate-100 prose-pre:text-slate-800 prose-pre:dark:bg-slate-900 prose-pre:dark:text-slate-100
                          prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium
                          prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-gray-200 prose-table:dark:border-gray-800
                          prose-thead:bg-gray-50 prose-thead:dark:bg-gray-900/50
                          prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold
                          prose-td:px-4 prose-td:py-3 prose-td:text-sm
                          prose-tr:border-b prose-tr:border-gray-100 prose-tr:dark:border-gray-800/50
                          [&_.instagram-media]:!my-4 [&_.instagram-media]:!w-full [&_.instagram-media]:!min-w-0 [&_iframe]:max-w-full">
          {children}
          <InstagramEmbedLoader />
        </article>
      </div>
    </div>
  );
}
