import express from "express";

export function createHealthRouter({ queue, broadcaster }) {
  const router = express.Router();

  router.get("/health", (req, res) => {
    res.json({
      status: "ok",
      queueSize: queue.size(),
      connectedClients: broadcaster.clientCount(),
      timestamp: new Date().toISOString(),
    });
  });

  return router;
}