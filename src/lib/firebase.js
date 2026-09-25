import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDRkpvQhv-9jRO1fO3KbOszPykF1zCs_Fw",
  authDomain: "busmate-lanka.firebaseapp.com",
  projectId: "busmate-lanka",
  storageBucket: "busmate-lanka.firebasestorage.app",
  messagingSenderId: "79150452423",
  appId: "1:79150452423:web:89c18d28de9cc76d20b8e2",
  measurementId: "G-10GQSMT02J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
