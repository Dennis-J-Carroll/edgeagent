import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPilotRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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
