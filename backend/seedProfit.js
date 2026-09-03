const { db } = require('./firebase');

const profitData = {
  titleEn: "1 Acre Drumstick Planting Cost",
  titleMr: "१ एकर शेवगा लागण खर्च",
  expenses: [
    {
      id: 1,
      nameEn: "Mulching Paper",
      nameMr: "मल्चींग पेपर",
      amount: 25000,
      icon: "📜"
    },
    {
      id: 2,
      nameEn: "Drip Irrigation",
      nameMr: "ठिबक",
      amount: 25000,
      icon: "💧"
    },
    {
      id: 3,
      nameEn: "Seeds",
      nameMr: "बी",
      amount: 35000,
      icon: "🌱"
    },
    {
      id: 4,
      nameEn: "Fertilizers",
      nameMr: "खते",
      amount: 25000,
      icon: "🧪"
    }
  ],
  totalAmount: 110000,
  totalLabelEn: "Total Yearly Cost",
  totalLabelMr: "१ लाख १०,००० खर्च वार्षिकी"
};

async function seedProfit() {
  try {
    await db.collection('profit').doc('drumstick_1_acre').set(profitData);
    console.log("Profit data added to Firestore successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding profit data to Firestore: ", error);
    process.exit(1);
  }
}

seedProfit();
