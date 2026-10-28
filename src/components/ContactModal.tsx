import React, { useState } from 'react';
import { X, Send, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Stay Consultation');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep state showing success
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0d0f14] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Message Dispatched</h3>
            <p className="text-xs text-neutral-300 font-light max-w-sm mx-auto mb-6 leading-relaxed">
              Our Wilderness Concierge team will reach out directly to <span className="text-white font-medium">{email}</span> within 2 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-light block mb-1">
                Concierge Liaison
              </span>
              <h3 className="text-2xl font-serif-editorial text-white">
                Contact the Huna Heights Curators
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-1">
                For private helicopter arrivals, property buyout inquiries, or custom itineraries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-light">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Rigby"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-light">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@residence.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-light">Inquiry Category</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white cursor-pointer"
                >
                  <option value="Stay Consultation">Stay Consultation & Availability</option>
                  <option value="Helicopter Transfer">Helicopter or Private Boat Transfer</option>
                  <option value="Full Retreat Buyout">Full Retreat Buyout (All Cabins)</option>
                  <option value="Architectural Press">Architectural Press & Filming</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1 font-light">Inquiry Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your requested dates, guest party, or special arrangements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#14171d] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl mt-2"
              >
                <span>Send to Concierge</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-light">
              <span>Direct: concierge@hunaheights.com</span>
              <span>Available 24/7 UTC</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
