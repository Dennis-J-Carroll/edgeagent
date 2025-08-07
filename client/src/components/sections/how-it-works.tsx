import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "eBPF/XDP loads at NIC ingress",
      description: "CO-RE XDP program inspects, classifies, drops/mirrors/redirects packets at the lowest possible level in the network stack.",
      features: ["Zero-copy packet processing", "Sub-microsecond decision latency", "Hardware offload compatible"],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      bgColor: "bg-blue-500",
      reverse: false,
    },
    {
      number: 2,
      title: "Maps export metrics",
      description: "Per-CPU verdict counts, latency buckets, and performance data stream continuously to monitoring systems.",
      features: ["Real-time Prometheus metrics", "Histogram-based latency tracking", "Zero-overhead telemetry"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      bgColor: "bg-emerald-500",
      reverse: true,
    },
    {
      number: 3,
      title: "Genetic Optimizer runs",
      description: "NSGA-III evolves configuration across latency, drops, cost, and energy objectives simultaneously.",
      features: ["Multi-objective optimization", "Pareto-optimal solutions", "Real-time policy adaptation"],
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      bgColor: "bg-purple-500",
      reverse: false,
    },
    {
      number: 4,
      title: "Dashboards update in real-time",
      description: "Live fitness frontier + packet telemetry provide complete visibility into system performance and optimization progress.",
      features: [],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      bgColor: "bg-orange-500",
      reverse: true,
      footnote: "No kernel modules, no reboot. Only libbpf, bpftool, and Prometheus.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-off-white" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          How It Works
        </motion.h2>
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${step.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8`}
            >
              <div className="lg:w-1/2">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-8 h-8 ${step.bgColor} text-white rounded-full flex items-center justify-center font-semibold mr-4`}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{step.description}</p>
                {step.features.length > 0 && (
                  <ul className="text-sm text-gray-500 space-y-1">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>• {feature}</li>
                    ))}
                  </ul>
                )}
                {step.footnote && (
                  <div className="text-sm text-gray-500 italic border-l-2 border-gray-300 pl-4 mt-4">
                    "{step.footnote}"
                  </div>
                )}
              </div>
              <div className="lg:w-1/2">
                <img
                  src={step.image}
                  alt={`${step.title} visualization`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
