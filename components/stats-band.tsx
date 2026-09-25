import { Counter } from "@/components/counter";

type Stat = { value: number; suffix?: string; label: string; sub: string };

function StatBlock({ stat }: { stat: Stat }) {
  return (
    <div className="stat-block">
      <Counter value={stat.value} suffix={stat.suffix} />
      <span className="stat-label">{stat.label}</span>
      <span className="stat-sub">{stat.sub}</span>
    </div>
  );
}

export function StatsBand({ stats, statement }: { stats: Stat[]; statement: { tag: string; text: string } }) {
  return (
    <section className="stats-band" aria-label="PSM in numbers">
      <div className="dotfield" aria-hidden="true" />
      <div className="container-x">
        <div className="stats-head">
          <span className="eyebrow eyebrow--light">PSM in numbers</span>
        </div>
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-col">
              <StatBlock stat={s} />
            </div>
          ))}
          <div className="stat-col stat-col--tile">
            <span className="stat-tag">{statement.tag}</span>
            <p className="stat-tile-text">{statement.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}