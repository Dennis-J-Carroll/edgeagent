import { motion } from "framer-motion";
import { Github, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DeveloperModeSection() {
  const agentCode = `from edge_dynamics.edge_agent import EdgeAgent

agent = EdgeAgent()
agent.start()

# Enqueue IoT telemetry — batching is automatic
agent.enqueue("sensors.temp", {"device": "node-42", "value": 73.1})
agent.enqueue("sensors.gps",  {"lat": 37.77, "lon": -122.41})

# BackpressureGate: proportional delay ramp when queue fills
# DLM: retrains zstd dict on ratio drift — zero manual tuning
# CircuitBreaker: trips on collector failure, auto-recovers
# DiskBuffer: SQLite store-and-forward — zero data loss`;

  const collectorCode = `# Wire protocol: [4B len][JSON header][compressed payload]
# Header: { topic, dict_id, count, raw_len, comp_len, hmac }
#
# Compression: zstd dict-based — up to 15x on JSON telemetry
# The DLM trains per-topic dicts and hot-swaps via SIGHUP
#
# Security: HMAC verified BEFORE decompression
#   → attacker-controlled bytes never enter the decompressor
#   → immune to zip-bomb and parser-confusion attacks
#
# Start the collector:
#   python -m edge_dynamics.collector_server`;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Developer Mode
        </motion.h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 text-white">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-white">Edge Agent</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap">
                  <code>{agentCode}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900 text-white">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-white">Collector Server</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap">
                  <code>{collectorCode}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button
            variant="default"
            size="lg"
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            <Github className="mr-2 w-5 h-5" />
            View GitHub Repository
          </Button>
          <Button variant="outline" size="lg">
            <FileText className="mr-2 w-5 h-5" />
            Read Technical Whitepaper
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
