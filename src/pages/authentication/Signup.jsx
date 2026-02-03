import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth"; 
import { TiTickOutline } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import loginAnimation from "../../assets/real estate.json";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import Lottie from "lottie-react";
function SignUp() {
  const navigate = useNavigate();
  const { logIn } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const rules=[
  {
  label:"At least 8 character",
  test:(value)=>value.length>=8
},
{
  label:"At least one Uppercase letter",
  test:(value)=>/[A-Z]/.test(value)
},
{
  label:"At least one Lowercase letter",
  test:(value)=>/[a-z]/.test(value)
},
{
  label:"At least one Number",
  test:(value)=>/[0-9]/.test(value)
},
{
  label:"At least one Special character",
  test:(value)=>/[!@#$%^&*(){}:"|<>?,.]/.test(value)
},


]
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { name, email, phone, password } = Object.fromEntries(
      formData.entries()
    );
    try {
      const res = await fetch("https://yessghor-server.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          role: "user",
          bookmarks: [],
          createdAt: new Date(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // 
      logIn({
        _id: data.userId, 
        name,
        email,
        phone,
        role: "user",
        bookmarks: [],
        profileImage: "", 
        nidStatus: "Not Submitted",
      });

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "You are now logged in!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 flex flex-col md:flex-row items-center md:gap-8">
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginAnimation} loop />
        </div>
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
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#073032] outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#073032] outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#073032] outline-none"
          />
<div>
   <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    required
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#073032] outline-none pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
  >
    {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
  </button>
</div>

          {
            rules.map((rule,i)=>{
              const isValid=rule.test(password)
return(
  <div key={i}>
<span className="flex items-center gap-2 mt-1">
  {isValid?<TiTick className="text-green-900" />:<RxCross2 className="text-red-900" />}
  {rule.label}
</span>
  </div>
)
            })
          }
</div>
         

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#073032] hover:bg-[#0c474a] cursor-pointer text-white rounded-xl font-semibold transition-all disabled:opacity-50"
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
