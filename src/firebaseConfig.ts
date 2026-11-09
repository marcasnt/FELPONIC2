// Firebase config for FELPONIC
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDPA23jRBVhKjWqBT4yXDOoP4zNYi471vc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "felponic-web.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "felponic-web",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "felponic-web.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "83446391492",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:83446391492:web:364e69ea7ce4b56ce71f91",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || (import.meta.env.VITE_FIREBASE_PROJECT_ID ? undefined : "G-QN9Z7NTJ99")
};

const app = initializeApp(firebaseConfig);
if (firebaseConfig.measurementId) getAnalytics(app);

export { app };
