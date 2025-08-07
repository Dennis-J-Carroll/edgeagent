import { useState, useEffect } from "react";
import { Network, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-chart-2 rounded-lg flex items-center justify-center">
              <Network className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Autonomic Edge</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("demo")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Live Demo
            </button>
            <button
              onClick={() => scrollToSection("use-cases")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Use Cases
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </button>
            <Button
              onClick={() => scrollToSection("pilot")}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Start Pilot
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <button
                onClick={() => scrollToSection("demo")}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 w-full text-left"
              >
                Live Demo
              </button>
              <button
                onClick={() => scrollToSection("use-cases")}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 w-full text-left"
              >
                Use Cases
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 w-full text-left"
              >
                How It Works
              </button>
              <Button
                onClick={() => scrollToSection("pilot")}
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                Start Pilot
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
