import { motion } from "framer-motion";
import { Github, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DeveloperModeSection() {
  const xdpCode = `SEC("xdp")
int adaptive_guard(struct xdp_md *ctx) {
    struct xdp_policy *p = bpf_map_lookup_elem(&policy, &zero);
    if (p && p->drop_udp_port && udp->dest == p->drop_udp_port)
        return XDP_DROP;
    return XDP_PASS;
}`;

  const pythonCode = `# NSGA-III evolution: minimize p95 latency and drop ratio
pop = toolbox.population(n=50)
for gen in range(NGEN):
    mutate(pop); evaluate(pop); 
    update_metrics(); select()`;

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
                <CardTitle className="text-white">eBPF/XDP Implementation</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{xdpCode}</code>
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
                <CardTitle className="text-white">NSGA-III Evolution</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{pythonCode}</code>
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
