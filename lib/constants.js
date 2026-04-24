import {
  FlaskConical, Factory, Pill, Wrench, Landmark, ShieldAlert, Heart, Layers,
  BookOpen, Users, Clock,
} from 'lucide-react';

// =============================================================================
// Industries — step 2
// =============================================================================

export const INDUSTRIES = [
  { id: 'chem', label: 'Chemicals / Coatings / Materials', icon: FlaskConical },
  { id: 'auto', label: 'Automotive & Supplier', icon: Factory },
  { id: 'pharma', label: 'Pharma / Life Sciences', icon: Pill },
  { id: 'discrete', label: 'Discrete / Industrial', icon: Wrench },
  { id: 'banking', label: 'Banking & Financial Services', icon: Landmark },
  { id: 'defence', label: 'R&D / Defence / Government', icon: ShieldAlert },
  { id: 'health', label: 'Healthcare', icon: Heart },
  { id: 'other', label: 'Other', icon: Layers },
];

// =============================================================================
// Agent cards — AI Intime's three shipped, productized agents
// =============================================================================

export const AGENT_CARDS = [
  {
    id: 'lab-reports',
    name: 'Lab Reports – Knowledge Twin',
    pain: "Thousands of test reports locked in PDFs, DOCX, XLSX. Scientists can't trend parameters or query across batches.",
    what: 'Ingests PDF/DOCX/XLSX/JCAMP-DX/SDF. Extracts parameters, methods, samples. Natural-language chat with citations. Multi-language. Regulatory-grade correction workflow.',
    query: '"Give me the trend of iron for material RDY692_25_0099."',
    anchor: 'Deployed in automotive coatings / chemicals labs. Cuts regulatory submission compilation from 20–40 hours to minutes.',
  },
  {
    id: 'insight-edge',
    name: 'Insight Edge',
    pain: 'Getting answers from MES/QMS/CMMS/ERP requires dashboards or analysts writing SQL. Long-tail operational questions never get asked.',
    what: '6-agent pipeline: Intent → Schema → Query → Viz Selection → Render → NL Insight. Natural language in, chart + plain-English insight out. Role-scoped.',
    query: '"Compare Site A vs Site B energy use this month."',
    anchor: 'Replaces manual Power BI development for 70%+ of standard operational questions.',
  },
  {
    id: 'support-email',
    name: 'Customer Support Email Agent',
    pain: 'Support teams handling repetitive email queries: order status, shipment tracking, CoA requests, escalations, invoices. 15–30 mins per question.',
    what: 'Ingests Outlook emails. Classifies intent. Retrieves from SAP + CRM + Logistics + QMS. Drafts ERP-grounded reply in seconds. Human-in-the-loop on escalations.',
    query: '"What\'s the viscosity spec for Mercedes Iridium Silver?" → 2 seconds.',
    anchor: '95%+ auto-resolution. 100% ERP-grounded. Zero hallucination.',
  },
];

// =============================================================================
// Impact frames — step 3 fallback (from AI Intime's pitch deck)
// =============================================================================

export const IMPACT_FRAMES = [
  { id: 'complexity', label: 'Complexity', desc: 'Too many stakeholders, scattered information, critical insights obscured.', icon: Layers },
  { id: 'documentation', label: 'Documentation', desc: 'Document overload buries what teams need to know.', icon: BookOpen },
  { id: 'human', label: 'Human', desc: 'When experts leave, their hard-won knowledge disappears.', icon: Users },
  { id: 'time', label: 'Time', desc: 'Critical decisions and rationale fade. Teams lose context.', icon: Clock },
];

// =============================================================================
// Stack layers — step 4
// =============================================================================

export const STACK_LAYERS = [
  { id: 'erp', label: 'ERP', options: ['SAP', 'Oracle', 'Microsoft Dynamics', 'Infor', 'Epicor'] },
  { id: 'mes', label: 'MES / Shop Floor', options: ['Vegam SFS', 'Rockwell FactoryTalk', 'Siemens Opcenter', 'AVEVA Wonderware', 'Honeywell', 'GE Proficy'] },
  { id: 'lims', label: 'LIMS / Lab Systems', options: ['LabWare', 'STARLIMS', 'Thermo SampleManager', 'LabVantage', 'Custom / In-house'] },
  { id: 'qms', label: 'QMS', options: ['ETQ', 'MasterControl', 'Veeva', 'TrackWise', 'Custom'] },
  { id: 'cmms', label: 'CMMS / EAM', options: ['IBM Maximo', 'SAP PM', 'Infor EAM', 'Fiix', 'eMaint'] },
  { id: 'docs', label: 'Document / Knowledge', options: ['SharePoint', 'Documentum', 'Confluence', 'OneDrive', 'Google Drive', 'Network drives'] },
  { id: 'comms', label: 'Communications', options: ['Outlook', 'Gmail', 'Microsoft Teams', 'Slack'] },
  { id: 'crm', label: 'CRM', options: ['Salesforce', 'HubSpot', 'Microsoft Dynamics CRM', 'Zoho', 'SAP CX'] },
  { id: 'data', label: 'Data Platforms', options: ['Snowflake', 'Databricks', 'Azure Synapse', 'AWS Redshift', 'On-prem data lake'] },
  { id: 'cloud', label: 'Cloud Posture', options: ['On-prem / Air-gapped', 'Private cloud', 'Hybrid', 'AWS', 'Azure', 'GCP'] },
  { id: 'ai', label: 'Existing AI', options: ['Microsoft Copilot', 'ChatGPT Enterprise', 'Gemini', 'Internal GPT wrapper', 'None'] },
];

// =============================================================================
// Compliance, outcomes, roles — various steps
// =============================================================================

export const COMPLIANCE_OPTIONS = [
  'GDPR', 'HIPAA', 'FDA 21 CFR Part 11', 'GxP',
  'SOC 2', 'ISO 17025', 'Data residency', 'ITAR',
];

export const OUTCOMES = [
  'Cost reduction', 'Cycle-time reduction', 'Quality / compliance improvement',
  'Knowledge retention', 'Capacity freed for strategic work', 'Risk reduction',
  'Faster onboarding', 'Faster support',
];

export const COMPANY_SIZES = [
  { id: 'sm', label: 'Under 500' },
  { id: 'md', label: '500 – 2,000' },
  { id: 'lg', label: '2,000 – 10,000' },
  { id: 'xl', label: '10,000+' },
];

export const ROLES = [
  'CIO / CTO', 'Head of Digital', 'Plant / Ops',
  'Quality / Compliance', 'Innovation / R&D', 'Data / AI Lead', 'Other',
];

// =============================================================================
// Generation screen — copy shown during the reveal animation
// =============================================================================

export const GENERATION_STEPS = [
  'Mapping your stack to the AI Intime framework',
  'Configuring MCP integrations',
  'Applying compliance layer',
  'Scoping the agent to your role',
  'Rendering your blueprint',
];

// =============================================================================
// MCP function mock — used by the architecture diagram to populate
// example functions on integration nodes. Replace with backend rules-based
// mapping when the server-side generator lands.
// =============================================================================

export const FUNC_DEFAULTS = {
  'SAP': ['get_customer_master', 'check_inventory', 'post_goods_issue'],
  'Vegam SFS': ['oee_reports', 'quality_qc', 'rm_report'],
  'Oracle': ['fetch_records', 'query_table'],
  'Outlook': ['parse_email', 'send_response'],
  'Salesforce': ['get_account', 'log_case'],
  'SharePoint': ['search_docs', 'fetch_file'],
  'LabWare': ['get_test_results', 'fetch_sample'],
  '*': ['query', 'read', 'action'],
};
