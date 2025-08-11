export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).json({
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    GIST_ID: process.env.GIST_ID || '',
    APP_PASSWORD: process.env.APP_PASSWORD || ''
  });
}