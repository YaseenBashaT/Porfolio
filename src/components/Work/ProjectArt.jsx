// Small line illustrations. They draw themselves once the card is revealed
// (see .art path in index.scss).

const arts = {
  rows: (
    <>
      <rect x="20" y="22" width="260" height="156" rx="4" />
      <path d="M20 52h260M20 82h260M20 112h260M20 142h260M92 22v156M180 22v156" />
      <path className="hi" d="M20 82h72v30H20z" />
      <circle className="dotfill" cx="236" cy="127" r="6" />
    </>
  ),
  graph: (
    <>
      <path d="M60 100L130 48M60 100L120 150M130 48L215 70M120 150L215 70M215 70L250 140M120 150L250 140M130 48L120 150" />
      {[
        [60, 100, 9],
        [130, 48, 7],
        [120, 150, 11],
        [215, 70, 8],
        [250, 140, 7],
      ].map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} className="node" />
      ))}
      <circle className="dotfill" cx="120" cy="150" r="4" />
    </>
  ),
  route: (
    <>
      <path d="M20 40h70v50h60v40h130M20 150h40M110 22v40M200 22v60h80M190 178v-48" opacity=".45" />
      <path className="hi" d="M28 160C80 160 70 70 130 80S200 40 270 48" />
      <circle className="node" cx="28" cy="160" r="7" />
      <circle className="dotfill" cx="270" cy="48" r="7" />
    </>
  ),
  bars: (
    <>
      <path d="M30 170h250M30 170V24" opacity=".45" />
      <rect x="52" y="120" width="24" height="50" />
      <rect x="92" y="96" width="24" height="74" />
      <rect x="132" y="72" width="24" height="98" />
      <rect className="hi" x="172" y="44" width="24" height="126" />
      <path className="hi" d="M44 134C100 126 150 70 250 34" />
      <circle className="dotfill" cx="250" cy="34" r="6" />
    </>
  ),
  code: (
    <>
      <rect x="30" y="22" width="240" height="156" rx="4" />
      <path d="M30 50h240" />
      <path d="M58 82l-18 14 18 14M242 82l18 14-18 14" className="hi" />
      <path d="M150 74l-22 44M92 148h60M92 130h30M180 148h40" />
      <circle className="dotfill" cx="46" cy="36" r="3" />
    </>
  ),
  doc: (
    <>
      <rect x="80" y="14" width="140" height="172" rx="4" />
      <path d="M100 48h60M100 70h100M100 88h100M100 106h72M100 142h100" />
      <path className="hi" d="M100 128h100" />
      <path d="M236 60a26 26 0 1 1-26-26" opacity=".45" />
      <path className="hi" d="M236 60a26 26 0 0 0-26-26" />
    </>
  ),
}

const ProjectArt = ({ name }) => (
  <svg className="art" viewBox="0 0 300 200" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {arts[name]}
  </svg>
)

// Same artwork, drawn inverted, plus the labels that explain what is inside.
// Revealed through the cursor lens (see .peek in index.scss).
export const Peek = ({ name, items = [] }) => (
  <div className="peek" aria-hidden="true">
    <svg className="art" viewBox="0 0 300 200" fill="none" stroke="currentColor" strokeWidth="1.5">
      {arts[name]}
      {items.map((l) => {
        const lines = [].concat(l.t)
        return (
          <text key={lines.join()} x={l.x} y={l.y} textAnchor={l.a || 'start'} className="peek-label">
            {lines.map((ln, i) => (
              <tspan key={ln} x={l.x} dy={i ? 10.5 : 0}>{ln}</tspan>
            ))}
          </text>
        )
      })}
    </svg>
  </div>
)

export default ProjectArt
