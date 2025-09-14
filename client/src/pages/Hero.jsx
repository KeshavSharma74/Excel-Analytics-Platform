import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import Navigation from "@/components/Navigation";


function Hero() {

    console.log(motion);
    
  return (
    <section
      className="relative w-full overflow-hidden pb-10 pt-32 font-light text-white antialiased md:pb-16 md:pt-20"
      style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%),
          linear-gradient(135deg, #0a0613 0%, #150d27 100%)
        `,
      }}
    >
      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 mt-12 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-xs text-[#9b87f5]">
            AI-Powered Analytics Platform
          </span>

          <h1 className="mx-auto mb-6 max-w-3xl text-3xl font-light md:text-3xl lg:text-5xl">
            Turn Raw Data Into{" "}
            <span className="text-[#9b87f5]">AI-Powered</span> Actionable Insights
          </h1>

          <p className="mx-auto mb-5 max-w-2xl text-lg text-white/60 md:text-[1rem]">
            Exelytics combines artificial intelligence with cutting-edge analytics
            strategies to help you maximize your data investments with precision and ease.
          </p>

          <div className="mb-10 sm:mb-0 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/get-started"
              className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
            >
              Get Started
            </Link>

            <a
              href="#how-it-works"
              className="flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto"
            >
              <span>Learn how it works</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Dashboard Image */}
        <motion.div
          className="relative mt-40 z-10 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-[0_0_50px_rgba(155,135,245,0.2)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <img
            src="/Exelytics.png" 
            alt="Lunexa Dashboard"
            className="h-auto w-full rounded-lg border border-white/10"
          />
        </motion.div>
      </div>

      {/* Globe in background */}
      <div className="absolute -bottom-[260px] z-0 w-[1700px] h-[1500px]  pointer-events-none">
        <Spline scene="https://prod.spline.design/8j1u6WdksUbeq6mM/scene.splinecode" />
      </div>

      {/* Hide watermark
      
      <style>{`
        iframe + div,
        [class*="spline-watermark"],
        a[href*="spline.design"] {
          display: none !important;
          visibility: hidden !important;
        }
      `}</style> 
      */}
    </section>
  );
}

export default Hero;
