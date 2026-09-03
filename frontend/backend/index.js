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

  router.get('/', async (req, res) => {
    try {
      if (!db) return res.status(200).json([]);
      const snapshot = await db.collection(collectionName).orderBy('createdAt', 'desc').get();
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(items);
    } catch (error) {
      try {
        if (!db) return res.status(200).json([]);
        const snapshot = await db.collection(collectionName).get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(items);
      } catch (err) {
        res.status(200).json([]);
      }
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      if (!db) return res.status(404).json({ error: "Database offline" });
      const doc = await db.collection(collectionName).doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: "Not found" });
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      if (!db) return res.status(503).json({ error: "Database offline" });
      const data = { ...req.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      const docRef = await db.collection(collectionName).add(data);
      res.status(201).json({ id: docRef.id, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      if (!db) return res.status(503).json({ error: "Database offline" });
      const data = { ...req.body, updatedAt: new Date().toISOString() };
      delete data.id;
      await db.collection(collectionName).doc(req.params.id).update(data);
      res.status(200).json({ id: req.params.id, ...data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      if (!db) return res.status(503).json({ error: "Database offline" });
      await db.collection(collectionName).doc(req.params.id).delete();
      res.status(200).json({ success: true, id: req.params.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

// Mount CRUD Routers
app.use('/api/branches', createCrudRouter('branches'));
app.use('/api/members', createCrudRouter('members'));
app.use('/api/products', createCrudRouter('products'));
app.use('/api/daily-rates', createCrudRouter('daily-rates'));
app.use('/api/certifications', createCrudRouter('certifications'));
app.use('/api/videos', createCrudRouter('videos'));
app.use('/api/profit-ledger', createCrudRouter('profit-ledger'));

// Specialized endpoints for public views
app.get('/api/navbar', async (req, res) => {
  try {
    if (!db) return res.json([]);
    const snapshot = await db.collection('navbar').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error("Navbar API error:", error.message);
    res.json([]);
  }
});

app.get('/api/dailyRates', async (req, res) => {
  try {
    if (!db) return res.json([]);
    const snapshot = await db.collection('dailyRates').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error("DailyRates API error:", error.message);
    res.json([]);
  }
});

app.get('/api/about', async (req, res) => {
  try {
    if (!db) return res.json({});
    const doc = await db.collection('about').doc('details').get();
    res.json(doc.exists ? doc.data() : {});
  } catch (error) {
    console.error("About API error:", error.message);
    res.json({});
  }
});

app.get('/api/team', async (req, res) => {
  try {
    if (!db) return res.json([]);
    const snapshot = await db.collection('team').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error("Team API error:", error.message);
    res.json([]);
  }
});

app.get('/api/youtube', async (req, res) => {
  try {
    if (!db) return res.json([]);
    const snapshot = await db.collection('youtube').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error("Youtube API error:", error.message);
    res.json([]);
  }
});

app.get('/api/details', async (req, res) => {
  try {
    if (!db) return res.json({});
    const doc = await db.collection('farmer').doc('details').get();
    res.json(doc.exists ? doc.data() : {});
  } catch (error) {
    console.error("Details API error:", error.message);
    res.json({});
  }
});

app.get('/api/requirements', async (req, res) => {
  try {
    if (!db) return res.json({});
    const doc = await db.collection('farmer').doc('requirements').get();
    res.json(doc.exists ? doc.data() : {});
  } catch (error) {
    console.error("Requirements API error:", error.message);
    res.json({});
  }
});

app.get('/api/profit', async (req, res) => {
  try {
    if (!db) return res.json({});
    const doc = await db.collection('farmer').doc('profit').get();
    res.json(doc.exists ? doc.data() : {});
  } catch (error) {
    console.error("Profit API error:", error.message);
    res.json({});
  }
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Sonarsiddha Backend Server running on port ${PORT}`);
  });
}

module.exports = app;
