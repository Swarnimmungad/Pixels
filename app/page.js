import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/hero";
import InteractiveStats from "@/components/interactiveStats";
import Features from "@/components/features";
import PricingSection from "@/components/pricing";
export default function Home() {
  return (
    <div className="pt-36">
      {/* Hero */}
      <HeroSection></HeroSection>
      {/* Stats */}
      <InteractiveStats></InteractiveStats>
      {/* Features */}
      <Features></Features>
      {/* Pricing */}
      <PricingSection></PricingSection>
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6 flex-col items-center text-center">
          <h2 className="text-5xl font-bold  mb-6">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ">
              Create Something <span className="ml-2 mt-2">Amazing?</span>
            </span>
          </h2>
          <p className="text-xl px-6  text-gray-300 mb-8">
            Join thousands of creators who are already using AI to transform
            their images and bring their vision to life
          </p>
          <Link href="/dashboard">
            <Button variant="primary" size="xl">
              <Wand2 className="w-5 h-5 text-black" /> {/* Sticker/Icon */}
              Start Creating Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
