import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Collection, Tool, ToolMetadata } from './types';

const contentDirectory = path.join(process.cwd(), 'content');
const collectionsDirectory = path.join(contentDirectory, 'collections');
const toolsDirectory = path.join(contentDirectory, 'tools');

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
