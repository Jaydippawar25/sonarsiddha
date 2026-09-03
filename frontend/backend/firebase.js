const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const serviceAccount = require("./serviceAccountKey.json");

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "sonarsiddha-bb867.firebasestorage.app",
  });
}

const db = getFirestore();
const bucket = getStorage().bucket();

module.exports = { db, bucket };
