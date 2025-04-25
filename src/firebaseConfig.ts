// Firebase config for FELPONIC
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDPA23jRBVhKjWqBT4yXDOoP4zNYi471vc",
  authDomain: "felponic-web.firebaseapp.com",
  projectId: "felponic-web",
  storageBucket: "felponic-web.appspot.com",
  messagingSenderId: "83446391492",
  appId: "1:83446391492:web:364e69ea7ce4b56ce71f91",
  measurementId: "G-QN9Z7NTJ99"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics, firebaseConfig };
