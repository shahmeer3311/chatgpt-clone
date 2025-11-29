import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

console.log("API KEY = ", import.meta.env.VITE_GEMINI_API_KEY);

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1]; 
      resolve(base64);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export const sendToGemini = async (text, imageFile) => {
  try {
    const parts = [];

    if (text) {
      parts.push({ text });
    }

    if (imageFile) {
      const base64 = await fileToBase64(imageFile);
      parts.push({
        inlineData: {
          mimeType: imageFile.type,
          data: base64,
        },
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts,
        },
      ],
    });

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to process your request.";
  }
};

export const generateImageFromGemini=async(prompt)=>{
    try {
          const model = genAI.getGenerativeModel({
      model: "imagen-3.0" 
    });
    const result=await model.generateImage({
        prompt,
        size: "1024x1024"
    });
    const imageBase64=result.response.candidates[0].image.base64;
    return `data:image/png;base64,${imageBase64}`;
    } catch (error) {
        console.log(error);
    }
}