import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, TrustType, TrustWizardData, GeneratedDocument, IronChainData, Testimonial } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeTrustContext(
  trustType: TrustType | null,
  assets: string
): Promise<AnalysisResult> {
  try {
    const typeContext = trustType === TrustType.UNSURE 
      ? "The user is unsure which trust structure is best." 
      : `The user is specifically interested in a ${trustType}.`;

    const prompt = `
      You are an Elite Trust Attorney and Corporate Credit Strategist acting as the engine for the "Sovereign Wealth Architecture" software.
      
      User Context:
      - Interest: ${typeContext}
      - Assets/Situation: ${assets}
      
      **AVAILABLE PLATFORM SOLUTIONS:**
      1. **Foundation Tier ($249):** Includes Revocable Living Trust, Business Trust, and Irrevocable Trust. (Best for essential structuring and probate avoidance).
      2. **Strategic Tier ($997):** Adds Privacy Land Trusts & Anonymous Banking Guides (Best for Real Estate Anonymity).
      3. **Sovereign Tier ($1,997):** Adds Iron Chain™ System (Holding/Op Co), Bulletproof Trust (508c1a), and Corporate Credit Builder (Best for Business Owners).
      4. **Partner:** Recommend "Wyoming Agents" (wyomingagents.com) for Registered Agent services and LLC formation in Wyoming.

      Task:
      1. Analyze the legal structure required to protect these assets (${assets}).
      2. Specifically analyze the potential for "Separating Liability" and "Building Corporate Credit" (Paydex Score) using a dedicated EIN.
      3. Recommend one of the specific tiers above based on their risk profile.
      4. Explain the trade-off between the "Sovereign Path" (No Personal Guarantee, slower build) and the "Accelerated Path" (Personal Guarantee, instant funding but linked liability).
      
      Format the output as clear plain text paragraphs. 
      CRITICAL: Do not use Markdown stars, hashtags, or bold formatting. Use UPPERCASE for section headers.
      Be professional, authoritative, and sophisticated.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are a senior legal strategist specializing in asset protection and estate planning. Output plain text only.",
      },
    });

    const markdown = response.text || "No analysis generated.";
    
    // Extract grounding chunks if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      markdown,
      sources: groundingChunks,
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      markdown: "An error occurred while analyzing the trust structure. Please try again.",
      sources: []
    };
  }
}

export async function generateFinalBrief(
  trustType: TrustType | null,
  assets: string,
  objectives: string
): Promise<string> {
   try {
    const prompt = `
      You are a World-Class Trust Attorney. Create a "Trust Structure Blueprint" for this client.
      
      Selected Path: ${trustType || "Undecided"}
      Assets Involved: ${assets}
      Specific Objectives: ${objectives}
      
      Structure the output as:
      RECOMMENDED TRUST STRUCTURE
      
      1. THE VEHICLE
      [Define the specific legal entity recommended]

      2. MECHANICS
      - Grantor: [Who gives the assets]
      - Trustee Strategy: [Who should manage it - Professional vs Family]
      - Beneficiary Structure: [How distributions should be handled]

      3. KEY BENEFITS ALIGNMENT
      [How this specifically meets their goals: ${objectives}]
      
      4. RISK FACTORS & COMPLIANCE
      [What to watch out for]

      5. FUNDING INSTRUCTIONS (CONCEPTION TO EXECUTION)
      - Real Estate: [Mention Deeds]
      - Cash/Stocks: [Mention Account Titling]
      - Business Interests: [Mention Assignments]
      
      6. CORPORATE CREDIT & FUNDING STRATEGY
      [Provide a roadmap for building business credit off this Trust]
      - Option A (Sovereign): Build Tier 1/2/3 vendor credit over 6-9 months with NO Personal Guarantee (PG).
      - Option B (Accelerated): Use a Personal Guarantee (PG) to obtain Amex/Chase cards immediately (Risk: Links liability).
      
      DISCLAIMER: This output is for educational purposes only and does not constitute legal advice.
      
      CRITICAL: Do not use Markdown stars (*), hashtags (#), or bold formatting. Write in plain professional text.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Could not generate blueprint.";

  } catch (error) {
    console.error("Brief Generation Error:", error);
    return "Error generating final blueprint.";
  }
}

export async function generateTrustDocuments(data: TrustWizardData): Promise<GeneratedDocument[]> {
  try {
    const prompt = `
      Act as a Senior Legal Drafter. Generate legal trust documents based on:
      Type: ${data.type}
      Trust Name: ${data.name}
      Jurisdiction: ${data.jurisdiction}
      Settlor: ${data.settlorName} (${data.settlorAddress})
      Initial Trustee: ${data.initialTrustee} (${data.initialTrusteeAddress})
      Successor Trustee: ${data.successorTrustee} (${data.successorTrusteeAddress})
      Beneficiaries: ${data.beneficiaries.map(b => `${b.name} (${b.relationship})`).join(', ')}
      Assets: ${data.assets}

      Please generate 4 separate documents:
      1. The Trust Agreement (Declaration of Trust)
      2. Schedule A (Asset Assignment)
      3. Certification of Trust (Privacy Abstract)
      4. Pour-Over Will (Last Will & Testament transferring residuary estate to Trust)

      Format as JSON array with title and content.
      CRITICAL: The content must be PLAIN TEXT. Do NOT use Markdown, stars (*), or hashtags (#). Use UPPERCASE for headers.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
            },
            required: ["title", "content"],
          },
        },
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedDocument[];
    }
    return [];

  } catch (error) {
    console.error("Trust Doc Gen Error", error);
    return [{ title: "Error", content: "Failed to generate documents." }];
  }
}

export async function generateIronChainDocuments(data: IronChainData): Promise<GeneratedDocument[]> {
   try {
    const prompt = `
      Create an "Iron Chain" asset protection structure structure for:
      Jurisdiction: ${data.jurisdiction}
      Tier 1 (Control): ${data.trustName} (The Trust)
      Tier 2 (Holding): ${data.holdingCoName} (Holding LLC)
      Tier 3 (Operations): ${data.operatingCoName} (Operating LLC)

      Generate these documents:
      1. Operating Agreement for Holding LLC (Managed by Trust)
      2. Operating Agreement for Operating LLC (Managed by Holding LLC)
      3. Inter-Company Promissory Note (Equity Stripping Instrument)
      
      Format as JSON array with title and content.
      CRITICAL: The content must be PLAIN TEXT. Do NOT use Markdown, stars (*), or hashtags (#). Use UPPERCASE for headers.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
            },
            required: ["title", "content"],
          },
        },
      }
    });

     if (response.text) {
      return JSON.parse(response.text) as GeneratedDocument[];
    }
    return [];

  } catch (error) {
    console.error("Iron Chain Gen Error", error);
    return [{ title: "Error", content: "Failed to generate documents." }];
  }
}

export async function getConciergeAnalysis(context: string): Promise<string> {
  try {
    const prompt = `
      You are a high-end Concierge for an exclusive legal platform.
      The user just performed this action: "${context}".
      
      Provide a single, short, witty, and sophisticated sentence commenting on their progress or offering a pro-tip regarding asset protection or credit building.
      Tone: Like a British Butler or a high-end Swiss Banker. Professional but slightly dry wit.
      Max 20 words.
      Plain text only.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || "At your service.";
  } catch (e) {
    return "Ready to assist.";
  }
}

export async function generateTestimonials(): Promise<Testimonial[]> {
  try {
    const textPrompt = `
      Generate 2 realistic testimonials for a high-end Trust & Asset Protection service.
      Return JSON:
      [
        {
          "name": "Name",
          "role": "Job Title (e.g. Real Estate Investor)",
          "quote": "Short testimonial about protecting assets.",
          "imagePrompt": "Photo realistic portrait of a sophisticated real estate investor, 45 years old, professional attire, warm lighting, high quality, 8k"
        }
      ]
    `;

    const textResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: textPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              quote: { type: Type.STRING },
              imagePrompt: { type: Type.STRING }
            }
          }
        }
      }
    });

    const personas = textResponse.text ? JSON.parse(textResponse.text) : [];
    const testimonials: Testimonial[] = [];

    // 2. Generate Images for each persona (Best Effort)
    for (const p of personas) {
      let avatar = "";
      try {
        const imageResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: {
            parts: [{ text: p.imagePrompt }]
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            }
          }
        });

        for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
           if (part.inlineData) {
             avatar = part.inlineData.data;
           }
        }
      } catch (imgErr) {
        console.warn("Image gen error (skipping image, keeping text)", imgErr);
      }

      testimonials.push({
        name: p.name,
        role: p.role,
        quote: p.quote,
        avatar: avatar ? `data:image/png;base64,${avatar}` : "" 
      });
    }

    return testimonials;
  } catch (e) {
    console.error("Testimonial Gen Error", e);
    return [{
        name: "James Sterling",
        role: "Private Investor",
        quote: "The Iron Chain structure completely insulated my portfolio. The peace of mind is invaluable.",
        avatar: ""
    }];
  }
}