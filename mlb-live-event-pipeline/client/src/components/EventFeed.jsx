export function EventFeed({ events }) {
  return (
    <section className="card">
      <h2>Live Event Feed</h2>

      {events.length === 0 ? (
        <p>Waiting for game events...</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <strong>{event.type}</strong>
              <p>{event.description}</p>
              <small>
                {event.latencyMs}ms latency · {new Date(event.processedAt).toLocaleTimeString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}