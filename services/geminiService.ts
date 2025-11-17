import { GoogleGenAI, Type } from "@google/genai";
import { AuditParagraphRequest, AuditParagraphResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    heading: { type: Type.STRING, description: "Suitable Heading in the chosen output language." },
    reference: { type: Type.STRING, description: "Audit Reference in the chosen output language." },
    procedure: { type: Type.STRING, description: "What is Done (Audit Procedure) in the chosen output language." },
    findings: { type: Type.STRING, description: "Audit Findings in the chosen output language." },
    recommendations: { type: Type.STRING, description: "Audit Recommendations in the chosen output language." },
  },
  required: ['heading', 'reference', 'procedure', 'findings', 'recommendations'],
};

export const generateAuditParagraph = async (
  request: AuditParagraphRequest
): Promise<AuditParagraphResponse> => {
  const { auditNotes, outputLanguage } = request;

  const systemInstruction = `You are an AI Audit Paragraph Generator for Government audit, specifically for the Office of the Official Assignee / Official Receiver (Tamil Nadu Government).

RULES:
- User may give input in English, Tamil, or Hindi.
- User will choose the OUTPUT LANGUAGE (English, Tamil, or Hindi).
- Detect input language automatically.
- Rewrite the meaning in the selected output language.
- Output must ALWAYS follow EXACTLY 5 SECTIONS:

1. Suitable Heading
2. Audit Reference
3. What is Done (Audit Procedure)
4. Audit Findings
5. Audit Recommendations

GUIDELINES:
- Use professional Government audit drafting style.
- Be concise, clear, and legally correct.
- If no irregularity is mentioned, generate a positive audit paragraph.
- If issues exist, describe the finding, cause, effect, and recommendation.
- Do NOT copy input verbatim—convert it into an audit-standard paragraph.
- Output ONLY in the language requested by the user.
- ALWAYS return your response in the specified JSON format, adhering to the provided schema. Do not include any other text outside the JSON structure.
  `;

  const userPrompt = `
REQUIRED OUTPUT STRUCTURE (translate based on user’s chosen language):

1. **Suitable Heading**
2. **Audit Reference**
3. **What is Done**
4. **Audit Findings**
5. **Audit Recommendations**

Now generate the structured Audit Paragraph.

User Input: ${auditNotes}
Output Language: ${outputLanguage}
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