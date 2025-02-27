
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBEDNojwx-RcdMDdqgEMEI8iVoVGDzJeaU",
    authDomain: "cryptohunter-95375.firebaseapp.com",
    projectId: "cryptohunter-95375",
    storageBucket: "cryptohunter-95375.firebasestorage.app",
    messagingSenderId: "949833742141",
    appId: "1:949833742141:web:c3761534041d2c0b2b7754",
    measurementId: "G-0V3JTDSSWW"
  };
  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
  
export const auth = getAuth(app);
  export default firebaseConfig;