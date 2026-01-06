import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "../../context/AuthContext";


function SignUp() {
  const { createUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
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
          uid: result.user.uid 
        }),
      });

      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

const handleSignUp = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { name, email, password } = Object.fromEntries(formData.entries());

  try {
    //  Firebase signup
    const result = await createUser(email, password);

    // Update Firebase profile
    await updateProfile(result.user, {
      displayName: name,
    });

    // Save user to DB
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        uid: result.user.uid,
      }),
    });

    const data = await res.json();

    if (data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Your Account has been created!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="p-10 flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Create Account</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="email" name="email" placeholder="Email Address" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

          {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}

          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
            Register
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" /><span className="mx-3 text-gray-400 text-xs">OR</span><hr className="grow border-gray-300" />
        </div>

        <button onClick={handleGoogleSignIn} className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
