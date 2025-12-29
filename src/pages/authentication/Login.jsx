
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
const Login = () => {
  const navigate = useNavigate();
const[formData,setformData]=useState({email:"",password:""});
const handleChange=(e)=>{
  setformData({...formData,[e.target.name]:e.target.value})
}
const [error,setError]=useState({});
const Validate=()=>{
  let newErrors={};
  if(!formData.email){newErrors.email="email is required"};
  if(!formData.password){newErrors.password="password is required"}
setError(newErrors);
return Object.keys(newErrors).length===0;
}

const handleSubmit= async (e)=>{
  e.preventDefault();

  if(!Validate())
    
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
        navigate("/home");
        
      } else {
        
        alert(data.message || "Login failed!");
      }
  } catch (err) {
    console.error("API error:", err);
  }
};
  return (
    <div style={styles.container}>
      <h2 class="font-semibold text-2xl leading-[135%] text-black">Login</h2>
      <p class="font-normal text-base leading-[120%] p-black">Hello, Welcome back to your account </p>
<form action="" onSubmit={handleSubmit} className="mt-5">

<div className="relative w-full">
  <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />

  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    className="
      w-full
      pl-16
      pr-4
      py-2
      border
      rounded-3xl
      border-brand-primary
      placeholder-gray-500
      text-black
      ring-2 ring-gray-300
      focus:ring-gray-500
    "
  />
</div>
 {error.email && <p className="text-red-500">{error.email}</p>}
 <div className="relative w-full mt-4">
  <CiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />

   <input
  type="password"
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  
   className="
      w-full
      pl-16
      pr-4
      py-2
      border
      rounded-3xl
      border-brand-primary
      placeholder-gray-500
      text-black
      ring-2 ring-gray-300
      focus:ring-gray-500
    "
/>
 </div>
     
{error.password && <p className="text-red-500">{error.password}</p>}
<div className="flex justify-between">
  <div class="checkbox"><p>Remember me</p></div>
  <p>Forgot Password?</p>
</div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-15" style={styles.button}>Login</button>
      <p>
        Don’t have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/register")}>
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
  input: { width: "100%", padding: "8px", margin: "8px 0" },
  button: { width: "100%", padding: "8px",  },
  link: { color: "blue", cursor: "pointer" }
};


