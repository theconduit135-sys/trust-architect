import { Type } from "@google/genai";

export enum AppMode {
  WIZARD = 'WIZARD',
  TRUST_ARCHITECT = 'TRUST_ARCHITECT',
  IRON_CHAIN = 'IRON_CHAIN',
  BULLETPROOF = 'BULLETPROOF',
  BUSINESS_CREDIT = 'BUSINESS_CREDIT',
  VOICE = 'VOICE',
  EDUCATION = 'EDUCATION',
  TEMPLATES = 'TEMPLATES',
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface AnalysisResult {
  markdown: string;
  sources: GroundingChunk[];
}

export enum TrustType {
  REVOCABLE = 'Revocable Living Trust',
  IRREVOCABLE = 'Irrevocable Trust',
  BUSINESS = 'Business Trust',
  REAL_ESTATE = 'Real Estate/Land Trust',
  IRON_CHAIN = 'Iron Chain™ Asset Protection System',
  BULLETPROOF = 'Bulletproof 508(c)(1)(A) Trust',
  UNSURE = 'Help Me Choose',
}

export interface WizardState {
  step: number;
  trustType: TrustType | null;
  assets: string;      
  objectives: string; 
  analysis: AnalysisResult | null;
  isLoading: boolean;
}

export interface Beneficiary {
  id: string;
  name: string;
  dob: string;
  relationship: string;
}

export interface TrustWizardData {
  type: string;
  name: string;
  jurisdiction: string;
  settlorName: string;
  settlorAddress: string;
  settlorStreet?: string;
  settlorCity?: string;
  settlorState?: string;
  settlorZip?: string;
  
  initialTrustee: string;
  initialTrusteeAddress: string;
  initialTrusteeStreet?: string;
  initialTrusteeCity?: string;
  initialTrusteeState?: string;
  initialTrusteeZip?: string;

  successorTrustee: string;
  successorTrusteeAddress: string;
  successorTrusteeStreet?: string;
  successorTrusteeCity?: string;
  successorTrusteeState?: string;
  successorTrusteeZip?: string;

  beneficiaries: Beneficiary[];
  assets: string;
  // Optional for Iron Chain flow within Wizard
  holdingLLC?: string;
  operatingLLC?: string;
}

export interface GeneratedDocument {
  title: string;
  content: string;
}

export interface IronChainData {
  trustName: string;
  trustStreet: string;
  trustCity: string;
  trustState: string;
  trustZip: string;

  holdingCoName: string;
  holdingCoStreet: string;
  holdingCoCity: string;
  holdingCoState: string;
  holdingCoZip: string;

  operatingCoName: string;
  operatingCoStreet: string;
  operatingCoCity: string;
  operatingCoState: string;
  operatingCoZip: string;

  jurisdiction: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string; // Base64 image
}

export type ViewState = AppMode;