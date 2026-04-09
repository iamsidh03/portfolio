import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const API_URL = import.meta.env.VITE_AIBOT_API || "http://localhost:5000";
// ── Avatar ─────────────────────────────────────────────────────────────────
const BotAvatar = () => (
  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md shrink-0 mt-0.5">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4Z" fill="white" fillOpacity=".9"/>
      <circle cx="9.5" cy="11.5" r="1.5" fill="#065f46"/>
      <circle cx="14.5" cy="11.5" r="1.5" fill="#065f46"/>
      <path d="M9 15.5c.8.8 5.2.8 6 0" stroke="#065f46" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  </div>
);

// ── Typing dots ────────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex gap-1 items-center px-1 py-1">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-emerald-400"
        style={{ animation: `jiyaBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
      />
    ))}
  </div>
);

// ── Markdown components ────────────────────────────────────────────────────
const mdComponents = {
  h1: ({ children }) => <h1 className="text-emerald-300 font-bold text-[15px] mb-2 mt-1">{children}</h1>,
  h2: ({ children }) => <h2 className="text-emerald-300 font-semibold text-[14px] mb-2 mt-1">{children}</h2>,
  h3: ({ children }) => <h3 className="text-emerald-200 font-semibold text-[13px] mb-1 mt-1">{children}</h3>,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  em: ({ children }) => <em className="text-gray-300 italic">{children}</em>,
  ul: ({ children }) => <ul className="space-y-1 mt-1 mb-2 pl-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-1 mt-1 mb-2 pl-4">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-2 text-gray-300 text-[13px] leading-5">
      <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
      <span>{children}</span>
    </li>
  ),
  p: ({ children }) => <p className="text-gray-200 leading-6 mb-2 last:mb-0 text-[13.5px]">{children}</p>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-emerald-500 pl-3 my-2 text-gray-400 italic text-[13px]">{children}</blockquote>
  ),
  hr: () => <hr className="border-gray-700 my-2" />,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 transition-colors">
      {children}
    </a>
  ),
  code({ inline, children }) {
    return inline ? (
      <code className="bg-black/50 border border-gray-700 px-1.5 py-0.5 rounded text-emerald-300 text-[12px] font-mono">
        {children}
      </code>
    ) : (
      <pre className="bg-black/60 border border-gray-700/60 p-3 rounded-xl overflow-x-auto mt-2 mb-2">
        <code className="text-emerald-300 text-[12px] font-mono leading-5">{children}</code>
      </pre>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-2">
      <table className="text-[12px] border-collapse w-full">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-gray-700 px-2 py-1 bg-gray-800 text-emerald-300 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-700/60 px-2 py-1 text-gray-300">{children}</td>
  ),
};

// ── ChatPanel — open/onClose controlled by parent (Nav) ───────────────────
export function ChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "## 👋 Hi, I'm Jiya\nAsk me anything about **Siddharth** — his projects, skills, experience, and more 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ **Connection error**\nCouldn't reach the server. Please try again." },
      ]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 sm:hidden bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel — anchored bottom-right, opens upward above the nav */}
      <div
        style={{
          transform: open ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transformOrigin: "bottom right",
        }}
        className="
          fixed z-50
          right-4 sm:right-8
          bottom-[72px]
          w-[min(94vw,400px)]
          h-[520px]
          flex flex-col
          rounded-2xl overflow-hidden
          bg-[#0d1117]
          border border-white/[0.08]
          shadow-[0_32px_80px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.04),0_0_40px_rgba(16,185,129,0.07)]
          transition-all duration-300 ease-out
        "
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow">
                <span className="text-sm">🤖</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#161b22]" />
            </div>
            <div>
              <p className="text-white font-semibold text-[13.5px] leading-tight">Jiya AI</p>
              <p className="text-emerald-400 text-[11px] leading-tight">Always online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close chat"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#374151_transparent]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"} jiya-fadein`}>
              {msg.role === "ai" && <BotAvatar />}
              <div className={`
                max-w-[82%] rounded-2xl px-4 py-3 text-[13.5px] leading-6
                ${msg.role === "user"
                  ? "bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-tr-sm shadow-lg"
                  : "bg-[#1c2230] text-gray-100 rounded-tl-sm border border-white/[0.07]"}
              `}>
                {msg.role === "user" ? (
                  <span className="break-words">{msg.text}</span>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shrink-0 mt-0.5 shadow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white" fillOpacity=".9">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 justify-start jiya-fadein">
              <BotAvatar />
              <div className="bg-[#1c2230] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="h-px bg-white/[0.05] shrink-0" />

        {/* Input */}
        <div className="shrink-0 p-3 bg-[#161b22] flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
            }}
            onKeyDown={handleKey}
            rows={1}
            placeholder="Ask about projects, skills..."
            className="
              flex-1 resize-none
              bg-[#0d1117] text-white text-[13.5px]
              px-3.5 py-2.5
              rounded-xl border border-white/[0.08]
              focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30
              placeholder:text-gray-600 leading-5
              transition-all duration-150
            "
            style={{ minHeight: "40px", maxHeight: "96px" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="
              w-10 h-10 shrink-0 flex items-center justify-center
              bg-gradient-to-br from-emerald-500 to-green-600
              hover:from-emerald-400 hover:to-green-500
              disabled:opacity-40 disabled:cursor-not-allowed
              rounded-xl text-white
              shadow-[0_2px_12px_rgba(16,185,129,0.35)]
              hover:shadow-[0_4px_16px_rgba(16,185,129,0.5)]
              active:scale-95 transition-all duration-150
            "
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>

        <div className="shrink-0 pb-2 text-center">
          <span className="text-gray-700 text-[10px]">Enter to send · Shift+Enter for new line</span>
        </div>
      </div>

      <style>{`
        @keyframes jiyaBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes jiyaFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .jiya-fadein { animation: jiyaFadeIn 0.2s ease-out forwards; }
      `}</style>
    </>
  );
}

// ── Default export: standalone fallback (if Nav is not used) ───────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed z-50 bottom-6 right-6 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Chat with Jiya
      </button>
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}