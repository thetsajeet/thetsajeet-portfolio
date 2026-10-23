import React, { useState } from 'react';
import { Project } from '../data/portfolio';
import { X, CheckCircle2, Sliders, ExternalLink, Github, Terminal, Sparkles, Plus, Trash2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  // Rege.ai simulation state
  const [targetRole, setTargetRole] = useState('Senior Distributed Systems Engineer');
  const [atsScore, setAtsScore] = useState(98);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Form Factory simulation state
  const [formFields, setFormFields] = useState([
    { id: '1', label: 'Candidate Name', type: 'text', required: true },
    { id: '2', label: 'Primary Language', type: 'select', options: ['Go', 'TypeScript', 'Java'] }
  ]);
  const [newFieldLabel, setNewFieldLabel] = useState('');

  // Spring Boot DBV simulation state
  const [dbStatus, setDbStatus] = useState<'idle' | 'checking' | 'verified'>('verified');

  // Citi Policies Single Item Transfer state
  const [pendingItems, setPendingItems] = useState(['Policy Waiver #4912', 'Dispensations EMEA-09']);
  const [approvedItems, setApprovedItems] = useState(['Regulatory Audit #108']);

  if (!project) return null;

  const handleSynthesizeResume = () => {
    sound.tick();
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setAtsScore(99);
      sound.chime();
    }, 800);
  };

  const handleAddField = () => {
    if (!newFieldLabel.trim()) return;
    sound.bubble();
    setFormFields([...formFields, { id: String(Date.now()), label: newFieldLabel.trim(), type: 'text', required: false }]);
    setNewFieldLabel('');
  };

  const handleDeleteField = (id: string) => {
    sound.tick();
    setFormFields(formFields.filter(f => f.id !== id));
  };

  const handleTransferItem = (item: string, from: 'pending' | 'approved') => {
    sound.bubble();
    if (from === 'pending') {
      setPendingItems(pendingItems.filter(i => i !== item));
      setApprovedItems([...approvedItems, item]);
    } else {
      setApprovedItems(approvedItems.filter(i => i !== item));
      setPendingItems([...pendingItems, item]);
    }
  };

  const handleTriggerDbCheck = () => {
    sound.tick();
    setDbStatus('checking');
    setTimeout(() => {
      setDbStatus('verified');
      sound.chime();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
              {project.category}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              Engineering Case Study
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.drop(850)}
                className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.drop(850)}
                className="px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-black text-neutral-800 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            )}
            <button
              onClick={() => {
                sound.tick();
                onClose();
              }}
              className="w-10 h-10 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-12">
          {/* Hero Banner */}
          <div className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${project.gradient} text-white relative overflow-hidden shadow-inner`}>
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                {project.role} · {project.timeline}
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">
                {project.title}
              </h2>
              <p className="mt-3 text-lg text-white/90 font-light">
                {project.subtitle}
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              Verified Production Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="text-3xl font-bold font-mono text-neutral-900">{m.value}</div>
                  <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem & Discovery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-neutral-100">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-rose-500 font-semibold">
                Engineering Challenge
              </span>
              <h4 className="text-xl font-medium text-neutral-900 mt-2">
                Problem Statement
              </h4>
              <p className="mt-3 text-neutral-600 leading-relaxed text-sm sm:text-base">
                {project.deepDive.challenge}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-500 font-semibold">
                Key Breakthrough
              </span>
              <h4 className="text-xl font-medium text-neutral-900 mt-2">
                Architectural Insight
              </h4>
              <p className="mt-3 text-neutral-600 leading-relaxed text-sm sm:text-base">
                {project.deepDive.discovery}
              </p>
            </div>
          </div>

          {/* Interactive Prototype Simulation Sandbox */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                  Interactive Architectural Sandbox
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400">Live Simulation</span>
            </div>

            {/* Rege.ai interactive JD alignment sandbox */}
            {project.id === 'rege-ai' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-mono text-neutral-400 block mb-1">Target Job Specification</label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                  <button
                    onClick={handleSynthesizeResume}
                    disabled={isSynthesizing}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer self-end"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSynthesizing ? 'Aligning...' : 'Synthesize CV'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Semantic Alignment Score</span>
                    <span className="text-emerald-400 font-bold">{atsScore}% Match</span>
                  </div>
                  <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${atsScore}%` }}></div>
                  </div>
                  <div className="text-xs text-neutral-300 leading-relaxed font-mono">
                    Grounded highlights parsed: "Engineered high-scale microservices, lazy-loaded modular SPAs, and zero-hallucination agentic retrieval."
                  </div>
                </div>
              </div>
            )}

            {/* Form Factory interactive schema builder sandbox */}
            {project.id === 'form-factory' && (
              <div className="space-y-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                    placeholder="Enter new field label (e.g. GitHub URL)"
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    onClick={handleAddField}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formFields.map((field) => (
                    <div key={field.id} className="p-3 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-white">{field.label}</span>
                        <span className="text-neutral-400 ml-2 font-mono">({field.type})</span>
                      </div>
                      <button
                        onClick={() => handleDeleteField(field.id)}
                        className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-xs font-mono text-neutral-400 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  Exported JSON Schema: <span className="text-emerald-400">&#123; fields: {formFields.length}, reactiveSync: true &#125;</span>
                </div>
              </div>
            )}

            {/* Citi Policies Portal Single Item Transfer sandbox */}
            {project.id === 'citi-policies-portal' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-neutral-400">
                  Interactive Single Item Transfer Component (slashed UI development turnaround by 80%):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-800 border border-neutral-700">
                    <span className="text-xs font-mono uppercase text-neutral-400 block mb-2">Pending Policy Waivers</span>
                    <div className="space-y-2">
                      {pendingItems.map((item) => (
                        <div
                          key={item}
                          onClick={() => handleTransferItem(item, 'pending')}
                          className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-700 border border-neutral-700 text-xs flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span>{item}</span>
                          <span className="text-emerald-400 font-mono text-xs">Transfer →</span>
                        </div>
                      ))}
                      {pendingItems.length === 0 && (
                        <div className="text-xs text-neutral-500 italic py-2">All waivers processed</div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-800 border border-neutral-700">
                    <span className="text-xs font-mono uppercase text-emerald-400 block mb-2">Approved & Audited</span>
                    <div className="space-y-2">
                      {approvedItems.map((item) => (
                        <div
                          key={item}
                          onClick={() => handleTransferItem(item, 'approved')}
                          className="p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-700 border border-neutral-700 text-xs flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <span>{item}</span>
                          <span className="text-neutral-400 font-mono text-xs">← Move</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Spring Boot DBV auto-starter sandbox */}
            {project.id === 'dbv-spring-boot' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>Spring Boot Auto-Configuration Context</span>
                  </div>
                  <button
                    onClick={handleTriggerDbCheck}
                    className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold transition-colors cursor-pointer"
                  >
                    Re-Verify Schema
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 font-mono text-xs space-y-1.5 border border-neutral-800">
                  <div className="text-neutral-400">[main] INFO org.springframework.boot.Startup - Starting application...</div>
                  <div className="text-sky-400">[main] INFO com.tsajeet.dbv.DbvAutoConfiguration - Initializing Schema Reflection Listener</div>
                  {dbStatus === 'checking' ? (
                    <div className="text-amber-400 animate-pulse">[main] INFO com.tsajeet.dbv.Inspector - Inspecting 18 JPA entities against JDBC metadata...</div>
                  ) : (
                    <>
                      <div className="text-emerald-400">[main] SUCCESS - 18/18 tables verified with zero schema drift.</div>
                      <div className="text-neutral-400">[main] INFO - ContextRefreshedEvent completed in 86ms. Ready for traffic.</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Fallback tools overview */}
            {project.id !== 'rege-ai' && project.id !== 'form-factory' && project.id !== 'citi-policies-portal' && project.id !== 'dbv-spring-boot' && (
              <div className="space-y-4">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {project.deepDive.approach}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {project.tools.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Key Shipped Features */}
          <div>
            <h4 className="text-xl font-medium text-neutral-900 mb-6">
              Key Shipped Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.deepDive.keyFeatures.map((feat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between">
                  <div>
                    <h5 className="font-semibold text-neutral-900 text-base">{feat.title}</h5>
                    <p className="text-neutral-600 text-sm mt-2 leading-relaxed">{feat.desc}</p>
                  </div>
                  <span className="text-xs font-mono text-neutral-400 mt-4 block">Feature 0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-mono">
            Architected and shipped by Ajeet T S
          </span>
          <button
            onClick={() => {
              sound.tick();
              onClose();
            }}
            className="px-6 py-2 rounded-full bg-black text-white text-xs uppercase font-mono tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
