import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Rocket, Phone } from "lucide-react";
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id="pilot">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Pilot Program</h2>
          <p className="text-lg text-gray-600">
            Get hands-on experience with Autonomic Edge in your environment
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-soft-gray">
            <CardContent className="p-8">
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

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-primary text-white px-8 py-4 text-lg font-medium hover:bg-primary/90 shadow-lg"
                      disabled={submitPilotRequest.isPending}
                    >
                      <Rocket className="mr-2 w-5 h-5" />
                      {submitPilotRequest.isPending ? "Submitting..." : "Start 14-Day Pilot"}
                    </Button>
                    <Button variant="outline" size="lg" type="button" className="px-8 py-4 text-lg font-medium">
                      <Phone className="mr-2 w-5 h-5" />
                      Book a Tech Call
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
