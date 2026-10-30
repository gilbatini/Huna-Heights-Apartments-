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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-deep/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-muted hover:text-royal hover:bg-royal-tint transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-royal-tint border border-royal/20 text-royal flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-ink mb-2">Message Received</h3>
            <p className="text-xs text-ink/80 font-light max-w-sm mx-auto mb-6 leading-relaxed">
              Our team will get back to you at <span className="text-ink font-medium">{email}</span> as soon as possible.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-royal text-on-dark font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-royal-hover transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-royal font-light block mb-1">
                Contact Us
              </span>
              <h3 className="text-2xl font-serif-editorial text-ink">
                Get in Touch with Huna Heights
              </h3>
              <p className="text-xs text-muted font-light mt-1">
                For leasing, furnished stays, furnishing packages or anything else.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] text-muted mb-1 font-light">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Rigby"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface border border-line rounded-xl px-3.5 py-2.5 text-xs text-ink placeholder:text-muted focus:outline-none focus:border-royal"
                />
              </div>

              <div>
                <label className="block text-[11px] text-muted mb-1 font-light">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@residence.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-line rounded-xl px-3.5 py-2.5 text-xs text-ink placeholder:text-muted focus:outline-none focus:border-royal"
                />
              </div>

              <div>
                <label className="block text-[11px] text-muted mb-1 font-light">Inquiry Category</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-surface border border-line rounded-xl px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:border-royal cursor-pointer"
                >
                  <option value="Stay Consultation">Leasing an Apartment</option>
                  <option value="Helicopter Transfer">A Stay at the Furnished Residence</option>
                  <option value="Full Retreat Buyout">Interior Furnishing Packages</option>
                  <option value="Architectural Press">General Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-muted mb-1 font-light">Inquiry Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Which apartment, preferred viewing times, move-in or arrival date..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-surface border border-line rounded-xl px-3.5 py-2 text-xs text-ink placeholder:text-muted focus:outline-none focus:border-royal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-royal hover:bg-royal-hover text-on-dark font-semibold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-soft mt-2"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-[11px] text-muted font-light">
              <span>Email: to confirm</span>
              <span>Nairobi time (EAT)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
