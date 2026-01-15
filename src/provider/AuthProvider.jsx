import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Firebase Methods ---
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  // --- Updated LogOut (Clears both Firebase and Manual sessions) ---
  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("user"); // Clear manual session
    setUser(null);
    setFirebaseUser(null);
  };

  // --- Backend Sync for Firebase Users ---
  const syncUserWithBackend = async (firebaseUser) => {
    if (!firebaseUser) return;

    try {
      const token = await firebaseUser.getIdToken();
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          phone: firebaseUser.phoneNumber,
          provider: firebaseUser.providerData[0]?.providerId,
        }),
      });

      const data = await res.json();
      const userData = data.user || data;
      setUser(userData);
      // Persist manual user data to handle refreshes
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Backend sync failed:", error);
    }
  };

  // --- Handle Persisted Session & Firebase State ---
  useEffect(() => {
    // 1. Check if there is a manually logged-in user in localStorage first
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser) {
        syncUserWithBackend(currentUser);
      } else if (!localUser) {
        // Only clear global user if no local manual session exists
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to be called from Login.jsx for manual login
  const setManualUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const userInfo = {
    user,       
    setUser: setManualUser, // Replaced with persistent setter
    firebaseUser,    
    loading,
    createUser,
    signInUser,
    loginWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
