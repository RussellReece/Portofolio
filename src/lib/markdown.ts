import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  summary: string;
  techStack: string[];
  image: string;
  link: string;
  contentHtml?: string;
}

export function getSortedProjectsData(): ProjectData[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      category: matterResult.data.category,
      summary: matterResult.data.summary,
      techStack: matterResult.data.techStack || [],
      image: matterResult.data.image || '',
      link: matterResult.data.link || '#',
    } as ProjectData;
  });

  return allProjectsData;
}

export async function getProjectData(id: string): Promise<ProjectData> {
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    category: matterResult.data.category,
    summary: matterResult.data.summary,
    techStack: matterResult.data.techStack || [],
    image: matterResult.data.image || '',
    link: matterResult.data.link || '#',
  };
}
