/* Generates public assets for static hosting (env.json + index.html). */
const { writeFileSync, mkdirSync, copyFileSync } = require('fs');
const { join } = require('path');

function getEnv(key) {
  const value = process.env[key];
  return value && String(value);
}

const env = {
  APP_PASSWORD: getEnv('APP_PASSWORD') || undefined,
  GITHUB_TOKEN: getEnv('GITHUB_TOKEN') || undefined,
  GIST_ID: getEnv('GIST_ID') || undefined,
};

const filtered = Object.fromEntries(
  Object.entries(env).filter(([_, v]) => v !== undefined)
);

const outDir = join(process.cwd(), 'public');
mkdirSync(outDir, { recursive: true });

writeFileSync(join(outDir, 'env.json'), JSON.stringify(filtered, null, 2));
copyFileSync(join(process.cwd(), 'index.html'), join(outDir, 'index.html'));

console.log('Built public/ with files:', ['index.html', 'env.json'], 'env keys:', Object.keys(filtered));