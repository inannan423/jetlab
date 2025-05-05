import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = process.env.SITE_URL || 'https://jet-lab.site';

function generateUrlEntry(loc, lastmod, changefreq = 'weekly', priority = 0.7) {
  return `
    <url>
      <loc>${siteUrl}${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `.trim();
}

function loadJsonFiles(dir) {
  const entries = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.json')) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const json = JSON.parse(raw);
      entries.push(json);
    }
  }
  return entries;
}

// ✅ 加载 blog 和 project 数据
const blogDir = path.join(__dirname, '.contentlayer/generated/Blog');
const projectDir = path.join(__dirname, '.contentlayer/generated/Project');

const allBlogs = loadJsonFiles(blogDir);
const allProjects = loadJsonFiles(projectDir);

// ✅ 生成 URL
const blogUrls = allBlogs
  .filter(b => b.published)
  .map(blog =>
    generateUrlEntry(
      `/blogs/${blog.slug}`,
      blog.date ? new Date(blog.date).toISOString() : new Date().toISOString(),
      'weekly',
      0.8
    )
  );

const projectUrls = allProjects
  .filter(p => p.published)
  .map(project =>
    generateUrlEntry(
      `/projects/${project.slug}`,
      project.date ? new Date(project.date).toISOString() : new Date().toISOString(),
      'monthly',
      0.7
    )
  );

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...blogUrls, ...projectUrls].join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, 'public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapContent, 'utf8');
console.log('✅ Sitemap successfully written to:', outputPath);
