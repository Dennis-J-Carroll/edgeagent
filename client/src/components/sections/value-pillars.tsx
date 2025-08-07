import { motion } from "framer-motion";
import { Brain, Microscope, FlaskConical, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ValuePillarsSection() {
  const pillars = [
    {
      icon: Brain,
      title: "Autonomic Packet Intelligence",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      features: [
        "Real-time control loop over XDP",
        "Fitness-based mutation of routing, filtering, and mirroring",
        "Deploys without kernel patching or reboot",
      ],
    },
    {
      icon: Microscope,
      title: "Deep Observability Built-In",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      features: [
        "eBPF map metrics streamed via Cloudflare exporter to Prometheus",
        "Grafana dashboards expose latency, drops, throughput, fitness curves",
        "Correlates protocol behavior with objective performance",
      ],
    },
    {
      icon: FlaskConical,
      title: "Simulation-Grade Confidence",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      features: [
        "Labs validated in GNS3 & namespaces with traffic injectors (HL7, FHIR, RTP)",
        "Failure injection, latency shaping, link saturation included",
        'Compare "static config" vs "learned behavior" performance',
      ],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id="pillars">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Core Value Pillars
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="transition-all duration-300"
            >
              <Card className="border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 ${pillar.bgColor} rounded-lg flex items-center justify-center mb-6`}
                  >
                    <pillar.icon className={`${pillar.iconColor} w-6 h-6`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    {pillar.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="text-emerald-500 w-4 h-4 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
