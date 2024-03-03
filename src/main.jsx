import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Firebase configuration
import firebase from "firebase/compat/app";
const config = {
  apiKey: "AIzaSyCx4P-M8e6M-njQQ8x5_HlHIZN2VNZtfNk",
  authDomain: "aves-a1081.firebaseapp.com",
  databaseURL: "https://aves-a1081-default-rtdb.firebaseio.com",
  projectId: "aves-a1081",
  storageBucket: "aves-a1081.appspot.com",
  messagingSenderId: "176518929787",
  appId: "1:176518929787:web:7b9a24b4bdd38f5f78b1de",
  measurementId: "G-PB7JDN6Z7S",
};
firebase.initializeApp(config);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
