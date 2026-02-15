/**
 * One command to run after adding new tool cards:
 *   1. Syncs new tools to the Updates page (update:sync)
 *   2. Bumps the patch version in package.json by +0.0.1 (e.g. 1.1.12 → 1.1.13)
 *
 * Usage:
 *   npm run release:additions
 *
 * Workflow:
 *   1. Add your new tool .md file(s) in content/tools/ with last_verified set to today (or desired date).
 *   2. Run: npm run release:additions
 *   3. Commit the updated content/updates/*.md and package.json (and new tool files) if desired.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');

console.log('Step 1: Syncing new tools to Updates...\n');
execSync('node scripts/sync-updates-from-tools.js', {
  cwd: rootDir,
  stdio: 'inherit',
});

console.log('\nStep 2: Bumping version +0.0.1...\n');
const pkg = require(pkgPath);
const parts = pkg.version.split('.').map(Number);
if (parts.length !== 3 || parts.some(Number.isNaN)) {
  console.error('Invalid version in package.json:', pkg.version);
  process.exit(1);
}
const oldVersion = pkg.version;
parts[2] += 1;
const newVersion = parts.join('.');
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('Version bumped:', oldVersion, '→', newVersion);
console.log('\nDone. Run `npm run build` when ready to build with the new version.');
