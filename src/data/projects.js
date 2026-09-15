// CMS boundary: replace this collection with normalized CMS records.
// Copy and gallery images are draft content; confirm credits and metadata before publishing.
export const projects = [
  {
    slug: 'jordan-the-one', client: 'Jordan', category: 'Brand campaign',
    clientLogo: { src: '/jordan-logo.jpg', alt: 'Jordan Jumpman logo', variant: 'jordan', width: 736, height: 797 },
    title: 'The one.', subtitle: 'Luka Don\u010di\u0107 came home to Kalemegdan. We made sure the city knew before he arrived.',
    role: 'Creative & Amplification', year: '2026', location: 'Belgrade',
    image: '/jordan-thumbnail.webp', imageAlt: 'Players and fans under red lights at the Jordan The One Euro Finals', video: '/jordan-the-one.mp4',
    challenge: "Jordan Brand's global one-on-one tournament reached Belgrade as one of 15+ qualifying cities worldwide, with Luka Don\u010di\u0107 attending in person. Working alongside production agency Final Cut, who delivered the event itself, FLOW handled the creative and campaign around it: build anticipation across the city in the weeks before, fill Kalemegdan on the night, and carry the moment beyond the people standing courtside.",
    approach: 'Take Luka to the places that made Belgrade a basketball city, not just to a venue. Blokovi in New Belgrade, where generations of talent came up. Galerija, for the fans. Kalemegdan, where the tournament itself was staged, on the courts beneath the fortress walls.\n\nAround it, a social campaign built in three waves, before, during and after. Anticipation content to drive attendance, live capture through the day, and a post-event cut that kept the story running once the crowd went home.',
    metrics: [
      { value: '3,000+', label: 'People on site' },
      { value: '2M+', label: 'Views across channels' },
      { value: '3', label: 'City landmarks activated.' },
    ],
    gallery: [
      { src: '/jordan1.webp', alt: 'Crowded basketball court lit by red spotlights and smoke at Jordan The One in Belgrade', caption: 'The arrival' },
      { src: '/jordan2.webp', alt: 'One-on-one basketball action beneath the hoop at Jordan The One in Belgrade', caption: 'One on one' },
      { src: '/jordan3.webp', alt: 'Players in red Belgrade jerseys greeting the crowd at Jordan The One', caption: 'The crowd' },
      { src: '/jordan4.webp', alt: 'A red basketball jersey being signed amid fans and photographers at Jordan The One', caption: 'Courtside moments' },
      { src: '/jordan5.webp', alt: 'Host speaking into a microphone beside guests under the hoop at Jordan The One in Belgrade', caption: 'Under the lights' },
    ],
  },
  {
    slug: 'nike-midnight-run', client: 'Nike', category: 'Running / Community',
    clientLogo: { src: '/nike-run-logo.jpg', alt: 'Nike Run logo', variant: 'nike-run', width: 400, height: 500 },
    title: 'Midnight run.', subtitle: 'Midnight, 0\u00b0C, a parking depot in Bucharest. 100 runners turned up anyway.',
    role: 'Concept & Content Production', year: '2024', location: 'Bucharest',
    image: '/nikerun-thumbnail.webp', imageAlt: 'Red-lit parking garage course with a Nike Run projection at Nike Midnight Run in Bucharest', video: '/nike-midnight-run.mp4',
    challenge: "Put Nike's winter running gear in front of real runners, in real winter conditions, in a format built to travel on social. Turn a routine gear test into a story worth posting.",
    approach: "Take the run somewhere no one expected. Working alongside production agency Final Cut, who delivered the event on the ground, FLOW led the concept and content: the multi-level parking depot at Str\u0103ule\u0219ti became the circuit \u2014 concrete ramps standing in for a stadium, midnight standing in for a starting gun. 100 runners took it on at 0\u00b0C, testing the Pegasus 41 GORE-TEX and Pegasus 41 PRM in exactly the conditions they're built for.\n\nBuilt the whole thing around three tags \u2014 #MidnightRun #RunInTheDark #RunNoMatterWhat \u2014 so the story kept moving through the runners' own posts, not just the brand's.",
    metrics: [
      { value: '100+', label: 'Runners on site' },
      { value: '500K+', label: 'Media reach' },
      { value: '0\u00b0C', label: 'Race conditions' },
    ],
    gallery: [
      { src: '/nikerun1.webp', alt: 'Quad bike on the red-lit course inside a multilevel parking garage at Nike Midnight Run', caption: 'Setting the scene' },
      { src: '/nikerun2.webp', alt: 'Red spotlights and directional barriers lining the Nike Midnight Run course beneath a Nike Run projection', caption: 'The course' },
      { src: '/nikerun3.webp', alt: 'Spiral concrete parking ramp illuminated in red for Nike Midnight Run in Bucharest', caption: 'Around the ramps' },
      { src: '/nikerun4.webp', alt: 'Nike Pegasus campaign sign reading "Don\u0027t waste your energy. Run in Pegasus." at Nike Midnight Run', caption: 'Run in Pegasus' },
      { src: '/nikerun5.webp', alt: 'Runners gathering beside heaters under red lighting at Nike Midnight Run in Bucharest', caption: 'Shared energy' },
    ],
  },
  {
    slug: 'metcon-fortfight', client: 'Nike', category: 'Training / Activation',
    clientLogo: null,
    title: 'Fortfight.', subtitle: '200 of the fittest athletes in the Balkans. Two days on the turf at Ada Ciganlija.',
    role: 'Concept & Content Production', year: '2023', location: 'Belgrade',
    image: '/athlete-silhouette.webp', video: '/metcon-fortfight.mp4',
    challenge: 'Nike Metcon FortFight had outgrown a local competition. Working alongside production agency Final Cut, who delivered the event on the ground, FLOW handled the concept and content: turn a two-day CrossFit final into the biggest functional fitness event in the Balkans, and use it to launch the Nike Metcon 8 to the exact audience it was built for.',
    approach: "Build the event around the athletes, not the equipment. 200 finalists from 17 countries, across Elite, Master and Scaled categories, on rigs and barbell lanes built to broadcast standard. The Metcon 8 launch sat inside the competition itself \u2014 on the feet of the people it was designed for, not on a separate stage.\n\nContent built in the same three waves as the rest of FLOW's work: anticipation before the weekend, live capture across both days, and a highlight cut that carried the event past the people who stood on the turf.",
    metrics: [
      { value: '200', label: 'Athletes, 17 countries' },
      { value: '2', label: 'Days of competition' },
      { value: '200K+', label: 'Media reach.' },
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
