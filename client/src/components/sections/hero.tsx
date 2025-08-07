import { motion, useScroll, useTransform } from "framer-motion";
import { Play, TrendingUp, Sparkles, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 300], [0, -50]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 aurora-bg opacity-30"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-purple-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{ 
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ opacity: Math.random() * 0.5 + 0.3 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-morphism border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Next-Gen Network Intelligence
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-7xl font-bold mb-6 leading-tight"
            style={{ y: yTransform }}
          >
            <span className="text-gray-900">Real-time, </span>
            <span className="gradient-text glow-text inline-block">self-optimizing</span>
            <br />
            <span className="text-gray-900">edge routers</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Powered by <span className="font-semibold text-primary">eBPF</span>. 
            Tuned by <span className="font-semibold text-purple-600">AI</span>. 
            Proven in healthcare, defense, and remote ops.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Replace reactive firewalls, static QoS, and human-tweaked routing with autonomous dataplane agents that evolve in real-time to meet your SLOs.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button
              size="lg"
              className="gradient-bg text-white px-10 py-6 text-lg font-medium shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover-glow"
              onClick={scrollToPilot}
            >
              <Play className="mr-2 w-5 h-5" />
              Request a Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-6 text-lg font-medium glass-morphism hover:bg-white/80 transform hover:scale-105 transition-all duration-300"
              onClick={scrollToDemo}
            >
              <TrendingUp className="mr-2 w-5 h-5" />
              See Live Metrics
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-600 to-cyan-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden glass-card">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
                alt="Network topology visualization"
                className="w-full h-96 object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Floating Stats */}
              <motion.div
                className="absolute top-8 left-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="glass-morphism rounded-2xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">11ms</div>
                      <div className="text-xs text-gray-600">Latency</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute top-8 right-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="glass-morphism rounded-2xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">99.9%</div>
                      <div className="text-xs text-gray-600">Uptime</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Center Badge */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="glass-morphism rounded-2xl px-8 py-4 shadow-2xl shimmer">
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-2 network-animation"></div>
                      <span className="font-semibold text-gray-800">AI Optimization Active</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 gradient-bg rounded-full mr-2 pulse"></div>
                      <span className="font-semibold text-gray-800">eBPF Dataplane</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
