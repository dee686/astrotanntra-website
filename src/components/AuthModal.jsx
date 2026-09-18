import React, { useState } from 'react';
import { X, Mail, Lock, Phone, User, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess, lang }) {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' or 'email'
  const [phone, setPhone] = useState('+91 99930 27943');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setTimeout(() => {
      onLoginSuccess && onLoginSuccess({ phone, name: 'Ansh Mishra' });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] to-[#160630] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-cinzel font-bold text-base">
              A
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-base text-amber-300">
                {isLogin ? 'Welcome to ASTROTANNTRA' : 'Create Your Free Account'}
              </h3>
              <span className="text-[10px] text-slate-300">Access saved Kundlis & bookings</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-cosmic-800 hover:bg-rose-500/20 border border-purple-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {isLoggedIn ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-cinzel font-bold text-lg text-amber-300">Login Successful!</h4>
              <p className="text-xs text-slate-300">Welcome back, Ansh Mishra. Syncing your Vedic charts...</p>
            </div>
          ) : (
            <>
              {/* Method Switcher */}
              <div className="flex items-center bg-[#1d0c3d] rounded-xl p-1 border border-purple-800/60 text-xs">
                <button
                  onClick={() => { setAuthMethod('phone'); setOtpSent(false); }}
                  className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                    authMethod === 'phone' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300'
                  }`}
                >
                  Phone / WhatsApp
                </button>
                <button
                  onClick={() => { setAuthMethod('email'); setOtpSent(false); }}
                  className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                    authMethod === 'email' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300'
                  }`}
                >
                  Email & Password
                </button>
              </div>

              {authMethod === 'phone' ? (
                !otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Mobile / WhatsApp Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-amber-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 99930 27943"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Send Verification OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Enter 4-Digit OTP sent to {phone}</label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="e.g. 7829"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#231248] border border-purple-700 text-center text-lg font-mono tracking-widest text-amber-300 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Verify & Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-amber-300 hover:underline block mx-auto text-center"
                    >
                      Change Number
                    </button>
                  </form>
                )
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-amber-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-3 text-amber-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#231248] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>
                </form>
              )}

              {/* Social Login Button */}
              <div className="pt-2 border-t border-purple-900/60">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setTimeout(() => {
                      onLoginSuccess && onLoginSuccess({ name: 'Google User', email: 'user@gmail.com' });
                      onClose();
                    }, 1000);
                  }}
                  className="w-full py-2 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 border border-purple-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>🌐</span>
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Toggle Login / Signup */}
              <div className="text-center pt-1 text-xs text-slate-400">
                {isLogin ? (
                  <span>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-amber-300 font-bold hover:underline cursor-pointer"
                    >
                      Sign Up Free
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-amber-300 font-bold hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
