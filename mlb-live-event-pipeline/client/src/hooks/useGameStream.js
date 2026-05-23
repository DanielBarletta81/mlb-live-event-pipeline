import { useEffect, useState } from "react";

export function useGameStream() {
  const [events, setEvents] = useState([]);
  const [scoreboard, setScoreboard] = useState(null);
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => setStatus("connected");
    socket.onclose = () => setStatus("disconnected");
    socket.onerror = () => setStatus("error");

    socket.onmessage = (message) => {
      const payload = JSON.parse(message.data);

      if (payload.type === "GAME_EVENT") {
        setEvents((prev) => [payload.event, ...prev].slice(0, 20));
        setScoreboard(payload.event.scoreboard);
      }
    };

    return () => socket.close();
  }, []);

  return { events, scoreboard, status };
}