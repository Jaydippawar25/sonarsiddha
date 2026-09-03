const { db, bucket } = require('./firebase.js');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

async function uploadVideos() {
  const videoDir = path.join(__dirname, '../frontend/src/video');
  const files = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4'];

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const filePath = path.join(videoDir, fileName);
    
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${fileName}, file not found.`);
      continue;
    }

    console.log(`Uploading ${fileName}...`);
    const destination = `videos/${Date.now()}_${fileName}`;
    const token = uuidv4();

    try {
      await bucket.upload(filePath, {
        destination: destination,
        metadata: {
          contentType: 'video/mp4',
          metadata: {
            firebaseStorageDownloadTokens: token
          }
        }
      });

      // Construct public URL
      const fileRef = bucket.file(destination);
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destination)}?alt=media&token=${token}`;

      console.log(`Uploaded! URL: ${publicUrl}`);

      console.log(`Saving to Firestore 'youtube' collection...`);
      await db.collection('youtube').add({
        title: `Video ${i + 1}`,
        videoUrl: publicUrl,
        createdAt: new Date(),
        isLocal: true // flag to distinguish from youtube iframe if needed
      });
      console.log(`Saved ${fileName} to Firestore.`);

    } catch (err) {
      console.error(`Failed to upload ${fileName}:`, err);
    }
  }

  console.log("Done uploading videos.");
}

uploadVideos().then(() => process.exit(0)).catch(console.error);
