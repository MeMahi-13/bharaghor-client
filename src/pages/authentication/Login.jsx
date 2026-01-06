<<<<<<< HEAD
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import loginAnimation from "../../assets/Secure Login.json";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { signInUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
=======

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
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
>>>>>>> 9f446fedaf778b49a934a6a4d4cbca8c1331f4d2

      return;
    try {
      const result = await signInUser(email, password);
      console.log(result.user);

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${result.user.displayName || "User"}!`,
        timer: 1500,
        showConfirmButton: false,
      });
<<<<<<< HEAD

      navigate("/"); 
    } catch (err) {
      console.error(err);

      // Error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
=======
      const data = await res.json();
      console.log("API response:", data);
      if (res.ok) {
        alert("Login successful! Welcome " + data.user?.email);
        navigate("/");

      } else {

        alert(data.message || "Login failed!");
      }
    } catch (err) {
      console.error("API error:", err);
>>>>>>> 9f446fedaf778b49a934a6a4d4cbca8c1331f4d2
    }
  };
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center md:gap-8">
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginAnimation} loop />
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">Login</h2>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="relative">
              <img src={email_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 px-4 py-3 border rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <img src={password_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 px-4 py-3 border rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded-xl">Login</button>
          </form>

          <div className="flex items-center my-6">
            <hr className="grow" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="grow" />
          </div>

          <p className="text-center mt-6 text-sm">
            Don’t have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
          </p>
        </div>
      </div>
=======
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
        <div className=" forgot">
          <div ><p>Remember me</p></div>
          <div className="forgot-password">Forgot Password? <span>click here</span></div>

        </div>
        
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-15 " style={styles.button}>Login</button>
        <div className="text-center">
          <p>
            Don’t have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/register")}>
              Signup
            </span>
          </p>
        </div>


      </form>

>>>>>>> 9f446fedaf778b49a934a6a4d4cbca8c1331f4d2
    </div>
    </div>
   
  );
}

export default Login;
<<<<<<< HEAD
=======

const styles = {


  button: { width: "80%", padding: "8px", marginTop:"27px",marginLeft:"50px"},
  link: { color: "blue", cursor: "pointer" }
};
>>>>>>> 9f446fedaf778b49a934a6a4d4cbca8c1331f4d2
