import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import loginAnimation from "../../assets/Secure Login.json";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import { AuthContext } from "../../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

function Login() {
  const { signInUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        
        // Save Google User to Backend
        await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            name: result.user.displayName, 
            email: result.user.email, 
            uid: result.user.uid ,
            
          }),
        });
  
        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    };

  const handleSignIn = async (e) => {
    e.preventDefault();


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

      navigate("/"); 
    } catch (err) {
      console.error(err);

      // Error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 flex flex-col md:flex-row items-center md:gap-8">
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

            <button className="w-full py-3 bg-blue-600 text-white rounded-lg">Login</button>
          </form>

          <div className="flex items-center my-6">
            <hr className="grow" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="grow" />
          </div>
            <button onClick={handleGoogleSignIn} className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

          <p className="text-center mt-6 text-sm">
            Don’t have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
          </p>
        </div>
      </div>
    </div>
    
   
  );
}

export default Login;
