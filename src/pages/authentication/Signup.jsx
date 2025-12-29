import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
          position: "top-end",
          icon: "success",
          title: "Registration Successfull!",
          showConfirmButton: false,
          timer: 1500,
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
    <div style={styles.container}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={formData.name}
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <input
          value={formData.email}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

      

        <input
          value={formData.password}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        {errors.api && <p className="text-red-600">{errors.api}</p>}
    

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          style={styles.button}
        >
          Signup
        </button>

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
  link: { color: "blue", cursor: "pointer" },
};
