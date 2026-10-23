import React, { useState } from 'react';
import { GenAIProject } from '../data/portfolio';
import { X, Sparkles, Terminal, ExternalLink, Github, Package, Play, CheckCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface GenAIModalProps {
  project: GenAIProject | null;
  onClose: () => void;
}

export const GenAIModal: React.FC<GenAIModalProps> = ({ project, onClose }) => {
  // Smart AI RAG simulation state
  const [ragQuery, setRagQuery] = useState('What are the zero-trust compliance constraints?');
  const [ragState, setRagState] = useState<'idle' | 'searching' | 'done'>('done');

  // Market gRPC simulation state
  const [grpcStatus, setGrpcStatus] = useState<'idle' | 'streaming' | 'complete'>('complete');
  const [latency, setLatency] = useState(1.4);

  // ngx-placeholder skeleton toggle
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Web crawler simulation state
  const [crawlCount, setCrawlCount] = useState(1480);
  const [isCrawling, setIsCrawling] = useState(false);

  if (!project) return null;

  const handleExecuteRag = () => {
    sound.tick();
    setRagState('searching');
    setTimeout(() => {
      setRagState('done');
      sound.chime();
    }, 700);
  };

  const handleTestGrpc = () => {
    sound.tick();
    setGrpcStatus('streaming');
    setTimeout(() => {
      setGrpcStatus('complete');
      setLatency(Number((Math.random() * 0.8 + 0.9).toFixed(2)));
      sound.chime();
    }, 600);
  };

  const handleRunCrawler = () => {
    sound.tick();
    setIsCrawling(true);
    setTimeout(() => {
      setCrawlCount(prev => prev + 120);
      setIsCrawling(false);
      sound.chime();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-200 bg-white/95 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-neutral-900 text-white font-medium">
              {project.tag}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              Architecture Prototype
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.drop(800)}
                className="px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-black text-neutral-800 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="View on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {project.npm && (
              <a
                href={project.npm}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.drop(800)}
                className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="View on NPM"
              >
                <Package className="w-3.5 h-3.5" />
                <span>NPM Package</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.drop(800)}
                className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="View Live App"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Site</span>
              </a>
            )}
            <button
              onClick={() => {
                sound.tick();
                onClose();
              }}
              className="w-10 h-10 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
              {project.title}
            </h2>
            <p className="mt-2 text-neutral-600 text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="p-6 rounded-3xl bg-neutral-950 text-white relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Live Interactive Simulation
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400">{project.metrics}</span>
            </div>

            {/* Smart AI RAG Simulation */}
            {project.id === 'smart-ai' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                  <button
                    onClick={handleExecuteRag}
                    disabled={ragState === 'searching'}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase transition-colors cursor-pointer"
                  >
                    {ragState === 'searching' ? 'Retrieving...' : 'Query RAG'}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs space-y-2">
                  <div className="text-neutral-400">Vector Embedding Distance: <span className="text-emerald-400">0.96 (Cosine Similarity)</span></div>
                  <div className="text-neutral-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-neutral-800">
                    "Zero-trust architecture mandates mutual TLS authentication on all internal microservice endpoints with ephemeral token rotation every 15 minutes."
                  </div>
                  <div className="text-neutral-500 text-[11px]">Source citation: PDF Chunk #14 & Verified Web Endpoint [citi-regulatory-docs.internal]</div>
                </div>
              </div>
            )}

            {/* Market gRPC Microservices Simulation */}
            {project.id === 'market-microservices' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">gRPC Protobuf Inter-Service Channel</span>
                  <button
                    onClick={handleTestGrpc}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase font-bold transition-colors cursor-pointer"
                  >
                    Simulate RPC Call
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="text-neutral-400">User Service</div>
                    <div className="text-emerald-400 font-bold mt-1">Status 200 OK</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="text-neutral-400">Product Catalog</div>
                    <div className="text-emerald-400 font-bold mt-1">{latency}ms Stream</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="text-neutral-400">Cart Service</div>
                    <div className="text-emerald-400 font-bold mt-1">Committed</div>
                  </div>
                </div>
              </div>
            )}

            {/* ngx-placeholder Angular Shimmer Simulation */}
            {project.id === 'ngx-placeholder' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Interactive Skeleton Placeholder Directive</span>
                  <button
                    onClick={() => {
                      setShowSkeleton(!showSkeleton);
                      sound.tick();
                    }}
                    className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase font-medium transition-colors cursor-pointer"
                  >
                    {showSkeleton ? 'Show Rendered Data' : 'Preview Shimmer Skeleton'}
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
                  {showSkeleton ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
                      <div className="h-3 bg-neutral-800 rounded w-1/2"></div>
                      <div className="h-10 bg-neutral-800 rounded w-full"></div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-white">Ajeet T S · Senior Software Engineer</div>
                      <div className="text-xs text-neutral-400">Loaded in 140ms with zero layout shifts (CLS: 0.00).</div>
                      <div className="text-xs text-emerald-400 font-mono">directive: *ngxPlaceholder="isLoading"</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Concurrent Web Crawler Simulation */}
            {project.id === 'webcrawler-cli' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>Go Goroutine Worker Pool</span>
                  </div>
                  <button
                    onClick={handleRunCrawler}
                    disabled={isCrawling}
                    className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs uppercase font-bold transition-colors cursor-pointer"
                  >
                    {isCrawling ? 'Crawling...' : 'Spawn +120 Workers'}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 font-mono text-xs space-y-1.5 border border-neutral-800">
                  <div className="text-neutral-400">$ go run main.go --max-depth=4 --concurrency=64</div>
                  <div className="text-emerald-400">Total Unique URLs Discovered: {crawlCount}</div>
                  <div className="text-neutral-500">Rate Limiter: 100 req/sec · Duplication Hash Set: 0 collision</div>
                </div>
              </div>
            )}

            {/* Default fallback overview for other projects */}
            {project.id !== 'smart-ai' && project.id !== 'market-microservices' && project.id !== 'ngx-placeholder' && project.id !== 'webcrawler-cli' && (
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-sm text-neutral-300 leading-relaxed">
                <p>
                  Architected with modular boundaries, typed interfaces, and optimized concurrency. Tested and validated across diverse edge network profiles.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 rounded bg-neutral-800 font-mono text-xs text-neutral-400">Sub-Second Latency</span>
                  <span className="px-3 py-1 rounded bg-neutral-800 font-mono text-xs text-neutral-400">Fault-Tolerant</span>
                </div>
              </div>
            )}
          </div>

          {/* Project Story Narrative */}
          <div className="space-y-6 pt-4 border-t border-neutral-100">
            <h3 className="text-2xl font-medium tracking-tight text-neutral-900">
              {project.storyHeading}
            </h3>

            <div className="space-y-4 text-neutral-600 leading-relaxed text-base">
              {project.storyBody.map((paragraph, i) => (
                <p key={i}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-400">
            Ajeet T S · Systems & Architecture
          </span>
          <button
            onClick={() => {
              sound.tick();
              onClose();
            }}
            className="px-6 py-2 rounded-full bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
