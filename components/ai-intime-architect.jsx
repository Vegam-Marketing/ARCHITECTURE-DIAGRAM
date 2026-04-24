'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight, ArrowLeft, Check, Shield, Lock, ChevronRight, Plus,
  Database, Sparkles, AlertCircle,
  Download, Share2, Calendar, X, Eye,
} from 'lucide-react';
import {
  INDUSTRIES, AGENT_CARDS, IMPACT_FRAMES, STACK_LAYERS, COMPLIANCE_OPTIONS,
  OUTCOMES, COMPANY_SIZES, ROLES, GENERATION_STEPS, FUNC_DEFAULTS,
} from '@/lib/constants';

// =============================================================================
// AI INTIME ARCHITECT
// Sovereign AI blueprint generator — frontend prototype.
// Backend integration (Claude + RAG + PDF) lands in a follow-up phase.
// =============================================================================

// =============================================================================
// MAIN APP
// =============================================================================

export default function AIIntimeArchitect() {
  const [step, setStep] = useState('landing');
  const [data, setData] = useState({
    company: { name: '', size: '', role: '' },
    industry: '',
    painPath: 'cards', // 'cards' | 'custom' | 'impact'
    selectedAgents: [],
    urgentAgent: '',
    customPain: '',
    selectedImpact: '',
    stack: {}, // { erp: ['SAP'], mes: ['Vegam SFS'], ...}
    stackOthers: {}, // { erp: {name: 'X', desc: 'Y'}, ...}
    compliance: [],
    wearable: false,
    outcomes: [],
    email: '',
  });

  const update = (patch) => setData(d => ({ ...d, ...patch }));
  const updateCompany = (patch) => setData(d => ({ ...d, company: { ...d.company, ...patch } }));

  // Flow map — which step follows which
  const STEP_ORDER = ['landing', 'company', 'industry', 'pain', 'stack', 'outcome', 'generating', 'reveal'];
  const currentIndex = STEP_ORDER.indexOf(step);
  const progressIndex = Math.max(0, Math.min(currentIndex - 1, 4)); // 0..4 for the 5 numbered steps

  const goNext = () => setStep(STEP_ORDER[currentIndex + 1]);
  const goBack = () => setStep(STEP_ORDER[Math.max(0, currentIndex - 1)]);
  const goTo = (s) => setStep(s);

  return (
    <div className="min-h-screen w-full bg-black text-stone-200 antialiased font-body overflow-x-hidden">

      {/* Top assurance bar */}
      {step !== 'landing' && (
        <div className="border-b border-stone-800/80 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between text-[11px] font-mono-ibm uppercase tracking-wider">
            <div className="flex items-center gap-2 text-stone-400">
              <Lock className="w-3 h-3 text-[#d97642]" />
              <span>Your inputs stay inside our environment · Zero telemetry · No third-party model training</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-stone-500">
              <span>AI INTIME / ARCHITECT</span>
              <span className="text-stone-700">v0.1</span>
            </div>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {step !== 'landing' && step !== 'generating' && step !== 'reveal' && (
        <ProgressBar currentIndex={progressIndex} />
      )}

      {/* Step content */}
      {step === 'landing'     && <Landing onStart={() => goTo('company')} />}
      {step === 'company'     && <CompanyStep data={data} updateCompany={updateCompany} onNext={goNext} onBack={() => goTo('landing')} />}
      {step === 'industry'    && <IndustryStep data={data} update={update} onNext={goNext} onBack={goBack} />}
      {step === 'pain'        && <PainStep data={data} update={update} onNext={goNext} onBack={goBack} />}
      {step === 'stack'       && <StackStep data={data} update={update} onNext={goNext} onBack={goBack} />}
      {step === 'outcome'     && <OutcomeStep data={data} update={update} onNext={goNext} onBack={goBack} />}
      {step === 'generating'  && <Generating onDone={() => goTo('reveal')} />}
      {step === 'reveal'      && <RevealScreen data={data} />}
    </div>
  );
}

// =============================================================================
// PROGRESS BAR
// =============================================================================

function ProgressBar({ currentIndex }) {
  const labels = ['Company', 'Industry', 'Pain', 'Stack', 'Outcome'];
  return (
    <div className="border-b border-stone-800/80 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
        {labels.map((label, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 flex items-center justify-center text-[10px] font-mono-ibm border ${
                  active ? 'border-[#d97642] text-[#d97642]' :
                  done ? 'border-stone-600 text-stone-400 bg-stone-800/50' :
                  'border-stone-800 text-stone-600'
                }`}>
                  {done ? <Check className="w-3 h-3" /> : String(i + 1).padStart(2, '0')}
                </div>
                <span className={`text-xs uppercase tracking-wider font-mono-ibm ${
                  active ? 'text-stone-200' : done ? 'text-stone-500' : 'text-stone-700'
                }`}>
                  {label}
                </span>
              </div>
              {i < labels.length - 1 && (
                <div className={`flex-1 h-px ${done ? 'bg-stone-600' : 'bg-stone-800'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// LANDING PAGE
// =============================================================================

function Landing({ onStart }) {
  return (
    <div className="relative min-h-screen blueprint-grid">
      <div className="absolute inset-0 vignette pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-[#d97642] flex items-center justify-center">
            <div className="w-3 h-3 bg-[#d97642]" />
          </div>
          <div className="font-mono-ibm text-sm tracking-wider">AI INTIME</div>
          <div className="hidden md:inline text-[10px] font-mono-ibm uppercase tracking-[0.2em] text-stone-600 pl-3 border-l border-stone-800 ml-2">
            Sovereign AI Platform
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono-ibm uppercase tracking-wider text-stone-500">
          <span className="hidden md:inline">By Vegam · 60 countries · 300+ plants</span>
          <a href="#" className="text-stone-300 hover:text-[#d97642] transition-colors">Book a strategy session</a>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono-ibm uppercase tracking-[0.2em] text-[#d97642] mb-8 border border-[#d97642]/30 px-3 py-1.5">
              <div className="w-1.5 h-1.5 bg-[#d97642] animate-pulse" />
              AI Intime Architect
            </div>

            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-stone-100 mb-6">
              Don&rsquo;t just pilot AI.
              <br />
              <span className="text-[#d97642]">Operationalize it.</span>
            </h1>

            <p className="text-lg text-stone-400 leading-relaxed mb-4 max-w-xl">
              In 10 minutes, get a custom agent blueprint and reference architecture mapped to your stack, your role, and your operational reality.
            </p>

            <p className="text-base text-stone-500 leading-relaxed mb-10 max-w-xl">
              Built on the same sovereign AI control plane deployed at BASF and Henkel via Vegam SFS. On-prem. Air-gapped. Governed.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onStart}
                className="group bg-[#d97642] hover:bg-[#c0652f] text-black font-mono-ibm text-sm uppercase tracking-wider px-8 py-4 flex items-center gap-3 transition-colors"
              >
                Build your blueprint
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="text-xs font-mono-ibm uppercase tracking-wider text-stone-500">
                No signup · PDF & share link at the end
              </div>
            </div>

            {/* Sovereignty band */}
            <div className="mt-14 pt-8 border-t border-stone-800/80">
              <div className="text-[10px] font-mono-ibm uppercase tracking-[0.2em] text-stone-600 mb-4">
                Built for accountability, not just capability
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'On-prem / Air-gapped', icon: Lock },
                  { label: 'Zero telemetry', icon: Shield },
                  { label: 'Per-user knowledge vaults', icon: Database },
                  { label: 'RBAC & audit trail', icon: Eye },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <item.icon className="w-3.5 h-3.5 text-[#d97642] mt-0.5 shrink-0" />
                    <span className="text-xs font-mono-ibm uppercase tracking-wider text-stone-400 leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — preview architecture */}
          <div className="md:col-span-5">
            <MiniArchitecturePreview />
          </div>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-stone-800/80 relative z-10 flex items-center justify-between text-xs font-mono-ibm uppercase tracking-wider text-stone-600">
        <div>© AI Intime · Vegam Solutions Inc.</div>
        <div className="flex items-center gap-4">
          <span>USA · Dubai · India · Singapore</span>
          <span className="text-stone-500">info@aiintime.com</span>
        </div>
      </footer>
    </div>
  );
}

function MiniArchitecturePreview() {
  const layers = [
    { label: 'Human Interfaces', nodes: ['Chat', 'Voice', 'Streams'] },
    { label: 'Data Sources', nodes: ['SAP', 'SFS', 'SharePoint'] },
    { label: 'Orchestration', nodes: ['Intent', 'Reasoning', 'Validation'] },
    { label: 'Framework Services', nodes: ['RAG', 'Models', 'Governance'] },
    { label: 'MCP Integrations', nodes: ['SAP MCP', 'SFS MCP', 'QMS MCP'] },
  ];

  return (
    <div className="bracket-frame bg-[#0a0a0a] p-5 relative">
      <div className="br-tr" /><div className="br-bl" />
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] font-mono-ibm uppercase tracking-[0.15em] text-[#d97642]">
          Sample Architecture
        </div>
        <div className="text-[10px] font-mono-ibm uppercase tracking-wider text-stone-600">
          Your output →
        </div>
      </div>
      <div className="space-y-2">
        {layers.map((layer, i) => (
          <div key={i} className="space-y-1.5" style={{ animation: `fadeUp 0.5s ease-out ${i * 0.1}s both` }}>
            <div className="text-[9px] font-mono-ibm uppercase tracking-[0.15em] text-stone-500">
              L{i + 1} · {layer.label}
            </div>
            <div className="flex gap-1.5">
              {layer.nodes.map((n, j) => (
                <div key={j} className="flex-1 border border-stone-800 bg-stone-900/40 px-2 py-1.5 text-[10px] font-mono-ibm text-stone-400 text-center">
                  {n}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-stone-800 text-[10px] font-mono-ibm uppercase tracking-wider text-stone-600 flex items-center justify-between">
        <span>generated per submission</span>
        <span className="text-[#d97642]/70">● live</span>
      </div>
    </div>
  );
}

// =============================================================================
// SHARED STEP WRAPPER
// =============================================================================

function StepShell({ eyebrow, title, subtitle, children, onNext, onBack, canContinue = true, nextLabel = 'Continue' }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-[calc(100vh-120px)] flex flex-col">
      <div className="fade-up mb-10">
        <div className="text-[11px] font-mono-ibm uppercase tracking-[0.2em] text-[#d97642] mb-3">
          {eyebrow}
        </div>
        <h2 className="font-display text-4xl text-stone-100 mb-3 leading-tight">{title}</h2>
        {subtitle && <p className="text-stone-400 text-base max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>

      <div className="flex-1">{children}</div>

      <div className="mt-12 pt-6 border-t border-stone-800/80 flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-mono-ibm text-xs uppercase tracking-wider text-stone-500 hover:text-stone-300 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`font-mono-ibm text-sm uppercase tracking-wider px-7 py-3 flex items-center gap-3 transition-colors ${
            canContinue
              ? 'bg-[#d97642] hover:bg-[#c0652f] text-black'
              : 'bg-stone-800 text-stone-600 cursor-not-allowed'
          }`}
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// STEP 1 — COMPANY
// =============================================================================

function CompanyStep({ data, updateCompany, onNext, onBack }) {
  const { name, size, role } = data.company;
  const canContinue = name.trim().length > 0 && size && role;

  return (
    <StepShell
      eyebrow="Step 01 · Company context"
      title="Tell us about your team."
      subtitle="We use this to write the brief in language appropriate for your role and the scale of your operation."
      onNext={onNext}
      onBack={onBack}
      canContinue={canContinue}
    >
      <div className="space-y-8">
        <Field label="Company name">
          <input
            type="text"
            value={name}
            onChange={(e) => updateCompany({ name: e.target.value })}
            placeholder="e.g. Acme Coatings"
            className="w-full bg-transparent border-b border-stone-700 focus:border-[#d97642] outline-none py-3 text-xl font-display text-stone-100 placeholder:text-stone-700 transition-colors"
          />
        </Field>

        <Field label="Company size">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {COMPANY_SIZES.map(s => (
              <TileOption
                key={s.id}
                selected={size === s.id}
                onClick={() => updateCompany({ size: s.id })}
                label={s.label}
              />
            ))}
          </div>
        </Field>

        <Field label="Your role">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {ROLES.map(r => (
              <TileOption
                key={r}
                selected={role === r}
                onClick={() => updateCompany({ role: r })}
                label={r}
              />
            ))}
          </div>
        </Field>
      </div>
    </StepShell>
  );
}

// =============================================================================
// STEP 2 — INDUSTRY
// =============================================================================

function IndustryStep({ data, update, onNext, onBack }) {
  return (
    <StepShell
      eyebrow="Step 02 · Industry"
      title="What sector do you operate in?"
      subtitle="This branches the agent patterns, compliance layer, and example integrations we recommend."
      onNext={onNext}
      onBack={onBack}
      canContinue={!!data.industry}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {INDUSTRIES.map(ind => {
          const Icon = ind.icon;
          const selected = data.industry === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => update({ industry: ind.id })}
              className={`bracket-frame group text-left p-5 transition-all ${
                selected
                  ? 'bg-stone-900/60 border border-[#d97642]/50'
                  : 'bg-[#0a0a0a] border border-stone-800 hover:border-stone-700'
              }`}
            >
              {selected && (<><div className="br-tr" /><div className="br-bl" /></>)}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 flex items-center justify-center border ${
                  selected ? 'border-[#d97642] text-[#d97642]' : 'border-stone-700 text-stone-500 group-hover:border-stone-600 group-hover:text-stone-400'
                } transition-colors`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="font-display text-lg text-stone-100 leading-tight">
                    {ind.label}
                  </div>
                </div>
                {selected && <div className="text-[#d97642]"><Check className="w-4 h-4" /></div>}
              </div>
            </button>
          );
        })}
      </div>
    </StepShell>
  );
}

// =============================================================================
// STEP 3 — PAIN (THREE PATHS)
// =============================================================================

function PainStep({ data, update, onNext, onBack }) {
  const { painPath, selectedAgents, urgentAgent, customPain, selectedImpact } = data;

  const toggleAgent = (id) => {
    const next = selectedAgents.includes(id)
      ? selectedAgents.filter(a => a !== id)
      : [...selectedAgents, id];
    update({ selectedAgents: next, urgentAgent: next.includes(urgentAgent) ? urgentAgent : '' });
  };

  let canContinue = false;
  if (painPath === 'cards')  canContinue = selectedAgents.length > 0;
  if (painPath === 'custom') canContinue = customPain.trim().length >= 30;
  if (painPath === 'impact') canContinue = !!selectedImpact;

  const tabs = [
    { id: 'cards',  label: 'Our shipped agents', hint: 'Pick from what we\'ve built before' },
    { id: 'custom', label: 'Describe your own',  hint: 'Tell us the pain in your words' },
    { id: 'impact', label: 'Start from impact',  hint: 'Not sure? Pick what resonates' },
  ];

  return (
    <StepShell
      eyebrow="Step 03 · The pain"
      title="What are you trying to solve?"
      subtitle="Three ways in. None of them is the lazy option — they each feed the generator differently."
      onNext={onNext}
      onBack={onBack}
      canContinue={canContinue}
    >
      {/* Tab selector */}
      <div className="flex border-b border-stone-800 mb-8">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => update({ painPath: t.id })}
            className={`flex-1 text-left px-5 py-4 border-b-2 transition-colors ${
              painPath === t.id ? 'border-[#d97642]' : 'border-transparent hover:bg-stone-900/30'
            }`}
          >
            <div className={`font-mono-ibm text-[11px] uppercase tracking-[0.15em] mb-1 ${
              painPath === t.id ? 'text-[#d97642]' : 'text-stone-500'
            }`}>
              Path {tabs.indexOf(t) + 1}
            </div>
            <div className={`font-display text-lg mb-1 ${
              painPath === t.id ? 'text-stone-100' : 'text-stone-400'
            }`}>
              {t.label}
            </div>
            <div className="text-xs text-stone-500">{t.hint}</div>
          </button>
        ))}
      </div>

      {/* Path A — Cards */}
      {painPath === 'cards' && (
        <div className="space-y-3 fade-up">
          {AGENT_CARDS.map((a, i) => {
            const selected = selectedAgents.includes(a.id);
            return (
              <div
                key={a.id}
                onClick={() => toggleAgent(a.id)}
                className={`bracket-frame cursor-pointer transition-all p-6 ${
                  selected
                    ? 'bg-stone-900/60 border border-[#d97642]/50'
                    : 'bg-[#0a0a0a] border border-stone-800 hover:border-stone-700'
                }`}
              >
                {selected && (<><div className="br-tr" /><div className="br-bl" /></>)}
                <div className="flex items-start gap-5">
                  <div className={`w-6 h-6 flex items-center justify-center border shrink-0 mt-0.5 ${
                    selected ? 'border-[#d97642] bg-[#d97642] text-black' : 'border-stone-700'
                  }`}>
                    {selected && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="font-display text-xl text-stone-100">{a.name}</div>
                      <div className="text-[10px] font-mono-ibm uppercase tracking-wider text-stone-600">
                        AGENT_{String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-sm text-stone-400 leading-relaxed mb-3">
                      <span className="text-[#d97642] font-medium">Pain · </span>{a.pain}
                    </div>
                    <div className="text-sm text-stone-400 leading-relaxed mb-3">
                      <span className="text-stone-300 font-medium">What it does · </span>{a.what}
                    </div>
                    <div className="mt-3 pt-3 border-t border-stone-800/80 flex flex-wrap items-start gap-x-6 gap-y-2">
                      <div className="flex-1 min-w-[240px]">
                        <div className="text-[10px] font-mono-ibm uppercase tracking-wider text-stone-600 mb-1">
                          Example query
                        </div>
                        <div className="font-mono-ibm text-xs text-stone-300">{a.query}</div>
                      </div>
                      <div className="flex-1 min-w-[240px]">
                        <div className="text-[10px] font-mono-ibm uppercase tracking-wider text-stone-600 mb-1">
                          Proof
                        </div>
                        <div className="text-xs text-stone-400">{a.anchor}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {selectedAgents.length > 1 && (
            <div className="mt-6 p-5 border border-stone-800 bg-stone-900/30 fade-up">
              <div className="text-[11px] font-mono-ibm uppercase tracking-[0.15em] text-[#d97642] mb-3">
                Most urgent in the next 6 months
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedAgents.map(id => {
                  const a = AGENT_CARDS.find(c => c.id === id);
                  const active = urgentAgent === id;
                  return (
                    <button
                      key={id}
                      onClick={() => update({ urgentAgent: id })}
                      className={`px-4 py-2 text-sm border transition-colors font-mono-ibm ${
                        active
                          ? 'border-[#d97642] bg-[#d97642]/10 text-stone-100'
                          : 'border-stone-700 text-stone-400 hover:border-stone-600'
                      }`}
                    >
                      {a.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Path B — Custom */}
      {painPath === 'custom' && (
        <div className="fade-up">
          <div className="bracket-frame bg-[#0a0a0a] border border-stone-800 p-6 relative">
            <div className="br-tr" /><div className="br-bl" />
            <div className="flex items-baseline justify-between mb-3">
              <label className="text-[11px] font-mono-ibm uppercase tracking-[0.15em] text-[#d97642]">
                Describe the pain · min 30, max 800
              </label>
              <span className={`text-[11px] font-mono-ibm ${
                customPain.length < 30 ? 'text-stone-600' : customPain.length > 800 ? 'text-red-500' : 'text-stone-400'
              }`}>
                {customPain.length} / 800
              </span>
            </div>
            <textarea
              value={customPain}
              onChange={(e) => update({ customPain: e.target.value.slice(0, 800) })}
              rows={8}
              placeholder="E.g., 'Our regulatory submissions team spends 30+ hours per batch compiling analytical data from PDFs across 4 different labs in 3 languages. Deadlines slip constantly. A typical submission touches 12 people.'"
              className="w-full bg-transparent border-0 focus:outline-none resize-none text-stone-200 placeholder:text-stone-600 leading-relaxed"
            />
          </div>
          <div className="mt-4 flex items-start gap-2 text-xs text-stone-500">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#d97642]/70" />
            <span>This stays inside our environment. We use it only to generate your blueprint. No model training. No third-party sharing.</span>
          </div>
        </div>
      )}

      {/* Path C — Impact */}
      {painPath === 'impact' && (
        <div className="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {IMPACT_FRAMES.map(impact => {
              const Icon = impact.icon;
              const selected = selectedImpact === impact.id;
              return (
                <button
                  key={impact.id}
                  onClick={() => update({ selectedImpact: impact.id })}
                  className={`bracket-frame text-left p-6 transition-all ${
                    selected
                      ? 'bg-stone-900/60 border border-[#d97642]/50'
                      : 'bg-[#0a0a0a] border border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {selected && (<><div className="br-tr" /><div className="br-bl" /></>)}
                  <div className="flex items-start gap-4">
                    <Icon className={`w-5 h-5 mt-0.5 ${selected ? 'text-[#d97642]' : 'text-stone-500'}`} />
                    <div className="flex-1">
                      <div className="font-display text-xl text-stone-100 mb-1.5">{impact.label}</div>
                      <div className="text-sm text-stone-400 leading-relaxed">{impact.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </StepShell>
  );
}

function Info({ className }) {
  return <AlertCircle className={className} />;
}

// =============================================================================
// STEP 4 — STACK
// =============================================================================

function StackStep({ data, update, onNext, onBack }) {
  const { stack, stackOthers, compliance, wearable } = data;
  const [expanded, setExpanded] = useState({ erp: true, mes: true });

  const toggle = (layerId, option) => {
    const current = stack[layerId] || [];
    const next = current.includes(option) ? current.filter(o => o !== option) : [...current, option];
    update({ stack: { ...stack, [layerId]: next } });
  };

  const setOther = (layerId, patch) => {
    update({ stackOthers: { ...stackOthers, [layerId]: { ...(stackOthers[layerId] || {}), ...patch } } });
  };

  const toggleOther = (layerId) => {
    const exists = !!stackOthers[layerId];
    const next = { ...stackOthers };
    if (exists) delete next[layerId];
    else next[layerId] = { name: '', desc: '' };
    update({ stackOthers: next });
  };

  const toggleCompliance = (c) => {
    update({ compliance: compliance.includes(c) ? compliance.filter(x => x !== c) : [...compliance, c] });
  };

  const anySelected = Object.values(stack).some(arr => arr && arr.length > 0) || Object.keys(stackOthers).length > 0;
  const canContinue = anySelected;

  return (
    <StepShell
      eyebrow="Step 04 · Stack & compliance"
      title="What systems does your team run on?"
      subtitle="Every integration becomes an MCP server node in your architecture. If a system isn't listed, add it — custom integrations are exactly what AI Intime does per deployment."
      onNext={onNext}
      onBack={onBack}
      canContinue={canContinue}
    >
      <div className="space-y-2">
        {STACK_LAYERS.map(layer => {
          const selected = stack[layer.id] || [];
          const hasOther = !!stackOthers[layer.id];
          const isOpen = expanded[layer.id] ?? (selected.length > 0 || hasOther);
          return (
            <div key={layer.id} className="border border-stone-800">
              <button
                onClick={() => setExpanded({ ...expanded, [layer.id]: !isOpen })}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-stone-900/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  <span className="font-display text-base text-stone-200">{layer.label}</span>
                  {selected.length > 0 && (
                    <span className="text-[10px] font-mono-ibm text-[#d97642] bg-[#d97642]/10 border border-[#d97642]/30 px-2 py-0.5">
                      {selected.length}
                    </span>
                  )}
                  {hasOther && (
                    <span className="text-[10px] font-mono-ibm text-stone-400 border border-stone-700 px-2 py-0.5">
                      +custom
                    </span>
                  )}
                </div>
                {selected.length > 0 && !isOpen && (
                  <div className="text-xs font-mono-ibm text-stone-500 hidden md:block truncate max-w-md">
                    {selected.join(' · ')}
                  </div>
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-stone-800/80">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {layer.options.map(opt => {
                      const active = selected.includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => toggle(layer.id, opt)}
                          className={`px-3 py-1.5 text-sm border font-mono-ibm transition-colors ${
                            active
                              ? 'border-[#d97642] bg-[#d97642]/10 text-stone-100'
                              : 'border-stone-700 text-stone-400 hover:border-stone-600 hover:text-stone-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => toggleOther(layer.id)}
                      className={`px-3 py-1.5 text-sm border font-mono-ibm transition-colors flex items-center gap-1.5 ${
                        hasOther
                          ? 'border-[#d97642] bg-[#d97642]/10 text-stone-100'
                          : 'border-dashed border-stone-700 text-stone-500 hover:border-stone-600 hover:text-stone-300'
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      Other
                    </button>
                  </div>
                  {hasOther && (
                    <div className="p-3 bg-[#0a0a0a] border border-stone-800 space-y-2 fade-up">
                      <input
                        type="text"
                        value={stackOthers[layer.id]?.name || ''}
                        onChange={(e) => setOther(layer.id, { name: e.target.value })}
                        placeholder="System name (e.g. CustomLegacyDB v3)"
                        className="w-full bg-transparent border-b border-stone-800 focus:border-[#d97642] outline-none py-1.5 text-sm font-mono-ibm text-stone-200 placeholder:text-stone-600"
                      />
                      <input
                        type="text"
                        value={stackOthers[layer.id]?.desc || ''}
                        onChange={(e) => setOther(layer.id, { desc: e.target.value })}
                        placeholder="What it does in one line"
                        className="w-full bg-transparent border-b border-stone-800 focus:border-[#d97642] outline-none py-1.5 text-sm text-stone-200 placeholder:text-stone-600"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Compliance */}
      <div className="mt-8 pt-8 border-t border-stone-800">
        <div className="text-[11px] font-mono-ibm uppercase tracking-[0.15em] text-[#d97642] mb-3">
          Compliance posture
        </div>
        <div className="flex flex-wrap gap-2">
          {COMPLIANCE_OPTIONS.map(c => {
            const active = compliance.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggleCompliance(c)}
                className={`px-3 py-1.5 text-sm border font-mono-ibm transition-colors ${
                  active
                    ? 'border-[#d97642] bg-[#d97642]/10 text-stone-100'
                    : 'border-stone-700 text-stone-400 hover:border-stone-600 hover:text-stone-300'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wearable */}
      <label className="mt-6 flex items-start gap-3 cursor-pointer p-4 border border-stone-800 hover:border-stone-700 transition-colors">
        <input
          type="checkbox"
          checked={wearable}
          onChange={(e) => update({ wearable: e.target.checked })}
          className="mt-0.5 w-4 h-4 accent-[#d97642]"
        />
        <div>
          <div className="font-display text-base text-stone-100 mb-0.5">
            Hands-free shop-floor access needed
          </div>
          <div className="text-xs text-stone-500">
            Adds the Voice-Activated Shop-Floor Agent to your architecture. Helmet-mounted wearable, clips on any standard helmet.
          </div>
        </div>
      </label>
    </StepShell>
  );
}

// =============================================================================
// STEP 5 — OUTCOME
// =============================================================================

function OutcomeStep({ data, update, onNext, onBack }) {
  const toggle = (o) => {
    const next = data.outcomes.includes(o) ? data.outcomes.filter(x => x !== o) : [...data.outcomes, o];
    update({ outcomes: next });
  };

  return (
    <StepShell
      eyebrow="Step 05 · Outcome"
      title="What does success look like in 12 months?"
      subtitle="Pick every one that applies. We use these to frame the executive summary and the phasing recommendation."
      onNext={onNext}
      onBack={onBack}
      canContinue={data.outcomes.length > 0}
      nextLabel="Generate blueprint"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {OUTCOMES.map(o => {
          const active = data.outcomes.includes(o);
          return (
            <button
              key={o}
              onClick={() => toggle(o)}
              className={`bracket-frame text-left p-5 transition-all ${
                active
                  ? 'bg-stone-900/60 border border-[#d97642]/50'
                  : 'bg-[#0a0a0a] border border-stone-800 hover:border-stone-700'
              }`}
            >
              {active && (<><div className="br-tr" /><div className="br-bl" /></>)}
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-stone-100">{o}</span>
                <div className={`w-5 h-5 flex items-center justify-center border ${
                  active ? 'border-[#d97642] bg-[#d97642] text-black' : 'border-stone-700'
                }`}>
                  {active && <Check className="w-3 h-3" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </StepShell>
  );
}

// =============================================================================
// GENERATING SCREEN
// =============================================================================

function Generating({ onDone }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < GENERATION_STEPS.length - 1) {
      const t = setTimeout(() => setIdx(idx + 1), 700);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onDone, 1200);
      return () => clearTimeout(t);
    }
  }, [idx, onDone]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 min-h-[calc(100vh-120px)] flex flex-col justify-center">
      <div className="mb-12">
        <div className="text-[11px] font-mono-ibm uppercase tracking-[0.2em] text-[#d97642] mb-4">
          Generating your blueprint
        </div>
        <h2 className="font-display text-4xl text-stone-100 leading-tight">
          Composing your context-aware nervous system.
        </h2>
      </div>

      <div className="space-y-4">
        {GENERATION_STEPS.map((step, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <div key={i} className={`flex items-center gap-4 transition-opacity ${i > idx ? 'opacity-30' : 'opacity-100'}`}>
              <div className={`w-6 h-6 flex items-center justify-center border font-mono-ibm text-[10px] ${
                done ? 'border-stone-600 text-stone-500 bg-stone-900' :
                active ? 'border-[#d97642] text-[#d97642] pulse-amber' :
                'border-stone-800 text-stone-700'
              }`}>
                {done ? <Check className="w-3 h-3" /> : String(i + 1).padStart(2, '0')}
              </div>
              <div className={`font-mono-ibm text-sm ${active ? 'text-stone-100' : 'text-stone-500'}`}>
                {step}
                {active && <span className="inline-block ml-1 animate-pulse">…</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 pt-6 border-t border-stone-800 flex items-center gap-2 text-[11px] font-mono-ibm uppercase tracking-wider text-stone-500">
        <Lock className="w-3 h-3 text-[#d97642]" />
        Retrieval grounded on AI Intime's private corpus · Inputs never leave our environment
      </div>
    </div>
  );
}

// =============================================================================
// REVEAL SCREEN
// =============================================================================

function RevealScreen({ data }) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const submitEmail = () => {
    const blocked = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    const m = /^([^\s@]+)@([^\s@]+\.[^\s@]+)$/.exec(email.trim().toLowerCase());
    if (!m) { setEmailError('Please enter a valid email address.'); return; }
    if (blocked.includes(m[2])) { setEmailError('Please use your work email.'); return; }
    setEmailError('');
    setUnlocked(true);
    setEmailModalOpen(false);
  };

  const selectedAgentNames = data.selectedAgents.map(id => AGENT_CARDS.find(a => a.id === id)?.name).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Reveal header */}
      <div className="fade-up mb-8">
        <div className="flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <div className="text-[11px] font-mono-ibm uppercase tracking-[0.2em] text-[#d97642] mb-2">
              Your blueprint · Live
            </div>
            <h2 className="font-display text-4xl text-stone-100 leading-tight">
              {data.company.name || 'Your company'} · Sovereign AI Blueprint
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ToolbarBtn icon={Download} label="PDF"        onClick={() => !unlocked && setEmailModalOpen(true)} locked={!unlocked} />
            <ToolbarBtn icon={Download} label="Diagram"    onClick={() => !unlocked && setEmailModalOpen(true)} locked={!unlocked} />
            <ToolbarBtn icon={Share2}   label="Share link" onClick={() => !unlocked && setEmailModalOpen(true)} locked={!unlocked} />
          </div>
        </div>
      </div>

      {/* Architecture diagram */}
      <ArchitectureDiagram data={data} />

      {/* Executive brief preview (locked unless email provided) */}
      <div className="mt-10 relative">
        <div className={`transition-all ${unlocked ? '' : 'blur-sm pointer-events-none select-none'}`}>
          <ExecutiveBriefPreview data={data} selectedAgentNames={selectedAgentNames} />
        </div>

        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bracket-frame bg-[#0a0a0a] border border-[#d97642]/50 p-6 max-w-md text-center relative">
              <div className="br-tr" /><div className="br-bl" />
              <Lock className="w-5 h-5 text-[#d97642] mx-auto mb-3" />
              <div className="font-display text-xl text-stone-100 mb-2">Unlock your full brief</div>
              <div className="text-sm text-stone-400 mb-5">
                Add your work email and we&rsquo;ll send you the PDF, the architecture image, and a permanent link to this view.
              </div>
              <button
                onClick={() => setEmailModalOpen(true)}
                className="w-full bg-[#d97642] hover:bg-[#c0652f] text-black font-mono-ibm text-sm uppercase tracking-wider px-6 py-3 flex items-center justify-center gap-2 transition-colors"
              >
                Get my brief <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Post-download CTA */}
      {unlocked && (
        <div className="mt-12 bracket-frame bg-gradient-to-br from-[#1a1108] via-[#0a0705] to-black border border-[#d97642]/40 p-8 relative fade-up">
          <div className="br-tr" /><div className="br-bl" />
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="text-[11px] font-mono-ibm uppercase tracking-[0.2em] text-[#d97642] mb-2">
                Next step
              </div>
              <h3 className="font-display text-2xl text-stone-100 mb-2">
                Stop the pilot fatigue. Start the transformation.
              </h3>
              <p className="text-stone-400 leading-relaxed max-w-2xl">
                You already have the data and the ambition. What you need is the right enterprise engine.
                30 minutes with the team that deployed at BASF and Henkel. No sales pitch — a working conversation.
              </p>
            </div>
            <button className="bg-[#d97642] hover:bg-[#c0652f] text-black font-mono-ibm text-sm uppercase tracking-wider px-7 py-4 flex items-center gap-3 transition-colors shrink-0">
              <Calendar className="w-4 h-4" /> Book a strategy session
            </button>
          </div>
        </div>
      )}

      {/* Email modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setEmailModalOpen(false)}>
          <div className="bracket-frame bg-[#0a0a0a] border border-[#d97642]/50 p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <div className="br-tr" /><div className="br-bl" />
            <button onClick={() => setEmailModalOpen(false)} className="absolute top-4 right-4 text-stone-500 hover:text-stone-300">
              <X className="w-4 h-4" />
            </button>
            <div className="text-[11px] font-mono-ibm uppercase tracking-[0.2em] text-[#d97642] mb-3">
              Your blueprint is ready
            </div>
            <h3 className="font-display text-2xl text-stone-100 mb-2">
              Work email to unlock.
            </h3>
            <p className="text-sm text-stone-400 mb-6">
              We'll email you the PDF and a permanent link. No marketing list. No third-party sharing.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && submitEmail()}
              placeholder="you@company.com"
              className="w-full bg-transparent border-b border-stone-700 focus:border-[#d97642] outline-none py-3 text-lg font-mono-ibm text-stone-100 placeholder:text-stone-600 mb-2"
            />
            {emailError && <div className="text-xs text-red-500 mb-3 font-mono-ibm">{emailError}</div>}
            <button
              onClick={submitEmail}
              disabled={!email}
              className="w-full bg-[#d97642] hover:bg-[#c0652f] disabled:bg-stone-800 disabled:text-stone-600 text-black font-mono-ibm text-sm uppercase tracking-wider px-6 py-3 flex items-center justify-center gap-2 transition-colors mt-2"
            >
              Get my brief <ArrowRight className="w-4 h-4" />
            </button>
            <div className="mt-4 text-[10px] font-mono-ibm uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Work emails only · stays inside our environment
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarBtn({ icon: Icon, label, onClick, locked }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-2 border text-xs font-mono-ibm uppercase tracking-wider transition-colors ${
        locked ? 'border-stone-800 text-stone-500 hover:text-stone-300 hover:border-stone-700' : 'border-stone-700 text-stone-300 hover:border-[#d97642] hover:text-[#d97642]'
      }`}
    >
      {locked ? <Lock className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
      {label}
    </button>
  );
}

// =============================================================================
// ARCHITECTURE DIAGRAM
// =============================================================================

function ArchitectureDiagram({ data }) {
  // Build layer 1 (Human Interfaces)
  const humanInterfaces = [{ name: 'Web Chat', sub: 'REST + WebSocket' }];
  if (data.wearable) humanInterfaces.push({ name: 'Voice · Wearable', sub: 'Helmet-mounted' });
  humanInterfaces.push({ name: 'Bi-directional Streams', sub: 'Kafka · IoT' });

  // Build layer 2 (Data Sources) — from user's data/cloud stack
  const dataSources = [];
  (data.stack.data || []).forEach(d => dataSources.push({ name: d, sub: 'Data platform' }));
  if (dataSources.length === 0) dataSources.push({ name: 'Enterprise Data', sub: 'Knowledge bases' });

  // Build layer 3 (Orchestration) — core nodes + selected agents
  const coreOrchestration = [
    { name: 'Intent Recognition', sub: 'LLM-based' },
    { name: 'Planning & Reasoning', sub: 'ReAct · CoT' },
    { name: 'Execution & Validation', sub: 'Result check' },
    { name: 'Traffic Control', sub: 'Priority queues' },
  ];
  const agentNodes = [];
  data.selectedAgents.forEach(id => {
    const a = AGENT_CARDS.find(c => c.id === id);
    if (a) agentNodes.push({ name: a.name, sub: 'Active agent', highlight: true });
  });
  if (data.painPath === 'custom' && data.customPain.trim().length >= 30) {
    agentNodes.push({ name: 'Custom Agent (TBD)', sub: 'Blueprinted from your pain', highlight: true });
  }

  // Build layer 4 (Framework Services)
  const frameworkServices = [
    { name: 'Knowledge Retrieval', sub: 'RAG · Vector DB' },
    { name: 'Foundation Models', sub: 'LLMs · SLMs' },
    { name: 'Safety Guardrails', sub: 'Alignment' },
    { name: 'Memory & Context', sub: 'Short / Long' },
    { name: 'Policy & Governance', sub: data.compliance.length ? data.compliance.slice(0, 2).join(' · ') : 'Audit · RBAC', highlight: data.compliance.length > 0 },
  ];

  // Build layer 5 (MCP Integration) — from user's stack
  const mcpNodes = [];
  const addStackMCP = (layerId, defaults) => {
    const vals = data.stack[layerId] || [];
    vals.forEach(v => {
      const funcs = defaults[v] || defaults['*'] || ['get_data', 'list_items'];
      mcpNodes.push({ name: `${v} MCP`, funcs });
    });
    if (data.stackOthers[layerId]) {
      const o = data.stackOthers[layerId];
      mcpNodes.push({ name: `${o.name || 'Custom'} MCP`, funcs: [o.desc || 'custom integration'], custom: true });
    }
  };

  const funcDefaults = FUNC_DEFAULTS;
  addStackMCP('erp', funcDefaults);
  addStackMCP('mes', funcDefaults);
  addStackMCP('lims', funcDefaults);
  addStackMCP('qms', funcDefaults);
  addStackMCP('comms', funcDefaults);
  addStackMCP('crm', funcDefaults);
  addStackMCP('docs', funcDefaults);
  addStackMCP('cmms', funcDefaults);

  if (mcpNodes.length === 0) {
    mcpNodes.push({ name: 'Your Systems MCP', funcs: ['connect your stack to see this populated'] });
  }

  const layers = [
    { id: 'L1', label: 'Human Interfaces',           nodes: humanInterfaces.map(n => ({ ...n, small: true })) },
    { id: 'L2', label: 'Data Sources & Streams',     nodes: dataSources.map(n => ({ ...n, small: true })) },
    { id: 'L3', label: 'AI Agent Orchestration & Execution', nodes: [...coreOrchestration, ...agentNodes] },
    { id: 'L4', label: 'Framework Services & Infrastructure', nodes: frameworkServices.map(n => ({ ...n, small: true })) },
    { id: 'L5', label: 'MCP Integration Layer',      nodes: mcpNodes.map(n => ({ ...n, mcp: true })) },
  ];

  return (
    <div className="bracket-frame bg-[#0a0a0a] border border-stone-800 relative overflow-hidden">
      <div className="br-tr" /><div className="br-bl" />
      <div className="blueprint-grid absolute inset-0 opacity-40 pointer-events-none" />
      <div className="relative p-5 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-[10px] font-mono-ibm uppercase tracking-[0.2em] text-[#d97642]">
            AI Intime · Enterprise Agentic AI Framework
          </div>
          <div className="text-[10px] font-mono-ibm uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#d97642]" />
            Populated for {data.company.name || 'your team'}
          </div>
        </div>

        <div className="space-y-3">
          {layers.map((layer, li) => (
            <ArchLayer key={layer.id} layer={layer} delay={li * 150} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-5 border-t border-stone-800 flex flex-wrap items-center gap-5 text-[10px] font-mono-ibm uppercase tracking-wider text-stone-500">
          <LegendDot color="#d97642" label="Your selections" />
          <LegendDot color="#44464a" label="Core framework" />
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 border border-[#d97642] border-dashed" />Custom MCP</span>
        </div>
      </div>
    </div>
  );
}

function ArchLayer({ layer, delay }) {
  return (
    <div style={{ animation: `fadeUp 0.6s ease-out ${delay}ms both` }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-[10px] font-mono-ibm uppercase tracking-[0.2em] text-stone-500">
          {layer.id}
        </div>
        <div className="text-xs font-mono-ibm uppercase tracking-wider text-stone-300">
          {layer.label}
        </div>
        <div className="flex-1 h-px bg-stone-800/60" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {layer.nodes.map((node, i) => (
          <ArchNode key={i} node={node} delay={delay + i * 60} />
        ))}
      </div>
    </div>
  );
}

function ArchNode({ node, delay }) {
  const isHighlight = node.highlight;
  const isMCP = node.mcp;
  const isCustom = node.custom;

  return (
    <div
      style={{ animation: `nodeIn 0.4s ease-out ${delay}ms both` }}
      className={`bracket-frame relative bg-black border px-3 py-2.5 text-xs transition-colors hover:border-[#d97642]/60 ${
        isHighlight ? 'border-[#d97642]/60 bg-[#1a1108]' :
        isCustom ? 'border-dashed border-[#d97642]/40' :
        'border-stone-800'
      }`}
    >
      <div className={`font-mono-ibm text-[11px] font-medium mb-1 truncate ${isHighlight ? 'text-[#d97642]' : 'text-stone-200'}`}>
        {node.name}
      </div>
      {isMCP ? (
        <div className="space-y-0.5">
          {(node.funcs || []).slice(0, 3).map((f, i) => (
            <div key={i} className="text-[10px] font-mono-ibm text-stone-500 truncate">
              <span className="text-stone-700">›</span> {f}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[10px] text-stone-500 truncate">{node.sub}</div>
      )}
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <div className="w-2 h-2" style={{ background: color }} />
      {label}
    </span>
  );
}

// =============================================================================
// EXECUTIVE BRIEF PREVIEW
// =============================================================================

function ExecutiveBriefPreview({ data, selectedAgentNames }) {
  const industry = INDUSTRIES.find(i => i.id === data.industry)?.label || 'your industry';
  const agentsLine = selectedAgentNames.length
    ? selectedAgentNames.join(' · ')
    : (data.painPath === 'custom' ? 'Custom agent (blueprinted from your pain)' : 'Blueprint derived from your impact selection');

  return (
    <div className="bracket-frame bg-[#0a0a0a] border border-stone-800 p-8 md:p-10 relative">
      <div className="br-tr" /><div className="br-bl" />

      <div className="text-[11px] font-mono-ibm uppercase tracking-[0.2em] text-[#d97642] mb-3">
        Executive Brief · Preview
      </div>
      <h3 className="font-display text-3xl text-stone-100 mb-6 leading-tight">
        {data.company.name || 'Your organization'} — AI Intime Deployment Plan.
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <BriefStat label="Industry" value={industry} />
        <BriefStat label="Scope" value={selectedAgentNames.length ? `${selectedAgentNames.length} agent${selectedAgentNames.length > 1 ? 's' : ''}` : '1 custom agent'} />
        <BriefStat label="Sovereignty posture" value="On-prem / air-gapped" />
      </div>

      <div className="space-y-6 text-stone-300 leading-relaxed">
        <section>
          <SectionHead num="01" label="Pain named" />
          <p className="text-stone-400">
            {data.painPath === 'custom' ? (
              <em className="text-stone-300">"{data.customPain}"</em>
            ) : data.painPath === 'impact' ? (
              <>Your team operates against the <strong className="text-stone-100">{data.selectedImpact}</strong> impact frame —
              a pattern AI Intime has addressed repeatedly across the {industry.toLowerCase()} segment.</>
            ) : (
              <>Your team identifies with <strong className="text-stone-100">{agentsLine}</strong>.
              These are live agent patterns we've deployed and continue to refine in production.</>
            )}
          </p>
        </section>

        <section>
          <SectionHead num="02" label="Proposed agent blueprint" />
          <ul className="space-y-3">
            {(selectedAgentNames.length ? selectedAgentNames : ['Custom agent (named after review)']).map((n, i) => (
              <li key={i} className="border-l-2 border-[#d97642]/50 pl-4">
                <div className="font-display text-lg text-stone-100 mb-1">{n}</div>
                <div className="text-sm text-stone-400">
                  <span className="font-mono-ibm text-[11px] uppercase tracking-wider text-stone-500">Role scope · </span>
                  {data.company.role || 'Your role'}
                </div>
                <div className="text-sm text-stone-400">
                  <span className="font-mono-ibm text-[11px] uppercase tracking-wider text-stone-500">Data access · </span>
                  via MCP (see architecture above)
                </div>
                <div className="text-sm text-stone-400">
                  <span className="font-mono-ibm text-[11px] uppercase tracking-wider text-stone-500">Permissions · </span>
                  RBAC enforced per vault
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHead num="03" label="Phasing" />
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { phase: 'Phase 1', weeks: 'Weeks 1–8', body: 'Pilot agent, single site. Integrates core MCP servers. Baseline outcomes captured.' },
              { phase: 'Phase 2', weeks: 'Weeks 8–20', body: 'Horizontal expansion. Additional agents. Governance tightening.' },
              { phase: 'Phase 3', weeks: 'Weeks 20+', body: 'Multi-site / enterprise-wide. Wearable integration where relevant. Continuous improvement loop.' },
            ].map((p, i) => (
              <div key={i} className="border border-stone-800 p-4">
                <div className="text-[10px] font-mono-ibm uppercase tracking-[0.15em] text-[#d97642] mb-1">{p.phase}</div>
                <div className="font-display text-base text-stone-100 mb-2">{p.weeks}</div>
                <div className="text-xs text-stone-400 leading-relaxed">{p.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHead num="04" label="Sovereignty & governance" />
          <p className="text-stone-400">
            Deployment is on-premises / air-gapped inside your network.
            Zero telemetry. Per-user knowledge vaults with RBAC.
            {data.compliance.length > 0 && <> Compliance posture tuned for <strong className="text-stone-100">{data.compliance.join(', ')}</strong>.</>}
            {' '}Full audit trail across every agent action.
          </p>
        </section>
      </div>

      <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3 text-[10px] font-mono-ibm uppercase tracking-wider text-stone-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[#d97642]" />
          Brief grounded on AI Intime's private corpus · BASF & Henkel reference material via Vegam
        </div>
        <div>DRAFT · Subject to solution architect review</div>
      </div>
    </div>
  );
}

function SectionHead({ num, label }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[10px] font-mono-ibm tracking-[0.15em] text-[#d97642]">{num}</span>
      <span className="text-[11px] font-mono-ibm uppercase tracking-[0.15em] text-stone-300">{label}</span>
      <div className="flex-1 h-px bg-stone-800/60" />
    </div>
  );
}

function BriefStat({ label, value }) {
  return (
    <div className="border-l-2 border-stone-800 pl-4">
      <div className="text-[10px] font-mono-ibm uppercase tracking-[0.15em] text-stone-500 mb-1">{label}</div>
      <div className="font-display text-lg text-stone-100">{value}</div>
    </div>
  );
}

// =============================================================================
// FIELD WRAPPER
// =============================================================================

function Field({ label, children }) {
  return (
    <div>
      <div className="text-[11px] font-mono-ibm uppercase tracking-[0.15em] text-[#d97642] mb-3">
        {label}
      </div>
      {children}
    </div>
  );
}

function TileOption({ selected, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`bracket-frame relative text-left px-4 py-3 text-sm font-display transition-all ${
        selected
          ? 'bg-stone-900/60 border border-[#d97642]/50 text-stone-100'
          : 'bg-[#0a0a0a] border border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
      }`}
    >
      {selected && (<><div className="br-tr" /><div className="br-bl" /></>)}
      <div className="flex items-center justify-between gap-2">
        <span>{label}</span>
        {selected && <Check className="w-3.5 h-3.5 text-[#d97642] shrink-0" />}
      </div>
    </button>
  );
}
