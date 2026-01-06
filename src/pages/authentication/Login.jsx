
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import Swal from "sweetalert2";
import './Login.css';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({ email: "", password: "" });
  const handleChange = (e) => {

    setformData({ ...formData, [e.target.name]: e.target.value })
  }
  const [error, setError] = useState({});
  const Validate = () => {
    let newErrors = {};
    if (!formData.email) { newErrors.email = "email is required" };
    if (!formData.password) { newErrors.password = "password is required" }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!Validate())

      return;
    try {
      const res = await fetch("https://yessghor-server.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log("API response:", data);
      if (res.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Yeah! Welcome Back",
          html: `<p style="margin-top:8px;">${data.user?.email}</p>`,
          showConfirmButton: false,
          timer: 1500,
          background: "white",
          backdrop: "rgba(0,0,0,0)",
        });
        navigate("/");

      } else {

        alert(data.message || "Login failed!");
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };
  return (
    <div className="page">
      <div className="container">

        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>

        <form action="" onSubmit={handleSubmit} className="mt-5">
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input type="email" placeholder="Email" name="email" value={formData.email}
                onChange={handleChange} />
            </div>
            {error.email && <p className="text-red-500">{error.email}</p>}
            <div className="input">
              <img src={password_icon} alt="" />
              <input type="password" name="password" placeholder="Password" value={formData.password}
                onChange={handleChange} />
            </div>
            {error.password && <p className="text-red-500">{error.password}</p>}
          </div>
          <div className="forgot">
            <div className="flex gap-2 items-center"><input
              type="checkbox"
              name="tomato"

              onChange={handleChange}
            /><p className="mb-0">Remember me</p></div>
            <div className="forgot-password">Forgot Password? <span>click here</span></div>

          </div>

          <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-15 " style={styles.button}>Login</button>
          <div className="text-center">
            <p>
              Don’t have an account?{" "}
              <span style={styles.link} onClick={() => navigate("/register")}>
                Signup
              </span>
            </p>
          </div>

          <div>

            <button
              className="hover:bg-blue-700  font-bold py-2 px-4 rounded-full"
              style={styles.signinwith}
            >
              <FcGoogle />
              <span>Sign in with Google</span>
            </button>

            <button
              className="hover:bg-blue-700  font-bold py-2 px-4 rounded-full"
              style={styles.signinwith}
            >
              <BsApple />
              <span>Sign in with Apple</span>
            </button>
          </div>
        </form>

      </div>
    </div>

  );
};

export default Login;

const styles = {

  signinwith: {
    background: "#F9FAFB",
    width: "80%",
    padding: "8px",
    marginTop: "27px",
    marginLeft: "50px",
    border: "1px solid #E5E7EB",
    fontWeight: "600",
    fontSize: "16px",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },

  button: { width: "80%", padding: "8px", marginTop: "27px", marginLeft: "50px" },
  link: { color: "blue", cursor: "pointer" }
};
