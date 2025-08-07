import { type User, type InsertUser, type PilotRequest, type InsertPilotRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPilotRequest(request: InsertPilotRequest): Promise<PilotRequest>;
  getAllPilotRequests(): Promise<PilotRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private pilotRequests: Map<string, PilotRequest>;

  constructor() {
    this.users = new Map();
    this.pilotRequests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPilotRequest(insertRequest: InsertPilotRequest): Promise<PilotRequest> {
    const id = randomUUID();
    const request: PilotRequest = {
      ...insertRequest,
      id,
      createdAt: new Date(),
    };
    this.pilotRequests.set(id, request);
    return request;
  }

  async getAllPilotRequests(): Promise<PilotRequest[]> {
    return Array.from(this.pilotRequests.values()).sort(
      (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
    );
  }
}

export const storage = new MemStorage();
