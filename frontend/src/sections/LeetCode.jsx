import { useEffect, useState, useRef,useLayoutEffect  } from "react";
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
  if (!data) return <StateCard text="Loading LeetCode profile…" />;

  const { user, avatar, ranking, solved, total, contest } = data;
  



  return (
    <section  id ="DSA" className="leetcode-section">
      <h2 className="text-[48px] font-extrabold tracking-[-0.02em] text-white mb-8">Leetcode Performance</h2>

      <div className="leetcode-card">
        {/* HEADER */}
        <div className="lc-header-section">
          <div className="lc-header">
            <img src={avatar} className="lc-avatar" />
            <div>
              <div className="lc-username">{user}</div>
              <div className="lc-rank">
                Global Rank {ranking.toLocaleString()}
              </div>
            </div>
          </div>
          

          <div className="lc-contest-stats-mini">
            <MiniStat label="Rating" value={Math.round(contest.rating)} />
            <MiniStat
              label="Rank"
              value={contest.globalRank?.toLocaleString()}
            />
            <MiniStat label="Contests" value={contest.attended} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="lc-content-grid">
          {/* LEFT: CHART */}
          <ContestChart history={contest.history} />

          {/* RIGHT: RING */}
          <div className="lc-ring-section">
            <div className="lc-ring-card">
              <SolvedRing solved={solved} total={total} />

              <div className="lc-breakdown">
                <Breakdown
                  label="Easy"
                  value={`${solved.easy}/${total.easy}`}
                  color="#22c1b6"
                />
                <Breakdown
                  label="Medium"
                  value={`${solved.medium}/${total.medium}`}
                  color="#f4c430"
                />
                <Breakdown
                  label="Hard"
                  value={`${solved.hard}/${total.hard}`}
                  color="#ef4444"
                />
              </div>
            </div>
          </div>
        </div>

        <a
          href={`https://leetcode.com/${user}`}
          target="_blank"
          className="lc-link"
        >
          View full profile →
        </a>
      </div>
    </section>
  );
}

function SolvedRing({ solved, total }) {
  const radius = 72;
  const stroke = 10;
  const C = 2 * Math.PI * radius;

  const TOTAL_ALL = total.easy + total.medium + total.hard;

  // segment sizes
  const easyArc = (total.easy / TOTAL_ALL) * C;
  const mediumArc = (total.medium / TOTAL_ALL) * C;
  const hardArc = (total.hard / TOTAL_ALL) * C;

  // filled portions
  const easyFill = (solved.easy / total.easy) * easyArc;
  const mediumFill = (solved.medium / total.medium) * mediumArc;
  const hardFill = (solved.hard / total.hard) * hardArc;

  return (
    <div className="lc-ring-container">
      <svg viewBox="0 0 180 180" className="lc-ring-svg">
        {/* background */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#2a2a2a"
          strokeWidth={stroke}
          fill="none"
        />

        {/* EASY */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#22c1b6"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${easyFill} ${C}`}
          strokeDashoffset={0}
          strokeLinecap="round"
        />

        {/* MEDIUM */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#f4c430"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${mediumFill} ${C}`}
          strokeDashoffset={-easyArc}
          strokeLinecap="round"
        />

        {/* HARD */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#ef4444"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${hardFill} ${C}`}
          strokeDashoffset={-(easyArc + mediumArc)}
          strokeLinecap="round"
        />
      </svg>

      {/* CENTER */}
      <div className="lc-ring-center">
        <strong>
          {solved.easy + solved.medium + solved.hard}
          <span>/{TOTAL_ALL}</span>
        </strong>
        <div className="ring-sub">✓ Solved</div>
      </div>
    </div>
  );
}

/* ======================================================
   CONTEST CHART (Hover = LeetCode style)
====================================================== */

function ContestChart({ history }) {
  const [hovered, setHovered] = useState(null);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);

  if (!history?.length) return null;

  const sorted = [...history].sort(
    (a, b) => a.contest.startTime - b.contest.startTime
  );

  const min = 1000;
  const max = 2000;
  const h = 160;
  const w = 360;
  const pad = { l: 50, r: 20, t: 20, b: 30 };

  const step = (w - pad.l - pad.r) / (sorted.length - 1 || 1);

  const points = sorted.map((c, i) => ({
    x: pad.l + i * step,
    y: pad.t + (h - pad.t - pad.b) * (1 - (c.rating - min) / (max - min)),
    rating: Math.round(c.rating),
    title: c.contest.title,
    date: new Date(c.contest.startTime * 1000).toDateString(),
  }));

  const path = points.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");

  // Measure tooltip width once it appears
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      setTooltipWidth(tooltipRef.current.offsetWidth);
    }
  }, [hovered]);

  return (
    <div className="lc-chart">
      <div className="chart-label">📈 Contest Rating</div>

      <div className="chart-wrapper" ref={wrapperRef}>
        <svg viewBox={`0 0 ${w} ${h}`} className="chart-svg">
          {/* axes */}
          <line
            x1={pad.l}
            y1={pad.t}
            x2={pad.l}
            y2={h - pad.b}
            stroke="#4b5563"
          />
          <line
            x1={pad.l}
            y1={h - pad.b}
            x2={w - pad.r}
            y2={h - pad.b}
            stroke="#4b5563"
          />

          {/* y labels */}
          {[1000, 1250, 1500, 1750, 2000].map((v) => {
            const y =
              pad.t + (h - pad.t - pad.b) * (1 - (v - min) / (max - min));
            return (
              <text key={v} x={pad.l - 8} y={y + 4} textAnchor="end">
                {v}
              </text>
            );
          })}

          {/* line */}
          <path d={path} fill="none" stroke="#facc15" strokeWidth="2.5" />

          {/* points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hovered === i ? 5 : 3}
              fill="#facc15"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {hovered !== null && wrapperRef.current && (
          <div
            ref={tooltipRef}
            className="chart-tooltip"
            style={{
              left: (() => {
                const wrapperWidth = wrapperRef.current.clientWidth;
                const rawLeft =
                  (points[hovered].x / w) * wrapperWidth;

                const padding = 12;
                return Math.min(
                  wrapperWidth - tooltipWidth / 2 - padding,
                  Math.max(tooltipWidth / 2 + padding, rawLeft)
                );
              })(),
              top:
                (points[hovered].y / h) *
                wrapperRef.current.clientHeight,
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


/* ======================================================
   SMALL COMPONENTS
====================================================== */
function Breakdown({ label, value, color }) {
  return (
    <div className="lc-stat">
      <span style={{ color }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="contest-stat-mini">
      <span>{label}</span>
      <strong>{value ?? "—"}</strong>
    </div>
  );
}

function StateCard({ text }) {
  return (
    <section className="leetcode-section">
      <div className="leetcode-card muted">{text}</div>
    </section>
  );
}
