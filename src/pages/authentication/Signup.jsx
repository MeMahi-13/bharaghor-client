import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import './Login.css';
const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nid: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("https://yessghor-server.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          position: "center",     
  icon: "success",
  title: "Registration Successful!",
  showConfirmButton: false,
  timer: 1500,
  background: "white", 
  backdrop: "rgba(0,0,0,0)", 
        });
        setErrors({});
        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrors({ api: data.message });
      }
    } catch (err) {
      console.error("API error:", err);
      setErrors({ api: "Something went wrong" });
    }
  };

  return (
     <div className="page">
           <div className="container">
    
          <div className="header">
            <div className="text">Signup</div>
            <div className="underline"></div>
          </div>
    
          <form action="" onSubmit={handleSubmit} className="mt-5">
            <div className="inputs">
               <div className="input">
                <img src={user_icon} alt="" />
                <input type="name" placeholder="Name" name="name" value={formData.name}
                  onChange={handleChange} />
              </div>
              {errors.name && <p className="text-red-500">{errors.name}</p>}
              <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder="Email" name="email" value={formData.email}
                  onChange={handleChange} />
              </div>
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" name="password" placeholder="Password" value={formData.password}
                  onChange={handleChange} />
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}
    
            </div>
           
            
            <button  className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-15 " style={styles.button}>Signup</button>
            <div className="text-center">
              <p>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
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

export default Signup;

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
  button: { width: "80%", padding: "8px", marginTop:"27px",marginLeft:"50px" },
  link: { color: "blue", cursor: "pointer" },
};
