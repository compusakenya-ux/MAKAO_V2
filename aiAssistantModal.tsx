import React, { useState } from 'react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSearchQuery: (query: string) => void;
}

const SAMPLE_PROMPTS = [
  "2 Bedroom in Westlands with borehole water under KES 90,000",
  "Family townhouse in Kilimani with private garden & playground",
  "Studio or 1-bedroom in Kileleshwa near expressway",
  "3 Bedroom apartment in Lavington with 24/7 generator backup"
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectSearchQuery,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSearch = async (inputPrompt?: string) => {
    const promptToUse = inputPrompt || query;
    if (!promptToUse.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ai/search-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: promptToUse }),
      });
      const data = await res.json();
      setResponse(data.reply || 'No results generated.');
    } catch (e) {
      console.error(e);
      setResponse('Unable to connect to MAKAO AI assistant at the moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-[#fffbff] w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-[#ffd8ed] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#f4ebef]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#ffd8ed] text-[#e040a0] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#201a1d]">MAKAO AI Matchmaker</h2>
              <p className="text-xs text-[#504349]">Ask AI to find your dream Kenyan rental home</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#504349] hover:bg-[#faf1f5] hover:text-[#e040a0]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="py-5 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-[#201a1d] mb-2 uppercase tracking-wider">
              Describe your ideal rental property
            </label>
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'I want a modern 3 bedroom apartment in Lavington with borehole water, high floor, and solar heating under KES 130k/mo'"
                className="w-full bg-[#faf1f5] border border-[#d4c2cb] rounded-2xl p-4 text-sm text-[#201a1d] placeholder-[#82737a] focus:ring-2 focus:ring-[#e040a0] focus:outline-none resize-none h-28"
              />
            </div>
          </div>

          {/* Quick Prompts */}
          <div>
            <p className="text-xs font-bold text-[#504349] mb-2">Try these popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROMPTS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(sample);
                    handleSearch(sample);
                  }}
                  className="text-xs bg-[#faf1f5] hover:bg-[#ffd8ed] text-[#201a1d] px-3 py-1.5 rounded-full border border-[#f1dee7] transition-colors text-left"
                >
                  ✨ {sample}
                </button>
              ))}
            </div>
          </div>

          {/* AI Output Result */}
          {loading && (
            <div className="bg-[#faf1f5] p-5 rounded-2xl text-center space-y-2">
              <div className="w-8 h-8 border-3 border-[#e040a0] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-bold text-[#e040a0]">Consulting MAKAO AI Real Estate Knowledge Base...</p>
            </div>
          )}

          {response && (
            <div className="bg-[#faf1f5] p-5 rounded-2xl border border-[#ffd8ed] space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#e040a0]">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                MAKAO AI Recommendations:
              </div>
              <div className="text-xs md:text-sm text-[#201a1d] leading-relaxed whitespace-pre-line">
                {response}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectSearchQuery(query);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-[#e040a0] text-white font-bold rounded-full text-xs hover:bg-[#390026] transition-colors shadow-xs flex items-center justify-center gap-1"
                >
                  <span>Filter Catalogue by this search</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[#f4ebef] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-[#504349] hover:bg-[#faf1f5]"
          >
            Close
          </button>
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="px-6 py-2.5 bg-[#e040a0] text-white font-bold text-xs rounded-full hover:bg-[#390026] transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">search</span>
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
};
