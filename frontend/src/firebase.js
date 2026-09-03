import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDrlzO3b0Q5QT3OCS-C5sAxq5AhoeNrfm0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sonarsiddha-bb867.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sonarsiddha-bb867",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sonarsiddha-bb867.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "265034823997",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:265034823997:web:52b8fd4b0a291f79eced54",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DMFRLLL7WH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
