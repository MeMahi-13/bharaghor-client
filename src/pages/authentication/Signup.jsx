import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Signup</h2>

      <input type="text" placeholder="Name" style={styles.input} />
      <input type="email" placeholder="Email" style={styles.input} />
      <input type="password" placeholder="Password" style={styles.input} />

      <button style={styles.button}>Signup</button>

      <p>
        Already have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/")}>
          Login
        </span>
      </p>
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
