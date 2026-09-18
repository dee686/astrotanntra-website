import React from 'react';

// Celestial Armillary Sphere & Planetary Rings (Left Hero Artwork)
export function ArmillarySphereArtwork({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_35px_rgba(245,158,11,0.25)]">
        <defs>
          <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
          <radialGradient id="nebulaCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#7e22ce" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#3b0764" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Central Glowing Celestial Orb */}
        <circle cx="250" cy="250" r="75" fill="url(#nebulaCore)" />
        <circle cx="250" cy="250" r="28" fill="#fbbf24" opacity="0.8" filter="blur(6px)" />
        <circle cx="250" cy="250" r="14" fill="#fff" />

        {/* Outer Meridian Ring */}
        <circle cx="250" cy="250" r="210" stroke="url(#goldRingGrad)" strokeWidth="4" fill="none" opacity="0.6" />
        <circle cx="250" cy="250" r="200" stroke="url(#goldRingGrad)" strokeWidth="1.5" strokeDasharray="4 8" fill="none" opacity="0.7" />

        {/* Diagonal Elliptical Rings (Equator & Ecliptic) */}
        <ellipse cx="250" cy="250" rx="205" ry="85" stroke="url(#goldRingGrad)" strokeWidth="3" fill="none" transform="rotate(-30 250 250)" opacity="0.85" />
        <ellipse cx="250" cy="250" rx="205" ry="85" stroke="url(#goldRingGrad)" strokeWidth="2.5" fill="none" transform="rotate(35 250 250)" opacity="0.8" />
        <ellipse cx="250" cy="250" rx="170" ry="60" stroke="url(#goldRingGrad)" strokeWidth="2" fill="none" transform="rotate(75 250 250)" opacity="0.65" />

        {/* Axis Bar */}
        <line x1="80" y1="110" x2="420" y2="390" stroke="url(#goldRingGrad)" strokeWidth="3.5" opacity="0.75" />
        <circle cx="80" cy="110" r="6" fill="#fef08a" />
        <circle cx="420" cy="390" r="6" fill="#fef08a" />

        {/* Planetary nodes */}
        <circle cx="380" cy="200" r="6" fill="#38bdf8" />
        <circle cx="130" cy="270" r="5" fill="#f43f5e" />
        <circle cx="290" cy="120" r="7" fill="#fbbf24" />
        <circle cx="210" cy="370" r="5.5" fill="#34d399" />
      </svg>
    </div>
  );
}

// Sacred Golden Ganesha Artwork with Glowing Diya (Right Hero Artwork)
export function GaneshaArtwork({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 500 650" className="w-full h-full drop-shadow-[0_0_45px_rgba(245,158,11,0.4)]">
        <defs>
          <linearGradient id="goldGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="haloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Radiant Divine Halo (Prabhavali) */}
        <circle cx="250" cy="210" r="180" fill="url(#haloGrad)" />
        <circle cx="250" cy="210" r="170" stroke="url(#goldGlowGrad)" strokeWidth="2" strokeDasharray="6 8" fill="none" opacity="0.6" />
        <circle cx="250" cy="210" r="150" stroke="url(#goldGlowGrad)" strokeWidth="3" fill="none" opacity="0.75" />

        {/* Crown (Mukut) */}
        <path
          d="M200,120 L250,30 L300,120 L280,140 L220,140 Z"
          fill="url(#goldGlowGrad)"
          stroke="#78350f"
          strokeWidth="2"
        />
        <circle cx="250" cy="65" r="7" fill="#dc2626" />
        <circle cx="250" cy="100" r="5" fill="#fde047" />

        {/* Head & Forehead */}
        <path
          d="M175,180 C175,140 220,130 250,130 C280,130 325,140 325,180 C325,220 300,240 280,260 C265,275 235,275 220,260 C200,240 175,220 175,180 Z"
          fill="url(#goldGlowGrad)"
          stroke="#78350f"
          strokeWidth="2"
        />

        {/* Sacred Tilak (Trishul / Chandan Tilak) */}
        <path d="M245,145 L255,145 L255,175 L245,175 Z" fill="#dc2626" />
        <path d="M235,150 C245,170 255,170 265,150" stroke="#fef08a" strokeWidth="3" fill="none" />
        <circle cx="250" cy="180" r="4" fill="#dc2626" />

        {/* Large Divine Ears */}
        {/* Left Ear */}
        <path
          d="M180,160 C120,150 95,210 135,260 C160,285 185,250 185,220 Z"
          fill="url(#goldGlowGrad)"
          stroke="#78350f"
          strokeWidth="2"
        />
        <path d="M165,180 C135,180 125,220 150,245" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.7" />

        {/* Right Ear */}
        <path
          d="M320,160 C380,150 405,210 365,260 C340,285 315,250 315,220 Z"
          fill="url(#goldGlowGrad)"
          stroke="#78350f"
          strokeWidth="2"
        />
        <path d="M335,180 C365,180 375,220 350,245" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.7" />

        {/* Eyes */}
        <path d="M210,195 Q225,188 238,195" stroke="#451a03" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="225" cy="197" r="3" fill="#451a03" />
        <path d="M262,195 Q275,188 290,195" stroke="#451a03" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="275" cy="197" r="3" fill="#451a03" />

        {/* Curved Divine Trunk (Vakratunda) */}
        <path
          d="M240,230 C240,280 230,320 220,350 C210,380 235,410 265,400 C285,395 285,370 270,365 C255,360 250,340 260,300 C265,270 265,250 260,230 Z"
          fill="url(#goldGlowGrad)"
          stroke="#78350f"
          strokeWidth="2"
        />

        {/* Modak in Trunk / Hand */}
        <circle cx="272" cy="370" r="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />

        {/* Broken Tusk & Whole Tusk */}
        <path d="M232,240 L220,260 L235,255 Z" fill="#ffffff" stroke="#78350f" strokeWidth="1" />
        <path d="M268,240 L275,250 L266,248 Z" fill="#ffffff" stroke="#78350f" strokeWidth="1" />

        {/* Sacred Torso & Ornaments */}
        <path
          d="M170,300 C150,380 180,480 250,490 C320,480 350,380 330,300 C300,320 200,320 170,300 Z"
          fill="url(#goldGlowGrad)"
          stroke="#78350f"
          strokeWidth="2"
        />

        {/* Sacred Thread (Yajnopavita) */}
        <path d="M210,300 Q260,380 310,440" stroke="#fef08a" strokeWidth="3" fill="none" strokeDasharray="4 2" />

        {/* Golden Base / Lotus Seat */}
        <ellipse cx="250" cy="520" rx="140" ry="25" fill="url(#goldGlowGrad)" stroke="#78350f" strokeWidth="2" />
        <path d="M130,520 Q250,560 370,520" stroke="#ca8a04" strokeWidth="2" fill="none" />

        {/* Glowing Brass Diya (Oil Lamp) in Foreground */}
        <g transform="translate(250, 560)">
          {/* Diya Bowl */}
          <path d="M-40,10 Q0,35 40,10 Q25,2 0,0 Q-25,2 -40,10 Z" fill="url(#goldGlowGrad)" stroke="#78350f" strokeWidth="1.5" />
          <ellipse cx="0" cy="8" rx="28" ry="7" fill="#78350f" />

          {/* Glowing Flame */}
          <circle cx="0" cy="-6" r="22" fill="url(#flameGlow)" />
          <path d="M-6,5 Q0,-22 0,-24 Q0,-22 6,5 Q0,8 -6,5 Z" fill="#fef08a" />
          <circle cx="0" cy="-2" r="3" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
