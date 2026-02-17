import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/real estate.json";

function SignUp() {
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const rules = [
    { label: "At least 8 characters", test: (v) => v.length >= 8 },
    { label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
    { label: "At least one lowercase letter", test: (v) => /[a-z]/.test(v) },
    { label: "At least one number", test: (v) => /[0-9]/.test(v) },
    {
      label: "At least one special character",
      test: (v) => /[!@#$%^&*(){}:"|<>?,.]/.test(v),
    },
  ];

  const handleSignUp = async (e) => {
  e.preventDefault();

  console.log("REGISTER CLICKED");

 
  const confirm = await Swal.fire({
    title: "Confirm Registration",
    text: "Do you want to create your account?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Register",
    cancelButtonText: "Cancel",
  });

  if (!confirm.isConfirmed) return;

  
  setLoading(true);

  try {
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());

    const res = await fetch(
      "https://yessghor-server.vercel.app/register",
      {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    Swal.fire("Success", "Account created", "success");
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 flex flex-col md:flex-row items-center md:gap-8">
        {/* Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginAnimation} loop />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold text-center text-[#073032] mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#073032]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#073032]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#073032]"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg outline-none pr-12 focus:ring-2 focus:ring-[#073032]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500"
              >
                {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg outline-none pr-12 ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-500"
                    : "focus:ring-2 focus:ring-[#073032]"
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500"
              >
                {showConfirmPassword ? <PiEyeLight /> : <PiEyeSlash />}
              </button>
            </div>

            {/* Match indicator */}
            {confirmPassword && (
              <div className="flex items-center gap-2 text-sm">
                {password === confirmPassword ? (
                  <TiTick className="text-green-700" />
                ) : (
                  <RxCross2 className="text-red-700" />
                )}
                Passwords must match
              </div>
            )}

            {/* Rules */}
            {rules.map((rule, i) => {
              const isValid = rule.test(password);
              return (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {isValid ? (
                    <TiTick className="text-green-700" />
                  ) : (
                    <RxCross2 className="text-red-700" />
                  )}
                  {rule.label}
                </div>
              );
            })}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#073032] hover:bg-[#0c474a] text-white rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#073032] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
