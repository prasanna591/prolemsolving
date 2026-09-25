type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const group = (key: string) => (
    <span key={key} className="marquee__group" aria-hidden="true">
      {items.map((t) => (
        <span key={`${key}-${t}`} className="marquee__item">
          {t}
          <span className="marquee__sep">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee">
      <p className="sr-only">{items.join(" · ")}</p>
      <div className="marquee__clip" aria-hidden="true">
        <div className="marquee__track">{group("a")}{group("b")}</div>
      </div>
    </div>
  );
}