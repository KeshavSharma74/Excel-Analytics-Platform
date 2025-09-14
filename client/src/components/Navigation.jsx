import { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from "react-hot-toast";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully!", {
        position: "top-center",
      });
      navigate("/"); // after logout go to home
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  // Function to handle section scroll
  const handleScrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/"); // first go to home
      setTimeout(() => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Features", path: "#features" },
    { label: "Pricing", path: "#pricing" },
    { label: "Testimonials", path: "#testimonials" },
    { label: "FAQ", path: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/4 border-b border-b-white/20 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1300px] container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold tracking-tight text-gray-300">
              EXCELYTICS
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
            >
              Home
            </a>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleScrollTo(item.path)}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-light tracking-wide"
              >
                Login
              </a>
            )}
            <button
              onClick={() => handleScrollTo("#pricing")}
              className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-4 py-2 text-gray-300 shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <List size={24} weight="light" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-gray-200/95 backdrop-blur-xl z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-8">
                <a
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2"
                >
                  <span className="text-xl font-semibold text-white tracking-tight">
                    EXCELYTICS
                  </span>
                </a>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white"
                >
                  <X size={24} weight="light" />
                </button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <a
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xl text-muted-foreground hover:text-white transition-colors duration-200 font-light tracking-wide"
                >
                  Home
                </a>
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleScrollTo(item.path)}
                    className="block text-xl text-muted-foreground hover:text-white transition-colors duration-200 font-light tracking-wide"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-6 w-full flex flex-col items-center space-y-4">
                  {user ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-xl text-muted-foreground hover:text-white transition-colors duration-200 font-light tracking-wide"
                    >
                      Logout
                    </button>
                  ) : (
                    <a
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xl text-muted-foreground hover:text-white transition-colors duration-200 font-light tracking-wide"
                    >
                      Login
                    </a>
                  )}
                  <Button asChild className="w-full">
                    <button onClick={() => handleScrollTo("#pricing")}>
                      Get Started
                    </button>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
