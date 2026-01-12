import { Type } from "@google/genai";

export type UserTier = 'FOUNDATION' | 'STRATEGIC' | 'SOVEREIGN';

export enum AppMode {
  WIZARD = 'WIZARD',
  TRUST_ARCHITECT = 'TRUST_ARCHITECT',
  IRON_CHAIN = 'IRON_CHAIN',
  BULLETPROOF = 'BULLETPROOF',
  BUSINESS_CREDIT = 'BUSINESS_CREDIT',
  VOICE = 'VOICE',
  EDUCATION = 'EDUCATION',
  TEMPLATES = 'TEMPLATES',
  CATALOG = 'CATALOG',
  ASSET_TRANSFER = 'ASSET_TRANSFER',
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

export enum AssetCategory {
  HOUSE = 'HOUSE',
  AIRPLANE = 'AIRPLANE',
  EQUIPMENT = 'EQUIPMENT',
  VEHICLE = 'VEHICLE',
}

export interface AssetTransferData {
  id?: string;
  trustId: string;
  trustName: string;
  category: AssetCategory | null;
  
  // Asset Identification
  address?: string;
  state?: string;
  legalDescription?: string;
  
  tailNumber?: string;
  serialNumber?: string;
  makeModel?: string;
  
  equipmentName?: string;
  quantity?: string;
  location?: string;
  
  vin?: string;
  year?: string;

  // Lien / Lease
  isLien: boolean;
  isLease: boolean;
  lenderName?: string;
  accountNumber?: string;
  startDate?: string;

  // Attestations
  attestNoLienRemoval: boolean;
  attestPaymentRemains: boolean;
  attestNoTitleTransfer: boolean;
  signature?: string;
  dateSigned?: string;
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
  id?: string;
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
  holdingLLC?: string;
  operatingLLC?: string;
}

export interface GeneratedDocument {
  title: string;
  content: string;
}

export interface LegalTemplate extends GeneratedDocument {
  id: string;
  category: string;
  description: string;
  minTier: UserTier;
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
