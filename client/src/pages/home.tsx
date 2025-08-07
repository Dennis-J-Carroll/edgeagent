import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/sections/hero";
import { ValuePillarsSection } from "@/components/sections/value-pillars";
import { LiveDemoSection } from "@/components/sections/live-demo";
import { UseCasesSection } from "@/components/sections/use-cases";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { DeveloperModeSection } from "@/components/sections/developer-mode";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PilotProgramSection } from "@/components/sections/pilot-program";
import { FooterSection } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ValuePillarsSection />
      <LiveDemoSection />
      <UseCasesSection />
      <HowItWorksSection />
      <DeveloperModeSection />
      <TestimonialsSection />
      <PilotProgramSection />
      <FooterSection />
    </div>
  );
}
