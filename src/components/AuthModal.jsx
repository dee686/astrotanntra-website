import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Phone, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Check, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { 
  registerUser, 
  loginWithEmail, 
  loginWithPhone, 
  loginWithGoogleAccount, 
  evaluatePasswordRules 
} from '../services/authService';

export default function AuthModal({ onClose, onLoginSuccess, lang = 'en' }) {
  // Tab: 'signin' | 'signup'
  const [isLogin, setIsLogin] = useState(true);

  // Sign In method: 'phone' | 'email'
  const [authMethod, setAuthMethod] = useState('phone');

  // Sign In fields
  const [signInPhone, setSignInPhone] = useState('+91 99930 27943');
  const [signInEmail, setSignInEmail] = useState('deepak.kumar686@gmail.com');
  const [signInPassword, setSignInPassword] = useState('Password@123');
  const [showSignInPw, setShowSignInPw] = useState(false);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [demoOtp, setDemoOtp] = useState('4829');

  // Sign Up fields
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPw, setShowSignUpPw] = useState(false);

  // Error & Status feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [duplicateFound, setDuplicateFound] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successUser, setSuccessUser] = useState(null);

  // Google Account Picker Dialog
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [isCustomGoogleOpen, setIsCustomGoogleOpen] = useState(false);

  // Password analysis for Sign Up
  const pwAnalysis = evaluatePasswordRules(signUpPassword);

  // Handle Send OTP for Phone Sign-In
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setDemoOtp(randomCode);
    setOtpSent(true);
    setOtp(randomCode); // prefill for easy testing
  };

  // Handle Verify OTP for Phone Sign-In
  const handleVerifyPhoneOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginWithPhone(signInPhone, otp);
    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }
    handleSuccessfulAuth(res.user);
  };

  // Handle Email & Password Sign-In
  const handleEmailSignIn = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginWithEmail(signInEmail, signInPassword);
    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }
    handleSuccessfulAuth(res.user);
  };

  // Handle New User Registration
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setDuplicateFound(false);

    if (!signUpEmail && !signUpPhone) {
      setErrorMessage(
        lang === 'hi' 
          ? 'कृपया ईमेल पता या फ़ोन नंबर दर्ज करें।' 
          : 'Please provide either an Email address or Phone number.'
      );
      return;
    }

    if (!pwAnalysis.allMet) {
      setErrorMessage(
        lang === 'hi'
          ? 'कृपया पासवर्ड की सभी 5 आवश्यकताओं को पूरा करें।'
          : 'Please satisfy all 5 password requirements listed below.'
      );
      return;
    }

    const res = registerUser({
      name: signUpName,
      email: signUpEmail,
      phone: signUpPhone,
      password: signUpPassword,
      provider: 'local'
    });

    if (!res.success) {
      setErrorMessage(res.message);
      setDuplicateFound(true);
      return;
    }

    handleSuccessfulAuth(res.user);
  };

  // Handle Google Login selection
  const handleSelectGoogleAccount = (acc) => {
    setShowGooglePicker(false);
    const res = loginWithGoogleAccount(acc);
    handleSuccessfulAuth(res.user);
  };

  // Handle Custom Google Login
  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    const acc = {
      name: customGoogleName.trim() || customGoogleEmail.split('@')[0],
      email: customGoogleEmail.trim(),
      avatar: null
    };
    handleSelectGoogleAccount(acc);
  };

  // Unified Success Trigger
  const handleSuccessfulAuth = (user) => {
    setSuccessUser(user);
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess && onLoginSuccess(user);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#13062c] border border-amber-500/50 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-purple-800/60 bg-gradient-to-r from-[#1c0a3c] via-[#160630] to-[#140529] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-purple-800 p-0.5 shadow-gold-glow flex items-center justify-center text-amber-300 font-cinzel font-bold text-lg">
              <span className="w-full h-full rounded-xl bg-[#14062c] flex items-center justify-center">A</span>
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-base sm:text-lg text-amber-300">
                {isSuccess ? 'Authentication Complete' : (isLogin ? 'Welcome to ASTROTANNTRA' : 'Create Free Account')}
              </h3>
              <span className="text-[11px] text-amber-200/70">
                {isLogin ? 'Sign in to access your Vedic charts & readings' : 'Join thousands of Vedic seekers worldwide'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-cosmic-800 hover:bg-rose-500/20 border border-purple-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-5 sm:p-7 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar">
          
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="py-10 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="font-cinzel font-bold text-xl text-amber-300">
                  {lang === 'hi' ? 'लॉगिन सफल रहा!' : 'Login Successful!'}
                </h4>
                <p className="text-sm text-slate-200">
                  {lang === 'hi' ? 'स्वागत है' : 'Welcome back'}, <span className="text-amber-300 font-semibold">{successUser?.name || 'Vedic Seeker'}</span>!
                </p>
                <p className="text-xs text-slate-400">
                  {lang === 'hi' ? 'आपकी वैदिक कुण्डली और सत्र लोड हो रहे हैं...' : 'Synchronizing your Vedic charts and session...'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* TAB SWITCHER: Sign In vs Sign Up */}
              <div className="grid grid-cols-2 bg-[#1b0a39] rounded-2xl p-1 border border-purple-800/80 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setErrorMessage('');
                    setDuplicateFound(false);
                  }}
                  className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                    isLogin 
                      ? 'bg-amber-400 text-slate-950 shadow-[0_2px_12px_rgba(245,158,11,0.3)]' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang === 'hi' ? 'साइन इन (Sign In)' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setErrorMessage('');
                    setDuplicateFound(false);
                  }}
                  className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                    !isLogin 
                      ? 'bg-amber-400 text-slate-950 shadow-[0_2px_12px_rgba(245,158,11,0.3)]' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang === 'hi' ? 'साइन अप (Sign Up)' : 'Sign Up Free'}
                </button>
              </div>

              {/* DUPLICATE USER OR GENERAL ERROR BANNER */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-500/70 text-rose-200 text-xs space-y-2 animate-fadeIn shadow-[0_4px_20px_rgba(244,63,94,0.2)]">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1 font-medium leading-relaxed">
                      {errorMessage}
                    </div>
                  </div>

                  {duplicateFound && (
                    <div className="pt-1 pl-6">
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(true);
                          setErrorMessage('');
                          setDuplicateFound(false);
                          if (signUpEmail) {
                            setAuthMethod('email');
                            setSignInEmail(signUpEmail);
                          } else if (signUpPhone) {
                            setAuthMethod('phone');
                            setSignInPhone(signUpPhone);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        <span>{lang === 'hi' ? 'इस खाते से साइन इन करें' : 'Switch to Sign In with this account'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* SIGN IN FORM */}
              {/* ========================================================================= */}
              {isLogin ? (
                <div className="space-y-4">
                  {/* Method Toggle: Phone vs Email */}
                  <div className="flex items-center bg-[#180833] rounded-xl p-1 border border-purple-800/50 text-[11px]">
                    <button
                      type="button"
                      onClick={() => { setAuthMethod('phone'); setOtpSent(false); setErrorMessage(''); }}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                        authMethod === 'phone' 
                          ? 'bg-purple-700/70 text-amber-300 font-bold border border-amber-400/40' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Phone / WhatsApp</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAuthMethod('email'); setErrorMessage(''); }}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                        authMethod === 'email' 
                          ? 'bg-purple-700/70 text-amber-300 font-bold border border-amber-400/40' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>Email & Password</span>
                      </span>
                    </button>
                  </div>

                  {/* Phone Authentication */}
                  {authMethod === 'phone' ? (
                    !otpSent ? (
                      <form onSubmit={handleSendOtp} className="space-y-3">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                            {lang === 'hi' ? 'मोबाइल या व्हाट्सएप नंबर' : 'Mobile or WhatsApp Number'}
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                            <input
                              type="tel"
                              required
                              value={signInPhone}
                              onChange={(e) => setSignInPhone(e.target.value)}
                              placeholder="+91 99930 27943"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow"
                        >
                          {lang === 'hi' ? 'सत्यापन कोड (OTP) भेजें' : 'Send Verification OTP'}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyPhoneOtp} className="space-y-3 animate-fadeIn">
                        {/* Demo OTP Helper Banner */}
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Verification code for {signInPhone}:</span>
                          </span>
                          <span className="font-mono font-bold text-amber-300 tracking-wider bg-black/40 px-2 py-0.5 rounded border border-amber-400/40">
                            {demoOtp}
                          </span>
                        </div>

                        <div>
                          <label className="text-xs text-slate-300 block mb-1 font-medium">
                            {lang === 'hi' ? '4-अंकीय OTP दर्ज करें' : 'Enter 4-Digit Verification Code'}
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={4}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="e.g. 4829"
                            className="w-full px-3 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-center text-lg font-mono tracking-[0.3em] text-amber-300 focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow"
                        >
                          {lang === 'hi' ? 'सत्यापित करें और लॉगिन करें' : 'Verify & Login'}
                        </button>

                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-[11px] text-amber-300/80 hover:text-amber-200 hover:underline block mx-auto text-center cursor-pointer"
                        >
                          {lang === 'hi' ? 'नंबर बदलें या पुनः भेजें' : 'Change number or resend OTP'}
                        </button>
                      </form>
                    )
                  ) : (
                    /* Email & Password Authentication */
                    <form onSubmit={handleEmailSignIn} className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                          {lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                          <input
                            type="email"
                            required
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                          {lang === 'hi' ? 'पासवर्ड' : 'Password'}
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                          <input
                            type={showSignInPw ? 'text' : 'password'}
                            required
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignInPw(!showSignInPw)}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-300"
                          >
                            {showSignInPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow mt-1"
                      >
                        {lang === 'hi' ? 'साइन इन करें' : 'Sign In'}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                /* ========================================================================= */
                /* SIGN UP FORM (With Duplicate Prevention & Password Strength/Checklist) */
                /* ========================================================================= */
                <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {lang === 'hi' ? 'पूरा नाम' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                      <input
                        type="text"
                        required
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="e.g. Deepak Kumar"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                      <input
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="deepak.kumar686@gmail.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Mobile / WhatsApp Number */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {lang === 'hi' ? 'मोबाइल / व्हाट्सएप नंबर' : 'Mobile / WhatsApp Number'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                      <input
                        type="tel"
                        value={signUpPhone}
                        onChange={(e) => setSignUpPhone(e.target.value)}
                        placeholder="+91 99930 27943"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {lang === 'hi' ? 'सुरक्षित पासवर्ड बनाएं' : 'Create Secure Password'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                      <input
                        type={showSignUpPw ? 'text' : 'password'}
                        required
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="e.g. Vedic@2026"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPw(!showSignUpPw)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-300 cursor-pointer"
                      >
                        {showSignUpPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* LIVE PASSWORD STRENGTH INDICATOR (Weak / Medium / Strong) */}
                    {signUpPassword.length > 0 && (
                      <div className="mt-2 p-2 rounded-xl bg-[#1a0c35]/80 border border-purple-800/60 space-y-1.5 animate-fadeIn">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-300 font-medium">
                            {lang === 'hi' ? 'पासवर्ड मजबूती:' : 'Password Strength:'}
                          </span>
                          <span className={`font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full border ${
                            pwAnalysis.strength === 'weak'
                              ? 'bg-rose-950/70 border-rose-500/60 text-rose-400'
                              : pwAnalysis.strength === 'medium'
                              ? 'bg-amber-950/70 border-amber-500/60 text-amber-300'
                              : 'bg-emerald-950/70 border-emerald-500/60 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                          }`}>
                            {pwAnalysis.strength === 'weak' ? (lang === 'hi' ? 'कमजोर (Weak)' : 'Weak') :
                             pwAnalysis.strength === 'medium' ? (lang === 'hi' ? 'मध्यम (Medium)' : 'Medium') :
                             (lang === 'hi' ? 'मजबूत (Strong)' : 'Strong')}
                          </span>
                        </div>

                        {/* 3-Segment Progress Bar */}
                        <div className="grid grid-cols-3 gap-1.5 h-1.5">
                          <div className={`rounded-full transition-all duration-300 ${
                            pwAnalysis.strength === 'weak'
                              ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]'
                              : pwAnalysis.strength === 'medium'
                              ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]'
                              : pwAnalysis.strength === 'strong'
                              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                              : 'bg-slate-700'
                          }`} />
                          <div className={`rounded-full transition-all duration-300 ${
                            pwAnalysis.strength === 'medium'
                              ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]'
                              : pwAnalysis.strength === 'strong'
                              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                              : 'bg-slate-700'
                          }`} />
                          <div className={`rounded-full transition-all duration-300 ${
                            pwAnalysis.strength === 'strong'
                              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]'
                              : 'bg-slate-700'
                          }`} />
                        </div>
                      </div>
                    )}

                    {/* LIVE PASSWORD REQUIREMENTS CHECKLIST */}
                    <div className="mt-2.5 space-y-1.5">
                      <div className="text-[11px] text-slate-300 font-medium flex items-center justify-between">
                        <span>{lang === 'hi' ? 'पासवर्ड आवश्यकताएं (नीचे देखें):' : 'Password Checklist:'}</span>
                        <span className="text-[10px] text-amber-300/80 font-mono">
                          {pwAnalysis.metCount}/5 {lang === 'hi' ? 'पूर्ण' : 'Met'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {pwAnalysis.rules.map((rule) => {
                          const met = rule.isMet;
                          return (
                            <div
                              key={rule.id}
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[11px] transition-all duration-200 border ${
                                met
                                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                                  : 'bg-[#180931]/70 border-purple-900/60 text-slate-400'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                                met 
                                  ? 'bg-emerald-500 text-slate-950 font-bold' 
                                  : 'bg-slate-800 border border-slate-700 text-slate-500'
                              }`}>
                                {met ? <Check className="w-3 h-3 text-slate-950 stroke-[3]" /> : '○'}
                              </div>
                              <span className="truncate">
                                {lang === 'hi' ? rule.labelHi : rule.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Sign Up Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow mt-2"
                  >
                    {lang === 'hi' ? 'नया खाता बनाएं' : 'Create Free Account'}
                  </button>
                </form>
              )}

              {/* ========================================================================= */}
              {/* GOOGLE SOCIAL LOGIN */}
              {/* ========================================================================= */}
              <div className="pt-3 border-t border-purple-900/70">
                <button
                  type="button"
                  onClick={() => setShowGooglePicker(true)}
                  className="w-full py-2.5 rounded-xl bg-[#1b0a39] hover:bg-[#250e4e] border border-purple-700 hover:border-amber-400/50 text-xs font-semibold flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="text-slate-200 group-hover:text-white">
                    {lang === 'hi' ? 'गूगल खाते से जारी रखें' : 'Continue with Google'}
                  </span>
                </button>
              </div>

              {/* Toggle Sign In / Sign Up Footer Note */}
              <div className="text-center pt-1 text-xs text-slate-400">
                {isLogin ? (
                  <span>
                    {lang === 'hi' ? 'खाता नहीं है?' : "Don't have an account?"}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(false);
                        setErrorMessage('');
                        setDuplicateFound(false);
                      }}
                      className="text-amber-300 font-bold hover:underline cursor-pointer ml-1"
                    >
                      {lang === 'hi' ? 'मुफ्त साइन अप करें' : 'Sign Up Free'}
                    </button>
                  </span>
                ) : (
                  <span>
                    {lang === 'hi' ? 'पहले से खाता मौजूद है?' : 'Already have an account?'}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(true);
                        setErrorMessage('');
                        setDuplicateFound(false);
                      }}
                      className="text-amber-300 font-bold hover:underline cursor-pointer ml-1"
                    >
                      {lang === 'hi' ? 'साइन इन करें' : 'Sign In'}
                    </button>
                  </span>
                )}
              </div>
            </>
          )}

        </div>

        {/* ========================================================================= */}
        {/* GOOGLE ACCOUNT PICKER MODAL OVERLAY */}
        {/* ========================================================================= */}
        {showGooglePicker && (
          <div className="absolute inset-0 z-50 bg-[#0d031e]/95 backdrop-blur-md p-6 flex flex-col justify-between animate-fadeIn">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-purple-800/60">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-white">Sign in with Google</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowGooglePicker(false); setIsCustomGoogleOpen(false); }}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-2">
                <p className="text-xs text-slate-300 font-medium">
                  {lang === 'hi' ? 'ASTROTANNTRA के लिए गूगल खाता चुनें:' : 'Choose an account to continue to ASTROTANNTRA:'}
                </p>

                {/* Pre-configured Demo Google Accounts */}
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSelectGoogleAccount({
                      name: 'Deepak Kumar',
                      email: 'deepak.kumar686@gmail.com'
                    })}
                    className="w-full p-3 rounded-2xl bg-[#1b0b38] hover:bg-amber-500/10 border border-purple-700/60 hover:border-amber-400 flex items-center gap-3 transition-all text-left cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-sm">
                      D
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 truncate">
                        Deepak Kumar
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        deepak.kumar686@gmail.com
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      Vedic Member
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGoogleAccount({
                      name: 'Ananya Sharma',
                      email: 'ananya.sharma@gmail.com'
                    })}
                    className="w-full p-3 rounded-2xl bg-[#1b0b38] hover:bg-amber-500/10 border border-purple-700/60 hover:border-amber-400 flex items-center gap-3 transition-all text-left cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 truncate">
                        Ananya Sharma
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        ananya.sharma@gmail.com
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded-full">
                      Google
                    </span>
                  </button>
                </div>

                {/* Custom Google Account Input */}
                {!isCustomGoogleOpen ? (
                  <button
                    type="button"
                    onClick={() => setIsCustomGoogleOpen(true)}
                    className="w-full py-2.5 mt-2 rounded-xl border border-dashed border-purple-700 text-xs text-amber-300 hover:bg-purple-900/30 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>+ Use another Google account</span>
                  </button>
                ) : (
                  <form onSubmit={handleCustomGoogleSubmit} className="mt-3 p-3 rounded-2xl bg-[#170830] border border-amber-500/40 space-y-2.5 animate-fadeIn">
                    <div className="text-xs font-semibold text-amber-300">
                      Enter Your Google Account Details
                    </div>
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Priya Patel)"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="email"
                      required
                      placeholder="your.email@gmail.com"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Sign In with this Google Account
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCustomGoogleOpen(false)}
                        className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-purple-900/60 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by Google Authentication</span>
              </span>
              <button
                type="button"
                onClick={() => setShowGooglePicker(false)}
                className="text-amber-300 hover:underline"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
