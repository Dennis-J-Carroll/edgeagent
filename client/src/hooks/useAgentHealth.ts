import { useQuery } from "@tanstack/react-query";

export interface AgentHealth {
  status: "healthy" | "degraded" | "offline";
  timestamp: number;
  transport: {
    circuit_breaker: "closed" | "open" | "half_open" | "unknown";
    collector_reachable: boolean;
    pool_size: number;
    pool_reuse_ratio: number;
  };
  compression: {
    ratio: number;
    bytes_in: number;
    bytes_out: number;
    bytes_saved: number;
    messages_processed: number;
    batch_count: number;
    active_dicts: number;
  };
  backpressure: {
    queue_depth: number;
    memory_percent: number;
  };
  recovery: {
    buffered_frames: number;
    storage_migration: string;
  };
  security: {
    tls_enabled: boolean;
    hmac_enabled: boolean;
  };
}

/**
 * Polls the edge agent health endpoint every 2 seconds.
 *
 * Returns undefined while offline (query error). Components should render
 * a graceful offline state when data is undefined.
 *
 * Note: refetchIntervalInBackground keeps polling when the tab is unfocused —
 * important because the Live Demo section is below the fold and users may
 * tab away during a demo.
 */
export function useAgentHealth() {
  return useQuery<AgentHealth>({
    queryKey: ["/api/agent/health"],
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    retry: false,
  });
}
