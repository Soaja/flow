import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Intro from './components/Intro.jsx'
import { preloadRoute } from './utils/routes.jsx'

// The intro is independent of the pre-rendered page: returning visitors never
// hydrate or replay an intro, and crawlers receive the complete page content.
createRoot(document.getElementById('intro-root')).render(<Intro />);

async function boot() {
  const url = new URL(window.location.href);
  await preloadRoute(url);
  const root = document.getElementById('root');
  const app = <StrictMode><App initialUrl={url.href} /></StrictMode>;
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}

boot().catch(error => { console.error('FLOW could not initialize', error); });
