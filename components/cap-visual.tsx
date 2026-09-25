import type { Capability } from "@/lib/content";

const BARS = [<i key="a" />, <i key="b" />, <i key="c" />];

function Frame({ children, violet }: { children: React.ReactNode; violet?: boolean }) {
  return (
    <div className={`cs-visual${violet ? " cs-visual--v" : ""}`}>
      <div className="cs-chrome" aria-hidden="true">
        <span className="cs-dot" style={{ background: "#FF5F57" }} />
        <span className="cs-dot" style={{ background: "#FEBC2E" }} />
        <span className="cs-dot" style={{ background: "#28C840" }} />
      </div>
      <div className="cs-stage">{children}</div>
    </div>
  );
}

const kpi = (violet?: boolean) => (
  <div className="cs-kpis">
    <b className={violet ? "cs-kpi--v" : ""} />
    <b className={violet ? "cs-kpi--v" : ""} />
    <b className={violet ? "cs-kpi--v" : ""} />
  </div>
);

const bar = (violet?: boolean) => (
  <div className="cs-bar">
    <i className={violet ? "cs-b--v" : ""} />
    <i className={violet ? "cs-b--v" : ""} />
    <i className={violet ? "cs-b--v" : ""} />
  </div>
);

function Automation() {
  return (
    <Frame>
      <div className="cs-head-row">
        <span className="cs-chip cs-chip--blue">AI Automation</span>
        <span className="cs-pill">Live</span>
      </div>
      {kpi()}
      <div className="cs-grid-3">
        {[0, 1, 2].map((n) => (
          <span key={n} className="cs-cell">
            <i />
            <i className="cs-cell-sub" />
            <i className="cs-cell-bar" />
          </span>
        ))}
      </div>
      {bar()}
      <div className="cs-flow">
        <span className="cs-node">Trigger</span>
        <i className="cs-link" />
        <span className="cs-node cs-node--accent">AI step</span>
        <i className="cs-link" />
        <span className="cs-node">Action</span>
      </div>
    </Frame>
  );
}

function Integrate() {
  return (
    <Frame violet>
      <div className="cs-head-row">
        <span className="cs-chip cs-chip--violet">Connections</span>
        <span className="cs-pill">2-way sync</span>
      </div>
      <div className="cs-pipes">
        <div className="cs-pipe">
          <span className="cs-box cs-box--a">ERP</span>
          <span className="cs-way">&#8596;</span>
          <span className="cs-box cs-box--a">DATA</span>
          <span className="cs-way">&#8596;</span>
          <span className="cs-box cs-box--a">CRM</span>
        </div>
        <div className="cs-line-row">
          <i />
          <i />
          <i />
        </div>
        <div className="cs-chipline">
          <span className="cs-mini">Invoices</span>
          <span className="cs-mini">Customers</span>
          <span className="cs-mini">Stock</span>
          <span className="cs-mini">Deals</span>
        </div>
      </div>
      {bar(true)}
    </Frame>
  );
}

function Mobile() {
  return (
    <Frame>
      <div className="cs-mobile">
        <div className="cs-phone">
          <span className="cs-phone-notch" />
          <div className="cs-phone-screen">
            <span className="cs-phone-line" />
            <span className="cs-phone-line cs-phone-line--s" />
            <span className="cs-phone-list" />
            <span className="cs-phone-list" />
            <span className="cs-phone-list" />
          </div>
        </div>
      </div>
      {bar()}
    </Frame>
  );
}

function Transform() {
  const rows = [
    { from: "Manual", to: "Streamlined" },
    { from: "Paper", to: "Digital" },
    { from: "Slow", to: "Fast" },
  ];
  return (
    <Frame violet>
      <div className="cs-head-row">
        <span className="cs-chip cs-chip--violet">Transformation</span>
        <span className="cs-pill">Before &rarr; After</span>
      </div>
      <div className="cs-trans">
        {rows.map((r) => (
          <span key={r.from} className="cs-trans-row">
            <span className="cs-tag">{r.from}</span>
            <span className="cs-arrowbox">&#8594;</span>
            <span className="cs-tag cs-tag--yes">&#10003; {r.to}</span>
          </span>
        ))}
      </div>
      {kpi(true)}
    </Frame>
  );
}

function Dashboard() {
  return (
    <Frame>
      <div className="cs-head-row">
        <span className="cs-chip cs-chip--blue">Live dashboard</span>
        <span className="cs-pill">Updated now</span>
      </div>
      {kpi()}
      <div className="cs-chart">
        <i className="cs-chart-line" />
        <i className="cs-chart-area" />
      </div>
      <div className="cs-grid-2">
        <span className="cs-cell" />
        <span className="cs-cell" />
      </div>
    </Frame>
  );
}

export function CapVisual({ visual }: { visual: Capability["visual"] }) {
  if (visual === "automation") return <Automation />;
  if (visual === "integrate") return <Integrate />;
  if (visual === "mobile") return <Mobile />;
  if (visual === "transform") return <Transform />;
  return <Dashboard />;
}