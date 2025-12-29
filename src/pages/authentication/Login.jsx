import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   navigate("/");

    const res = await fetch("https://yessghor-server.vercel.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
<div style={styles.container}>
      <form onSubmit={handleSubmit}>
      <input
        type="name"
        placeholder="Name"
        style={styles.input}
        onChange={(e) => setName(e.target.value)}
      /> <br></br>
      <input
        type="password"
        style={styles.input}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
       
       <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={styles.button}>Login</button>

      <p>{message}</p>

        <p>
        Don’t have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/signup")}>
          Signup
        </span>
      </p>
      
    </form>
</div>
  );
}

export default Login;
const styles = {
  container: { width: "300px", margin: "100px auto", textAlign: "center" },
  input: { width: "100%", padding: "8px", margin: "8px 0" },
  button: { width: "100%", padding: "8px",  },
  link: { color: "blue", cursor: "pointer" }
};
