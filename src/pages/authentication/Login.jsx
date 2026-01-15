import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import loginAnimation from "../../assets/Secure Login.json";
import telephone_icon from "../../assets/telephone.png";
import password_icon from "../../assets/password.png";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { setUser } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), password: password.trim() }),
      
      });
        console.log(phone,password);

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // ✅ Login successful
        setUser(data.user);
        console.log(data.user)
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${data.user.name}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      } else if (response.status === 401) {
        // ❌ Unauthorized: phone not found or incorrect password
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message, // Shows exact backend message
        });
      } else {
        // Other errors
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 flex flex-col md:flex-row items-center md:gap-8">
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginAnimation} loop />
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">Login</h2>

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Phone input */}
            <div className="relative">
              <img src={telephone_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5" alt="phone" />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full pl-10 px-4 py-3 border rounded-xl"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <img src={password_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5" alt="password" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 px-4 py-3 border rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Don’t have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
