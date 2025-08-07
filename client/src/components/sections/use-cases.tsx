import { motion } from "framer-motion";
import { Hospital, Shield, Satellite, Factory, Server, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function UseCasesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const useCases = [
    {
      icon: Hospital,
      title: "Remote Clinic Optimizer",
      description: "Learns how to prioritize FHIR + PACS over VoIP + admin traffic",
      gradient: "from-red-500 to-rose-600",
      lightGradient: "from-red-50 to-rose-50",
      stats: { latency: "-65%", reliability: "99.99%" },
    },
    {
      icon: Shield,
      title: "DDoS Frontline Agent",
      description: "Drops junk traffic in microseconds at ingress, evolves filters during attack",
      gradient: "from-orange-500 to-amber-600",
      lightGradient: "from-orange-50 to-amber-50",
      stats: { blocked: "2.3M/s", response: "<1μs" },
    },
    {
      icon: Satellite,
      title: "Military/Edge Deployments",
      description: "Tunnels around degraded links, rewrites routing on-site, no human in loop",
      gradient: "from-green-500 to-emerald-600",
      lightGradient: "from-green-50 to-emerald-50",
      stats: { uptime: "100%", failover: "0ms" },
    },
    {
      icon: Factory,
      title: "Autonomous Factory Sites",
      description: "Real-time RTSP/UDP flows prioritized under load without cloud dependency",
      gradient: "from-blue-500 to-cyan-600",
      lightGradient: "from-blue-50 to-cyan-50",
      stats: { streams: "1000+", jitter: "<2ms" },
    },
    {
      icon: Server,
      title: "Multi-tenant Edge Gateway",
      description: "3-node namespace swarm auto-balances TCP drops by tenant latency targets",
      gradient: "from-purple-500 to-violet-600",
      lightGradient: "from-purple-50 to-violet-50",
      stats: { tenants: "500+", SLA: "99.95%" },
    },
    {
      icon: TrendingUp,
      title: "Cost-Driven CDN Tuning",
      description: "Reroutes packets based on egress cost, learned from live billing metrics",
      gradient: "from-indigo-500 to-blue-600",
      lightGradient: "from-indigo-50 to-blue-50",
      stats: { savings: "$125K/mo", optimized: "24/7" },
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" id="use-cases">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(106, 90, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Use Cases</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Transforming <span className="gradient-text">Critical Networks</span> Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From healthcare to defense, see how Autonomic Edge revolutionizes network performance
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              {/* Glow Effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${useCase.gradient} rounded-2xl blur-xl transition-opacity duration-500`}
                animate={{
                  opacity: hoveredCard === index ? 0.3 : 0,
                }}
              />
              
              <Card className="relative h-full glass-card border-0 cursor-pointer overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.lightGradient} opacity-30`} />
                
                <CardContent className="relative p-6">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    animate={{
                      rotate: hoveredCard === index ? [0, -10, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <useCase.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {useCase.description}
                  </p>
                  
                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0,
                      height: hoveredCard === index ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                      {Object.entries(useCase.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className={`text-sm font-bold bg-gradient-to-r ${useCase.gradient} bg-clip-text text-transparent`}>
                            {value}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0,
                      x: hoveredCard === index ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className={`w-5 h-5 bg-gradient-to-r ${useCase.gradient} bg-clip-text`} style={{ color: "transparent" }} />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
