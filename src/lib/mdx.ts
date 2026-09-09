import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src', 'content', 'projects');

export function getProjectSlugs() {
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  return fs.readdirSync(contentDir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export function getProjectBySlug(slug: string) {
  const fullPath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    // Fallback to .md if .mdx doesn't exist
    const mdPath = path.join(contentDir, `${slug}.md`);
    if (!fs.existsSync(mdPath)) {
      throw new Error(`Project ${slug} not found`);
    }
    return fs.readFileSync(mdPath, 'utf8');
  }
  return fs.readFileSync(fullPath, 'utf8');
}

const competitionsDir = path.join(process.cwd(), 'src', 'content', 'competitions');

export function getCompetitionSlugs() {
  if (!fs.existsSync(competitionsDir)) {
    return [];
  }
  return fs.readdirSync(competitionsDir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export function getCompetitionBySlug(slug: string) {
  const fullPath = path.join(competitionsDir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    const mdPath = path.join(competitionsDir, `${slug}.md`);
    if (!fs.existsSync(mdPath)) {
      throw new Error(`Competition ${slug} not found`);
    }
    return fs.readFileSync(mdPath, 'utf8');
  }
  return fs.readFileSync(fullPath, 'utf8');
}
