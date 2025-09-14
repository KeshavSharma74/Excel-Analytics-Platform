import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, login } from "@/features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user, error } = useSelector((state) => state.auth);

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect when user exists
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const result = await dispatch(signupUser({ name, email, password })).unwrap();
        console.log(result);
          toast.success("Signup successfully! 🎉");
      } else {
        // console.log("login call kr rha hu");
        const result = await dispatch(login({ email, password })).unwrap();
        console.log(result);
        if(result.success){
          toast.success("LoggedIn successfully! 🎉");
        }
          
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="mt-12 relative flex w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-[90%] max-w-md flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-8 py-8 backdrop-blur-xl shadow-[0_0_40px_rgba(155,135,245,0.2)]"
      >
        <h2 className="text-3xl font-light text-white">
          {isSignup ? "Sign up" : "Sign in"}
        </h2>
        <p className="mt-2 text-sm text-white/70">
          {isSignup
            ? "Create a new account to get started"
            : "Welcome back! Please sign in to continue"}
        </p>

        {/* Google Button */}
        <button
          type="button"
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
        >
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
            alt="googleLogo"
          />
          <span className="text-sm text-white/80">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="my-4 flex w-full items-center gap-4 text-white/50">
          <div className="h-px w-full bg-white/10"></div>
          <p className="whitespace-nowrap text-sm">
            or {isSignup ? "sign up" : "sign in"} with email
          </p>
          <div className="h-px w-full bg-white/10"></div>
        </div>

        {/* Name Input (signup only) */}
        {isSignup && (
          <div className="mb-4 flex h-11 w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-6 pr-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-full w-full bg-transparent text-sm text-white/80 placeholder-white/50 outline-none"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="flex h-11 w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-6 pr-4">
          <input
            type="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-full w-full bg-transparent text-sm text-white/80 placeholder-white/50 outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="mt-4 flex h-11 w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-6 pr-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-full w-full bg-transparent text-sm text-white/80 placeholder-white/50 outline-none"
            required
          />
        </div>

        {/* Remember & Forgot (login only) */}
        {!isSignup && (
          <div className="mt-4 flex w-full items-center justify-between text-white/70">
            <div className="flex items-center gap-2">
              <input id="checkbox" type="checkbox" />
              <label htmlFor="checkbox" className="cursor-pointer text-sm">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm hover:underline">
              Forgot Password
            </Link>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-2 text-sm text-red-400">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 h-11 w-full rounded-full bg-gradient-to-r from-[#9b87f5] to-[#6e59d9] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : isSignup ? "Sign up" : "Login"}
        </button>

        <p className="mt-4 text-sm text-white/70">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="font-semibold text-[#9b87f5] hover:underline"
          >
            {isSignup ? "Sign in" : "Sign up"}
          </button>
        </p>
      </form>
    </div>
  );
}
