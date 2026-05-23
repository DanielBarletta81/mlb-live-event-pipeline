export function Scoreboard({ scoreboard }) {
  if (!scoreboard) {
    return (
      <section className="card">
        <h2>Scoreboard</h2>
        <p>Waiting for live game state...</p>
      </section>
    );
  }

  const { home, away, inning, half, outs } = scoreboard;

  return (
    <section className="card">
      <h2>Scoreboard</h2>

      <div className="score-row">
        <span>{away.team}</span>
        <strong>{away.runs}</strong>
      </div>

      <div className="score-row">
        <span>{home.team}</span>
        <strong>{home.runs}</strong>
      </div>

      <p className="muted">
        {half?.toUpperCase()} {inning} · {outs} outs
      </p>
    </section>
  );
}