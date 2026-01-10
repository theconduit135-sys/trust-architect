import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { createPcmBlob, base64ToUint8Array, decodeAudioData } from "./audioUtils";

interface LiveClientCallbacks {
  onAudioData: (buffer: AudioBuffer) => void;
  onTranscription: (text: string, isUser: boolean, isFinal: boolean) => void;
  onInterrupted: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
  onError: (error: any) => void;
}

export class LiveClient {
  private ai: GoogleGenAI;
  private sessionPromise: Promise<any> | null = null;
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private callbacks: LiveClientCallbacks;
  private isConnected: boolean = false;

  constructor(callbacks: LiveClientCallbacks) {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.callbacks = callbacks;
  }

  async connect() {
    if (this.isConnected) return;

    try {
      // Force sample rates to match Gemini's native requirements for maximum performance
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      this.sessionPromise = this.ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } },
          },
          systemInstruction: `You are "Aurelius," the Sovereign Wealth Architect. You are an elite legal strategist and asset protection expert.

          Your Goal: To guide users to the correct "Trust Architecture" product based on their needs and answer questions about the specific software modules available on this platform.

          **PRODUCT CATALOG & PRICING (Memorize This):**

          1. **Foundation Tier ($249 One-Time)**
             - *Target Audience:* Families, basic business owners, and those needing essential legal structure.
             - *Includes:* 
               - **Revocable Living Trust (RLT)** (Probate Avoidance).
               - **Business Trust** (Corporate structuring).
               - **Irrevocable Trust** (Asset Protection Basics).
               - Pour-Over Will & Schedule A Generator.
             - *Key Benefit:* Complete structural setup for personal and business assets at an entry-level price.

          2. **Strategic Tier ($997 One-Time)**
             - *Target Audience:* Real Estate Investors and High Net Worth Individuals needing privacy and anonymity.
             - *Includes:* Everything in Foundation PLUS:
               - Privacy Land Trust Generator (Hides ownership of real estate).
               - Anonymous Banking Guide (The "Nesting Doll" Protocol).
               - "Aurelius" Voice Advisor (Lifetime Access).
             - *Key Benefit:* Hiding assets from public search and layering anonymity.

          3. **Sovereign Tier ($1,997 One-Time)**
             - *Target Audience:* Business Owners and Sovereigns demanding maximum immunity.
             - *Includes:* Everything in Strategic PLUS:
               - **The Iron Chain™ System:** A triple-entity structure (Trust -> Holding LLC -> Operating LLC) to compartmentalize risk.
               - **Bulletproof Trust (508c1a):** A tax-exempt private ministry trust that requires no IRS application.
               - **Business Credit Builder:** Tools to build corporate credit (Paydex 80+) without personal guarantees.
               - **Equity Stripping Instruments:** Promissory notes to protect assets from judges.

          **CORE STRATEGIES (Explain these when asked):**

          - **The Iron Chain™:** We don't just use an LLC. We separate "Safe Assets" (Holding Co) from "Risky Actions" (Operating Co). If the Operating Co is sued, the assets in the Holding Co are untouchable via Charging Order protection.
          - **The Bulletproof Trust (508c1a):** A specialized religious/private trust. It is a mandatory exception to 501c3. It has no IRS reporting requirements (No Form 990), allows tax-deductible donations, and total privacy.
          - **The Nesting Doll Protocol:** A privacy layering technique. Public Layer = Anonymous LLC. Middle Layer = The Trust. Inner Layer = You. The bank knows who you are (KYC), but the public only sees the LLC.
          - **Corporate Credit:** We teach two paths. 1. Sovereign Path (No Personal Guarantee, slower). 2. Accelerated Path (With Personal Guarantee, faster/risky).
          - **Registered Agent:** We recommend **Wyoming Agents** (wyomingagents.com) for privacy-focused LLC formation and virtual office services.

          **BEHAVIOR GUIDELINES:**
          - If a user asks about "price" or "cost", quote the specific Tier prices above.
          - If a user has a business, recommend the **Sovereign Tier** for the Iron Chain and Credit Builder.
          - If a user just wants to "protect their house", recommend the **Strategic Tier** for the Land Trust.
          - If a user mentions "Probate", recommend the **Foundation Tier**.
          - Be professional, authoritative, and concise. Use a "White Shoe Law Firm" tone but accessible.
          - Always conclude with a subtle reminder that this is educational information, not legal advice.
          `,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: this.handleOpen.bind(this),
          onmessage: this.handleMessage.bind(this),
          onclose: this.handleClose.bind(this),
          onerror: this.handleError.bind(this),
        },
      });
      
    } catch (err) {
      this.callbacks.onError(err);
    }
  }

  private handleOpen() {
    this.isConnected = true;
    this.callbacks.onConnect();
    this.startAudioStream();
  }

  private startAudioStream() {
    if (!this.inputAudioContext || !this.stream || !this.sessionPromise) return;

    this.source = this.inputAudioContext.createMediaStreamSource(this.stream);
    // Reduced buffer size from 4096 to 2048 for faster interaction
    this.processor = this.inputAudioContext.createScriptProcessor(2048, 1, 1);

    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const pcmBlob = createPcmBlob(inputData);
      this.sessionPromise?.then((session) => {
        session.sendRealtimeInput({ media: pcmBlob });
      });
    };

    this.source.connect(this.processor);
    this.processor.connect(this.inputAudioContext.destination);
  }

  private async handleMessage(message: LiveServerMessage) {
    if (message.serverContent?.interrupted) {
      this.callbacks.onInterrupted();
    }

    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
    if (base64Audio && this.outputAudioContext) {
      const audioBuffer = await decodeAudioData(
        base64ToUint8Array(base64Audio),
        this.outputAudioContext,
        24000
      );
      this.callbacks.onAudioData(audioBuffer);
    }

    if (message.serverContent?.inputTranscription) {
       this.callbacks.onTranscription(
         message.serverContent.inputTranscription.text, 
         true, 
         !!message.serverContent.turnComplete
       );
    }
    if (message.serverContent?.outputTranscription) {
       this.callbacks.onTranscription(
         message.serverContent.outputTranscription.text, 
         false, 
         !!message.serverContent.turnComplete
       );
    }
  }

  private handleClose() {
    this.isConnected = false;
    this.callbacks.onDisconnect();
    this.cleanup();
  }

  private handleError(e: any) {
    this.callbacks.onError(e);
    this.disconnect();
  }

  async disconnect() {
    if (this.sessionPromise) {
      const session = await this.sessionPromise;
      session.close();
    }
    this.cleanup();
  }

  private cleanup() {
    this.source?.disconnect();
    this.processor?.disconnect();
    this.stream?.getTracks().forEach(t => t.stop());
    this.inputAudioContext?.close();
    this.outputAudioContext?.close();
    
    this.isConnected = false;
    this.sessionPromise = null;
    this.source = null;
    this.processor = null;
    this.stream = null;
    this.inputAudioContext = null;
    this.outputAudioContext = null;
  }
}