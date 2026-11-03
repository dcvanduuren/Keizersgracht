/**
 * Full-screen logo intro that builds the sunset mark, then flies it into the navbar logo slot.
 * Pure CSS so it covers the page from the first paint, before hydration.
 */
export function IntroSplash() {
  return (
    <div aria-hidden className="intro-splash">
      <div className="intro-splash-logo">
        <svg viewBox="0 0 256 256" fill="none" className="size-full overflow-visible">
          <defs>
            <linearGradient id="intro-sky" x1="128" y1="12" x2="128" y2="125" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F2683C" />
              <stop offset="55%" stopColor="#F69271" />
              <stop offset="100%" stopColor="#F9BCA5" />
            </linearGradient>
            <linearGradient id="intro-water" x1="128" y1="131" x2="128" y2="244" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B8D2CE" />
              <stop offset="50%" stopColor="#8DB2B6" />
              <stop offset="100%" stopColor="#699399" />
            </linearGradient>
            <clipPath id="intro-clip">
              <rect x="12" y="12" width="232" height="232" rx="14" />
            </clipPath>
          </defs>

          <g className="intro-frame">
            <g clipPath="url(#intro-clip)">
              <rect x="12" y="12" width="232" height="113" fill="url(#intro-sky)" />
              <path className="intro-sun" d="M 73 125 A 55 55 0 0 1 183 125 Z" fill="#F5F4ED" />
              <rect x="12" y="125" width="232" height="6" fill="#F5F4ED" />
              <rect x="12" y="131" width="232" height="113" fill="url(#intro-water)" />
              <line x1="12" y1="125" x2="244" y2="125" stroke="#733635" strokeWidth="1.5" />
              <line x1="12" y1="131" x2="244" y2="131" stroke="#733635" strokeWidth="1.5" />
            </g>
            <rect x="12" y="12" width="232" height="232" rx="14" stroke="#733635" strokeWidth="1.75" />
          </g>

          <g className="intro-paths">
            <g clipPath="url(#intro-clip)">
              <path
                d="M 12 162 H 92 C 128 162, 128 101, 164 101 H 244"
                stroke="#351E10"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="2.5 4.5"
              />
              <path
                d="M 12 181 H 104 C 134 181, 134 147, 164 147 H 244"
                stroke="#351E10"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="2.5 4.5"
              />
            </g>
            <circle cx="12" cy="162" r="3.5" fill="#351E10" />
            <circle cx="67" cy="162" r="3.5" fill="#351E10" />
            <circle cx="12" cy="181" r="3.5" fill="#351E10" />
            <circle cx="195" cy="101" r="3.5" fill="#351E10" />
            <circle cx="244" cy="101" r="3.5" fill="#351E10" />
            <circle cx="191" cy="147" r="3.5" fill="#351E10" />
            <circle cx="244" cy="147" r="3.5" fill="#351E10" />
          </g>
        </svg>
      </div>
    </div>
  );
}
