import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx';
import VideoEmbed from '@/components/VideoEmbed';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Custom components passed to MDX
const components = {
  VideoEmbed,
};

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  
  let source;
  try {
    source = getProjectBySlug(slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 mb-8"
        >
          &larr; Back to Portfolio
        </Link>
        <article className="prose prose-slate dark:prose-invert prose-violet lg:prose-lg max-w-none glass p-8 md:p-12 rounded-3xl shadow-xl">
          <MDXRemote
            source={source}
            components={components}
            options={{
              parseFrontmatter: true,
            }}
          />
        </article>
      </div>
    </div>
  );
}
