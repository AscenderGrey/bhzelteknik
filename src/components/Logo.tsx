// The BHZ mark rebuilt as vector: three rounded tiles (B·H·Z) + wordmark.
// Tiles use currentColor; letters use --tile-ink, so it works on dark and light.
const glyphs = {
  B: "M24 22H64Q76 22 76 34V42Q76 48 71 50Q76 52 76 58V66Q76 78 64 78H24ZM40 35V43H58Q61 43 61 40V38Q61 35 58 35ZM40 57V65H58Q61 65 61 62V60Q61 57 58 57Z",
  H: "M24 22H40V42H60V22H76V78H60V58H40V78H24Z",
  Z: "M24 22H76V36L44 64H76V78H24V64L56 36H24Z",
} as const;

export type Letter = keyof typeof glyphs;

function TileShape({ letter, x = 0 }: { letter: Letter; x?: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect width="100" height="100" rx="18" fill="currentColor" />
      <path d={glyphs[letter]} fill="var(--tile-ink, #fff)" fillRule="evenodd" />
    </g>
  );
}

export function Tile({ letter, className }: { letter: Letter; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <TileShape letter={letter} />
    </svg>
  );
}

export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <svg viewBox={wordmark ? "0 0 316 134" : "0 0 316 100"} className={className} role="img" aria-label="BHZ elteknik stockholm ab">
      <TileShape letter="B" />
      <TileShape letter="H" x={108} />
      <TileShape letter="Z" x={216} />
      {wordmark && (
        <text x="0" y="130" fill="currentColor" fontSize="28" fontWeight="800" textLength="316" lengthAdjust="spacingAndGlyphs">
          elteknik stockholm ab
        </text>
      )}
    </svg>
  );
}
