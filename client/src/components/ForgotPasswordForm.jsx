import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendResetOtp,
  resetPassword as resetPasswordThunk,
  clearResetState,
} from "@/features/authSlice";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetOtpLoading, resetPasswordLoading, resetError, resetMessage } =
    useSelector((state) => state.auth || {});

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [localError, setLocalError] = useState(null);
  const [awaitingReset, setAwaitingReset] = useState(false);

  useEffect(() => {
    let t;
    if (resendTimer > 0) t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  useEffect(() => {
    if (resetError) {
      setLocalError(resetError);
      toast.error(resetError); // ❌ Wrong OTP or reset error
    } else if (resetMessage && awaitingReset) {
      toast.success("✅ Password changed successfully"); // 🎉 Password reset
      setAwaitingReset(false);
      dispatch(clearResetState());
      navigate("/login");
    }
  }, [resetError, resetMessage, awaitingReset, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearResetState());
    };
  }, [dispatch]);

  const handleSendEmail = (e) => {
    e?.preventDefault?.();
    setLocalError(null);
    if (!email) return setLocalError("Please enter an email");
    dispatch(sendResetOtp({ email }))
      .unwrap()
      .then(() => {
        toast.success("📩 OTP sent to your email"); // ✅ OTP sent
        setStep("otp");
        setResendTimer(60);
      })
      .catch((err) => toast.error(err || "Failed to send OTP"));
  };

  const handleVerifyOtp = (e) => {
    e?.preventDefault?.();
    if (otp.length !== 6) {
      toast.error("Enter a 6-digit OTP");
      return setLocalError("Enter a 6-digit OTP");
    }
    dispatch(clearResetState());
    toast.success("✅ OTP verified, set new password"); // 🎉 OTP verified
    setStep("reset");
  };

  const handleReset = (e) => {
    e?.preventDefault?.();
    setLocalError(null);
    if (!newPassword) {
      toast.error("Please enter a new password");
      return setLocalError("Please enter a new password");
    }
    setAwaitingReset(true);
    dispatch(resetPasswordThunk({ email, otp, newPassword }));
  };

  const isSendingOtp = resetOtpLoading;
  const isResetting = resetPasswordLoading;

  // single submit handler so Enter key works for each step
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === "email") {
      if (isSendingOtp || !email) {
        if (!email) setLocalError("Please enter an email");
        return;
      }
      handleSendEmail(e);
      return;
    }

    if (step === "otp") {
      if (otp.length !== 6) {
        setLocalError("Enter a 6-digit OTP");
        toast.error("Enter a 6-digit OTP");
        return;
      }
      handleVerifyOtp(e);
      return;
    }

    if (step === "reset") {
      if (isResetting || !newPassword) {
        if (!newPassword) setLocalError("Please enter a new password");
        return;
      }
      handleReset(e);
      return;
    }
  };

  return (
    <div className="mt-16 flex w-full items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-full max-w-md flex-col items-center rounded-2xl border border-white/10 bg-white/10 px-8 py-10 backdrop-blur-2xl shadow-[0_0_40px_rgba(155,135,245,0.25)]"
      >
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-white tracking-wide drop-shadow-md">
          {step === "email" && "Forgot password"}
          {step === "otp" && "Verify OTP"}
          {step === "reset" && "Set New Password"}
        </h2>

        {/* Subtext */}
        <p className="mt-3 text-sm text-white/70 text-center">
          {step === "email" && "Enter your email and we’ll send you an OTP."}
          {step === "otp" && "Enter the 6-digit OTP sent to your email."}
          {step === "reset" && "Create a strong new password for your account."}
        </p>

        {/* Email Step */}
        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-8 h-12 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white/90 placeholder-white/50 outline-none focus:border-[#9b87f5] focus:ring-2 focus:ring-[#9b87f5]/40 transition-all"
            />
            {localError && <p className="mt-2 text-red-400 text-sm">{localError}</p>}
            <button
              type="submit"
              disabled={isSendingOtp || !email}
              className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-[#9b87f5] to-[#6e59d9] text-white font-medium shadow-lg hover:shadow-[#9b87f5]/40 transition-all disabled:opacity-60"
            >
              {isSendingOtp ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* OTP Step */}
        {step === "otp" && (
          <>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
              }
              className="mt-8 h-12 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-center tracking-widest text-lg text-white/90 outline-none focus:border-[#9b87f5] focus:ring-2 focus:ring-[#9b87f5]/40 transition-all"
            />
            {localError && <p className="mt-2 text-red-400 text-sm">{localError}</p>}
            <button
              type="submit"
              disabled={otp.length !== 6}
              className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-[#9b87f5] to-[#6e59d9] text-white font-medium shadow-lg hover:shadow-[#9b87f5]/40 transition-all disabled:opacity-60"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* Reset Password Step */}
        {step === "reset" && (
          <>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-8 h-12 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white/90 placeholder-white/50 outline-none focus:border-[#9b87f5] focus:ring-2 focus:ring-[#9b87f5]/40 transition-all"
            />
            {localError && <p className="mt-2 text-red-400 text-sm">{localError}</p>}
            <button
              type="submit"
              disabled={isResetting || !newPassword}
              className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-[#9b87f5] to-[#6e59d9] text-white font-medium shadow-lg hover:shadow-[#9b87f5]/40 transition-all disabled:opacity-60"
            >
              {isResetting ? "Resetting..." : "Reset password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
