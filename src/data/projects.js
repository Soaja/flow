// CMS boundary: replace this collection with normalized CMS records.
// Copy and gallery images are draft content; confirm credits and metadata before publishing.
export const projects = [
  {
    slug: 'jordan-the-one', client: 'Jordan Brand', category: 'Brand campaign',
    clientLogo: null,
    title: 'The one.', subtitle: 'Individual expression. Collective energy. A story rooted in basketball culture.',
    role: 'Creative & Production', year: '—', location: '—',
    image: '/athlete-run.webp', video: '/jordan-the-one.mp4',
    challenge: 'Translate the energy of basketball culture into a campaign with a distinct point of view. Put the athlete and their individuality at the heart of the story.',
    approach: 'Bring movement, attitude and detail together through a film-led visual language. Build a consistent world that carries from the main feature into shorter social moments.',
    metrics: [
      { value: '00', label: 'Metric one' },
      { value: '00', label: 'Metric two' },
      { value: '00', label: 'Metric three' },
    ],
    gallery: [
      { src: '/athlete-run.webp', alt: 'Athlete in motion', caption: 'Movement' },
      { src: '/athlete-shoe.webp', alt: 'Detail of sports footwear', caption: 'The details' },
      { src: '/athlete-silhouette.webp', alt: 'Athlete silhouetted against the light', caption: 'Presence' },
      { src: '/athlete-parkour.webp', alt: 'Athlete captured in an urban setting', caption: 'Beyond the court' },
    ],
  },
  {
    slug: 'nike-midnight-run', client: 'Nike', category: 'Running / Community',
    clientLogo: null,
    title: 'Midnight run.', subtitle: 'When the city slows down, a different kind of energy takes over.',
    role: 'Campaign & Content', year: '—', location: '—',
    image: '/athlete-2.webp', video: '/nike-midnight-run.mp4',
    challenge: 'Make running feel like a shared cultural experience. Find a visual story that connects the individual runner with the pulse of the city.',
    approach: 'Follow the rhythm of movement, from quiet preparation to collective momentum. Use a film-first approach with a visual identity that stays consistent across campaign content.',
    metrics: [
      { value: '00', label: 'Metric one' },
      { value: '00', label: 'Metric two' },
      { value: '00', label: 'Metric three' },
    ],
    gallery: [
      { src: '/athlete-2.webp', alt: 'Campaign athlete portrait', caption: 'Before the start' },
      { src: '/athlete-run.webp', alt: 'Runner in motion', caption: 'Find your pace' },
      { src: '/athlete-woman.webp', alt: 'Female athlete in training', caption: 'Shared energy' },
      { src: '/athlete-3.webp', alt: 'Sports campaign portrait', caption: 'Keep moving' },
    ],
  },
  {
    slug: 'metcon-fortfight', client: 'Nike / Metcon', category: 'Training / Activation',
    clientLogo: null,
    title: 'Fortfight.', subtitle: 'Built on effort. Driven by the people who show up and put in the work.',
    role: 'Activation & Production', year: '—', location: '—',
    image: '/athlete-silhouette.webp', video: '/metcon-fortfight.mp4',
    challenge: 'Give the intensity of training a human perspective. Create a story that balances product, performance and the community behind every session.',
    approach: 'Stay close to the action. Combine physical detail with wider moments of connection, shaping the footage into a focused feature and supporting visual content.',
    metrics: [
      { value: '00', label: 'Metric one' },
      { value: '00', label: 'Metric two' },
      { value: '00', label: 'Metric three' },
    ],
    gallery: [
      { src: '/athlete-silhouette.webp', alt: 'Athlete preparing to train', caption: 'The mindset' },
      { src: '/athlete-shoe.webp', alt: 'Training footwear detail', caption: 'Built for work' },
      { src: '/athlete-woman.webp', alt: 'Athlete during training', caption: 'The effort' },
      { src: '/athlete-parkour.webp', alt: 'Athlete in motion outdoors', caption: 'No standing still' },
    ],
  },
];

export const projectHref = (project) => `/?project=${encodeURIComponent(project.slug)}`;
