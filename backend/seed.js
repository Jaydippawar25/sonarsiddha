const { db } = require('./firebase');

const navbarItems = [
  { id: 1, nameEn: "Home", nameMr: "मुखपृष्ठ", path: "/" },
  { id: 2, nameEn: "About", nameMr: "आमच्याबद्दल", path: "/about" },
  { id: 3, nameEn: "Gallery", nameMr: "गॅलरी", path: "/gallery" },
  { id: 4, nameEn: "Farmer", nameMr: "शेतकरी", path: "/farmer" }
];

async function seed() {
  try {
    const batch = db.batch();
    for (const item of navbarItems) {
      const docRef = db.collection('navbar').doc(item.id.toString());
      batch.set(docRef, item);
    }
    await batch.commit();
    console.log("Navbar items added to Firestore collection successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding items to Firestore: ", error);
    process.exit(1);
  }
}

seed();
