import React, { Suspense } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/sections/hero";
import { ValuePillarsSection } from "@/components/sections/value-pillars";

const LiveDemoSection = React.lazy(() => import("@/components/sections/live-demo").then(m => ({ default: m.LiveDemoSection })));
const UseCasesSection = React.lazy(() => import("@/components/sections/use-cases").then(m => ({ default: m.UseCasesSection })));
const HowItWorksSection = React.lazy(() => import("@/components/sections/how-it-works").then(m => ({ default: m.HowItWorksSection })));
const DeveloperModeSection = React.lazy(() => import("@/components/sections/developer-mode").then(m => ({ default: m.DeveloperModeSection })));
const TestimonialsSection = React.lazy(() => import("@/components/sections/testimonials").then(m => ({ default: m.TestimonialsSection })));
const PilotProgramSection = React.lazy(() => import("@/components/sections/pilot-program").then(m => ({ default: m.PilotProgramSection })));
const FooterSection = React.lazy(() => import("@/components/sections/footer").then(m => ({ default: m.FooterSection })));

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ValuePillarsSection />
      <Suspense fallback={null}>
        <LiveDemoSection />
        <UseCasesSection />
        <HowItWorksSection />
        <DeveloperModeSection />
        <TestimonialsSection />
        <PilotProgramSection />
        <FooterSection />
      </Suspense>
    </div>
  );
}
