
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBMfHUVXe4GDHryY7sJMPmnElS5kLDZZo4",
    authDomain: "crypto-hunter-50991.firebaseapp.com",
    projectId: "crypto-hunter-50991",
    storageBucket: "crypto-hunter-50991.appspot.com",
    messagingSenderId: "141181984273",
    appId: "1:141181984273:web:ba51a25e27ce6a2b1d9bb0",
  };
  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
  
export const auth = getAuth(app);
  export default firebaseConfig;