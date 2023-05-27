import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Logo";
import GoogleSignup from "../components/GoogleSignup";
import Guest from "../components/Guest";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const userRef = doc(db, "users", res.user.uid);

      await setDoc(userRef, {
        displayName,
        email,
        uid: res.user.uid,
      });

      await signOut(auth);

      navigate("/login");
    } catch (e) {
      toast.error(
        e.code === "auth/email-already-in-use"
          ? "This email is already in use"
          : "An error occurred. Please try again later."
      );
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="rounded-lg bg-zinc-900 bg-opacity-50 p-6 sm:py-10 sm:px-24">
        <Header />
        <form
          className="flex flex-col justify-center gap-4 text-lg text-white"
          onSubmit={signUpWithEmailAndPassword}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="displayName">Display Name</label>
            <input
              id="displayName"
              type="text"
              placeholder="Display Name"
              className="rounded bg-gray-700 py-1 px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="rounded bg-gray-700 py-1 px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="rounded bg-gray-700 py-1 px-2 pr-14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="mt-8 rounded bg-indigo-600 py-2 duration-500 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>

          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="rounded text-indigo-400 hover:text-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </Link>
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="h-[1px] w-full bg-white"></div>
            <span className="mx-6 text-sm uppercase text-white">Or</span>
            <div className="h-[1px] w-full bg-white"></div>
          </div>

          <GoogleSignup />
          <Guest />
        </form>
      </div>
    </div>
  );
};

export default Register;
