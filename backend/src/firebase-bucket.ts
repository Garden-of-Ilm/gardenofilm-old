import multer from "multer";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPQsDJ6tV0VkaBCvc9MrogpdczEv7B1_Q",
  authDomain: "gardenofilm-10d7b.firebaseapp.com",
  projectId: "gardenofilm-10d7b",
  storageBucket: "gardenofilm-10d7b.appspot.com",
  messagingSenderId: "254826058501",
  appId: "1:254826058501:web:ed70733e3f8c156d649d6c",
  measurementId: "G-VRGDJSG7FE",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();

export const upload = multer({ storage: multer.memoryStorage() });
