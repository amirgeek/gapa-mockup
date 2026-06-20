const paths = {
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9h14v-9" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z" />
      <path d="M4 17h14" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-4 3-6 7-6s7 2 7 6" />
      <circle cx="17" cy="9" r="3" />
      <path d="M22 19c0-3-2-5-5-5" />
    </>
  ),
  chat: <path d="M4 5h16v11H8l-4 4z" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12c0 .5-.1 1-.2 1.4l1.7 1.3-2 3.4-2-.8c-.8.6-1.6 1-2.5 1.3L14 21h-4l-.3-2.4c-.9-.3-1.8-.7-2.5-1.3l-2 .8-2-3.4 1.7-1.3C5.1 13 5 12.5 5 12s.1-1 .2-1.4L3.5 9.3l2-3.4 2 .8c.8-.6 1.6-1 2.5-1.3L10 3h4l.3 2.4c.9.3 1.8.7 2.5 1.3l2-.8 2 3.4-1.7 1.3c.1.4.2.9.2 1.4z" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12l5 5L20 7" />,
  play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C9 4 4 9 4 20c9 0 16-5 16-16z" />
      <path d="M4 20l8-8" />
    </>
  ),
  sparkle: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />,
  logout: (
    <>
      <path d="M10 17l-5-5 5-5" />
      <path d="M5 12h12M16 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3" />
    </>
  ),
}

export function AppIcon({ name, className = '', size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ width: size, height: size, flexShrink: 0 }}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
