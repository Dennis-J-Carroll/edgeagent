import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPilotRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy to Python edge agent health endpoint — avoids CORS entirely (BFF pattern)
  app.get("/api/agent/health", async (_req, res) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000); // 2s max — fast fail
    try {
      const upstream = await fetch("http://127.0.0.1:8080/health", { signal: controller.signal });
      clearTimeout(timeout);
      const data = await upstream.json();
      res.json(data);
    } catch {
      clearTimeout(timeout);
      // Return a well-shaped offline response so the React components degrade gracefully
      res.status(503).json({
        status: "offline",
        timestamp: Date.now() / 1000,
        transport: { circuit_breaker: "unknown", collector_reachable: false, pool_size: 0, pool_reuse_ratio: 0 },
        compression: { ratio: 0, bytes_in: 0, bytes_out: 0, bytes_saved: 0, messages_processed: 0, batch_count: 0, active_dicts: 0 },
        backpressure: { queue_depth: 0, memory_percent: 0 },
        recovery: { buffered_frames: 0, storage_migration: "sqlite" },
        security: { tls_enabled: false, hmac_enabled: false },
      });
    }
  });

  // Pilot request submission
  app.post("/api/pilot-requests", async (req, res) => {
    try {
      const validatedData = insertPilotRequestSchema.parse(req.body);
      const pilotRequest = await storage.createPilotRequest(validatedData);
      res.json(pilotRequest);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Get all pilot requests (for admin purposes)
  app.get("/api/pilot-requests", async (req, res) => {
    try {
      const requests = await storage.getAllPilotRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pilot requests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
