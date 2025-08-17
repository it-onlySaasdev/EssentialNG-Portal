import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'markdown', 'blog');

// Get all slugs (filenames) of posts safely
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`[Warning] Directory not found: ${postsDirectory}`);
    return [];
  }

  try {
    const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
    if (files.length === 0) {
      console.warn(`[Info] No markdown files found in ${postsDirectory}`);
    }
    return files;
  } catch (err) {
    console.error(`[Error] Failed to read directory: ${postsDirectory}`, err);
    return [];  
  }
}

// Get post by slug with safe fallback
export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const result: any = {};

    fields.forEach((field) => {
      if (field === 'slug') {
        result[field] = realSlug;
      }
      if (field === 'content') {
        result[field] = content;
      }
      if (data[field]) {
        result[field] = data[field];
      }
    });

    return result;
  } catch (err) {
    console.error(`[Error] Failed to read file: ${fullPath}`, err);
    return null; // Safe fallback
  }
}

// Get all posts data safely
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post) => post !== null); // Remove nulls in case of read failures
}
