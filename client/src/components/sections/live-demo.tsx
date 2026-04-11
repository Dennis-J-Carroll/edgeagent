import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, BarChart3, Terminal, Cpu, Network } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAgentHealth } from "@/hooks/useAgentHealth";

const HISTORY_LEN = 20;

export function LiveDemoSection() {
  const [activeTab, setActiveTab] = useState("packet-flow");
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [ratioHistory, setRatioHistory] = useState<{ t: number; ratio: number }[]>([]);

  const { data: health, isError } = useAgentHealth();

  const tabs = [
    { id: "packet-flow", label: "Packet Flow", icon: Network },
    { id: "fitness-evolution", label: "Compression", icon: TrendingUp },
    { id: "latency-budget", label: "Recovery", icon: Activity },
  ];

  // Accumulate rolling compression ratio history on each health poll
  useEffect(() => {
    if (!health) return;
    setRatioHistory((prev) => {
      const point = {
        t: Date.now(),
        // Express as % bandwidth saved (lower compression ratio = more savings)
        ratio: Math.round((1 - health.compression.ratio) * 100),
      };
      return [...prev.slice(-(HISTORY_LEN - 1)), point];
    });
  }, [health]);

  // Advance the log index on each new health poll so activity reflects live state
  useEffect(() => {
    if (!health) return;
    setCurrentLogIndex((prev) => (prev + 1) % 6);
  }, [health]);

  const getLogGradient = (type: string) => {
    switch (type) {
      case "success": return "from-emerald-400 to-teal-400";
      case "warning": return "from-yellow-400 to-orange-400";
      case "info":    return "from-blue-400 to-indigo-400";
      case "primary": return "from-purple-400 to-pink-400";
      case "muted":   return "from-gray-400 to-gray-500";
      default:        return "from-gray-300 to-gray-400";
    }
  };

  // Activity log entries — live values when agent is online, static baseline when offline
  const agentLogs = useMemo(() => {
    if (!health) {
      return [
        { type: "muted",   icon: "○", message: "ConnectionPool: waiting for agent…" },
        { type: "muted",   icon: "○", message: "BackpressureGate: below soft limit — pass-through mode" },
        { type: "muted",   icon: "○", message: "DLM: monitoring compression ratio drift (EMA)" },
        { type: "muted",   icon: "○", message: "CircuitBreaker: state unknown" },
        { type: "muted",   icon: "○", message: "DiskBuffer: 0 frames queued for recovery" },
        { type: "muted",   icon: "○", message: "HMAC: SHA-256 per-frame authentication active" },
      ];
    }
    const cbState = health.transport.circuit_breaker;
    const qDepth  = health.backpressure.queue_depth;
    return [
      {
        type: "success",
        icon: "✓",
        message: `ConnectionPool: ${health.transport.pool_size} conn(s), ${(health.transport.pool_reuse_ratio * 100).toFixed(0)}% reuse rate`,
      },
      {
        type: qDepth > 50 ? "warning" : "info",
        icon: qDepth > 50 ? "⚡" : "→",
        message: `Queue depth: ${qDepth} msgs — ${qDepth > 50 ? "soft limit approaching" : "nominal"}`,
      },
      {
        type: "muted",
        icon: "○",
        message: `DLM: ${health.compression.active_dicts} dict(s) active — monitoring EMA ratio drift`,
      },
      {
        type: cbState === "closed" ? "success" : "warning",
        icon: cbState === "closed" ? "✓" : "⚡",
        message: `CircuitBreaker: ${cbState.toUpperCase()} — collector ${health.transport.collector_reachable ? "reachable" : "unreachable"}`,
      },
      {
        type: health.recovery.buffered_frames > 0 ? "warning" : "muted",
        icon: health.recovery.buffered_frames > 0 ? "⚡" : "○",
        message: `DiskBuffer: ${health.recovery.buffered_frames} frames buffered (${health.recovery.storage_migration})`,
      },
      {
        type: "primary",
        icon: "⬆",
        message: `Security: TLS=${health.security.tls_enabled} · HMAC=${health.security.hmac_enabled}`,
      },
    ];
  }, [health]);

  // Live metric cards — real values from health, graceful offline fallback
  const liveMetrics = health
    ? [
        {
          label:  "Bandwidth Saved",
          value:  `${Math.round((1 - health.compression.ratio) * 100)}%`,
          change: `${(health.compression.bytes_saved / 1024).toFixed(1)} KB total`,
          color:  "from-emerald-500 to-teal-500",
        },
        {
          label:  "Msgs Processed",
          value:  health.compression.messages_processed.toLocaleString(),
          change: `${health.compression.batch_count} batches`,
          color:  "from-blue-500 to-indigo-500",
        },
        {
          label:  "Circuit State",
          value:  health.transport.circuit_breaker === "closed" ? "Healthy" : "Tripped",
          change: health.transport.collector_reachable ? "Collector online" : "No collector",
          color:  health.transport.circuit_breaker === "closed"
                    ? "from-emerald-500 to-teal-500"
                    : "from-red-500 to-orange-500",
        },
      ]
    : [
        { label: "Bandwidth Saved", value: "--",  change: "agent offline", color: "from-gray-400 to-gray-500" },
        { label: "Msgs Processed",  value: "--",  change: "agent offline", color: "from-gray-400 to-gray-500" },
        { label: "Circuit State",   value: "--",  change: "agent offline", color: "from-gray-400 to-gray-500" },
      ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" id="demo">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(106, 90, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-morphism border border-primary/20"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">Live Demo</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Experience <span className="gradient-text">Real-Time</span> Intelligence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Live compression ratios, circuit breaker state, and backpressure telemetry — direct from the edge agent
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Live Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>

            <Card className="relative glass-card border-0 overflow-hidden">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-gray-900">Live Metrics Dashboard</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* LIVE / OFFLINE badge */}
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                      health && !isError
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        health && !isError ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                      }`} />
                      {health && !isError ? "LIVE" : "OFFLINE"}
                    </span>
                    {tabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab(tab.id)}
                        className={`text-xs transition-all duration-300 ${
                          activeTab === tab.id ? "gradient-bg text-white" : ""
                        }`}
                      >
                        <tab.icon className="w-3 h-3 mr-1" />
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Chart area — live recharts AreaChart or offline placeholder */}
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-white p-4">
                  {ratioHistory.length > 1 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ratioHistory}>
                        <defs>
                          <linearGradient id="ratioGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="t" hide />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip
                          formatter={(v: number) => [`${v}%`, "Bandwidth Saved"]}
                          labelFormatter={() => ""}
                          contentStyle={{ fontSize: 12, borderRadius: 8 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="ratio"
                          stroke="#6366f1"
                          fill="url(#ratioGrad)"
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <Cpu className="w-10 h-10 text-primary/50 animate-pulse" />
                      <p className="text-sm text-gray-500 text-center">
                        {isError
                          ? "Agent offline — run edge_agent to see live compression data"
                          : "Waiting for first data point…"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Live metric cards */}
                <div className="grid grid-cols-3 gap-4">
                  {liveMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      <div className="glass-morphism rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
                        <div className="text-xs font-semibold text-emerald-600 mt-2 truncate">{metric.change}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Agent Activity Log */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-3xl blur-2xl opacity-30"></div>

            <Card className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-0 overflow-hidden">
              <CardHeader className="border-b border-gray-700/50 bg-black/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-white font-mono">Agent Activity Log</CardTitle>
                  <div className="ml-auto">
                    <span className={`inline-flex w-2 h-2 rounded-full ${
                      health && !isError ? "bg-emerald-400 animate-pulse" : "bg-gray-600"
                    }`}></span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 font-mono text-sm">
                <AnimatePresence mode="wait">
                  {agentLogs.map((log, index) => (
                    <motion.div
                      key={`${index}`}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{
                        opacity: index <= currentLogIndex ? 1 : 0.3,
                        x: 0,
                        height: "auto",
                      }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="mb-3 overflow-hidden"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors duration-300">
                        <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full bg-gradient-to-r ${getLogGradient(log.type)} text-xs font-bold text-white flex-shrink-0`}>
                          {log.icon}
                        </span>
                        <span className="text-gray-200 flex-1 text-xs leading-relaxed">{log.message}</span>
                        {index === currentLogIndex && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
