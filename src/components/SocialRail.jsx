const socials = [
  { label: 'Instagram', short: 'IG', href: '#' },
  { label: 'TikTok', short: 'TK', href: '#' },
  { label: 'LinkedIn', short: 'IN', href: '#' },
  { label: 'YouTube', short: 'YT', href: '#' },
];

export default function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Social media">
      <span className="social-rail-label">Follow FLOW</span>
      <span className="social-rail-line" aria-hidden="true" />
      {socials.map(social => (
        <a key={social.label} href={social.href} aria-label={social.label} className="social-rail-link">
          {social.short}
        </a>
      ))}
    </aside>
  );
}
