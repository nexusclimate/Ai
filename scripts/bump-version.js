/**
 * Bumps patch version (e.g. 1.1.0 → 1.1.1) in package.json when running in CI/Netlify.
 * Local builds keep the current version so you don't bump on every dev build.
 */
const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = require(pkgPath);

const isCI = process.env.CI === 'true' || process.env.NETLIFY === 'true';
if (!isCI) {
  console.log('Skipping version bump (not in CI). Current version:', pkg.version);
  process.exit(0);
}

const parts = pkg.version.split('.').map(Number);
if (parts.length !== 3 || parts.some(Number.isNaN)) {
  console.error('Invalid version in package.json:', pkg.version);
  process.exit(1);
}
parts[2] += 1;
const newVersion = parts.join('.');

pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('Bumped version:', pkg.version, '→', newVersion);
