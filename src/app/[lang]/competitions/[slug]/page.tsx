import { MDXRemote } from 'next-mdx-remote/rsc';
import { getCompetitionBySlug, getCompetitionSlugs } from '@/lib/mdx';
import DetailLayout from '@/components/DetailLayout';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

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

  const { data: frontmatter, content } = matter(source);

  return (
    <DetailLayout
      lang={lang}
      backHref={`/${lang}#awards`}
      backLabel="Back to Competitions"
      kind="competition"
      meta={{
        title: frontmatter.title,
        year: frontmatter.year,
        team: frontmatter.team,
        summary: frontmatter.summary,
        result: frontmatter.result,
        event: frontmatter.event,
        organizer: frontmatter.organizer,
        product: frontmatter.product,
        links: frontmatter.links,
        link: frontmatter.link,
      }}
    >
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </DetailLayout>
  );
}
