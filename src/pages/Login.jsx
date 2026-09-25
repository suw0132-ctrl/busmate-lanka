import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Bus, LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await signInWithPopup(auth, googleProvider);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-api-key") {
         setError("Firebase is not configured. Please add your config in src/lib/firebase.js");
      } else {
         setError(err.message || "Failed to sign in with Google.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,.15),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,.10),transparent_28%)]" />
      
      <div className="relative w-full max-w-md rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-3 mb-6">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400 text-slate-950">
              <Bus size={28} />
            </span>
          </Link>
          <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to manage the BusMate network</p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-bold text-slate-950 transition-transform hover:scale-[1.02] active:scale-95"
        >
          <LogIn size={20} />
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-xs text-slate-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
