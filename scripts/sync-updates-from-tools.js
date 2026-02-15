/**
 * Syncs "Recently added" tools into the Updates section.
 * Run after adding new tools so they appear on the Updates page.
 *
 * Workflow:
 *   1. Add new tool file(s) under content/tools/ with last_verified: "YYYY-MM-DD".
 *   2. Run: npm run update:sync   (or with a date: node scripts/sync-updates-from-tools.js 2026-02-13)
 *   3. This creates or updates content/updates/YYYY-MM-DD-additions.md for that date.
 *
 * Usage:
 *   npm run update:sync              # sync all dates that have tools
 *   node scripts/sync-updates-from-tools.js 2026-02-13   # sync only that date
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(process.cwd(), 'content');
const toolsDir = path.join(contentDir, 'tools');
const updatesDir = path.join(contentDir, 'updates');

function getDateArg() {
  const arg = process.argv[2];
  if (!arg) return null; // null = process all dates that have tools
  const d = new Date(arg);
  if (!isNaN(d.getTime())) return arg.slice(0, 10);
  return null;
}

function getToolsByLastVerified() {
  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.md'));
  const byDate = {};
  for (const file of files) {
    const filePath = path.join(toolsDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);
    const lastVerified = (data.last_verified || '').trim().slice(0, 10);
    if (!lastVerified) continue;
    const slug = data.slug || file.replace(/\.md$/, '');
    const name = data.name || slug;
    if (!byDate[lastVerified]) byDate[lastVerified] = [];
    byDate[lastVerified].push({ name, slug });
  }
  return byDate;
}

function getExistingSlugsInUpdate(updatePath) {
  if (!fs.existsSync(updatePath)) return new Set();
  const content = fs.readFileSync(updatePath, 'utf8');
  const slugs = new Set();
  const linkRe = /\]\(\/tools\/([^)]+)\)/g;
  let m;
  while ((m = linkRe.exec(content)) !== null) slugs.add(m[1]);
  return slugs;
}

function ensureUpdateForDate(date, tools) {
  if (tools.length === 0) return;
  const slug = `${date}-additions`;
  const updatePath = path.join(updatesDir, `${slug}.md`);
  const existingSlugs = getExistingSlugsInUpdate(updatePath);
  const toAdd = tools.filter((t) => !existingSlugs.has(t.slug));
  if (toAdd.length === 0) {
    console.log(`No new tools to add for ${date}; ${updatePath} already lists them.`);
    return;
  }

  const allToolsForDate = [...tools];
  const title = `New tools added`;
  const summary = `${allToolsForDate.length} tool(s) added to the hub.`;

  const bulletLines = allToolsForDate.map(
    (t) => `- **${t.name}** — [View tool](/tools/${t.slug})`
  );
  const body = bulletLines.join('\n');

  const frontmatter = {
    date: `"${date}"`,
    title: `"${title}"`,
    summary: `"${summary}"`,
  };
  const md = `---
date: ${frontmatter.date}
title: ${frontmatter.title}
summary: ${frontmatter.summary}
---

${body}
`;

  fs.writeFileSync(updatePath, md, 'utf8');
  console.log(`Updated ${updatePath} with ${allToolsForDate.length} tool(s) (${toAdd.length} newly listed).`);
}

function main() {
  const dateArg = getDateArg();

  if (!fs.existsSync(toolsDir)) {
    console.error('content/tools directory not found.');
    process.exit(1);
  }
  if (!fs.existsSync(updatesDir)) {
    fs.mkdirSync(updatesDir, { recursive: true });
  }

  const byDate = getToolsByLastVerified();
  const datesToProcess = dateArg
    ? [dateArg]
    : Object.keys(byDate).sort().reverse();

  if (dateArg) {
    console.log(`Syncing updates for date: ${dateArg}`);
  } else {
    console.log(`Syncing updates for all dates with tools: ${datesToProcess.join(', ')}`);
  }

  let updated = 0;
  for (const date of datesToProcess) {
    const tools = byDate[date] || [];
    if (tools.length > 0) {
      ensureUpdateForDate(date, tools);
      updated++;
    }
  }

  if (updated === 0 && dateArg) {
    console.log(`No tools with last_verified "${dateArg}". Add tools with that date, then run this script.`);
  }
}

main();
