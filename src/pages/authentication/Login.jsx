import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      const res = await fetch("https://yessghor-server.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (res.ok) {
        setMessage("Login successful! Welcome " + data.user?.email);
        navigate("/profile");
      } else {
        setMessage(data.message || "Login failed!");
      }
    } catch (err) {
      console.error("API error:", err);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 className="font-semibold text-2xl mb-2">Login</h2>
      <p className="text-gray-700 mb-5">
        Hello, welcome back to your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="relative w-full">
          <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-2 border rounded-3xl border-gray-300 placeholder-gray-500 text-black focus:ring-2 focus:ring-gray-400"
          />
        </div>
        {error.email && <p className="text-red-500">{error.email}</p>}

        {/* Password */}
        <div className="relative w-full">
          <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-2 border rounded-3xl border-gray-300 placeholder-gray-500 text-black focus:ring-2 focus:ring-gray-400"
          />
        </div>
        {error.password && <p className="text-red-500">{error.password}</p>}

        {/* Message */}
        {message && <p className="text-red-600 py-1">{message}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
        >
          Login
        </button>

        <p className="mt-3">
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/register")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

const styles = {
  container: { width: "300px", margin: "100px auto", textAlign: "center" },
  link: { color: "blue", cursor: "pointer" },
};
