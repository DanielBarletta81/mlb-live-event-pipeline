export function PipelineStatus({ status, events }) {
  const latestEvent = events[0];

  return (
    <section className="card status-card">
      <div>
        <h2>Pipeline Status</h2>
        <p className={`status ${status}`}>{status}</p>
      </div>

      <div>
        <p className="muted">Events received</p>
        <strong>{events.length}</strong>
      </div>

      <div>
        <p className="muted">Latest latency</p>
        <strong>{latestEvent ? `${latestEvent.latencyMs}ms` : "—"}</strong>
      </div>
    </section>
  );
}