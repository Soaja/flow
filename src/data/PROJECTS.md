# Project content

`projects.js` is the single source for the three Our Work cards and their detail pages. The shared layout is `components/ProjectPage.jsx`.

Each record has a unique `slug`, `client`, `category`, `title`, `subtitle`, `role`, `year`, `location`, `image` (thumbnail URL), `video` (direct video URL), `challenge`, `approach`, `metrics` (three `{ value, label }` objects), and a `gallery` array of `{ src, alt, caption }` objects. Keep at least one gallery image. The next-project link follows collection order and loops to the first project.

Pages use `/?project=slug`, which supports direct links and refreshes on static hosting without rewrite configuration. Unknown slugs show a project-not-found view.

For a future CMS integration, normalize CMS records to this shape and supply the same collection to the listing and detail view. No per-project JSX is needed. The current player supports direct video files; YouTube/Vimeo would require an embed adapter.

The initial three entries use existing local video files and illustrative site photography. Descriptions and roles are drafts, not verified case-study claims. Metrics currently use 00 and Metric one/two/three as placeholders; replace these with approved numbers and labels. Year and location are intentionally unset. Replace these and gallery images with approved client material before publishing. Thumbnails and playback share a fixed 9:16 portrait frame in the left column. Challenge and Approach are stacked in the right column; on mobile, the film appears above the text. Starting, pausing or failing playback does not change the layout. Media fills the frame without letterboxing; non-9:16 sources are cropped to fit.

`clientLogo` is optional: use `{ src: '/client-logo.svg', alt: 'Client logo' }` with an approved logo asset. It appears to the right of the hero copy on desktop and below it on mobile. When null, the slot shows the client name in the site's typography. No client logo assets are currently supplied.
