import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src', 'content', 'projects');

export function getProjectSlugs() {
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  const files = fs.readdirSync(contentDir).filter((file) => /\.mdx?$/.test(file));
  const slugs = new Set(files.map((file) => file.replace(/\.(en|id)\.mdx?$/, '').replace(/\.mdx?$/, '')));
  return Array.from(slugs);
}

export function getProjectBySlug(slug: string, lang?: string) {
  const tryPaths = [];
  if (lang) {
    tryPaths.push(path.join(contentDir, `${slug}.${lang}.mdx`));
    tryPaths.push(path.join(contentDir, `${slug}.${lang}.md`));
  }
  tryPaths.push(path.join(contentDir, `${slug}.mdx`));
  tryPaths.push(path.join(contentDir, `${slug}.md`));

  for (const p of tryPaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf8');
    }
  }
  
  throw new Error(`Project ${slug} not found`);
}

const competitionsDir = path.join(process.cwd(), 'src', 'content', 'competitions');

export function getCompetitionSlugs() {
  if (!fs.existsSync(competitionsDir)) {
    return [];
  }
  const files = fs.readdirSync(competitionsDir).filter((file) => /\.mdx?$/.test(file));
  const slugs = new Set(files.map((file) => file.replace(/\.(en|id)\.mdx?$/, '').replace(/\.mdx?$/, '')));
  return Array.from(slugs);
}

export function getCompetitionBySlug(slug: string, lang?: string) {
  const tryPaths = [];
  if (lang) {
    tryPaths.push(path.join(competitionsDir, `${slug}.${lang}.mdx`));
    tryPaths.push(path.join(competitionsDir, `${slug}.${lang}.md`));
  }
  tryPaths.push(path.join(competitionsDir, `${slug}.mdx`));
  tryPaths.push(path.join(competitionsDir, `${slug}.md`));

  for (const p of tryPaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf8');
    }
  }
  
  throw new Error(`Competition ${slug} not found`);
}

const experienceDir = path.join(process.cwd(), 'src', 'content', 'experience');

export function getExperienceSlugs() {
  if (!fs.existsSync(experienceDir)) {
    return [];
  }
  const files = fs.readdirSync(experienceDir).filter((file) => /\.mdx?$/.test(file));
  const slugs = new Set(files.map((file) => file.replace(/\.(en|id)\.mdx?$/, '').replace(/\.mdx?$/, '')));
  return Array.from(slugs);
}

export function getExperienceBySlug(slug: string, lang?: string) {
  const tryPaths = [];
  if (lang) {
    tryPaths.push(path.join(experienceDir, `${slug}.${lang}.mdx`));
    tryPaths.push(path.join(experienceDir, `${slug}.${lang}.md`));
  }
  tryPaths.push(path.join(experienceDir, `${slug}.mdx`));
  tryPaths.push(path.join(experienceDir, `${slug}.md`));

  for (const p of tryPaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf8');
    }
  }

  throw new Error(`Experience ${slug} not found`);
}
