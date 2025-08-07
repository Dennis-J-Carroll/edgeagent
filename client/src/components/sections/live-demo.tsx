import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LiveDemoSection() {
  const [activeTab, setActiveTab] = useState("packet-flow");

  const tabs = [
    { id: "packet-flow", label: "Packet Flow" },
    { id: "fitness-evolution", label: "Fitness Evolution" },
    { id: "latency-budget", label: "Latency Budget" },
  ];

  const logs = [
    { time: "12:34:56", type: "success", message: "Generation 1247: fitness=0.923 (↑0.012)" },
    { time: "12:34:57", type: "warning", message: "Mutating QoS weights: UDP→0.8, TCP→0.6" },
    { time: "12:34:58", type: "info", message: "Route optimization: 3 paths converged" },
    { time: "12:35:01", type: "success", message: "Latency target achieved: 11.2ms ≤ 15ms" },
    { time: "12:35:03", type: "primary", message: "Policy update deployed to XDP maps" },
    { time: "12:35:04", type: "muted", message: "Fitness evaluation cycle: 156ms" },
  ];

  const getLogColor = (type: string) => {
    switch (type) {
      case "success": return "text-emerald-400";
      case "warning": return "text-yellow-400";
      case "info": return "text-blue-400";
      case "primary": return "text-purple-400";
      case "muted": return "text-gray-500";
      default: return "text-gray-300";
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-off-white" id="demo">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Live Demo Environment
        </motion.h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <CardTitle>Live Grafana Dashboard</CardTitle>
                  <div className="flex space-x-2">
                    {tabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab(tab.id)}
                        className="text-xs"
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
                  alt="Network performance dashboard with real-time metrics"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">11ms</div>
                    <div className="text-sm text-gray-500">Avg Latency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2.4GB/s</div>
                    <div className="text-sm text-gray-500">Throughput</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">0.02%</div>
                    <div className="text-sm text-gray-500">Drop Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mutation Log */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 text-white shadow-lg">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-white">Genetic Algorithm Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6 font-mono text-sm space-y-2">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className={getLogColor(log.type)}>[{log.time}]</span>
                    <span className="ml-2 text-gray-300">{log.message}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
