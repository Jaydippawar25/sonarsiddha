const { db } = require('./firebase');

async function migrateBranches() {
  const aboutDoc = await db.collection('about').doc('details').get();
  const data = aboutDoc.data();

  if (data.officeAddress) {
    await db.collection('branches').add({
      ...data.officeAddress,
      createdAt: new Date().toISOString()
    });
    console.log("Migrated Main Office");
  }

  if (data.sangliAddress) {
    await db.collection('branches').add({
      ...data.sangliAddress,
      createdAt: new Date().toISOString()
    });
    console.log("Migrated Sangli Branch");
  }

  process.exit(0);
}

migrateBranches().catch(console.error);
