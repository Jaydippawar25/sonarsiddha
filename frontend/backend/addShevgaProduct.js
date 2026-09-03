const { db } = require('./firebase');

async function addShevgaProduct() {
  try {
    const newProduct = {
      nameEn: "Shevga (Drumstick)",
      nameMr: "शेवगा",
      descriptionEn: "High quality drumstick seeds and material for excellent agricultural yield. Pharma variety with great export potential.",
      descriptionMr: "उत्कृष्ट कृषी उत्पन्नासाठी उच्च दर्जाचे शेवगा बियाणे. औषधी गुणधर्म आणि निर्यातीसाठी उत्तम.",
      mainImageUrl: "",
      strongPointsEn: [
        "We Provide Seeds",
        "High Quality seed",
        "Ocomotapora (Pharma variety)",
        "Yearly minimum 50 kg production",
        "Drumstick length 2 feet",
        "High export quality material"
      ],
      strongPointsMr: [
        "आम्ही बियाणे पुरवतो",
        "उच्च दर्जाचे बियाणे",
        "ओकोमोटापोरा (फार्मा व्हरायटी)",
        "वार्षिक किमान ५० किलो उत्पादन",
        "शेवग्याची लांबी २ फूट",
        "उच्च निर्यात दर्जाचा माल"
      ],
      videoUrl: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('products').add(newProduct);
    console.log("Shevga product added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

addShevgaProduct();
