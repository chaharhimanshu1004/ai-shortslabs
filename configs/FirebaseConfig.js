// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-shortslab.firebaseapp.com",
    projectId: "ai-shortslab",
    storageBucket: "ai-shortslab.firebasestorage.app",
    messagingSenderId: "567724771354",
    appId: "1:567724771354:web:7371c86cc34fffd5aaa9a3",
    measurementId: "G-L7091GMN2S"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)