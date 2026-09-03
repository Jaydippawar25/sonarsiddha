const { db } = require("./firebase.js");

async function seedFirestore() {
  const videos = [
    { title: "Video 1", videoUrl: "/video/video1.mp4", isLocal: true },
    { title: "Video 2", videoUrl: "/video/video2.mp4", isLocal: true },
    { title: "Video 3", videoUrl: "/video/video3.mp4", isLocal: true },
    { title: "Video 4", videoUrl: "/video/video4.mp4", isLocal: true },
  ];

  console.log("Adding videos to 'youtube' collection...");

  for (let vid of videos) {
    vid.createdAt = new Date();
    await db.collection("youtube").add(vid);
    console.log(`Added ${vid.title}`);
  }

  console.log("Done seeding Firestore.");
}

seedFirestore()
  .then(() => process.exit(0))
  .catch(console.error);
