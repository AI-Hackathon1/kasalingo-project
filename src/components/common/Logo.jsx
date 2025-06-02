"use client"

// Kid-Friendly KasaLingo Logo - Sweet Candy Theme for Ages 4-12
export default function SweetCandyLogo({ size = "medium" }) {
  const dimensions = {
    small: { width: 80, height: 80, textSize: "text-xl", ghSize: "w-8 h-8", textClass: "text-xs" },
    medium: { width: 120, height: 120, textSize: "text-3xl", ghSize: "w-10 h-10", textClass: "text-sm" },
    large: { width: 200, height: 200, textSize: "text-6xl", ghSize: "w-16 h-16", textClass: "text-xl" },
  }

  const { width, height, textSize, ghSize, textClass } = dimensions[size]

  return (
    <div className="flex items-center gap-1">
      {/* Sweet Candy Sun Logo */}
      <div className="relative">
        <svg
          width={width}
          height={height}
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid meet"
          style={{
            shapeRendering: "crispEdges",
            imageRendering: "crisp-edges",
            textRendering: "optimizeSpeed"
          }}
        >
          <defs>
            {/* Sweet Candy Gradients */}
            <linearGradient id={`candyGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="25%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="75%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <radialGradient id={`candyInner-${size}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fef7ff" />
            </radialGradient>
          </defs>

          {/* Sweet Outer circle */}
          <circle cx="400" cy="400" r="300" fill={`url(#candyGradient-${size})`} stroke="#ffffff" strokeWidth="10" />

          {/* Candy Inner circle */}
          <circle cx="400" cy="400" r="230" fill={`url(#candyInner-${size})`} stroke="#f472b6" strokeWidth="5" />

          {/* Candy sound bars */}
          <rect x="220" y="280" width="30" height="160" fill="#fbbf24" rx="15" />
          <rect x="270" y="240" width="30" height="240" fill="#f472b6" rx="15" />
          <rect x="320" y="260" width="30" height="200" fill="#a78bfa" rx="15" />
          <rect x="370" y="200" width="30" height="320" fill="#34d399" rx="15" />
          <rect x="420" y="240" width="30" height="240" fill="#60a5fa" rx="15" />
          <rect x="470" y="270" width="30" height="180" fill="#fbbf24" rx="15" />
          <rect x="520" y="220" width="30" height="280" fill="#f472b6" rx="15" />

          {/* Sweet candy eyes */}
          <circle cx="320" cy="320" r="22" fill="#1f2937" />
          <circle cx="480" cy="320" r="22" fill="#1f2937" />

          {/* Candy eye highlights */}
          <circle cx="326" cy="314" r="8" fill="#ffffff" />
          <circle cx="486" cy="314" r="8" fill="#ffffff" />

          {/* Sweet smile */}
          <path d="M 300 460 Q 400 520 500 460" stroke="#1f2937" strokeWidth="16" fill="none" strokeLinecap="round" />

          {/* Candy orbiting stars */}
          <g>
            {/* Star 1 - Lemon Yellow - Top Left */}
            <g className="animate-spin" style={{ transformOrigin: "400px 400px", animationDuration: "8s" }}>
              <polygon
                points="170,170 175,180 185,180 177,190 182,200 170,193 158,200 163,190 155,180 165,180"
                fill="#fbbf24"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
            </g>

            {/* Star 2 - Bubblegum Pink - Top Right */}
            <g
              className="animate-spin"
              style={{ transformOrigin: "400px 400px", animationDuration: "10s", animationDirection: "reverse" }}
            >
              <polygon
                points="630,170 635,180 645,180 637,190 642,200 630,193 618,200 623,190 615,180 625,180"
                fill="#f472b6"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
            </g>

            {/* Star 3 - Cotton Candy Purple - Bottom Left */}
            <g className="animate-spin" style={{ transformOrigin: "400px 400px", animationDuration: "12s" }}>
              <polygon
                points="170,630 175,640 185,640 177,650 182,660 170,653 158,660 163,650 155,640 165,640"
                fill="#a78bfa"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
            </g>

            {/* Star 4 - Mint Green - Bottom Right */}
            <g
              className="animate-spin"
              style={{ transformOrigin: "400px 400px", animationDuration: "6s", animationDirection: "reverse" }}
            >
              <polygon
                points="630,630 635,640 645,640 637,650 642,660 630,653 618,660 623,650 615,640 625,640"
                fill="#34d399"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
            </g>

            {/* Extra candy sparkles */}
            <g className="animate-pulse" style={{ animationDuration: "2s" }}>
              <circle cx="200" cy="300" r="6" fill="#f472b6" />
              <circle cx="600" cy="250" r="5" fill="#a78bfa" />
              <circle cx="180" cy="500" r="7" fill="#34d399" />
              <circle cx="620" cy="550" r="6" fill="#60a5fa" />
              <circle cx="300" cy="180" r="4" fill="#fbbf24" />
              <circle cx="500" cy="620" r="5" fill="#f472b6" />
            </g>
          </g>
        </svg>
      </div>

      {/* Sweet Candy Text */}
      <div className="flex items-center gap-2">
        <div className={`${textSize} font-black`}>
          <span
            className="text-pink-500"
            style={{
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              textShadow: "3px 3px 0px #ffffff, 4px 4px 0px #f472b6",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "geometricPrecision",
              fontWeight: "900",
              filter: "contrast(1.2)",
            }}
          >
            Kasa
          </span>
          <span
            className="text-purple-400"
            style={{
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              textShadow: "3px 3px 0px #ffffff, 4px 4px 0px #a78bfa",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "geometricPrecision",
              fontWeight: "900",
              filter: "contrast(1.2)",
            }}
          >
            Lingo
          </span>
        </div>

        {/* Sweet Candy GH */}
        <div
          className={`${ghSize} bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center border-3 border-white shadow-lg`}
          style={{
            imageRendering: "crisp-edges",
          }}
        >
          <span
            className={`${textClass} font-black text-white`}
            style={{
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "geometricPrecision",
              fontWeight: "900",
            }}
          >
            GH
          </span>
        </div>
      </div>
    </div>
  )
}
