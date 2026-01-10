import { GeneratedDocument, TrustWizardData, IronChainData } from "../types";

export interface LegalTemplate extends GeneratedDocument {
  id: string;
  category: string;
  description: string;
}

const NOTARY_BLOCK = `
STATE OF [State]
COUNTY OF _________________

On this _____ day of ___________________, 20____, before me, _______________________________ (Notary Public), personally appeared [Grantor Name] and [Trustee Name], known to me (or proved to me on the basis of satisfactory evidence) to be the persons whose names are subscribed to the within instrument and acknowledged to me that they executed the same in their authorized capacities, and that by their signatures on the instrument the persons, or the entity upon behalf of which the persons acted, executed the instrument.

WITNESS my hand and official seal.

_______________________________
Notary Public

(Seal)`;

const WILL_NOTARY_BLOCK = `
STATE OF [State]
COUNTY OF _________________

We, [Grantor Name], Witness 1, and Witness 2, the Testator and the Witnesses respectively, whose names are signed to the attached or foregoing instrument, being first duly sworn, do hereby declare to the undersigned authority that the Testator signed and executed the instrument as their Last Will and that they signed willingly, and that each of the Witnesses, in the presence and hearing of the Testator, hereby signs this Will as witness to the Testator's signing, and that to the best of their knowledge the Testator is eighteen years of age or older, of sound mind, and under no constraint or undue influence.

_______________________________
[Grantor Name], Testator

_______________________________
Witness 1

_______________________________
Witness 2

Subscribed, sworn to and acknowledged before me by [Grantor Name], the Testator, and subscribed and sworn to before me by Witness 1 and Witness 2, this _____ day of _______________, 20____.

_______________________________
Notary Public

(Seal)`;

export const MASTER_TEMPLATES: LegalTemplate[] = [
  {
    id: "executive-summary",
    title: "Structure Executive Summary",
    category: "Strategy",
    description: "Overview of the selected trust structure and key entity details.",
    content: `TRUST STRUCTURE EXECUTIVE SUMMARY

DATE: [Date]

1. SELECTED STRUCTURE
Type: [Trust Type]
Jurisdiction: [State]

2. ENTITY DETAILS
Name: [Trust Name]
Grantor: [Grantor Name]
Trustee: [Trustee Name]

3. SCOPE
This blueprint contains the necessary governing instruments to establish the [Trust Type] structure identified above. Please review all documents with qualified counsel before funding.`
  },
  {
    id: "rlt-master",
    title: "Revocable Living Trust Agreement",
    category: "Foundation",
    description: "The gold-standard probate avoidance vehicle. Fully revocable, ensuring the Grantor maintains total control during their lifetime while establishing seamless succession.",
    content: `REVOCABLE LIVING TRUST AGREEMENT

THIS TRUST AGREEMENT is made and entered into this [Date], by and between:

GRANTOR: [Grantor Name], of [Grantor Street], [Grantor City], [Grantor State] [Grantor Zip], hereinafter referred to as the "Grantor", and

TRUSTEE: [Trustee Name], of [Trustee Street], [Trustee City], [Trustee State] [Trustee Zip], hereinafter referred to as the "Trustee".

ARTICLE I: NAME AND REVOCABILITY

A. Name of Trust. This trust shall be known as the "[Trust Name]".

B. Revocability. The Grantor reserves the right to revoke, alter, or amend this Trust, in whole or in part, at any time during the Grantor's lifetime, by written instrument delivered to the Trustee.

ARTICLE II: TRUST ESTATE

A. Initial Funding. The Grantor has transferred, assigned, and conveyed to the Trustee the property described in Schedule A attached hereto.

B. Additions. The Grantor or any other person may at any time add property to this Trust.

ARTICLE III: DISTRIBUTIONS DURING LIFETIME

During the lifetime of the Grantor, the Trustee shall distribute to the Grantor, or for the Grantor's benefit, all of the net income and as much of the principal of the Trust as the Grantor shall request in writing.

ARTICLE IV: DEATH OF GRANTOR

Upon the death of the Grantor, this Trust shall become irrevocable. The Trustee shall pay all legal debts, funeral expenses, and estate taxes arising by reason of the Grantor's death.

ARTICLE V: DISPOSITION OF TRUST RESIDUE

After the payments described in Article IV, the Trustee shall hold, administer, and distribute the remaining Trust Estate (the "Residue") as follows:

1. Specific Bequests: [Assets].
2. Residuary Beneficiaries: The balance shall be distributed to [Beneficiary Name] if living; otherwise to their issue, per stirpes.

ARTICLE VI: TRUSTEE POWERS

The Trustee shall have all powers granted by the [State] Uniform Trust Code and common law, including but not limited to:
1. To sell, convey, or exchange property.
2. To invest and reinvest in stocks, bonds, and mutual funds.
3. To manage real estate, including leasing and making repairs.
4. To borrow money and mortgage Trust property.

ARTICLE VII: GENERAL PROVISIONS

A. Spendthrift Provision. No interest of any beneficiary shall be assignable or subject to the claims of creditors to the maximum extent permitted by law.

B. Governing Law. This Trust shall be governed by the laws of the State of [State].

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first above written.

_______________________________
[Grantor Name], Grantor

_______________________________
[Trustee Name], Trustee

${NOTARY_BLOCK}`
  },
  {
    id: "bulletproof-master",
    title: "Contract and Declaration of Private Trust",
    category: "Bulletproof",
    description: "A specialized 508(c)(1)(A) Private Trust structure operating under Common Law Right of Contract.",
    content: `CONTRACT and DECLARATION of PRIVATE TRUST
Created by the Common Law Right of Contract

The Private Participants to this Contract Create the Private Trust of:
[Trust Name]

DECLARATION of PRIVATE TRUST

This Private Trust is established under the Common Law Right of Contract within the State of [State] by and between the undersigned Grantor/Creator [Grantor Name], Trustee [Trustee Name] and Successor Trustee [Successor Trustee Name] as an Irrevocable Private Trust and shall be administered by the people holding legal title to the Trust assets in the Trust, not as individuals, but collectively as herein set forth and are empowered to function under the name of the Private Trust for the benefit of the beneficiaries. To reserve privacy, beneficiary (ies) is/are named in Trust Minutes.

DECLARATION of AUTHORITY

This Contract shall serve as the Board of Trustee’s, and/or Agent’s guide from time to time, directed by further resolutions of the Board of Trustees, covering contingencies as they arise and are recorded in the Minutes of its meetings. Trust Minutes are a portion of the rules and regulations of this Trust.

The Board of Trustees shall have all the power necessary, convenient or appropriate to effectuate the purpose of this Trust; and shall take any action which it deems necessary or desirable and proper to carry out such purposes.

NAME and SITUS of TRUST

The present name and situs/address of this Private Irrevocable Trust shall be as set forth below:

[Trust Name]
[Trust Street], [Trust City], [Trust State] [Trust Zip]

AGREEMENT of CONTRACT

1. TERM of TRUST
This Trust shall be established for an initial term of 21 years. The Board of Trustees shall be empowered by unanimous decision to renew its operation for new terms.

2. FUNDING of TRUST
That the Grantor/Creator shall execute and cause to be delivered to the Trustees of this Trust all documents necessary to convey rights, title, and interest in and to any real property transferred to this Trust.

3. TRUSTEE RESIGNATION
Upon proper notice to the Board of Trustees, any Trustee with proper signed resignation, may withdraw from the Board.

4. DISTRIBUTION of BENEFICIAL UNITS
That in equal exchange for the conveyances described in this Contract, the Trustees shall issue to the Grantor/Creator named herein a Certificate evidencing one hundred (100) Units of Equitable Ownership.

5. UNITY of BOARD of TRUSTEES
The Trustee(s) so nominated and appointed, shall administer this Trust, sitting as Board of Trustees, for the benefit of this Trust as a whole.

6. DEATH of TRUSTEE
The Protector, if appointed, or the Board of Trustees shall designate one or more Successor Trustees.

7. TRUSTEE’S AGREEMENT of DUTIES
By signing and acknowledging this Agreement, the herein appointed Trustees accept, and will perform, all of the duties incumbent upon them as Trustees of this Trust.

(Articles 8-38 Omitted for Brevity - See Full Trust Minute Book)

39. [Commerce Clause]
[Commerce Description]

40. TOTALITY of AGREEMENT
This Trust Indenture is the totality of the Trust Agreement, and no other agreements exist. This Agreement can only be modified or added to by the Board of Trustees, as recorded in the Minutes of their meetings, but cannot be altered in its basic intent.

IN WITNESS WHEREOF, the parties have executed this Agreement.

_______________________________
[Grantor Name], Grantor/Creator

_______________________________
[Trustee Name], Trustee

_______________________________
[Successor Trustee Name], Successor Trustee

${NOTARY_BLOCK}`
  },
  {
    id: "bulletproof-ein-guide",
    title: "Bulletproof Trust EIN Guide",
    category: "Bulletproof",
    description: "Step-by-step instructions for obtaining the correct EIN for your Private Trust.",
    content: `BULLETPROOF TRUST SETUP GUIDE

STEP 1: Getting an EIN from the IRS

You will need to get an EIN from the IRS to operate in commerce (for the "Public" version of your trust).

1. Go to IRS Website: Visit https://irs.gov and search "Apply for EIN".
2. Select Entity Type: Choose "Trusts" -> "Irrevocable Trust".
3. Responsible Party: Select "Individual".
4. Trustee Details: Fill in your name and SSN as the Trustee.
5. Role: Choose "I am grantor, trustee or a beneficiary having a material interest".
6. Mailing Address: Use your home address or a P.O. Box.
7. Trust Name: Enter "[Trust Name]".
8. Employees: Answer "No" (You do not plan to hire employees).
9. Confirmation: Choose "Receive letter online" to get your CP 575 PDF immediately.

STEP 2: The Two Documents

You have generated two versions of your Trust:

1. Private Trust (Standard): This copy stays in your safe. It strictly prohibits public commerce to maintain private realm status.
2. Private Trust (With EIN): This copy goes to the bank. It specifically ALLOWS public commerce (Paragraph #39) so you can open a bank account.

STEP 3: Heading to the Bank

1. Wait 24 hours after getting your EIN.
2. Bring the Private Trust (With EIN) document (Notarized).
3. Bring your EIN Letter.
4. Ask to open a Personal/Private account (Savings or Checking).
5. If asked "Is this a business trust?", answer "NO, IT IS A PRIVATE TRUST".

NOTE
Trusts can access corporate credit up to $1,000,000 in open credit without personal liability once established.`
  },
  {
    id: "pour-over-will",
    title: "Pour-Over Will",
    category: "Foundation",
    description: "A specialized Will that acts as a safety net. It captures any assets left in your individual name at death and 'pours' them into your Trust, ensuring total probate avoidance.",
    content: `LAST WILL AND TESTAMENT (POUR-OVER)

I, [Grantor Name], a resident of [State], declare this to be my Will and revoke all prior Wills and Codicils.

ARTICLE I: FAMILY
I am [Married/Single]. My children are listed in my Trust.

ARTICLE II: DISPOSITION OF ESTATE (The "Pour-Over")
I give all the rest, residue, and remainder of my estate, real and personal, to the Trustee of the [Trust Name], created on [Date], to be added to the trust property and administered in accordance with the terms of that Trust Agreement.

ARTICLE III: EXECUTOR
I appoint [Trustee Name] as my Executor. If they cannot serve, I appoint the Successor Trustee named in my Trust.

ARTICLE III: POWERS
My Executor shall have all powers granted by law to administer my estate, including the power to sell real and personal property without court order.

IN WITNESS WHEREOF, I have signed this Will on [Date].

_________________________________
[Grantor Name]

WITNESSES:
The foregoing instrument was signed by [Grantor Name] in our presence and declared to be their Will. We, in their presence and in the presence of each other, have signed our names below as witnesses.

_________________________________  
Witness 1

_________________________________  
Witness 2

${WILL_NOTARY_BLOCK}`
  },
  {
    id: "apt-master",
    title: "Irrevocable Asset Protection Trust",
    category: "Protection",
    description: "A fortress structure designed to legally sever the Grantor's ownership from assets, utilizing a 'Spendthrift' clause to protect against future creditors.",
    content: `IRREVOCABLE ASSET PROTECTION TRUST

THIS IRREVOCABLE TRUST AGREEMENT is made this [Date].

RECITALS

WHEREAS, the Grantor desires to establish an irrevocable trust for the benefit of the Beneficiaries named herein; and
WHEREAS, the Grantor intends to transfer assets to the Trustee to be held, administered, and distributed pursuant to the terms of this Agreement.

ARTICLE I: IDENTIFICATION

1.1 Name. This Trust shall be known as the "[Trust Name]".

1.2 Irrevocability. This Trust is IRREVOCABLE. The Grantor expressly waives all rights to alter, amend, revoke, or terminate this Trust. The Grantor acknowledges that upon transfer of assets to the Trustee, the Grantor relinquishes all dominion and control over such assets.

ARTICLE II: TRUSTEE & PROTECTOR

2.1 Initial Trustee. The Initial Trustee shall be [Trustee Name]. The Grantor may NOT serve as Trustee.

2.2 Trust Protector. The Grantor appoints [Grantor Name] as the Trust Protector. The Trust Protector shall have the power to remove and replace the Trustee and veto distribution decisions, but shall have no power to distribute income or principal to themselves.

ARTICLE III: SPENDTHRIFT PROTECTION

3.1 Spendthrift Clause. To the fullest extent permitted by law, the interest of any Beneficiary in the income or principal of this Trust shall be free from the control or interference of any creditor of the Beneficiary and shall not be subject to attachment, execution, bankruptcy, or other legal process.

ARTICLE IV: ADMINISTRATION DURING LIFETIME

4.1 Discretionary Distributions. The Trustee shall have absolute discretion to distribute income or principal to the Beneficiaries for their health, education, maintenance, and support (HEMS). The Grantor shall NOT be a beneficiary of the principal.

ARTICLE V: POWERS OF TRUSTEE

The Trustee shall have the power to:
A. Retain any property transferred to the Trust.
B. Invest in any kind of property, real or personal.
C. Form corporations, LLCs, or partnerships to hold Trust assets.

ARTICLE VI: SITUS AND GOVERNING LAW

This Trust shall be governed by the laws of the State of [State], regardless of the residence of the Grantor or Trustee.

IN WITNESS WHEREOF, the Grantor has executed this Irrevocable Trust Agreement.

_______________________________
[Grantor Name], Grantor

_______________________________
[Trustee Name], Trustee

${NOTARY_BLOCK}`
  },
  {
    id: "land-master",
    title: "Privacy Land Trust (Title Holding)",
    category: "Real Estate",
    description: "Modeled after the 'Illinois Land Trust'. Used to hold real estate title anonymously, keeping the owner's name off public county records.",
    content: `LAND TRUST AGREEMENT

THIS TRUST AGREEMENT, dated this [Date], is known as Trust Number _______ (or the "[Trust Name]").

TRUSTEE: [Trustee Name], not personally but as Trustee.

BENEFICIARY: [Grantor Name].

ARTICLE I: NATURE OF INTEREST

The interest of any Beneficiary hereunder shall consist solely of:
1. The power to direct the Trustee to deal with the title to the property;
2. The power to manage, possess, and control the property; and
3. The right to receive the earnings, avails, and proceeds from the property.

Such interest shall be deemed personal property and not real estate. Legal and equitable title to the real estate shall be held solely by the Trustee.

ARTICLE II: DUTIES OF TRUSTEE

The Trustee shall have no duty to manage, insure, pay taxes on, or repair the property. The Trustee's sole duty is to hold title and to convey title or execute documents only upon the written direction of the Beneficiary.

ARTICLE III: PRIVACY

The Trustee shall not disclose the identity of the Beneficiary to any party unless required by law or court order.

ARTICLE IV: RESIGNATION AND SUCCESSION

The Trustee may resign by giving 30 days written notice to the Beneficiary. If a new Trustee is not appointed, the Trustee may convey the property to the Beneficiary.

ARTICLE V: EXCULPATION

The Trustee shall not be personally liable for any obligation or liability incurred by the Trust or the property. All third parties dealing with the Trustee shall look solely to the Trust property for satisfaction of claims.

IN WITNESS WHEREOF, the parties have signed this Agreement.

_______________________________
[Grantor Name], Beneficiary

_______________________________
[Trustee Name], Trustee

${NOTARY_BLOCK}`
  },
  {
    id: "assignment-master",
    title: "General Assignment of Assets",
    category: "Funding",
    description: "The critical funding instrument. A 'Pour-Over' assignment that moves untitled personal property (jewelry, art, furniture) into the Trust.",
    content: `GENERAL ASSIGNMENT OF ASSETS

THIS ASSIGNMENT is made this [Date], by [Grantor Name] ("Assignor") to [Trustee Name], Trustee of the [Trust Name] ("Assignee").

WITNESSETH:

WHEREAS, the Assignor has established the [Trust Name]; and
WHEREAS, the Assignor intends to transfer all tangible personal property to said Trust to avoid probate.

NOW, THEREFORE, the Assignor hereby assigns, transfers, and conveys to the Assignee all of the Assignor's right, title, and interest in and to all tangible personal property owned by the Assignor, wherever located, including but not limited to:

1. Household furnishings, furniture, and appliances.
2. Works of art, jewelry, and antiques.
3. Books, collections, and hobby equipment.
4. Automobiles (subject to DMV registration requirements).
5. Personal effects and clothing.

EXCLUDING, however, any assets held in retirement accounts (IRAs, 401ks) which are governed by beneficiary designation forms.

The Assignor declares that they hold said property as an agent for the Trustee until such time as physical delivery or re-titling can be completed.

_______________________________
[Grantor Name], Assignor

Accepted by:
_______________________________
[Trustee Name], Trustee

${NOTARY_BLOCK}`
  },
  {
    id: "business-trust-master",
    title: "Statutory Business Trust Declaration",
    category: "Business",
    description: "A common-law or statutory organization designed to operate a business enterprise. Provides limited liability similar to a corporation but with the flexibility of a trust.",
    content: `DECLARATION OF BUSINESS TRUST

THIS DECLARATION OF TRUST is made this [Date], for the purpose of creating a Business Trust Organization.

ARTICLE I: NAME AND LOCATION

1.1 Name. The name of this Trust shall be the "[Trust Name]".

1.2 Principal Office. The principal office of the Trust shall be located at [Trust Street], [Trust City], [Trust State] [Trust Zip]. The Trustees may change the location or establish branch offices at their discretion.

ARTICLE II: PURPOSE

The purpose of this Trust is to engage in any lawful business, trade, or commercial activity, including but not limited to purchasing, holding, and selling real estate, securities, and business interests, for the benefit of the Certificate Holders.

ARTICLE III: TRUSTEES

3.1 Board of Trustees. The affairs of the Trust shall be managed by a Board of Trustees. The initial Trustees are:
1. [Trustee Name]
2. [Grantor Name] (if applicable)

3.2 Powers of Trustees. The Trustees shall have exclusive authority to manage the business, including the power to contract, borrow money, issue certificates of beneficial interest, and distribute earnings.

3.3 Liability. No Trustee shall be personally liable for any debt, liability, or obligation of the Trust. All persons extending credit to the Trust shall look only to the funds and property of the Trust for payment.

ARTICLE IV: BENEFICIAL INTERESTS

4.1 Certificates. The beneficial interest in the Trust shall be divided into 100 Units, represented by Certificates of Beneficial Interest.

4.2 Status of Holders. The ownership of a Certificate shall not entitle the holder to any legal title in or to the Trust property, nor to any voice in the management of the Trust.

ARTICLE V: DURATION

This Trust shall continue for a period of twenty-one (21) years after the death of the last surviving lineal descendant of the original Trustees, unless terminated earlier by a vote of the Trustees.

IN WITNESS WHEREOF, the Trustees have executed this Declaration.

_______________________________
[Trustee Name], Trustee

_______________________________
[Grantor Name], Trustee

${NOTARY_BLOCK}`
  },
  {
    id: "beneficial-interest-cert",
    title: "Certificate of Beneficial Interest",
    category: "Business",
    description: "Formal certificate representing ownership units in the Business Trust. This document acts similarly to a stock certificate in a corporation.",
    content: `CERTIFICATE OF BENEFICIAL INTEREST
Certificate Number: 001
Units: 100

[Trust Name]
A [State] Business Trust

THIS CERTIFIES THAT
[Grantor Name]

is the registered holder of ONE HUNDRED (100) Units of Beneficial Interest in the [Trust Name].

This Certificate and the units represented hereby are issued and shall be held subject to all of the provisions of the Declaration of Trust of [Trust Name], dated [Date].

Transferability: These units are transferable only on the books of the Trust by the holder hereof in person or by Attorney upon surrender of this Certificate properly endorsed.

IN WITNESS WHEREOF, the Trust has caused this Certificate to be signed by its duly authorized Trustees this [Date].

_______________________________
[Trustee Name], Trustee

_______________________________
Secretary/Trustee

(Trust Seal)`
  },
  {
    id: "holding-llc-oa",
    title: "Holding LLC Operating Agreement",
    category: "Sovereign",
    description: "Operating Agreement for a Wyoming Holding Company. This entity is designed to hold assets and is managed by the Trust.",
    content: `OPERATING AGREEMENT FOR [Holding Co Name]

THIS OPERATING AGREEMENT is made and entered into as of [Date], by [Trust Name] (the "Member").

ARTICLE I: ORGANIZATION
1.1 Name. The name of the limited liability company is [Holding Co Name] (the "Company").
1.2 Jurisdiction. The Company is organized under the laws of the State of [State].
1.3 Principal Office. The principal office of the Company shall be located at [Holding Co Street], [Holding Co City], [Holding Co State] [Holding Co Zip].

ARTICLE II: PURPOSE
The Company is organized for the purpose of holding title to assets, securities, and intellectual property.

ARTICLE III: MEMBER
3.1 Sole Member. The Sole Member of the Company is [Trust Name].
3.2 Liability. The Member shall not be personally liable for any debt, obligation, or liability of the Company.

ARTICLE IV: MANAGEMENT
4.1 Management. The Company shall be Manager-Managed.
4.2 Manager. The Initial Manager shall be [Trustee Name].

ARTICLE V: CHARGING ORDER PROTECTION
To the fullest extent permitted by [State] law, the exclusive remedy of a judgment creditor of a Member shall be a Charging Order against the Member's transferable interest. A judgment creditor shall have no right to vote, inspect books, or force the liquidation of the Company.

IN WITNESS WHEREOF, the Member has executed this Agreement.

_________________________________
[Trust Name], Sole Member

${NOTARY_BLOCK}`
  },
  {
    id: "operating-llc-oa",
    title: "Operating LLC Operating Agreement",
    category: "Sovereign",
    description: "Operating Agreement for the Operating Company. This entity faces the public, takes risks, and is 100% owned by the Holding Company.",
    content: `OPERATING AGREEMENT FOR [Operating Co Name]

THIS OPERATING AGREEMENT is made and entered into as of [Date].

ARTICLE I: ORGANIZATION
1.1 Name. The name of the limited liability company is [Operating Co Name].
1.2 Ownership. The Company is 100% owned by [Holding Co Name] (the "Parent").
1.3 Principal Office. The principal office of the Company shall be located at [Operating Co Street], [Operating Co City], [Operating Co State] [Operating Co Zip].

ARTICLE II: MANAGEMENT
2.1 Manager. The Company shall be managed by its Manager(s).
2.2 Duties. The Manager shall conduct the day-to-day business operations.

ARTICLE III: DISTRIBUTIONS
Distributions of cash or other assets shall be made to the Parent at such times as the Manager deems appropriate.

ARTICLE IV: INDEMNIFICATION
The Company shall indemnify the Manager and the Parent against all liability and loss in connection with the business of the Company.

_________________________________
[Holding Co Name], Member

${NOTARY_BLOCK}`
  },
  {
    id: "equity-strip-note",
    title: "Inter-Company Promissory Note",
    category: "Sovereign",
    description: "An instrument used to strip equity from the Operating Company. The Operating Company owes a debt to the Holding Company, securing assets against potential lawsuits.",
    content: `SECURED PROMISSORY NOTE

PRINCIPAL: $ [Amount]
DATE: [Date]

FOR VALUE RECEIVED, [Operating Co Name] ("Borrower"), promises to pay to [Holding Co Name] ("Lender"), the principal sum of [Amount], with interest at the rate of [Interest Rate]% per annum.

1. PAYMENT
Payments of interest only shall be made annually. Principal shall be due upon demand.

2. SECURITY
This Note is secured by a General Security Agreement pledging all assets of the Borrower.

3. DEFAULT
In the event of default, the Lender may declare the entire unpaid principal and accrued interest immediately due and payable.

_________________________________
[Operating Co Name], Borrower

${NOTARY_BLOCK}`
  },
  {
    id: "cert-trust-banking",
    title: "Certification of Trust",
    category: "Banking",
    description: "The primary document required by banks to open an account. It proves the trust exists and identifies the Trustees without revealing private assets or beneficiaries.",
    content: `CERTIFICATION OF TRUST

TO: Any Bank, Brokerage Firm, Title Insurance Company, or Transfer Agent.

1. Existence of Trust. The undersigned Trustees hereby certify that the "[Trust Name]" was created on [Date] and is currently in full force and effect.

2. Tax ID Number. The Taxpayer Identification Number (EIN) for the Trust is: ___________________.

3. Current Trustees. The currently acting Trustees are:
[Trustee Name]

4. Powers of Trustees. The Trustees have the power to open accounts, sign checks, buy and sell securities, and borrow money on behalf of the Trust. A copy of the "Trustee Powers" article from the Trust Agreement is attached hereto.

5. Revocability. The Trust is Revocable. The person holding the power to revoke is: [Grantor Name].

6. Authority to Act. [X] Any Trustee may act alone.  [ ] All Trustees must sign.

7. No Revocation. The undersigned certify that the Trust has not been revoked, modified, or amended in any manner that would cause the representations contained in this Certification to be incorrect.

8. Reliance. This Certification is made in accordance with [State] Probate Code/Uniform Trust Code. Any person acting in reliance on this Certification shall be held harmless from any liability.

EXECUTED this [Date].

_______________________________
[Trustee Name], Trustee

${NOTARY_BLOCK}`
  },
  {
    id: "banking-resolution",
    title: "Trustee Banking Resolution & Authority",
    category: "Banking",
    description: "A formal corporate-style resolution authorizing the Trustees to open specific accounts and designating authorized signers. Often required by compliance departments.",
    content: `RESOLUTION OF TRUSTEES
OF THE
[Trust Name]

HELD ON: [Date].

PRESENT: The undersigned, being all of the Trustees of the above-named Trust.

WHEREAS, it is in the best interest of the Trust to establish a financial relationship with Authorized Bank;

NOW, THEREFORE, BE IT RESOLVED:

1. Open Account. That the Trustees are authorized to open a [Checking / Savings / Investment] account in the name of the Trust with Authorized Bank.

2. Authorized Signers. That the following individuals are designated as authorized signers on said account(s):
   Name: [Trustee Name] Title: Trustee

3. Authority. That said Bank is authorized to honor all checks, drafts, and orders for the payment of money drawn on said accounts when signed by the authorized persons designated above.

4. Endorsements. That the Trustees may endorse checks and other instruments for deposit.

5. Certification. That this Resolution shall remain in full force and effect until written notice of its revocation is delivered to the Bank.

IN WITNESS WHEREOF, the Trustees have executed this Resolution on the date first above written.

_______________________________
[Trustee Name], Trustee`
  },
  {
    id: "credit-resolution",
    title: "Resolution Authorizing Corporate Credit",
    category: "Banking",
    description: "A resolution authorizing the Trustees to apply for corporate credit cards, lines of credit, and vendor accounts (Tier 1-3) on behalf of the Trust.",
    content: `RESOLUTION OF TRUSTEES TO ESTABLISH CORPORATE CREDIT
OF THE
[Trust Name]

DATE: [Date]

WHEREAS, the Trust requires access to corporate credit facilities to fund its operations and separate liability from the Grantor;

BE IT RESOLVED:

1. Application Authority. The Trustees are authorized to apply for business credit cards, charge accounts, and lines of credit in the name of the Trust.

2. Vendor Accounts. The Trustees are authorized to establish "Net-30" trade credit accounts with vendors including but not limited to Uline, Quill, and Grainger for the purpose of establishing a D&B Paydex score.

3. Dun & Bradstreet. The Trustees are authorized to register the Trust for a D-U-N-S number.

4. Personal Guarantee Election. The Trustees have reviewed the options for credit building and hereby elect:
   [ ] SOVEREIGN PATH: We elect NOT to provide a Personal Guarantee (PG). We understand this requires building Tier 1-3 vendor credit over 6-12 months.
   [ ] ACCELERATED PATH: We elect to provide a Personal Guarantee (PG) to obtain immediate funding (e.g. Chase Ink, Amex). We understand this links personal liability to the specific debt incurred.

5. Execution. The Trustees are authorized to sign all applications, credit agreements, and guarantees necessary to effectuate this resolution.

IN WITNESS WHEREOF, the Trustees have executed this Resolution.

_______________________________
[Trustee Name], Trustee`
  },
  {
    id: "trust-minutes-initial",
    title: "Minutes of First Meeting of Trustees",
    category: "Banking",
    description: "Formal minutes documenting the acceptance of the Trust and initial funding. Essential for proving corporate formalities to banks and the IRS.",
    content: `MINUTES OF THE FIRST MEETING OF THE TRUSTEES
OF THE
[Trust Name]

DATE: [Date]
LOCATION: [Address]

1. Call to Order. The meeting was called to order by [Trustee Name], acting as Chairperson.

2. Acceptance of Trust. The Trustees formally accepted their appointment under the Declaration of Trust dated [Date] and agreed to serve in accordance with its terms.

3. Adoption of Trust Agreement. The Trust Agreement was presented, reviewed, and inserted into the Minute Book.

4. Initial Funding. The Trustees acknowledged receipt of the initial Trust property listed in Schedule A (Initial Corpus), consisting of $10.00 or other property.

5. Application for EIN. The Trustees resolved to apply for a Federal Employer Identification Number (EIN) from the IRS for banking purposes.

6. Banking Resolution. The Trustees unanimously adopted a resolution to open a bank account at Authorized Bank and authorized the necessary signatories.

7. Adjournment. There being no further business, the meeting was adjourned.

_______________________________
[Trustee Name], Trustee`
  },
  {
    id: "trust-minutes-template",
    title: "Minutes of Meeting of Trustees (Template)",
    category: "Banking",
    description: "A reusable blank template for documenting future decisions, distributions, or amendments by the Board of Trustees.",
    content: `MINUTES OF A MEETING OF THE TRUSTEES
OF THE
[Trust Name]

DATE: _______________________
LOCATION: _______________________

PRESENT:
_______________________________ (Trustee)
_______________________________ (Trustee)

1. CALL TO ORDER
The meeting was called to order by the Chairperson.

2. PURPOSE OF MEETING
The purpose of the meeting was to discuss and vote upon the following matters:
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________

3. RESOLUTIONS ADOPTED
After discussion, the following resolutions were duly adopted by the Trustees:

RESOLVED, that:
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________
_________________________________________________________________________

4. ADJOURNMENT
There being no further business, the meeting was adjourned.

_______________________________
Trustee Signature

_______________________________
Trustee Signature`
  },
  {
    id: "ein-banking-guide",
    title: "EIN Application Guide & Banking Instructions",
    category: "Banking",
    description: "A cheat sheet containing the exact information needed to apply for your Trust's Tax ID (EIN) on the IRS website, plus instructions for the bank interview.",
    content: `BANKING & TAX SETUP GUIDE

PART 1: APPLY FOR YOUR EIN (TAX ID)

To open a bank account, your Trust needs a Federal Employer Identification Number (EIN). This is like a Social Security Number for your Trust.

1. Go to the Official IRS Website:
https://sa.www4.irs.gov/modiein/individual/index.jsp

2. Select Entity Type:
Choose "Trusts" -> "Irrevocable Trust" (or Revocable if you prefer, but Irrevocable is often selected for pure asset protection structures, consult your CPA).

3. Enter Data as Follows:
* Responsible Party: [Grantor Name]
* SSN of Responsible Party: [Enter your personal SSN]
* Trust Name: [Trust Name]
* Date Funded: [Date] (Today's date)

4. Download PDF:
At the end of the wizard, download the CP 575 G letter. This is your official EIN proof.

---

PART 2: WHAT TO BRING TO THE BANK

When you go to the bank (Chase, Wells Fargo, local Credit Union), bring the following "Trust Binder":

1. Certification of Trust: (Included in this packet). Do NOT bring the full Trust Agreement unless they demand it. The Certification protects your privacy.
2. IRS EIN Letter (CP 575): The document you downloaded above.
3. Trustee Banking Resolution: (Included in this packet). Shows you have authority to sign.
4. Driver's License / Passport: For ID verification.

Banker Script:
"I need to open a non-interest-bearing checking account for a Trust. I have my Certification of Trust and my EIN letter ready."
`
  },
  {
    id: "nesting-doll-guide",
    title: "The Nesting Doll Protocol (Execution Guide)",
    category: "Strategy",
    description: "A step-by-step master guide on how to layer your Trust and LLCs to achieve maximum anonymity while remaining fully banking compliant.",
    content: `THE NESTING DOLL PROTOCOL
STRATEGIC EXECUTION GUIDE

OBJECTIVE: To operate a business or hold assets with complete public anonymity while maintaining full banking compliance.

THE CORE CONCEPT
We do not use "offshore secrecy" or illegal hiding methods. We use LAYERS.
Imagine a Russian Nesting Doll. The public sees the outer doll. The bank sees the inner dolls.

---

LAYER 1: THE PUBLIC FACE (THE OUTER DOLL)
The Entity: An Anonymous LLC (e.g., "[LLC Name]")
Jurisdiction: Wyoming, Delaware, or New Mexico (States that do not list members).
The Function:
* Signs contracts.
* Interacts with customers/tenants.
* Takes the legal risk.
Public Records:
* Manager: [Nominee/Attorney Name] (or "Manager-Managed")
* Address: Registered Agent Address.
* You are NOT listed here.

---

LAYER 2: THE PRIVATE OWNER (THE MIDDLE DOLL)
The Entity: The Trust (e.g., "[Trust Name]")
The Function:
* Owns 100% of the LLC.
* The "Member" listed in the LLC's Operating Agreement is the Trust.
Private Records:
* This link is Private. It is only seen by the Bank and the IRS.

---

LAYER 3: THE BENEFICIAL OWNER (THE INNER DOLL)
The Person: [Grantor Name] (You)
The Function:
* You are the Trustee of the Trust (Control).
* You are the Beneficiary of the Trust (Benefit).
The Hidden Reality:
* You control the Trust.
* The Trust controls the LLC.
* Therefore, You control the LLC.
* BUT: Your name never appears on the LLC's public filings.

---

BANKING COMPLIANCE (KYC)
The Bank must know the "Ultimate Beneficial Owner" (UBO). Do not try to hide this from them.

What to give the Banker:
1. Articles of Organization: Shows Layer 1 (The LLC).
2. EIN Letter: Shows the LLC's tax ID.
3. Operating Agreement: Shows the LLC is owned by Layer 2 (The Trust).
4. Certificate of Trust: Shows you are the Trustee of Layer 2.

Result: The Bank is happy (they know who you are). The Public is blocked (they only see Layer 1).

EXECUTED PLAN FOR: [Grantor Name]
DATE: [Date]`
  }
];

export function getMasterTemplates(): LegalTemplate[] {
  return MASTER_TEMPLATES;
}

export function fillTemplate(templateContent: string, data: Record<string, string>): string {
    let content = templateContent;
    
    // Default today's date if not provided
    if (!data['Date']) {
        data['Date'] = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Replace keys like [Trust Name]
    Object.keys(data).forEach(key => {
        // Escape special regex chars if any
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
    // Filter out checkboxes (X or empty space) or very short markers
    if (key.length > 1 && !['x', 'X', ' '].includes(key)) {
        matches.add(key);
    }
  }
  return Array.from(matches).sort();
}

export function generateTrustPacket(type: string, data: TrustWizardData): GeneratedDocument[] {
    const templates = getMasterTemplates();
    const packet: GeneratedDocument[] = [];
    
    // Select templates based on type
    // Ensure 'executive-summary' is always first
    let selectedIds: string[] = ['executive-summary'];
    
    // ALL packets get the EIN guide now for banking
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
        // Handle Bulletproof 508c1a logic explicitly
        selectedIds.push('bulletproof-master', 'bulletproof-ein-guide', 'trust-minutes-template', 'credit-resolution');
    } else {
        selectedIds.push('rlt-master', 'pour-over-will', ...standardBanking);
    }

    // Fallback logic for address components
    const gStreet = data.settlorStreet || "________________";
    const gCity = data.settlorCity || "________________";
    const gState = data.settlorState || "________________";
    const gZip = data.settlorZip || "________________";
    
    const tStreet = data.initialTrusteeStreet || gStreet; // Default to settlor addr if same
    const tCity = data.initialTrusteeCity || gCity;
    const tState = data.initialTrusteeState || gState;
    const tZip = data.initialTrusteeZip || gZip;

    // Full string for legacy templates or generic "Address" fields
    const fullSettlorAddress = `${gStreet}, ${gCity}, ${gState} ${gZip}`;

    // Map Wizard Data to Template Keys
    const map: Record<string, string> = {
        "Trust Type": type, // NEW: Include trust type in map
        "Trust Name": data.name,
        "Grantor Name": data.settlorName,
        "Grantor/Creator": data.settlorName, // For Bulletproof
        "Trustee Name": data.initialTrustee,
        "Successor Trustee Name": data.successorTrustee || "TBD", // Bulletproof
        "Address": fullSettlorAddress, // Legacy support
        "State": data.jurisdiction, // For [State] (Jurisdiction)
        "Beneficiary Name": data.beneficiaries?.[0]?.name || "The Beneficiaries",
        "Assets": data.assets || "Cash and Securities",
        
        // Granular Keys for Grantor
        "Grantor Street": gStreet,
        "Grantor City": gCity,
        "Grantor State": gState,
        "Grantor Zip": gZip,

        // Granular Keys for Trustee
        "Trustee Street": tStreet,
        "Trustee City": tCity,
        "Trustee State": tState,
        "Trustee Zip": tZip,
        
        // Granular Keys for Trust (Business Trust) - default to Grantor for now
        "Trust Street": gStreet,
        "Trust City": gCity,
        "Trust State": gState,
        "Trust Zip": gZip,
    };

    selectedIds.forEach(id => {
        const t = templates.find(temp => temp.id === id);
        if (t) {
            // Special handling for Bulletproof variants
            if (id === 'bulletproof-master') {
                 // 1. Private Version (Prohibited)
                const privateMap = {
                    ...map,
                    "Commerce Clause": "PUBLIC COMMERCE PROHIBITED",
                    "Commerce Description": "This Trust is specifically prohibited from engaging in any form of public commerce. The Corpus of this Trust can be utilized only in private transactions of barter or other non-monetary operations."
                };
                packet.push({
                    title: "Private Trust (Standard / Private Realm)",
                    content: fillTemplate(t.content, privateMap)
                });

                // 2. Banking Version (Allowed)
                const publicMap = {
                    ...map,
                    "Commerce Clause": "PUBLIC COMMERCE ALLOWED",
                    "Commerce Description": "This Trust is specifically allowed to engage in public commerce. The Corpus of this Trust can be utilized in transactions of barter or other monetary operations."
                };
                packet.push({
                    title: "Private Trust (With EIN / Banking)",
                    content: fillTemplate(t.content, publicMap)
                });
            } else {
                packet.push({
                    title: t.title,
                    content: fillTemplate(t.content, map)
                });
            }
        }
    });

    return packet;
}

export function generateIronChainPacket(data: IronChainData): GeneratedDocument[] {
    const templates = getMasterTemplates();
    const packet: GeneratedDocument[] = [];
    
    // Explicit list for Sovereign Tier
    const selectedIds = ['holding-llc-oa', 'operating-llc-oa', 'equity-strip-note', 'business-trust-master', 'beneficial-interest-cert', 'banking-resolution', 'credit-resolution', 'trust-minutes-template', 'ein-banking-guide'];

    // Construct addresses from granular fields for mapping
    const trustAddress = `${data.trustStreet}, ${data.trustCity}, ${data.trustState} ${data.trustZip}`;
    const holdingCoAddress = `${data.holdingCoStreet}, ${data.holdingCoCity}, ${data.holdingCoState} ${data.holdingCoZip}`;
    const operatingCoAddress = `${data.operatingCoStreet}, ${data.operatingCoCity}, ${data.operatingCoState} ${data.operatingCoZip}`;

    const map: Record<string, string> = {
        "Trust Name": data.trustName,
        "Holding Co Name": data.holdingCoName,
        "Operating Co Name": data.operatingCoName,
        "State": data.jurisdiction,
        "Trustee Name": "The Trustee", // Generic or could be passed
        "Grantor Name": "The Manager",
        "Amount": "100,000.00",
        "Interest Rate": "5.0",
        
        // Legacy Map
        "Address": trustAddress, 
        "Holding Co Address": holdingCoAddress,
        "Operating Co Address": operatingCoAddress,

        // Granular Map - Trust
        "Trust Street": data.trustStreet,
        "Trust City": data.trustCity,
        "Trust State": data.trustState,
        "Trust Zip": data.trustZip,

        // Granular Map - Holding
        "Holding Co Street": data.holdingCoStreet,
        "Holding Co City": data.holdingCoCity,
        "Holding Co State": data.holdingCoState,
        "Holding Co Zip": data.holdingCoZip,

        // Granular Map - Operating
        "Operating Co Street": data.operatingCoStreet,
        "Operating Co City": data.operatingCoCity,
        "Operating Co State": data.operatingCoState,
        "Operating Co Zip": data.operatingCoZip,
    };

    selectedIds.forEach(id => {
        const t = templates.find(temp => temp.id === id);
        if (t) {
            packet.push({
                title: t.title,
                content: fillTemplate(t.content, map)
            });
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
  address: string; // Legacy support
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
    "State": data.state, // Jurisdiction
    "Address": data.address, // Full string legacy
    
    // Granular Keys
    "Trust Street": data.street,
    "Trust City": data.city,
    "Trust State": data.state, // Usually same as jurisdiction for situs
    "Trust Zip": data.zip,
  };

  // 1. Private Version (Prohibited)
  if (masterTemplate) {
    const privateMap = {
      ...map,
      "Commerce Clause": "PUBLIC COMMERCE PROHIBITED",
      "Commerce Description": "This Trust is specifically prohibited from engaging in any form of public commerce. The Corpus of this Trust can be utilized only in private transactions of barter or other non-monetary operations."
    };
    packet.push({
      title: "Private Trust (Standard / Private Realm)",
      content: fillTemplate(masterTemplate.content, privateMap)
    });

    // 2. Banking Version (Allowed)
    const publicMap = {
      ...map,
      "Commerce Clause": "PUBLIC COMMERCE ALLOWED",
      "Commerce Description": "This Trust is specifically allowed to engage in public commerce. The Corpus of this Trust can be utilized in transactions of barter or other monetary operations."
    };
    packet.push({
      title: "Private Trust (With EIN / Banking)",
      content: fillTemplate(masterTemplate.content, publicMap)
    });
  }

  // 3. Guide
  if (guideTemplate) {
    packet.push({
      title: guideTemplate.title,
      content: fillTemplate(guideTemplate.content, map)
    });
  }
  
  // 4. Minutes Template
  if (minutesTemplate) {
    packet.push({
        title: minutesTemplate.title,
        content: fillTemplate(minutesTemplate.content, map)
    });
  }

  // 5. Credit Resolution
  if (creditTemplate) {
      packet.push({
          title: creditTemplate.title,
          content: fillTemplate(creditTemplate.content, map)
      });
  }

  return packet;
}