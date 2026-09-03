const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const serviceAccount = require('./serviceAccountKey.json');

if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

async function createAdmin() {
  const email = 'admin@sonarsiddha.com';
  const password = 'Admin@1234';

  try {
    try {
      const existingUser = await getAuth().getUserByEmail(email);
      console.log('Admin user already exists!');
      process.exit(0);
    } catch (e) {
      // Create user
    }

    const userRecord = await getAuth().createUser({
      email: email,
      password: password,
      displayName: 'Sonarsiddha Admin',
    });

    console.log('Successfully created new Admin user!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();
