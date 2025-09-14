import React from 'react'
import Hero from './Hero'
import Navigation from '@/components/Navigation'
import FeaturePage from './FeaturePage'
import PricingSection from './PricingSection'
import Testimonial from './Testimonial'
import FAQSection from './FAQSection'
import Footer from './Footer'

const Index = () => {
  return (
    <div>
      <Navigation />

      <section>
        <Hero />
      </section>

      <section id="features">
        <FeaturePage />
      </section>

      <section id="pricing">
        <PricingSection />
      </section>

      <section id="testimonials">
        <Testimonial />
      </section>

      <section id="faq">
        <FAQSection />
      </section>

      <Footer />
    </div>  
  )
}

export default Index
