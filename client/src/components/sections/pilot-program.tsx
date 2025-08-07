import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Rocket, Phone, Mail, Building, Users, Send, Check, Sparkles } from "lucide-react";
import { insertPilotRequestSchema, type InsertPilotRequest } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PilotProgramSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertPilotRequest>({
    resolver: zodResolver(insertPilotRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      industry: "",
      useCase: "",
      deploymentType: "",
      networkSize: "",
      requirements: "",
    },
  });

  const submitPilotRequest = useMutation({
    mutationFn: async (data: InsertPilotRequest) => {
      const response = await apiRequest("POST", "/api/pilot-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Pilot Request Submitted!",
        description: "We'll contact you within 24 hours to start your evaluation.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/pilot-requests"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Please check your information and try again.",
      });
    },
  });

  const onSubmit = (data: InsertPilotRequest) => {
    submitPilotRequest.mutate(data);
  };

  const industryOptions = [
    { value: "healthcare", label: "Healthcare" },
    { value: "defense", label: "Defense & Government" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "finance", label: "Financial Services" },
    { value: "telecom", label: "Telecommunications" },
    { value: "other", label: "Other" },
  ];

  const useCaseOptions = [
    { value: "ddos-protection", label: "DDoS Protection" },
    { value: "qos-optimization", label: "QoS Optimization" },
    { value: "cost-reduction", label: "Cost Reduction" },
    { value: "latency-optimization", label: "Latency Optimization" },
    { value: "traffic-management", label: "Traffic Management" },
    { value: "other", label: "Other" },
  ];

  const deploymentOptions = [
    { value: "namespace", label: "Namespace/Container" },
    { value: "gns3", label: "GNS3 Simulation" },
    { value: "hardware", label: "Real Hardware" },
    { value: "cloud", label: "Cloud Environment" },
  ];

  const networkSizeOptions = [
    { value: "small", label: "Small (< 100 nodes)" },
    { value: "medium", label: "Medium (100-1000 nodes)" },
    { value: "large", label: "Large (1000+ nodes)" },
    { value: "enterprise", label: "Enterprise (10k+ nodes)" },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" id="pilot">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 3px 3px, rgba(106, 90, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      
      <div className="relative max-w-5xl mx-auto">
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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-morphism border border-primary/20"
          >
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">14-Day Free Pilot</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Start Your <span className="gradient-text">Transformation</span> Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the power of autonomous network optimization in your environment with our guided pilot program
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
          
          <Card className="relative glass-card border-0 shadow-2xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
            
            <CardContent className="relative p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industryOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="useCase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Use Case</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your use case" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {useCaseOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deploymentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deployment Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select deployment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {deploymentOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="networkSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Network Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {networkSizeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your specific requirements, current challenges, or questions..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="gradient-bg text-white px-10 py-6 text-lg font-medium shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover-glow"
                      disabled={submitPilotRequest.isPending}
                    >
                      {submitPilotRequest.isPending ? (
                        <>
                          <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Rocket className="mr-2 w-5 h-5" />
                          Start 14-Day Pilot
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      type="button" 
                      className="px-10 py-6 text-lg font-medium glass-morphism hover:bg-white/80 transform hover:scale-105 transition-all duration-300"
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      Book a Tech Call
                    </Button>
                  </motion.div>
                  
                  {/* Trust Indicators */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-6 pt-6 border-t border-gray-100"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Setup in 30 minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Full technical support</span>
                    </div>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
