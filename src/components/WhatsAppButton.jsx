import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, PhoneCall } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaste! 🙏 Welcome to ASTROTANNTRA. How can our Vedic Astrologers guide you today?' }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for your message! Our senior astrologer is reviewing your query. You can also connect directly on WhatsApp at +91 99930 27943 for instant consultation.'
        }
      ]);
    }, 1000);
  };

  const quickQuestions = [
    'When will I get a job / career growth?',
    'Kundli matching for marriage',
    'Am I Manglik or undergoing Sade Sati?'
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      
      {/* Popover Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-[#170932] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn transition-all">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
                  🕉️
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-emerald-700" />
              </div>
              <div>
                <h4 className="font-bold text-sm">ASTROTANNTRA Live Desk</h4>
                <span className="text-[10px] text-emerald-100 block">Senior Astrologers Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-black/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3.5 space-y-3 h-64 overflow-y-auto bg-[#0f0423] text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2.5 rounded-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-[#231248] text-slate-200 border border-purple-800/40 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#120527] border-t border-purple-900/40 flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMessages((prev) => [...prev, { sender: 'user', text: q }]);
                  setTimeout(() => {
                    setMessages((prev) => [
                      ...prev,
                      {
                        sender: 'bot',
                        text: `Regarding "${q}": Click "Generate Kundli" above for automated insights, or message our Acharyas on WhatsApp +91 99930 27943.`
                      }
                    ]);
                  }, 800);
                }}
                className="text-[10px] px-2 py-1 rounded bg-[#2b1459] hover:bg-amber-500/20 text-amber-200 border border-amber-500/20 transition-all text-left"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2.5 bg-[#170932] border-t border-purple-900/60 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask an astrology question..."
              className="flex-1 bg-cosmic-950 border border-purple-800 text-xs text-white px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct WhatsApp Action Link */}
          <a
            href="https://wa.me/919993027943?text=Namaste%20Astrotanntra,%20I%20would%20like%20to%20consult%20an%20astrologer"
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-emerald-700 hover:bg-emerald-800 text-center text-[11px] font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Open in Official WhatsApp Web / App</span>
            &rarr;
          </a>

        </div>
      )}

      {/* Floating WhatsApp Action Pill & Button */}
      <div className="flex items-center gap-2">
        
        {/* Floating Tooltip Pill */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120527]/95 border border-emerald-500/60 shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-xs font-medium text-emerald-300 hover:text-white hover:border-emerald-400 transition-all cursor-pointer backdrop-blur-md animate-fadeIn"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">Chat with Astrologer</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">ONLINE</span>
          </div>
        )}

        {/* WhatsApp Official Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_4px_25px_rgba(37,211,102,0.65)] flex items-center justify-center transition-all hover:scale-110 cursor-pointer active:scale-95 group relative shrink-0"
          aria-label="Chat with Astrologer on WhatsApp"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.16C10.56 20.16 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16ZM16.57 14.37C16.32 14.24 15.1 13.64 14.87 13.56C14.65 13.47 14.48 13.43 14.32 13.68C14.15 13.93 13.68 14.48 13.54 14.64C13.4 14.81 13.25 14.83 13 14.7C12.75 14.58 11.95 14.31 11 13.47C10.26 12.81 9.77 12 9.62 11.75C9.48 11.5 9.6 11.37 9.73 11.24C9.84 11.13 9.98 10.95 10.1 10.81C10.22 10.67 10.27 10.56 10.35 10.4C10.43 10.23 10.39 10.09 10.33 9.96C10.27 9.84 9.78 8.63 9.57 8.13C9.37 7.64 9.17 7.71 9.02 7.7C8.88 7.69 8.71 7.69 8.55 7.69C8.38 7.69 8.11 7.75 7.89 7.99C7.66 8.24 7.03 8.83 7.03 10.03C7.03 11.23 7.9 12.39 8.02 12.55C8.15 12.72 9.74 15.17 12.18 16.22C12.76 16.47 13.21 16.62 13.57 16.73C14.15 16.92 14.68 16.89 15.1 16.83C15.57 16.76 16.54 16.24 16.74 15.67C16.94 15.1 16.94 14.62 16.88 14.51C16.82 14.41 16.67 14.35 16.57 14.37Z"/>
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </span>
        </button>

      </div>

    </div>
  );
}
