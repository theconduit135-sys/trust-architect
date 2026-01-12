import { GeneratedDocument, TrustWizardData, IronChainData, LegalTemplate, UserTier, AssetTransferData, AssetCategory } from "../types";

export const MASTER_TEMPLATES: LegalTemplate[] = [
  // ... (previous templates kept, adding new ones)
  {
    id: "asset-assignment-equitable",
    title: "Assignment of Equitable Interest",
    category: "Sovereign",
    minTier: "SOVEREIGN",
    description: "Master assignment document for transferring beneficial interest to a trust while keeping legal title in place (common for liens/leases).",
    content: `ASSIGNMENT OF EQUITABLE INTEREST

This Assignment of Equitable Interest ("Assignment") is made this [Date] by and between [Grantor Name] ("Assignor") and [Trust Name], [Trustee Name] as Trustee ("Assignee").

1. TRANSFER OF INTEREST
Assignor hereby assigns, transfers, and conveys to Assignee all of Assignor's equitable and beneficial interest in and to the following property:
[Asset Identification]

2. RETENTION OF LEGAL TITLE
The parties acknowledge that legal title to the property may remain in the name of the Assignor for the purpose of maintaining existing financial obligations, including but not limited to [Lien/Lease Type] with [Lender Name].

3. INDEMNIFICATION
Assignee agrees to hold Assignor harmless from any liabilities arising from the beneficial ownership of the asset, while Assignor remains responsible for the primary financial obligations of the original contract.

IN WITNESS WHEREOF, the parties have executed this Assignment as of the date first above written.

_______________________________
[Grantor Name], Assignor

_______________________________
[Trustee Name], Trustee`
  },
  {
    id: "schedule-house",
    title: "Schedule A: Real Property Interest",
    category: "Sovereign",
    minTier: "SOVEREIGN",
    description: "Detailed attachment for real estate assets.",
    content: `SCHEDULE A - REAL PROPERTY

TRUST: [Trust Name]
ASSET TYPE: Residential Real Estate

PROPERTY ADDRESS: [Property Address]
LEGAL DESCRIPTION: [Legal Description]
FINANCIAL STATUS: Subject to Lien held by [Lender Name]`
  },
  {
    id: "schedule-aircraft",
    title: "Schedule B: Aircraft Interest",
    category: "Sovereign",
    minTier: "SOVEREIGN",
    description: "Detailed attachment for aviation assets.",
    content: `SCHEDULE B - AIRCRAFT ASSETS

TRUST: [Trust Name]
ASSET TYPE: Aircraft

TAIL NUMBER: [Tail Number]
SERIAL NUMBER: [Serial Number]
MAKE/MODEL: [Make/Model]
FINANCIAL STATUS: Subject to Lien/Lease held by [Lender Name]`
  },
  {
    id: "schedule-equipment",
    title: "Schedule C: Commercial Equipment",
    category: "Sovereign",
    minTier: "SOVEREIGN",
    description: "Detailed attachment for leased or financed equipment.",
    content: `SCHEDULE C - EQUIPMENT ASSETS

TRUST: [Trust Name]
ASSET TYPE: Commercial Equipment

EQUIPMENT: [Equipment Name]
QUANTITY: [Quantity]
LOCATION: [Location]
FINANCIAL STATUS: Subject to Lease held by [Lender Name]`
  },
  {
    id: "schedule-vehicle",
    title: "Schedule D: Motor Vehicle Interest",
    category: "Sovereign",
    minTier: "SOVEREIGN",
    description: "Detailed attachment for financed/leased vehicles.",
    content: `SCHEDULE D - VEHICLE ASSETS

TRUST: [Trust Name]
ASSET TYPE: Motor Vehicle

VIN: [VIN]
YEAR/MAKE/MODEL: [Make/Model]
FINANCIAL STATUS: Subject to Lien/Lease held by [Lender Name]`
  },
  {
    id: "trustee-asset-resolution",
    title: "Trustee Resolution: Asset Acceptance",
    category: "Sovereign",
    minTier: "SOVEREIGN",
    description: "Formal board resolution accepting the equitable interest of a new asset.",
    content: `TRUSTEE RESOLUTION OF [Trust Name]

The undersigned, being the Trustee(s) of the [Trust Name], hereby resolve:

WHEREAS, the Trust has been offered the beneficial and equitable interest in certain property, specifically [Asset Category]: [Asset Identification].

RESOLVED, that the Trust hereby accepts the assignment of equitable interest as provided in the Assignment of Equitable Interest dated [Date].

RESOLVED, that the Trustee is authorized to execute all documents necessary to effectuate this transfer and to notify any required parties, including insurance providers.

DATED: [Date]

_______________________________
[Trustee Name], Trustee`
  }
];

export function getMasterTemplates(): LegalTemplate[] {
  return MASTER_TEMPLATES;
}

export function fillTemplate(templateContent: string, data: Record<string, string>): string {
    let content = templateContent;
    if (!data['Date']) {
        data['Date'] = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    Object.keys(data).forEach(key => {
        const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\[${safeKey}\\]`, 'g');
        content = content.replace(regex, data[key] || "__________________");
    });
    return content;
}

export function extractPlaceholders(content: string): string[] {
  const regex = /\[([^\]]+)\]/g;
  const matches = new Set<string>();
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1].trim();
    if (key.length > 1 && !['x', 'X', ' '].includes(key)) {
        matches.add(key);
    }
  }
  return Array.from(matches).sort();
}

export function generateAssetTransferPacket(assetData: AssetTransferData, trustData: TrustWizardData): GeneratedDocument[] {
    const templates = getMasterTemplates();
    const packet: GeneratedDocument[] = [];
    
    let assetIdent = "________________";
    let scheduleId = "";
    
    switch(assetData.category) {
        case AssetCategory.HOUSE:
            assetIdent = assetData.address || "";
            scheduleId = "schedule-house";
            break;
        case AssetCategory.AIRPLANE:
            assetIdent = `Tail: ${assetData.tailNumber}, SN: ${assetData.serialNumber}`;
            scheduleId = "schedule-aircraft";
            break;
        case AssetCategory.EQUIPMENT:
            assetIdent = `${assetData.equipmentName} (${assetData.quantity})`;
            scheduleId = "schedule-equipment";
            break;
        case AssetCategory.VEHICLE:
            assetIdent = `VIN: ${assetData.vin}`;
            scheduleId = "schedule-vehicle";
            break;
    }

    const map: Record<string, string> = {
        "Trust Name": assetData.trustName,
        "Grantor Name": trustData.settlorName,
        "Trustee Name": trustData.initialTrustee,
        "Asset Identification": assetIdent,
        "Lien/Lease Type": assetData.isLease ? "Lease" : "Lien",
        "Lender Name": assetData.lenderName || "TBD",
        "Property Address": assetData.address || "",
        "Legal Description": assetData.legalDescription || "See Deed Records",
        "Tail Number": assetData.tailNumber || "",
        "Serial Number": assetData.serialNumber || "",
        "Make/Model": assetData.makeModel || "",
        "Equipment Name": assetData.equipmentName || "",
        "Quantity": assetData.quantity || "1",
        "Location": assetData.location || "",
        "VIN": assetData.vin || "",
        "Asset Category": assetData.category || "",
    };

    const docIds = ['asset-assignment-equitable', scheduleId, 'trustee-asset-resolution'];
    docIds.forEach(id => {
        const t = templates.find(temp => temp.id === id);
        if (t) {
            packet.push({ title: t.title, content: fillTemplate(t.content, map) });
        }
    });

    return packet;
}

export function generateTrustPacket(type: string, data: TrustWizardData): GeneratedDocument[] {
    // ... existing logic ...
    const templates = getMasterTemplates();
    const packet: GeneratedDocument[] = [];
    let selectedIds: string[] = ['executive-summary'];
    const standardBanking = ['cert-trust-banking', 'banking-resolution', 'trust-minutes-initial', 'trust-minutes-template', 'ein-banking-guide', 'credit-resolution'];

    if (type === 'Business Trust' || type === 'Statutory Business Trust') {
        selectedIds.push('business-trust-master', 'beneficial-interest-cert', ...standardBanking);
    } else if (type === 'Revocable Living Trust' || type === 'High Net Worth Estate Plan' || type === 'Standard Revocable Living Trust' || type === 'Iron Chain™ Asset Protection System') {
        selectedIds.push('rlt-master', 'pour-over-will', 'assignment-master', ...standardBanking);
    } else if (type === 'Irrevocable Asset Protection Trust') {
        selectedIds.push('apt-master', 'assignment-master', ...standardBanking);
    } else if (type === 'Real Estate/Land Trust' || type === 'Title-Holding Land Trust') {
        selectedIds.push('land-master', 'assignment-master', ...standardBanking);
    } else if (type.includes('Bulletproof') || type.includes('508')) {
        selectedIds.push('bulletproof-master', 'bulletproof-ein-guide', 'trust-minutes-template', 'credit-resolution');
    } else {
        selectedIds.push('rlt-master', 'pour-over-will', ...standardBanking);
    }

    const gStreet = data.settlorStreet || "________________";
    const gCity = data.settlorCity || "________________";
    const gState = data.settlorState || "________________";
    const gZip = data.settlorZip || "________________";
    const tStreet = data.initialTrusteeStreet || gStreet;
    const tCity = data.initialTrusteeCity || gCity;
    const tState = data.initialTrusteeState || gState;
    const tZip = data.initialTrusteeZip || gZip;
    const fullSettlorAddress = `${gStreet}, ${gCity}, ${gState} ${gZip}`;

    const map: Record<string, string> = {
        "Trust Type": type,
        "Trust Name": data.name,
        "Grantor Name": data.settlorName,
        "Grantor/Creator": data.settlorName,
        "Trustee Name": data.initialTrustee,
        "Successor Trustee Name": data.successorTrustee || "TBD",
        "Address": fullSettlorAddress,
        "State": data.jurisdiction,
        "Beneficiary Name": data.beneficiaries?.[0]?.name || "The Beneficiaries",
        "Assets": data.assets || "Cash and Securities",
        "Grantor Street": gStreet,
        "Grantor City": gCity,
        "Grantor State": gState,
        "Grantor Zip": gZip,
        "Trustee Street": tStreet,
        "Trustee City": tCity,
        "Trustee State": tState,
        "Trustee Zip": tZip,
        "Trust Street": gStreet,
        "Trust City": gCity,
        "Trust State": gState,
        "Trust Zip": gZip,
    };

    selectedIds.forEach(id => {
        const t = templates.find(temp => temp.id === id);
        if (t) {
            if (id === 'bulletproof-master') {
                const privateMap = { ...map, "Commerce Clause": "PUBLIC COMMERCE PROHIBITED", "Commerce Description": "This Trust is specifically prohibited from engaging in any form of public commerce." };
                packet.push({ title: "Private Trust (Standard / Private Realm)", content: fillTemplate(t.content, privateMap) });
                const publicMap = { ...map, "Commerce Clause": "PUBLIC COMMERCE ALLOWED", "Commerce Description": "This Trust is specifically allowed to engage in public commerce." };
                packet.push({ title: "Private Trust (With EIN / Banking)", content: fillTemplate(t.content, publicMap) });
            } else {
                packet.push({ title: t.title, content: fillTemplate(t.content, map) });
            }
        }
    });
    return packet;
}

export function generateIronChainPacket(data: IronChainData): GeneratedDocument[] {
    const templates = getMasterTemplates();
    const packet: GeneratedDocument[] = [];
    const selectedIds = ['holding-llc-oa', 'operating-llc-oa', 'equity-strip-note', 'business-trust-master', 'beneficial-interest-cert', 'banking-resolution', 'credit-resolution', 'trust-minutes-template', 'ein-banking-guide'];
    const trustAddress = `${data.trustStreet}, ${data.trustCity}, ${data.trustState} ${data.trustZip}`;
    const holdingCoAddress = `${data.holdingCoStreet}, ${data.holdingCoCity}, ${data.holdingCoState} ${data.holdingCoZip}`;
    const operatingCoAddress = `${data.operatingCoStreet}, ${data.operatingCoCity}, ${data.operatingCoState} ${data.operatingCoZip}`;

    const map: Record<string, string> = {
        "Trust Name": data.trustName,
        "Holding Co Name": data.holdingCoName,
        "Operating Co Name": data.operatingCoName,
        "State": data.jurisdiction,
        "Trustee Name": "The Trustee",
        "Grantor Name": "The Manager",
        "Amount": "100,000.00",
        "Interest Rate": "5.0",
        "Address": trustAddress, 
        "Holding Co Address": holdingCoAddress,
        "Operating Co Address": operatingCoAddress,
        "Trust Street": data.trustStreet,
        "Trust City": data.trustCity,
        "Trust State": data.trustState,
        "Trust Zip": data.trustZip,
        "Holding Co Street": data.holdingCoStreet,
        "Holding Co City": data.holdingCoCity,
        "Holding Co State": data.holdingCoState,
        "Holding Co Zip": data.holdingCoZip,
        "Operating Co Street": data.operatingCoStreet,
        "Operating Co City": data.operatingCoCity,
        "Operating Co State": data.operatingCoState,
        "Operating Co Zip": data.operatingCoZip,
    };

    selectedIds.forEach(id => {
        const t = templates.find(temp => temp.id === id);
        if (t) {
            packet.push({ title: t.title, content: fillTemplate(t.content, map) });
        }
    });
    return packet;
}

export function generateBulletproofPacket(data: {
  trustName: string;
  grantorName: string;
  trusteeName: string;
  successorTrusteeName: string;
  state: string;
  street: string;
  city: string;
  zip: string;
  address: string;
}): GeneratedDocument[] {
  const templates = getMasterTemplates();
  const packet: GeneratedDocument[] = [];
  const masterTemplate = templates.find(t => t.id === 'bulletproof-master');
  const guideTemplate = templates.find(t => t.id === 'bulletproof-ein-guide');
  const minutesTemplate = templates.find(t => t.id === 'trust-minutes-template');
  const creditTemplate = templates.find(t => t.id === 'credit-resolution');

  const map = {
    "Trust Name": data.trustName,
    "Grantor Name": data.grantorName,
    "Trustee Name": data.trusteeName,
    "Successor Trustee Name": data.successorTrusteeName,
    "State": data.state,
    "Address": data.address,
    "Trust Street": data.street,
    "Trust City": data.city,
    "Trust State": data.state,
    "Trust Zip": data.zip,
  };

  if (masterTemplate) {
    const privateMap = { ...map, "Commerce Clause": "PUBLIC COMMERCE PROHIBITED", "Commerce Description": "This Trust is prohibited from engaging in public commerce." };
    packet.push({ title: "Private Trust (Standard / Private Realm)", content: fillTemplate(masterTemplate.content, privateMap) });
    const publicMap = { ...map, "Commerce Clause": "PUBLIC COMMERCE ALLOWED", "Commerce Description": "This Trust is allowed to engage in public commerce." };
    packet.push({ title: "Private Trust (With EIN / Banking)", content: fillTemplate(masterTemplate.content, publicMap) });
  }

  if (guideTemplate) packet.push({ title: guideTemplate.title, content: fillTemplate(guideTemplate.content, map) });
  if (minutesTemplate) packet.push({ title: minutesTemplate.title, content: fillTemplate(minutesTemplate.content, map) });
  if (creditTemplate) packet.push({ title: creditTemplate.title, content: fillTemplate(creditTemplate.content, map) });

  return packet;
}
