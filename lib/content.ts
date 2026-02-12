import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Collection, Tool, ToolMetadata, Update } from './types';

const contentDirectory = path.join(process.cwd(), 'content');
const collectionsDirectory = path.join(contentDirectory, 'collections');
const toolsDirectory = path.join(contentDirectory, 'tools');
const updatesDirectory = path.join(contentDirectory, 'updates');

export function getAllCollections(): Collection[] {
  const fileNames = fs.readdirSync(collectionsDirectory);
  const collections = fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(collectionsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      try {
        return JSON.parse(fileContents) as Collection;
      } catch (error) {
        console.error(`Error parsing ${fileName}:`, error);
        return null;
      }
    })
    .filter((collection): collection is Collection => collection !== null);

  return collections;
}

export function getCollectionBySlug(slug: string): Collection | null {
  try {
    const filePath = path.join(collectionsDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Collection;
  } catch (error) {
    return null;
  }
}

export function getAllTools(): Tool[] {
  const fileNames = fs.readdirSync(toolsDirectory);
  const tools = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return getToolBySlug(slug);
    })
    .filter((tool): tool is Tool => tool !== null);

  return tools;
}

export function getToolBySlug(slug: string): Tool | null {
  try {
    const filePath = path.join(toolsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      name: data.name || '',
      slug: data.slug || slug,
      platform: data.platform || '',
      url: data.url || '',
      collections: data.collections || [],
      tags: data.tags || [],
      maturity: data.maturity || 'beta',
      verified: data.verified || false,
      featured: data.featured || false,
      short_summary: data.short_summary || '',
      last_verified: data.last_verified || '',
      use_cases: data.use_cases || [],
      limitations: data.limitations || [],
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function getToolContent(slug: string): Promise<string> {
  const tool = getToolBySlug(slug);
  if (!tool) return '';

  const processedContent = await remark().use(html).process(tool.content);
  return processedContent.toString();
}

export function getToolsByCollection(collectionSlug: string): Tool[] {
  const allTools = getAllTools();
  return allTools.filter((tool) => tool.collections.includes(collectionSlug));
}

export function getFeaturedTools(): Tool[] {
  const allTools = getAllTools();
  return allTools.filter((tool) => tool.featured);
}

export function getFeaturedCollections(): Collection[] {
  const allCollections = getAllCollections();
  return allCollections.filter((collection) => collection.featured);
}

export function getRecentlyUpdatedTools(limit = 6): Tool[] {
  const all = getAllTools();
  return [...all]
    .filter((t) => t.last_verified)
    .sort((a, b) => {
      const da = new Date(a.last_verified).getTime();
      const db = new Date(b.last_verified).getTime();
      return db - da;
    })
    .slice(0, limit);
}

export function getAllUpdates(): Update[] {
  if (!fs.existsSync(updatesDirectory)) return [];
  const fileNames = fs.readdirSync(updatesDirectory);
  const updates = fileNames
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = path.join(updatesDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const date = data.date || '';
      return {
        slug,
        date,
        title: data.title || slug,
        summary: data.summary,
        content,
      };
    })
    .filter((u) => u.date);
  return updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
