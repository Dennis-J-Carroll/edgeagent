import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, BarChart3, Terminal, Cpu, Network } from "lucide-react";

export function LiveDemoSection() {
  const [activeTab, setActiveTab] = useState("packet-flow");
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const tabs = [
    { id: "packet-flow", label: "Packet Flow", icon: Network },
    { id: "fitness-evolution", label: "Fitness Evolution", icon: TrendingUp },
    { id: "latency-budget", label: "Latency Budget", icon: Activity },
  ];

  const logs = [
    { time: "12:34:56", type: "success", message: "Generation 1247: fitness=0.923 (↑0.012)", icon: "✓" },
    { time: "12:34:57", type: "warning", message: "Mutating QoS weights: UDP→0.8, TCP→0.6", icon: "⚡" },
    { time: "12:34:58", type: "info", message: "Route optimization: 3 paths converged", icon: "→" },
    { time: "12:35:01", type: "success", message: "Latency target achieved: 11.2ms ≤ 15ms", icon: "✓" },
    { time: "12:35:03", type: "primary", message: "Policy update deployed to XDP maps", icon: "⬆" },
    { time: "12:35:04", type: "muted", message: "Fitness evaluation cycle: 156ms", icon: "○" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % logs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getLogGradient = (type: string) => {
    switch (type) {
      case "success": return "from-emerald-400 to-teal-400";
      case "warning": return "from-yellow-400 to-orange-400";
      case "info": return "from-blue-400 to-indigo-400";
      case "primary": return "from-purple-400 to-pink-400";
      case "muted": return "from-gray-400 to-gray-500";
      default: return "from-gray-300 to-gray-400";
    }
  };

  const metrics = [
    { label: "Avg Latency", value: "11ms", change: "-27%", color: "from-emerald-500 to-teal-500" },
    { label: "Throughput", value: "2.4GB/s", change: "+15%", color: "from-blue-500 to-indigo-500" },
    { label: "Drop Rate", value: "0.02%", change: "-85%", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" id="demo">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(106, 90, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
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
            Experience <span className="gradient-text">Real-Time</span> Optimization
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our AI-powered network optimization in action with live metrics and mutations
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dashboard */}
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
                  <div className="flex gap-1">
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
                {/* Chart Area */}
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
                    alt="Network performance dashboard"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>
                  
                  {/* Animated Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="text-center">
                      <Cpu className="w-12 h-12 text-primary mx-auto mb-2 animate-pulse" />
                      <p className="text-sm font-medium text-gray-700">Processing Live Data</p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      <div className="glass-morphism rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
                        <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
                        <div className="text-xs font-semibold text-emerald-600 mt-2">{metric.change}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mutation Log */}
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
                  <CardTitle className="text-white font-mono">Genetic Algorithm Activity</CardTitle>
                  <div className="ml-auto">
                    <span className="inline-flex w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 font-mono text-sm">
                <AnimatePresence mode="wait">
                  {logs.map((log, index) => (
                    <motion.div
                      key={`${log.time}-${index}`}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ 
                        opacity: index <= currentLogIndex ? 1 : 0.3,
                        x: 0,
                        height: "auto"
                      }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="mb-3 overflow-hidden"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors duration-300">
                        <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full bg-gradient-to-r ${getLogGradient(log.type)} text-xs font-bold text-white`}>
                          {log.icon}
                        </span>
                        <span className="text-gray-400 text-xs">[{log.time}]</span>
                        <span className="text-gray-200 flex-1">{log.message}</span>
                        {index === currentLogIndex && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
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
