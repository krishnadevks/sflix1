import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs"; // For password hashing
import "./LoginPage.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // New field for username
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const fetchUserRole = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setRole(userDoc.data().role); // Set user role
        return userDoc.data().role;
      } else {
        console.error("No user role found!");
        return "user"; // Default to user
      }
    } catch (err) {
      console.error("Error fetching user role:", err.message);
      return "user";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      if (isSignup) {
        // Sign-up process
        if (!email || !password || !username) {
          setError("All fields are required for signup.");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Hash the password before saving it to Firestore
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Update Firebase profile with the username
        await updateProfile(user, { displayName: username });

        // Add user details to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email,
          username,
          password: hashedPassword, // Save the hashed password
          role: "user", // Default role
        });

        toast.success("Signup successful! Please log in.");
        setIsSignup(false); // Automatically switch to login view
      } else {
        // Login process
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Fetch user's role from Firestore
        const userRole = await fetchUserRole(user.uid);

        toast.success("Login successful!");

        // Redirect based on role
        if (userRole === "admin") {
          navigate("/admin"); // Navigate to admin dashboard
        } else {
          navigate("/home"); // Navigate to home page
        }
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          {isSignup ? "Sign Up" : "Login"}
        </button>
        {error && <p className="error-text">{error}</p>}
      </form>
      <p onClick={() => setIsSignup(!isSignup)} className="toggle-link">
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Login;
