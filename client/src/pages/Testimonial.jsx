import React from "react";

function Testimonial() {
  const testimonials = [
    {
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600",
      quote:
        "“Radiant made undercutting all of our competitors an absolute breeze.”",
      name: "John Doe",
      role: "Content Marketing",
    },
    {
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600",
      quote:
        "“Radiant made undercutting all of our competitors an absolute breeze.”",
      name: "John Doe",
      role: "Content Marketing",
    },
    {
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop",
      quote:
        "“Radiant made undercutting all of our competitors an absolute breeze.”",
      name: "John Doe",
      role: "Content Marketing",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20"
      style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%),
          linear-gradient(135deg, #0a0613 0%, #150d27 100%)
        `,
      }}
    >
      <div className="mx-auto max-w-[1250px] px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4 tracking-tighter">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
            Hear from businesses and individuals who trusted us with their growth.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="max-w-80 w-full rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-purple-600/30 transition-all duration-300"
            >
              <div className="relative -mt-px overflow-hidden rounded-2xl">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-[270px] w-full object-cover object-top rounded-2xl transform hover:scale-105 transition-all duration-300"
                />
                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
              </div>
              <div className="px-4 pb-6 relative z-20 text-white">
                <p className="font-medium border-b border-white/20 pb-5">
                  {item.quote}
                </p>
                <p className="mt-4 font-medium">— {item.name}</p>
                <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;