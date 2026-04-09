import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "../styles/leetcode.css";

export default function LeetCode() {
  const USERNAME = "siddharthraj3101";
  const API = import.meta.env.VITE_LEETCODE_API || "http://localhost:5001";

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/user/${USERNAME}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <StateCard text="Failed to load LeetCode profile" />;
  if (!data)  return <StateCard text="Loading LeetCode profile…" />;

  const { user, avatar, ranking, solved, total, contest } = data;

  return (
    <section id="DSA" className="lc-section">

      {/* ── Section header ── */}
      <div className="lc-eyebrow">
        <span className="lc-eyebrow-dot" />
        <span className="lc-eyebrow-text">DSA</span>
      </div>
      <h2 className="lc-heading">
        LeetCode<br />
        <span className="lc-heading--ghost">Performance.</span>
      </h2>

      {/* ── Main card ── */}
      <div className="lc-card">
        <div className="lc-card-glow" />

        {/* ── Top row: profile + contest stats ── */}
        <div className="lc-top-row">

          {/* Profile pill */}
          <div className="lc-profile">
            <div className="lc-avatar-wrap">
              <img src={avatar} alt={user} className="lc-avatar" />
              <span className="lc-avatar-ring" />
            </div>
            <div>
              <div className="lc-username">{user}</div>
              <div className="lc-rank">
                Global Rank&nbsp;
                <strong>{ranking.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Contest mini stats */}
          <div className="lc-mini-stats">
            <MiniStat label="Rating"   value={Math.round(contest.rating)}           accent="yellow" />
            <MiniStat label="Top Rank" value={contest.globalRank?.toLocaleString()} accent="blue"   />
            <MiniStat label="Contests" value={contest.attended}                      accent="green"  />
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="lc-divider" />

        {/* ── Bottom grid: chart | ring + breakdown ── */}
        <div className="lc-content-grid">
          <ContestChart history={contest.history} />

          <div className="lc-right-col">
            <SolvedRing solved={solved} total={total} />
            <div className="lc-breakdown">
              <Breakdown label="Easy"   value={`${solved.easy}/${total.easy}`}     color="#22c1b6" bg="rgba(34,193,182,.08)"  border="rgba(34,193,182,.2)"  />
              <Breakdown label="Medium" value={`${solved.medium}/${total.medium}`} color="#f4c430" bg="rgba(244,196,48,.08)"  border="rgba(244,196,48,.2)"  />
              <Breakdown label="Hard"   value={`${solved.hard}/${total.hard}`}     color="#ef4444" bg="rgba(239,68,68,.08)"   border="rgba(239,68,68,.2)"   />
            </div>
          </div>
        </div>

        {/* ── Footer link ── */}
        <a
          href={`https://leetcode.com/${user}`}
          target="_blank"
          rel="noopener noreferrer"
          className="lc-link"
        >
          <span>View full profile</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M7 7h10v10"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ── Solved Ring ─────────────────────────────────────────────── */
function SolvedRing({ solved, total }) {
  const radius = 68;
  const stroke = 9;
  const C = 2 * Math.PI * radius;
  const TOTAL_ALL = total.easy + total.medium + total.hard;

  const easyArc   = (total.easy   / TOTAL_ALL) * C;
  const mediumArc = (total.medium / TOTAL_ALL) * C;
  const hardArc   = (total.hard   / TOTAL_ALL) * C;

  const easyFill   = (solved.easy   / total.easy)   * easyArc;
  const mediumFill = (solved.medium / total.medium) * mediumArc;
  const hardFill   = (solved.hard   / total.hard)   * hardArc;

  const totalSolved = solved.easy + solved.medium + solved.hard;

  return (
    <div className="lc-ring-wrap">
      <svg viewBox="0 0 180 180" className="lc-ring-svg">
        {/* Track */}
        <circle cx="90" cy="90" r={radius} stroke="#1e2530" strokeWidth={stroke} fill="none" />
        {/* Easy */}
        <circle cx="90" cy="90" r={radius} stroke="#22c1b6" strokeWidth={stroke} fill="none"
          strokeDasharray={`${easyFill} ${C}`} strokeDashoffset={0} strokeLinecap="round" />
        {/* Medium */}
        <circle cx="90" cy="90" r={radius} stroke="#f4c430" strokeWidth={stroke} fill="none"
          strokeDasharray={`${mediumFill} ${C}`} strokeDashoffset={-easyArc} strokeLinecap="round" />
        {/* Hard */}
        <circle cx="90" cy="90" r={radius} stroke="#ef4444" strokeWidth={stroke} fill="none"
          strokeDasharray={`${hardFill} ${C}`} strokeDashoffset={-(easyArc + mediumArc)} strokeLinecap="round" />
      </svg>
      <div className="lc-ring-center">
        <strong className="lc-ring-total">{totalSolved}<span>/{TOTAL_ALL}</span></strong>
        <div className="lc-ring-sub">Solved</div>
      </div>
    </div>
  );
}

/* ── Contest Chart ───────────────────────────────────────────── */
function ContestChart({ history }) {
  const [hovered, setHovered]       = useState(null);
  const wrapperRef                  = useRef(null);
  const tooltipRef                  = useRef(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);

  useLayoutEffect(() => {
    if (tooltipRef.current) setTooltipWidth(tooltipRef.current.offsetWidth);
  }, [hovered]);

  if (!history?.length) return null;

  const sorted = [...history].sort((a, b) => a.contest.startTime - b.contest.startTime);

  const min = 1000, max = 2000;
  const h = 160, w = 360;
  const pad = { l: 50, r: 20, t: 20, b: 30 };
  const step = (w - pad.l - pad.r) / (sorted.length - 1 || 1);

  const points = sorted.map((c, i) => ({
    x:      pad.l + i * step,
    y:      pad.t + (h - pad.t - pad.b) * (1 - (c.rating - min) / (max - min)),
    rating: Math.round(c.rating),
    title:  c.contest.title,
    date:   new Date(c.contest.startTime * 1000).toDateString(),
  }));

  const path = points.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");

  // Area fill path
  const areaPath =
    path +
    ` L ${points[points.length - 1].x} ${h - pad.b} L ${points[0].x} ${h - pad.b} Z`;

  return (
    <div className="lc-chart">
      <div className="lc-chart-label">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        Contest Rating History
      </div>

      <div className="lc-chart-wrapper" ref={wrapperRef}>
        <svg viewBox={`0 0 ${w} ${h}`} className="lc-chart-svg">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#facc15" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#facc15" stopOpacity="0"    />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[1000, 1250, 1500, 1750, 2000].map((v) => {
            const y = pad.t + (h - pad.t - pad.b) * (1 - (v - min) / (max - min));
            return (
              <g key={v}>
                <line x1={pad.l} y1={y} x2={w - pad.r} y2={y}
                  stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                <text x={pad.l - 8} y={y + 4} textAnchor="end" className="lc-axis-text">{v}</text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1={pad.l} y1={pad.t} x2={pad.l} y2={h - pad.b} stroke="rgba(255,255,255,0.1)" />
          <line x1={pad.l} y1={h - pad.b} x2={w - pad.r} y2={h - pad.b} stroke="rgba(255,255,255,0.1)" />

          {/* Area fill */}
          <path d={areaPath} fill="url(#areaGrad)" />

          {/* Line */}
          <path d={path} fill="none" stroke="#facc15" strokeWidth="2.2"
            style={{ filter: "drop-shadow(0 0 6px rgba(250,204,21,0.5))" }} />

          {/* Points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y}
              r={hovered === i ? 5 : 3}
              fill={hovered === i ? "#fff" : "#facc15"}
              stroke={hovered === i ? "#facc15" : "none"}
              strokeWidth="2"
              style={{ cursor: "pointer", transition: "r .15s ease" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {hovered !== null && wrapperRef.current && (
          <div
            ref={tooltipRef}
            className="lc-tooltip"
            style={{
              left: (() => {
                const ww = wrapperRef.current.clientWidth;
                const raw = (points[hovered].x / w) * ww;
                return Math.min(ww - tooltipWidth / 2 - 12, Math.max(tooltipWidth / 2 + 12, raw));
              })(),
              top: (points[hovered].y / h) * wrapperRef.current.clientHeight,
            }}
          >
            <strong>{points[hovered].rating}</strong>
            <span>{points[hovered].title}</span>
            <small>{points[hovered].date}</small>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Small components ────────────────────────────────────────── */
function Breakdown({ label, value, color, bg, border }) {
  return (
    <div className="lc-stat" style={{ "--stat-color": color, "--stat-bg": bg, "--stat-border": border }}>
      <div className="lc-stat-left">
        <span className="lc-stat-dot" style={{ background: color }} />
        <span className="lc-stat-label" style={{ color }}>{label}</span>
      </div>
      <strong className="lc-stat-value">{value}</strong>
    </div>
  );
}

function MiniStat({ label, value, accent }) {
  return (
    <div className={`lc-mini-stat lc-mini-stat--${accent}`}>
      <span className="lc-mini-label">{label}</span>
      <strong className="lc-mini-value">{value ?? "—"}</strong>
    </div>
  );
}

function StateCard({ text }) {
  return (
    <section className="lc-section">
      <div className="lc-card lc-card--muted">{text}</div>
    </section>
  );
}