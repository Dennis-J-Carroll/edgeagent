import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "We reduced average packet delay from 38ms to 11ms with zero manual tuning. Autonomic Edge transformed our remote diagnostics network.",
      name: "Sarah Chen",
      title: "CTO, VitalPath Healthcare",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      quote: "It's like having an AI co-pilot for my network. The GA learns what works better than I ever could in real time.",
      name: "Marcus Rodriguez",
      title: "Edge Infrastructure Lead, GovNet",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Customer Success Stories
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start mb-4">
                    <div className="text-4xl text-primary mr-4">"</div>
                    <div>
                      <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-3`}
                        >
                          <User className={`${testimonial.iconColor} w-5 h-5`} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.title}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
