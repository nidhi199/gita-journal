import React from 'react';
import { ShieldCheck, X, Lock, KeyRound, Database, Cpu, EyeOff, AlertTriangle } from 'lucide-react';

interface ThreatSummaryModalProps {
  onClose: () => void;
}

export const ThreatSummaryModal: React.FC<ThreatSummaryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-zinc-800 bg-[#111215] shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-950/30 text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-classical text-lg font-semibold text-zinc-100">
                Security Architecture & Threat Model
              </h2>
              <p className="text-xs text-zinc-400">
                Defense-in-depth across the 5 LLM/Cloud Threat Zones and OWASP Top 10 Standards.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Threat Summary Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-zinc-300">
          
          {/* Summary Table */}
          <div>
            <h3 className="font-semibold text-zinc-100 uppercase tracking-wider text-[11px] mb-3 text-emerald-400 flex items-center space-x-1.5">
              <Lock className="h-3.5 w-3.5" />
              <span>5 Threat Zones Matrix</span>
            </h3>

            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/90 text-zinc-300 border-b border-zinc-800 text-[11px]">
                    <th className="p-3 font-semibold">Threat Zone</th>
                    <th className="p-3 font-semibold">Specific Risk Analyzed</th>
                    <th className="p-3 font-semibold">Architectural Countermeasure</th>
                    <th className="p-3 font-semibold">Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-sans text-[11px]">
                  <tr>
                    <td className="p-3 font-medium text-zinc-200">1. Input Surfaces</td>
                    <td className="p-3 text-zinc-400">Prompt injection, malformed JSON payloads, oversized submissions, location privacy, client theme tampering.</td>
                    <td className="p-3 text-emerald-300/90">Strict body limiters (5mb), input sanitization, permission-gated geotagging, strict theme union validation (<code className="text-amber-300">'dark' | 'light'</code>).</td>
                    <td className="p-3 text-zinc-400">OWASP LLM01 / A03 / Privacy</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-zinc-200">2. Planning & Reasoning</td>
                    <td className="p-3 text-zinc-400">Hallucinated scriptures, fabricated verse numbers, ungrounded advice.</td>
                    <td className="p-3 text-emerald-300/90">Fixed developer-verified Bhagavad Gita dataset; model is strictly forbidden from inventing citations.</td>
                    <td className="p-3 text-zinc-400">LLM09 Scriptural Grounding</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-zinc-200">3. Tool & Execution</td>
                    <td className="p-3 text-zinc-400">API failures, model outages (503/429), infinite loops.</td>
                    <td className="p-3 text-emerald-300/90">Multi-model resilience fallback ladder (gemini-3.6-flash → gemini-3.1-flash-lite → gemini-flash-latest → gemini-3.7-flash).</td>
                    <td className="p-3 text-zinc-400">LLM04 Resilience Protocol</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-zinc-200">4. Memory & State</td>
                    <td className="p-3 text-zinc-400">Cross-user data leakage, unauthorized reads/writes in Firestore.</td>
                    <td className="p-3 text-emerald-300/90">Strict Firebase Auth owner validation rules: <code className="text-amber-300">request.auth.uid == userId</code>. Zero insecure defaults.</td>
                    <td className="p-3 text-zinc-400">OWASP A01 / A05</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-zinc-200">5. Secret Management</td>
                    <td className="p-3 text-zinc-400">Client-side API key exposure, hardcoded credentials.</td>
                    <td className="p-3 text-emerald-300/90">Server-side proxy routes only (<code className="text-amber-300">/api/reflect</code>); Gemini API key kept strictly in backend process.env.</td>
                    <td className="p-3 text-zinc-400">OWASP A02 / Zero-Hardcoding</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Safety & Crisis Care Protocol */}
          <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-4">
            <h3 className="font-semibold text-red-300 text-xs mb-1.5 flex items-center space-x-1.5">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span>Crisis & Emotional Care Safeguard Protocol</span>
            </h3>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              When entries contain indicators of acute emotional crisis, self-harm, or despair, the application bypasses standard philosophical discourse and immediately provides warm, compassionate human support alongside verified 24/7 crisis resources (Tele MANAS: 14416 / 1-800-891-4416, iCall: 9152987821, Befrienders Worldwide).
            </p>
          </div>

          {/* Verification & Trust */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <h3 className="font-semibold text-zinc-200 text-xs mb-1.5 flex items-center space-x-1.5">
              <EyeOff className="h-4 w-4 text-emerald-400" />
              <span>Privacy & Zero-Training Assurance</span>
            </h3>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              All journal thoughts and reflections reside strictly in your private Firestore partition. Entries are never made public, never indexed in public databases, and never used to train public foundation models.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-zinc-800 p-4 flex justify-end bg-zinc-950/50">
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
          >
            Close Security View
          </button>
        </div>

      </div>
    </div>
  );
};
