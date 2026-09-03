const { db } = require('./firebase');

const detailsData = {
  titleEn: "Farmer Details & Company Facilities",
  titleMr: "शेतकरी माहिती आणि कंपनीची सुविधा",
  facilities: [
    {
      id: 1,
      nameEn: "Transportation & Packing from Farm to Dubai",
      nameMr: "जाग्यावरून दुबई (Dubai) पर्यंतचे ट्रान्सपोर्ट आणि पॅकिंग",
      icon: "🚛"
    },
    {
      id: 2,
      nameEn: "3 Tonic Sprays Free",
      nameMr: "३ टॉनिक स्प्रे (Tonic Spray) एकदम फ्री",
      icon: "🧪"
    },
    {
      id: 3,
      nameEn: "Proper Consulting Visits",
      nameMr: "प्रॉपर कन्सल्टींग व्हिजिट (Consulting Visit)",
      icon: "👨‍🌾"
    },
    {
      id: 4,
      nameEn: "Free Seeds for Gap Filling (Tut-Aal)",
      nameMr: "तुट-आळ ला लागणारे बियाणे (Seed) फ्री",
      icon: "🌱"
    },
    {
      id: 5,
      nameEn: "7 Years Produce Buying Bond",
      nameMr: "७ वर्षांचा बॉन्ड (Bond) - हमखास माल घेण्याची हमी",
      icon: "🤝"
    }
  ]
};

async function seedDetails() {
  try {
    await db.collection('details').doc('company_facilities').set(detailsData);
    console.log("Details data added to Firestore successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding details data to Firestore: ", error);
    process.exit(1);
  }
}

seedDetails();
