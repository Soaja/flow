import { renderToString } from 'preact-render-to-string';
import App from './App.jsx';
import { preloadRoute } from './utils/routes.jsx';

export async function render(url) {
  await preloadRoute(new URL(url));
  return renderToString(<App initialUrl={url} />);
}
