const { db } = require('./firebase.js');

async function addVideo5() {
  const vid = { title: 'Video 5', videoUrl: '/video/video5.mp4', isLocal: true, createdAt: new Date() };
  console.log("Adding Video 5 to 'youtube' collection...");
  await db.collection('youtube').add(vid);
  console.log("Added Video 5.");
}

addVideo5().then(() => process.exit(0)).catch(console.error);
