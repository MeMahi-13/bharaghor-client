import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
const[formData,setformData]=useState({name:"",email:"",phone:"",password:""});
const handleChange=(e)=>{
  setformData({...formData,[e.target.name]:e.target.value})
  
}
const [error,setError]=useState({});
const Validate=()=>{
  let newErrors={};
  if(!formData.email){newErrors.email="email is required"};
  if(!formData.password){newErrors.password="password is required"};
  if(!formData.phone){newErrors.password="phone number is required"};
  if(!formData.name){newErrors.name="name is required"}
setError(newErrors);
return Object.keys(newErrors).length===0;
}

const handleSubmit=async (e)=>{
  e.preventDefault();
  if(!Validate())return;
  try {
    const res = await fetch("https://yessghor-server.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("API response:", data);
  } catch (err) {
    console.error("API error:", err);
  }
};

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
      <p>Join us by creating your account</p>
<form action="" onSubmit={handleSubmit}>
  <input  value={formData.name} name="name" type="text" placeholder="Enter your name" onChange={handleChange} style={styles.input} />
  {error.name && <p class="text-red-500">{error.name}</p>}
      <input  value={formData.email} name="email" type="email" placeholder="Enter your email" onChange={handleChange} style={styles.input} />
      {error.email && <p class="text-red-500">{error.email}</p>}
      <input  value={formData.phone} name="phone" type="number" placeholder="Enter your phone" onChange={handleChange} style={styles.input} />
      {error.hpne && <p class="text-red-500">{error.phone}</p>}
      <input  value={formData.password} name="password" type="password" placeholder="Enter your password" onChange={handleChange} style={styles.input} />
{error.password && <p class="text-red-500">{error.password}</p>}
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  style={styles.button}>Signup</button>
<p>I agree to the medidoc Terms of Service and Privacy Policy</p>
      <p>
        Already have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
</form>
      
    </div>
  );
};

export default Signup;

const styles = {
  container: { width: "300px", margin: "100px auto", textAlign: "center" },
  input: { width: "100%", padding: "8px", margin: "8px 0" },
  button: { width: "100%", padding: "8px" },
  link: { color: "blue", cursor: "pointer" }
};
