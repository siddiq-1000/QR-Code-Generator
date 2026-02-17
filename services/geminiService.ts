
import { GoogleGenAI, Type } from "@google/genai";
import { AISuggestion } from "../types";

// Helper function removed to ensure direct initialization with process.env.API_KEY right before calls.
export const getQRStyleSuggestions = async (url: string): Promise<AISuggestion | null> => {
  try {
    // Initializing directly with process.env.API_KEY per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this URL/Text: "${url}". Suggest a professional color theme and error correction level for a QR code based on the brand or content type.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryColor: { type: Type.STRING, description: "Hex code for foreground" },
            secondaryColor: { type: Type.STRING, description: "Hex code for background" },
            description: { type: Type.STRING, description: "Brief explanation of the style" },
            suggestedLevel: { type: Type.STRING, enum: ["L", "M", "Q", "H"], description: "Error correction level" },
          },
          required: ["primaryColor", "secondaryColor", "description", "suggestedLevel"]
        }
      }
    });

    // Accessing .text property directly as it is a getter, not a method.
    const jsonStr = response.text?.trim();
    if (!jsonStr) return null;
    
    const result = JSON.parse(jsonStr);
    return result as AISuggestion;
  } catch (error) {
    console.error("AI suggestion failed:", error);
    return null;
  }
};
