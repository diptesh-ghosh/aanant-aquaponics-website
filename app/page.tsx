'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { AQIComparison } from '@/components/aqi-comparison';
import { CourseShowcase } from '@/components/course-showcase';
import { SuccessMetrics } from '@/components/success-metrics';
import { FounderStory } from '@/components/founder-story';
import { CredibilitySection } from '@/components/credibility-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { MethodologySection } from '@/components/methodology-section';
import { PricingSection } from '@/components/pricing-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <Hero />
      <AQIComparison />
      <CourseShowcase />
      <SuccessMetrics />
      <FounderStory />
      <CredibilitySection />
      <MethodologySection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}