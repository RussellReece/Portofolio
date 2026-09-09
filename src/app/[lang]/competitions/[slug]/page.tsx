import { MDXRemote } from 'next-mdx-remote/rsc';
import { getCompetitionBySlug, getCompetitionSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Trophy, ArrowLeft, FileText, ExternalLink } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getCompetitionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CompetitionPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;

  let source: string;
  try {
    source = getCompetitionBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/${lang}#awards`}
          className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Competitions
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30">
            <Trophy className="w-7 h-7 text-yellow-500" />
          </div>
          <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
            Competition Detail
          </span>
        </div>

        <article className="prose prose-slate dark:prose-invert prose-violet lg:prose-lg max-w-none glass p-8 md:p-12 rounded-3xl shadow-xl">
          <MDXRemote
            source={source}
            options={{ parseFrontmatter: true }}
          />
        </article>
      </div>
    </div>
  );
}
