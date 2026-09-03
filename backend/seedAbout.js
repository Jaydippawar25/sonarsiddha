const { db } = require('./firebase');

const aboutData = {
  features: [
    {
      icon: "🌱",
      titleEn: "We Provide Seeds",
      titleMr: "आम्ही बियाणे पुरवतो",
      descEn: "High quality farming seeds available.",
      descMr: "उच्च दर्जाचे शेतीचे बियाणे उपलब्ध."
    },
    {
      icon: "⭐",
      titleEn: "High Quality Seed",
      titleMr: "उत्कृष्ट प्रतीचे बियाणे",
      descEn: "Guaranteed high germination and yield.",
      descMr: "खात्रीशीर उगवण आणि भरपूर उत्पन्न."
    },
    {
      icon: "🌿",
      titleEn: "Ocomotapora (Pharma Variety)",
      titleMr: "ओकोमोटापोरा (औषधी वाण)",
      descEn: "Special pharma variety for medicinal use.",
      descMr: "औषधी वापरासाठी खास फार्मा व्हरायटी."
    },
    {
      icon: "⚖️",
      titleEn: "Yearly Minimum 50 kg Production",
      titleMr: "वार्षिक किमान ५० किलो उत्पादन",
      descEn: "High yielding crop guaranteed.",
      descMr: "प्रत्येक झाडापासून भरपूर उत्पादनाची हमी."
    },
    {
      icon: "📏",
      titleEn: "Drumstick Length 2 Feet",
      titleMr: "शेवग्याच्या शेंगांची लांबी २ फूट",
      descEn: "Long, healthy and green drumsticks.",
      descMr: "लांब, निरोगी आणि हिरव्यागार शेंगा."
    }
  ],
  officeAddress: {
    titleEn: "Main Office",
    titleMr: "मुख्य कार्यालय",
    nameMr: "सचिन हिंदुराव मोरे",
    nameEn: "Sachin Hindurao More",
    linesMr: [
      "सांगोले, ता - खानापूर, जि - सांगली",
      "'माऊली' बंगलो",
      "पिन - ४१५३०९"
    ],
    linesEn: [
      "Sangola, Tal - Khanapur, Dist - Sangli",
      "'Mauli' Bangalo",
      "Pin - 415309"
    ],
    phones: ["8007362174"]
  },
  sangliAddress: {
    titleEn: "Sangli Branch",
    titleMr: "सांगली शाखा",
    linesMr: [
      "वखारभाग, हळदीभवन",
      "चेंबर ऑफ कॉमर्सच्या मागे",
      "सांगली, पिन - ४१६४१६"
    ],
    linesEn: [
      "Vakharbhag, Haladibhavan",
      "Behind Chamber of Commerce",
      "Sangli, Pin - 416416"
    ],
    phones: ["7620093535", "8999284256"]
  }
};

async function seedAbout() {
  try {
    await db.collection('about').doc('details').set(aboutData);
    console.log("About data added to Firestore successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding about data to Firestore: ", error);
    process.exit(1);
  }
}

seedAbout();
