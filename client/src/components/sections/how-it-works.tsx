import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Messages arrive at the edge",
      description:
        "The edge agent receives IoT telemetry, normalizes volatile headers to maximize compression, and buffers messages per topic. Batches flush when BATCH_MAX messages are queued or BATCH_MS milliseconds have elapsed — whichever comes first.",
      features: [
        "Per-topic message batching with configurable thresholds",
        "Volatile header stripping (e.g. X-Amzn-Trace-Id) before compression",
        "BackpressureGate: proportional delay ramp before data is dropped",
      ],
      bgColor: "bg-blue-500",
      accentColor: "border-blue-200 bg-blue-50",
      reverse: false,
    },
    {
      number: 2,
      title: "Adaptive dictionary compression",
      description:
        "Each topic gets a zstandard dictionary trained on its own data. The DictionaryLifecycleManager monitors compression ratio using EMA-based drift detection and triggers background retraining when the data distribution shifts — with zero downtime via blue/green version swaps.",
      features: [
        "zstd per-topic dictionaries — up to 15× compression on JSON telemetry",
        "EMA drift detection triggers retrain when ratio degrades ≥20%",
        "Blue/green swap: in-flight batches always decompressible",
      ],
      bgColor: "bg-emerald-500",
      accentColor: "border-emerald-200 bg-emerald-50",
      reverse: true,
    },
    {
      number: 3,
      title: "Secure framing and resilient send",
      description:
        "Each compressed batch is wrapped in a length-prefixed frame, signed with HMAC-SHA256, and sent via the ConnectionPool. If the collector is unreachable, the circuit breaker trips and the frame is persisted to SQLite for automatic recovery when connectivity returns.",
      features: [
        "HMAC-SHA256 per-frame signing with configurable algorithm",
        "ConnectionPool: socket reuse eliminates TCP handshake overhead",
        "SQLite store-and-forward: zero data loss through full outages",
      ],
      bgColor: "bg-purple-500",
      accentColor: "border-purple-200 bg-purple-50",
      reverse: false,
    },
    {
      number: 4,
      title: "Collector receives and hot-reloads",
      description:
        "The collector terminates mTLS, verifies HMAC before decompression (preventing zip-bomb attacks), decompresses with the matching dictionary, and writes output to per-topic JSONL files. A SIGHUP signal triggers hot-reload of retrained dictionaries without restarting.",
      features: [
        "mTLS termination on every agent connection",
        "HMAC-first verification — untrusted bytes are never decompressed",
        "SIGHUP hot-reload: dictionary updates go live in milliseconds",
      ],
      bgColor: "bg-orange-500",
      accentColor: "border-orange-200 bg-orange-50",
      reverse: true,
      footnote: "No data loss. No manual tuning. Only a running agent and a collector.",
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
                <ul className="text-sm text-gray-500 space-y-1">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>• {feature}</li>
                  ))}
                </ul>
                {step.footnote && (
                  <div className="text-sm text-gray-500 italic border-l-2 border-gray-300 pl-4 mt-4">
                    "{step.footnote}"
                  </div>
                )}
              </div>
              {/* Inline diagram tile — no external image dependency */}
              <div className="lg:w-1/2">
                <div className={`w-full h-48 rounded-lg border-2 ${step.accentColor} flex items-center justify-center shadow-lg`}>
                  <div className="text-center px-8">
                    <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{step.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
