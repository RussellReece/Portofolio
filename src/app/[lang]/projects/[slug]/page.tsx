import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx';
import VideoEmbed from '@/components/VideoEmbed';
import DetailLayout from '@/components/DetailLayout';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

const components = {
  VideoEmbed,
};

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
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

  const { data: frontmatter, content } = matter(source);

  return (
    <DetailLayout
      lang={lang}
      backHref={`/${lang}#projects`}
      backLabel="Back to Portfolio"
      kind="project"
      meta={{
        title: frontmatter.title,
        category: frontmatter.category,
        year: frontmatter.year,
        role: frontmatter.role,
        duration: frontmatter.duration,
        team: frontmatter.team,
        summary: frontmatter.summary,
        techStack: frontmatter.techStack,
        links: frontmatter.links,
        link: frontmatter.link,
      }}
    >
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </DetailLayout>
  );
}
