const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const fs = require("fs");
const path = require("path");

let db = null;
let bucket = null;

try {
  let serviceAccount = null;
  const keyPath = path.join(__dirname, "serviceAccountKey.json");
  
  if (fs.existsSync(keyPath)) {
    serviceAccount = require(keyPath);
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", e.message);
    }
  }

  if (serviceAccount && getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: "sonarsiddha-bb867.firebasestorage.app",
    });
  }

  if (getApps().length > 0) {
    db = getFirestore();
    bucket = getStorage().bucket();
  }
} catch (err) {
  console.warn("Firebase Admin SDK init notice:", err.message);
}

module.exports = { db, bucket };
