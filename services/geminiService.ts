import { GoogleGenAI, Type } from "@google/genai";
import { AuditParagraphRequest, AuditParagraphResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    heading: { type: Type.STRING, description: "தக்க தலைப்பு (Suitable Heading)" },
    reference: { type: Type.STRING, description: "தணிக்கை குறிப்பு/அடிப்படை (Audit Reference)" },
    procedure: { type: Type.STRING, description: "செய்யப்பட்ட நடவடிக்கை (What is Done / Audit Procedure)" },
    findings: { type: Type.STRING, description: "தணிக்கை கண்டறிதல்கள் (Audit Findings)" },
    recommendations: { type: Type.STRING, description: "பரிந்துரைகள் (Audit Recommendations)" },
  },
  required: ['heading', 'reference', 'procedure', 'findings', 'recommendations'],
};

export const generateAuditParagraph = async (
  request: AuditParagraphRequest
): Promise<AuditParagraphResponse> => {
  const { auditNotes } = request;

  const systemInstruction = `
    You are an AI Audit Paragraph Generator for the Office of the Official Assignee/Official Receiver (Tamil Nadu Government).

    The user will provide English audit notes or observations.
    Your task is to convert the input into a **fully structured Tamil Audit Paragraph** with EXACTLY the following FIVE sections:

    1. **தக்க தலைப்பு (Suitable Heading)**
    2. **தணிக்கை குறிப்பு/அடிப்படை (Audit Reference)**
    3. **செய்யப்பட்ட நடவடிக்கை (What is Done / Audit Procedure)**
    4. **தணிக்கை கண்டறிதல்கள் (Audit Findings)**
    5. **பரிந்துரைகள் (Audit Recommendations)**

    Rules you must follow:
    - The entire text content of your response must be ONLY in Tamil.
    - Do NOT repeat the user’s input verbatim; rewrite it as a polished audit paragraph.
    - Maintain Government audit style, suitable for LFAO / AG / Departmental audit.
    - The “Audit Reference” must generically refer to relevant records (e.g., விற்பனைப் பதிவேடு, பேரேடு, நீதிமன்ற ஆணைகள்).
    - The “What is Done” section must clearly describe the audit verification steps.
    - The “Findings” must convert user’s observations into a clear, concise Tamil conclusion.
    - If the input indicates no irregularity, produce a “positive” audit paragraph confirming compliance.
    - Keep language formal, precise, and audit-compliant.
    - ALWAYS return your response in the specified JSON format, adhering to the provided schema. Do not include any other text outside the JSON structure.
  `;

  const userPrompt = `
    Now generate the Tamil Audit Paragraph in the five prescribed sections.
    Input: ${auditNotes}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText) as AuditParagraphResponse;
    
    return parsedResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
