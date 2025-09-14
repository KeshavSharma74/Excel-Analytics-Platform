import { useEffect, useRef, useState } from "react";
import { Check, Star } from "phosphor-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals and small projects",
      features: [
        "Up to 5 file uploads per month",
        "Basic chart types (bar, line, pie)",
        "Standard export formats",
        "Email support",
        "1GB storage",
      ],
      cta: "Start Free",
      popular: false,
      variant: "outline",
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for growing teams and businesses",
      features: [
        "Unlimited file uploads",
        "All chart types including 3D",
        "AI-powered insights & trends",
        "Priority support",
        "50GB storage",
        "Team collaboration tools",
        "Advanced export options",
        "History dashboard",
      ],
      cta: "Start Pro Trial",
      popular: true,
      variant: "default",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "Complete solution for large organizations",
      features: [
        "Everything in Pro",
        "White-label solutions",
        "Advanced admin controls",
        "SSO integration",
        "Unlimited storage",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "On-premise deployment",
      ],
      cta: "Contact Sales",
      popular: false,
      variant: "outline",
    },
  ];

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-20"
      style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%),
          linear-gradient(135deg, #0a0613 0%, #150d27 100%)
        `,
      }}
    >
      <div className="mx-auto max-w-[1250px] px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "reveal revealed" : "reveal"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 tracking-tighter">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade at any
            time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative group ${
                isVisible ? "fade-in" : ""
              } ${plan.popular ? "lg:scale-105" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg">
                    <Star
                      size={16}
                      weight="fill"
                      className="text-white mr-2"
                    />
                    <span className="text-white font-medium text-sm">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`p-8 h-full rounded-2xl border border-white/10 backdrop-blur-md bg-white/10 transition-all duration-300 ${
                  plan.popular
                    ? "border-purple-400/50 shadow-lg shadow-purple-600/30"
                    : "hover:border-purple-300/40"
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-gray-300 font-light mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl lg:text-5xl font-light text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>

                  <Button
                    variant={plan.variant}
                    size="lg"
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-lg"
                        : "bg-transparent border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start text-gray-300"
                    >
                      <Check
                        size={20}
                        weight="light"
                        className="text-purple-400 mt-0.5 mr-3 flex-shrink-0"
                      />
                      <span className="font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div
          className={`text-center mt-16 ${
            isVisible ? "fade-in fade-in-delay-3" : ""
          }`}
        >
          <div className="p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/10 max-w-2xl mx-auto">
            <p className="text-gray-300 font-light">
              All plans include a 14-day free trial. No credit card required.
              Cancel anytime with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
