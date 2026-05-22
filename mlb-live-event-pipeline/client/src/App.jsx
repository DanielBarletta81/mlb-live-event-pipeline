import { useGameStream } from "./hooks/useGameStream";
import { Scoreboard } from "./components/Scoreboard";
import { EventFeed } from "./components/EventFeed";
import { PipelineStatus } from "./components/PipelineStatus";
import "./styles.css";

export default function App() {
  const { events, scoreboard, status } = useGameStream();

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Live Event Pipeline Simulator</p>
        <h1>Real-time baseball event processing dashboard</h1>
        <p>
          Simulates ingestion, processing, and WebSocket delivery of live game events.
        </p>
      </section>

      <PipelineStatus status={status} events={events} />

      <div className="grid">
        <Scoreboard scoreboard={scoreboard} />
        <EventFeed events={events} />
      </div>
    </main>
  );
}