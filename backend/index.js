const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { db, bucket } = require('./firebase');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ==========================================
// IMAGE UPLOAD API (Upload to Firebase Storage)
// ==========================================
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const folder = req.body.folder || 'general';
    const fileName = `${folder}/${uuidv4()}_${req.file.originalname.replace(/\s+/g, '_')}`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: { contentType: req.file.mimetype }
    });

    stream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Error uploading to Firebase Storage' });
    });

    stream.on('finish', async () => {
      await file.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      res.status(200).json({ url: publicUrl });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// GENERIC CRUD API FOR ADMIN PANEL
// ==========================================

// Helper function to create a router for a specific collection
function createCrudRouter(collectionName) {
  const router = express.Router();

  // GET all (Active only for public, but Admin needs all. We'll return all and filter on frontend)
  router.get('/', async (req, res) => {
    try {
      const snapshot = await db.collection(collectionName).orderBy('createdAt', 'desc').get();
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(items);
    } catch (error) {
      // Fallback if index is missing for orderBy
      try {
        const snapshot = await db.collection(collectionName).get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(items);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  });

  // GET single
  router.get('/:id', async (req, res) => {
    try {
      const doc = await db.collection(collectionName).doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST (Create)
  router.post('/', async (req, res) => {
    try {
      const data = { ...req.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      const docRef = await db.collection(collectionName).add(data);
      res.status(201).json({ id: docRef.id, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT (Update)
  router.put('/:id', async (req, res) => {
    try {
      const data = { ...req.body, updatedAt: new Date().toISOString() };
      await db.collection(collectionName).doc(req.params.id).update(data);
      res.status(200).json({ id: req.params.id, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      await db.collection(collectionName).doc(req.params.id).delete();
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

// Attach CRUD routers for dynamic collections
app.use('/api/branches', createCrudRouter('branches'));
app.use('/api/members', createCrudRouter('members'));
app.use('/api/products', createCrudRouter('products'));
app.use('/api/dailyRates', createCrudRouter('dailyRates'));
app.use('/api/certifications', createCrudRouter('certifications'));
app.use('/api/videos', createCrudRouter('videos'));
app.use('/api/nationalLocations', createCrudRouter('nationalLocations'));
app.use('/api/internationalLocations', createCrudRouter('internationalLocations'));
app.use('/api/team', createCrudRouter('team'));
app.use('/api/youtube', createCrudRouter('youtube'));

// Settings are usually a single document
app.post('/api/settings/:docId', async (req, res) => {
  try {
    await db.collection('settings').doc(req.params.docId).set({ ...req.body, updatedAt: new Date().toISOString() }, { merge: true });
    res.status(200).json({ message: "Settings updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/settings/:docId', async (req, res) => {
  try {
    const doc = await db.collection('settings').doc(req.params.docId).get();
    res.status(200).json(doc.exists ? doc.data() : {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Existing endpoints
app.get('/api/navbar', async (req, res) => {
    try {
        const snapshot = await db.collection('navbar').get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Error getting navbar items", details: error.message });
    }
});

app.get('/api/about', async (req, res) => {
    try {
        const doc = await db.collection('about').doc('details').get();
        res.status(200).json(doc.exists ? doc.data() : {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/profit', async (req, res) => {
    try {
        const doc = await db.collection('profit').doc('drumstick_1_acre').get();
        res.status(200).json(doc.exists ? doc.data() : {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/profit', async (req, res) => {
    try {
        await db.collection('profit').doc('drumstick_1_acre').set(req.body);
        res.status(200).json({ message: "Profit updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/requirements', async (req, res) => {
    try {
        const doc = await db.collection('requirements').doc('farmer_docs').get();
        res.status(200).json(doc.exists ? doc.data() : {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/details', async (req, res) => {
    try {
        const doc = await db.collection('details').doc('company_facilities').get();
        res.status(200).json(doc.exists ? doc.data() : {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
