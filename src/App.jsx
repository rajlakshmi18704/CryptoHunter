


import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import Homepage from "./Pages/HomePage";
import CoinPage from "./Pages/Coinpage";
import Header from "./components/Header";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ color: "white", textAlign: "center", marginTop: "20vh" }}>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={user ? <Homepage /> : <Navigate to="/login" />} />
          <Route path="/coins/:id" element={user ? <CoinPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

