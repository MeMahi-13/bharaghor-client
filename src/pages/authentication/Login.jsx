
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
        alert("Login successful! Welcome " + data.user?.email);
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

    </div>
    </div>
   
  );
};

export default Login;

const styles = {


  button: { width: "80%", padding: "8px", marginTop:"27px",marginLeft:"50px"},
  link: { color: "blue", cursor: "pointer" }
};
