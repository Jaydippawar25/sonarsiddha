const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const fs = require("fs");
const path = require("path");

let serviceAccount;

// 1. Check for Environment Variable (Production Deployment)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const rawAccount = process.env.FIREBASE_SERVICE_ACCOUNT.startsWith('{')
      ? process.env.FIREBASE_SERVICE_ACCOUNT
      : Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8');
    serviceAccount = JSON.parse(rawAccount);
  } catch (err) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT env var:", err);
  }
}

// 2. Fallback to local serviceAccountKey.json if present
if (!serviceAccount) {
  const localKeyPath = path.join(__dirname, "serviceAccountKey.json");
  if (fs.existsSync(localKeyPath)) {
    serviceAccount = require(localKeyPath);
  }
}

if (getApps().length === 0) {
  if (serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "sonarsiddha-bb867.firebasestorage.app",
    });
  } else {
    initializeApp({
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "sonarsiddha-bb867.firebasestorage.app",
    });
  }
}

const db = getFirestore();
const bucket = getStorage().bucket();

module.exports = { db, bucket };
