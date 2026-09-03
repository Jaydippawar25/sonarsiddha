const { db } = require('./firebase');

const teamMembers = [
  {
    nameEn: "Member 1",
    nameMr: "सदस्य १",
    roleEn: "",
    roleMr: "",
    image: "/image6_ai.jpg",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    nameEn: "Member 2",
    nameMr: "सदस्य २",
    roleEn: "",
    roleMr: "",
    image: "/image7_ai.jpg",
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    nameEn: "Member 3",
    nameMr: "सदस्य ३",
    roleEn: "",
    roleMr: "",
    image: "/image8_ai.jpg",
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    nameEn: "Member 4",
    nameMr: "सदस्य ४",
    roleEn: "",
    roleMr: "",
    image: "/image9_ai.jpg",
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function seed() {
  try {
    const snapshot = await db.collection('team').get();
    const deleteBatch = db.batch();
    snapshot.docs.forEach((doc) => {
      deleteBatch.delete(doc.ref);
    });
    await deleteBatch.commit();
    console.log("Existing team members deleted.");

    const batch = db.batch();
    for (const item of teamMembers) {
      const docRef = db.collection('team').doc();
      batch.set(docRef, item);
    }
    await batch.commit();
    console.log("Team members seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding team: ", error);
    process.exit(1);
  }
}

seed();
