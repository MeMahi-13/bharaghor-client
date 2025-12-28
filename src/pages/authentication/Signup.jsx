import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
const[formData,setformData]=useState({name:"",email:"",password:""});
const handleChange=(e)=>{
  setformData({...formData,[e.target.name]:e.target.value})
  
}
const [error,setError]=useState({});
const Validate=()=>{
  let newErrors={};
  if(!formData.email){newErrors.email="email is required"};
  if(!formData.password){newErrors.password="password is required"};
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
<form action="" onSubmit={handleSubmit}>
  <input  value={formData.name} name="name" type="text" placeholder="Name" onChange={handleChange} style={styles.input} />
  {error.name && <p class="text-red-500">{error.name}</p>}
      <input  value={formData.email} name="email" type="email" placeholder="Email" onChange={handleChange} style={styles.input} />
      {error.email && <p class="text-red-500">{error.email}</p>}
      <input  value={formData.password} name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
{error.password && <p class="text-red-500">{error.password}</p>}
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  style={styles.button}>Signup</button>

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
