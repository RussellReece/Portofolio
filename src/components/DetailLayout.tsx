import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';
import InstagramEmbedLoader from './InstagramEmbedLoader';
import { ProjectDetailView, ProjectDetailViewProps } from './ProjectDetailView';

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

/* ─── Component ──────────────────────────────── */
export default function DetailLayout({ lang, backHref, backLabel, kind, meta, children }: DetailLayoutProps) {
  const isCompetition = kind === 'competition';
  const isExperience = kind === 'experience';

  // Map meta data to ProjectDetailViewProps
  const rawTags = [
    ...(meta.category ? [{ label: meta.category, variant: 'secondary' as const }] : []),
    ...(meta.techStack || []).map(t => ({ label: t, variant: 'outline' as const })),
  ];
  
  // Deduplicate tags by label
  const uniqueTags = rawTags.filter((tag, index, self) =>
    index === self.findIndex((t) => t.label === tag.label)
  );

  const projectDetailProps: ProjectDetailViewProps = {
    breadcrumbs: [
      { label: backLabel, href: backHref },
      { label: meta.title, href: '#' },
    ],
    title: meta.title,
    status: isCompetition ? (meta.result || 'Completed') : isExperience ? 'Present' : 'Completed',
    assignees: [
      { 
        name: meta.team || 'Russell Reece', 
        avatarUrl: "https://ui.shadcn.com/avatars/02.png" 
      }
    ],
    dateRange: {
      start: meta.duration?.split('–')[0]?.trim() || meta.year?.split('-')[0]?.trim() || '',
      end: meta.duration?.split('–')[1]?.trim() || meta.year?.split('-')[1]?.trim() || meta.year || '',
    },
    tags: uniqueTags,
    description: meta.summary || '',
    attachments: (meta.links || []).map(link => ({
      name: link.label,
      url: link.url,
      size: 'External Link',
      type: link.type === 'document' ? 'pdf' : link.type === 'prototype' ? 'figma' : 'pdf',
    })),
    subTasks: [], // We can leave this empty or populate from MDX later if needed
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950">
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 p-1.5 shadow-lg backdrop-blur-xl sm:right-6 sm:top-6 dark:border-white/10 dark:bg-black/35">
        <ThemeToggle />
        <LangToggle currentLang={lang} />
      </div>

      {/* ── Hero header ──────────────────────────── */}
      <div className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMzBMMzAgMCA2MCAzMCAzMCA2MHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMzBMMzAgMCA2MCAzMCAzMCA2MHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSsyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-50" />
        
        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28 md:pb-16 md:pt-32 z-10">
          
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-10 items-start">
            {/* The new Shadcn-based ProjectDetailView component */}
            <ProjectDetailView {...projectDetailProps} />

            {/* Image Placeholder Slot for hero */}
            <div className="hidden lg:flex flex-col items-center justify-center w-full aspect-square rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-900/50 text-gray-400 dark:text-gray-600 shadow-sm relative overflow-hidden">
               <div className="text-center p-6 z-10">
                 <div className="bg-gray-200 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                   <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                 </div>
                 <p className="font-medium text-sm">Project Thumbnail</p>
               </div>
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent"></div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MDX article body ─────────────────────── */}
      <div className="mx-auto grid min-w-0 max-w-6xl gap-8 px-4 py-10 sm:px-6 md:gap-10 md:py-16 lg:grid-cols-[220px_minmax(0,1fr)] items-start">
        
        {/* Sticky Table of Contents (TOC) */}
        <aside className="hidden lg:block sticky top-28 bg-white/50 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{lang === 'id' ? 'Daftar Isi' : 'Table of Contents'}</div>
          <nav className="flex flex-col gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
            {/* The TOC items would ideally be generated from the MDX headings, but for now we provide placeholders that match typical structure */}
            <a href="#" className="hover:text-primary transition-colors">Overview</a>
            <a href="#" className="hover:text-primary transition-colors">Process & Methodology</a>
            <a href="#" className="hover:text-primary transition-colors">Key Features</a>
            <a href="#" className="hover:text-primary transition-colors">Technical Stack</a>
            <a href="#" className="hover:text-primary transition-colors">Results & Impact</a>
          </nav>
        </aside>

        <article className="min-w-0 max-w-none overflow-hidden prose prose-slate prose-lg dark:prose-invert
                          prose-headings:font-bold prose-headings:tracking-tight
                          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 prose-h2:dark:border-gray-800
                          prose-h3:text-xl prose-h3:mt-8
                          prose-p:leading-relaxed prose-p:text-gray-600 prose-p:dark:text-gray-300
                          prose-li:text-gray-600 prose-li:dark:text-gray-300
                          prose-strong:text-gray-900 prose-strong:dark:text-white
                          prose-a:text-primary prose-a:dark:text-primary prose-a:no-underline prose-a:font-medium prose-a:hover:underline
                          prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:dark:bg-primary/10 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:text-gray-700 prose-blockquote:dark:text-gray-300
                          prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap prose-pre:break-words prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:dark:bg-gray-900 prose-pre:dark:text-gray-200 prose-pre:border prose-pre:border-gray-200 prose-pre:dark:border-gray-800
                          prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium
                          prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-gray-200 prose-table:dark:border-gray-800
                          prose-thead:bg-gray-50 prose-thead:dark:bg-gray-900/50
                          prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold
                          prose-td:px-4 prose-td:py-3 prose-td:text-sm
                          prose-tr:border-b prose-tr:border-gray-200 prose-tr:dark:border-gray-800/50
                          [&_.instagram-media]:!my-4 [&_.instagram-media]:!w-full [&_.instagram-media]:!min-w-0 [&_iframe]:max-w-full
                          bg-white dark:bg-zinc-950/50 p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
          {children}
          <InstagramEmbedLoader />
        </article>
      </div>
    </div>
  );
}
