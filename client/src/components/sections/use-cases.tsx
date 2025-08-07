import { motion } from "framer-motion";
import { Hospital, Shield, Satellite, Factory, Server, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function UseCasesSection() {
  const useCases = [
    {
      icon: Hospital,
      title: "Remote Clinic Optimizer",
      description: "Learns how to prioritize FHIR + PACS over VoIP + admin traffic",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: Shield,
      title: "DDoS Frontline Agent",
      description: "Drops junk traffic in microseconds at ingress, evolves filters during attack",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Satellite,
      title: "Military/Edge Deployments",
      description: "Tunnels around degraded links, rewrites routing on-site, no human in loop",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Factory,
      title: "Autonomous Factory Sites",
      description: "Real-time RTSP/UDP flows prioritized under load without cloud dependency",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Server,
      title: "Multi-tenant Edge Gateway",
      description: "3-node namespace swarm auto-balances TCP drops by tenant latency targets",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Cost-Driven CDN Tuning",
      description: "Reroutes packets based on egress cost, learned from live billing metrics",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id="use-cases">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Real-World Use Cases
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="transition-all duration-300"
            >
              <Card className="border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 ${useCase.bgColor} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <useCase.icon className={`${useCase.iconColor} w-6 h-6`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
