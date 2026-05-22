import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { config } from "./config.js";
import { gameState } from "./simulator/gameState.js";
import { generateGameEvent } from "./simulator/gameEventGenerator.js";
import { EventQueue } from "./pipeline/eventQueue.js";
import { processEvent } from "./pipeline/eventProcessor.js";
import { Broadcaster } from "./websocket/broadcaster.js";
import { createHealthRouter } from "./routes/health.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

const wss = new WebSocketServer({ server });
const queue = new EventQueue(config.maxQueueSize);
const broadcaster = new Broadcaster(wss);

app.use("/api", createHealthRouter({ queue, broadcaster }));

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.send(JSON.stringify({
    type: "SYSTEM",
    message: "Connected to live event stream",
    timestamp: new Date().toISOString(),
  }));

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

setInterval(() => {
  const rawEvent = generateGameEvent(gameState);
  queue.enqueue(rawEvent);

  const nextEvent = queue.dequeue();
  if (!nextEvent) return;

  const processedEvent = processEvent(nextEvent, gameState);

  broadcaster.broadcast({
    type: "GAME_EVENT",
    event: processedEvent,
  });
}, config.eventIntervalMs);