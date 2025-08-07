import { motion } from "framer-motion";
import { Brain, Microscope, FlaskConical, Check, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function ValuePillarsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const pillars = [
    {
      icon: Brain,
      title: "Autonomic Packet Intelligence",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      features: [
        "Real-time control loop over XDP",
        "Fitness-based mutation of routing, filtering, and mirroring",
        "Deploys without kernel patching or reboot",
      ],
    },
    {
      icon: Microscope,
      title: "Deep Observability Built-In",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      features: [
        "eBPF map metrics streamed via Cloudflare exporter to Prometheus",
        "Grafana dashboards expose latency, drops, throughput, fitness curves",
        "Correlates protocol behavior with objective performance",
      ],
    },
    {
      icon: FlaskConical,
      title: "Simulation-Grade Confidence",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      features: [
        "Labs validated in GNS3 & namespaces with traffic injectors (HL7, FHIR, RTP)",
        "Failure injection, latency shaping, link saturation included",
        'Compare "static config" vs "learned behavior" performance',
      ],
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" id="pillars">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(106, 90, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">Core Capabilities</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="gradient-text">Revolutionary</span> Technology Stack
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three pillars of innovation that make Autonomic Edge the most advanced network optimization platform
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${pillar.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <Card className="relative h-full glass-card border-0 overflow-hidden transform transition-all duration-500 hover:scale-105">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.bgGradient} opacity-50`}></div>
                
                <CardContent className="relative p-8">
                  {/* Icon Container */}
                  <motion.div
                    animate={{ 
                      rotate: hoveredCard === index ? 360 : 0,
                      scale: hoveredCard === index ? 1.1 : 1
                    }}
                    transition={{ duration: 0.8 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <pillar.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {pillar.title}
                  </h3>
                  
                  <ul className="space-y-3">
                    {pillar.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * featureIndex }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pillar.gradient} flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                          <Check className="text-white w-3 h-3" />
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Hover Effect Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredCard === index ? 1 : 0,
                      y: hoveredCard === index ? 0 : 10
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4"
                  >
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${pillar.gradient}`}>
                      Learn More →
                    </span>
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
