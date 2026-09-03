import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDrlzO3b0Q5QT3OCS-C5sAxq5AhoeNrfm0",
  authDomain: "sonarsiddha-bb867.firebaseapp.com",
  projectId: "sonarsiddha-bb867",
  storageBucket: "sonarsiddha-bb867.firebasestorage.app",
  messagingSenderId: "265034823997",
  appId: "1:265034823997:web:52b8fd4b0a291f79eced54",
  measurementId: "G-DMFRLLL7WH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
