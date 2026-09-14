import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export default async function missingProject(request, response) {
  const html = await readFile(join(process.cwd(), 'dist', '_pages', 'not-found.html'), 'utf8');
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('X-Robots-Tag', 'noindex, follow');
  response.end(request.method === 'HEAD' ? undefined : html);
}
