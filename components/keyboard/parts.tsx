// Shared presentational helpers for the Emoji Keyboard guide sections.

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="fg-kbd">{children}</kbd>;
}

export function QuickAnswer({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="fg-qa">
      <span className="fg-kicker">Quick Answer</span>
      <h3 className="fg-qa__q">{q}</h3>
      <div className="fg-qa__a">{children}</div>
    </div>
  );
}
