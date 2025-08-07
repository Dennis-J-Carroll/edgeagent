import { motion } from "framer-motion";
import { Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToPilot = () => {
    const element = document.getElementById("pilot");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDemo = () => {
    const element = document.getElementById("demo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Real-time, <span className="gradient-text">self-optimizing</span><br />
            edge routers
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
            Powered by eBPF. Tuned by AI. Proven in healthcare, defense, and remote ops.
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
            Replace reactive firewalls, static QoS, and human-tweaked routing with autonomous dataplane agents that evolve in real-time to meet your SLOs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary text-white px-8 py-4 text-lg font-medium hover:bg-primary/90 shadow-lg"
              onClick={scrollToPilot}
            >
              <Play className="mr-2 w-5 h-5" />
              Request a Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-medium"
              onClick={scrollToDemo}
            >
              <TrendingUp className="mr-2 w-5 h-5" />
              See Live Metrics
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
              alt="Network topology visualization"
              className="w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-chart-2 rounded-full mr-2 network-animation"></div>
                    <span className="text-gray-700">AI Optimization Active</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                    <span className="text-gray-700">eBPF Dataplane</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
