

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

export const CryptoState = () => {
  return useContext(Crypto);
};

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [coins, setCoins] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });

  // Change currency symbol when user selects INR/USD
  useEffect(() => {
    setSymbol(currency === "INR" ? "₹" : "$");
  }, [currency]);

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's watchlist from Firestore
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      const unsubscribe = onSnapshot(coinRef, (doc) => {
        if (doc.exists()) {
          setWatchlist(doc.data().coins || []);
        }
      });
      return () => unsubscribe();
    } else {
      setWatchlist([]);
    }
  }, [user]);

  // ✅ Fetch cryptocurrency data from CoinGecko API
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        const data = await response.json();
        console.log("Fetched Coins:", data); // ✅ Debugging
        setCoins(data); // ✅ Save the fetched coin data
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, [currency]); // Re-fetch data when currency changes

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,setUser,
        user,
        watchlist,
        setWatchlist,
        coins,
        setCoins,
        alert,
        setAlert,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

