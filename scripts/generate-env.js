/* Generates env.json with the minimal public configuration needed by the client. */
const { writeFileSync, mkdirSync } = require('fs');
const { join, dirname } = require('path');

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

const outPath = join(process.cwd(), 'env.json');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(filtered, null, 2));

console.log('Wrote env.json with keys:', Object.keys(filtered));