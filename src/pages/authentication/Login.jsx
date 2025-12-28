import {  useState } from "react";
import { useNavigate } from "react-router-dom";

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
        navigate("/");
        
      } else {
        
        alert(data.message || "Login failed!");
      }
  } catch (err) {
    console.error("API error:", err);
  }
};
  return (
    <div style={styles.container}>
      <h2>Login</h2>
<form action="" onSubmit={handleSubmit}>

 <input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
  style={styles.input}
  className="border-2"
/>
 {error.email && <p className="text-red-500">{error.email}</p>}
      <input
  type="password"
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  style={styles.input}
  className="border-2"
/>
{error.password && <p className="text-red-500">{error.password}</p>}
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={styles.button}>Login</button>

      <p>
        Don’t have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/signup")}>
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
