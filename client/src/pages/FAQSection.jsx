import React, { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How to use this component?",
      answer:
        "To use this component, you need to import it in your project and use it in your JSX code. Here's an example of how to use it:",
    },
    {
      question: "Are there any other components available?",
      answer:
        "Yes, there are many other components available in this library. You can find them in the 'Components' section of the website.",
    },
    {
      question: "Are components responsive?",
      answer:
        "Yes, all components are responsive and can be used on different screen sizes.",
    },
    {
      question: "Can I customize the components?",
      answer:
        "Yes, you can customize the components by passing props to them. You can find more information about customizing components in the 'Customization' section of the website.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div
        className="w-full flex justify-center py-16 px-4"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%), linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
        }}
      >
        <div className="max-w-[1250px] w-full flex flex-col md:flex-row items-start justify-center gap-8">
          {/* Left Image */}
          <img
            className="max-w-sm w-full rounded-xl h-auto shadow-xl shadow-indigo-900/20"
            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
            alt="FAQ Illustration"
          />

          {/* FAQ Section */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 md:p-8 w-full">
            <p className="text-indigo-400 text-sm font-medium">FAQ's</p>
            <h1 className="text-3xl font-semibold text-white">
              Looking for answers?
            </h1>
            <p className="text-sm text-slate-300 mt-2 pb-4">
              Ship Beautiful Frontends Without the Overhead — Customizable,
              Scalable and Developer-Friendly UI Components.
            </p>

            {faqs.map((faq, index) => (
              <div
                className="border-b border-white/20 py-4 cursor-pointer"
                key={index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-white">
                    {faq.question}
                  </h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                      openIndex === index ? "rotate-180" : ""
                    } transition-all duration-500 ease-in-out`}
                  >
                    <path
                      d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p
                  className={`text-sm text-slate-200 transition-all duration-500 ease-in-out max-w-md ${
                    openIndex === index
                      ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                      : "opacity-0 max-h-0 -translate-y-2"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQSection;
