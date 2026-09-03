const { db } = require('./firebase');

async function updateTitle() {
  try {
    await db.collection('details').doc('company_facilities').update({
      titleMr: "शेतकरी माहिती",
      titleEn: "Farmer Details"
    });
    console.log("Title updated successfully in Firestore!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating title in Firestore: ", error);
    process.exit(1);
  }
}

updateTitle();
