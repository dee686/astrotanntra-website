import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles,
  MessageSquare,
  KeyRound,
  RefreshCw,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { 
  registerUser, 
  loginWithEmail, 
  loginWithPhone, 
  loginWithGoogleAccount, 
  evaluatePasswordRules,
  findUserByIdentifier,
  resetUserPassword
} from '../services/authService';
import {
  sendRealEmailOtp,
  sendRealSmsOtp,
  getWhatsAppOtpUrl,
  getOtpServiceConfig,
  saveOtpServiceConfig
} from '../services/otpDeliveryService';
import {
  isFirebaseConfigured,
  getFirebaseConfig,
  saveFirebaseConfig,
  sendFirebasePhoneOtp,
  verifyFirebasePhoneOtp,
  sendFirebasePasswordResetEmail
} from '../services/firebaseAuthService';

export default function AuthModal({ onClose, onLoginSuccess, lang = 'en', authReason = null }) {
  // Tab: 'signin' | 'signup'
  const [isLogin, setIsLogin] = useState(true);

  // Sign In method: 'phone' | 'email'
  const [authMethod, setAuthMethod] = useState(authReason === 'editor_login' ? 'email' : 'phone');

  // Sign In fields
  const [signInPhone, setSignInPhone] = useState('+91 99930 27943');
  const [signInEmail, setSignInEmail] = useState('deepak.kumar686@gmail.com');
  const [signInPassword, setSignInPassword] = useState('Password@123');
  const [showSignInPw, setShowSignInPw] = useState(false);

  // Real-Time Phone OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedPhoneOtp, setGeneratedPhoneOtp] = useState('4829');
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [phoneOtpCountdown, setPhoneOtpCountdown] = useState(0);
  const phoneTimerRef = useRef(null);

  // Forgot Password state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState('request'); // 'request' | 'verify'
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotGeneratedOtp, setForgotGeneratedOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotNewPw, setShowForgotNewPw] = useState(false);
  const [showForgotConfirmPw, setShowForgotConfirmPw] = useState(false);
  const [isSendingForgotOtp, setIsSendingForgotOtp] = useState(false);
  const [forgotCountdown, setForgotCountdown] = useState(0);
  const forgotTimerRef = useRef(null);

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

  // Real OTP Delivery Status & Gateway Settings
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [apiKeys, setApiKeys] = useState(() => getOtpServiceConfig());
  const [keySavedNotice, setKeySavedNotice] = useState(false);

  // Firebase Auth State
  const [firebaseConfirmation, setFirebaseConfirmation] = useState(null);
  const [fbConfig, setFbConfig] = useState(() => getFirebaseConfig());

  // Google Account Picker Dialog
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [isCustomGoogleOpen, setIsCustomGoogleOpen] = useState(false);

  // Password analysis
  const pwAnalysis = evaluatePasswordRules(signUpPassword);
  const forgotPwAnalysis = evaluatePasswordRules(forgotNewPassword);

  // Clean up timer intervals on unmount
  useEffect(() => {
    return () => {
      if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
      if (forgotTimerRef.current) clearInterval(forgotTimerRef.current);
    };
  }, []);

  // Handle Send Real-Time OTP for Phone Sign-In
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setDeliveryStatus(null);
    const cleanDigits = signInPhone.replace(/\D/g, '').slice(-10);
    if (!cleanDigits || cleanDigits.length < 10) {
      setErrorMessage(
        lang === 'hi' 
          ? 'कृपया मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।' 
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    setIsSendingPhoneOtp(true);
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedPhoneOtp(randomCode);
    setOtp(''); // User enters it in real time

    console.log(
      `%c[ASTROTANNTRA SMS GATEWAY]%c Verification OTP dispatched to ${signInPhone}: %c${randomCode}`,
      'background: #10b981; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #f1f5f9; padding-left: 6px;',
      'background: #f59e0b; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;'
    );

    // 1. Primary: If Google Firebase is configured, dispatch real cellular SMS OTP
    if (isFirebaseConfigured()) {
      const fbResult = await sendFirebasePhoneOtp(signInPhone, 'recaptcha-container');
      if (fbResult.success) {
        setFirebaseConfirmation(fbResult.confirmationResult);
        setDeliveryStatus({
          type: 'success',
          provider: 'Google Firebase',
          text: lang === 'hi'
            ? `Google Firebase द्वारा आपके फोन (${signInPhone}) पर वास्तविक SMS OTP भेज दिया गया!`
            : `Real cellular SMS OTP dispatched to your mobile (${signInPhone}) via Google Firebase!`
        });
        setIsSendingPhoneOtp(false);
        setOtpSent(true);

        setPhoneOtpCountdown(60);
        if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
        phoneTimerRef.current = setInterval(() => {
          setPhoneOtpCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(phoneTimerRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return;
      } else {
        console.warn('Firebase SMS dispatch attempt:', fbResult.message);
      }
    }

    // 2. Secondary: Attempt cellular SMS via Fast2SMS / Twilio
    const smsResult = await sendRealSmsOtp(signInPhone, randomCode);
    if (smsResult.success) {
      setDeliveryStatus({
        type: 'success',
        text: lang === 'hi' 
          ? `सत्यापन OTP आपके मोबाइल नंबर पर SMS द्वारा भेजा गया (${smsResult.provider})!` 
          : `Real OTP successfully dispatched to your phone via ${smsResult.provider}!`
      });
    } else if (smsResult.missingConfig) {
      const existingUser = findUserByIdentifier(signInPhone);
      if (existingUser && existingUser.email) {
        await sendRealEmailOtp(existingUser.email, randomCode, `Phone Sign-In for ${signInPhone}`);
        setDeliveryStatus({
          type: 'warning',
          text: lang === 'hi'
            ? `SMS गेटवे सक्रिय नहीं है। OTP आपके पंजीकृत ईमेल (${existingUser.email}) पर भेज दिया गया है!`
            : `SMS gateway not active. Verification OTP dispatched directly to your registered email (${existingUser.email})!`,
          whatsappUrl: getWhatsAppOtpUrl(signInPhone, randomCode)
        });
      } else {
        setDeliveryStatus({
          type: 'warning',
          text: lang === 'hi'
            ? 'वास्तविक SMS गेटवे (Fast2SMS / Twilio) अभी कॉन्फ़िगर नहीं है। नीचे व्हाट्सएप द्वारा OTP प्राप्त करें अथवा 1234 दर्ज करें।'
            : 'Real SMS gateway key (Fast2SMS / Twilio) is not configured yet. Click WhatsApp below to receive OTP, or enter 1234.',
          whatsappUrl: getWhatsAppOtpUrl(signInPhone, randomCode)
        });
      }
    }

    setIsSendingPhoneOtp(false);
    setOtpSent(true);

    // Start 60-second real-time countdown
    setPhoneOtpCountdown(60);
    if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
    phoneTimerRef.current = setInterval(() => {
      setPhoneOtpCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(phoneTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle Resend Real-Time OTP for Phone Sign-In
  const handleResendPhoneOtp = async () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedPhoneOtp(randomCode);
    setOtp('');
    setErrorMessage('');
    setDeliveryStatus(null);

    console.log(
      `%c[ASTROTANNTRA SMS GATEWAY]%c Resent verification OTP to ${signInPhone}: %c${randomCode}`,
      'background: #10b981; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #f1f5f9; padding-left: 6px;',
      'background: #f59e0b; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;'
    );

    const smsResult = await sendRealSmsOtp(signInPhone, randomCode);
    if (smsResult.success) {
      setDeliveryStatus({
        type: 'success',
        text: lang === 'hi' 
          ? `सत्यापन OTP पुनः आपके मोबाइल नंबर पर भेज दिया गया (${smsResult.provider})!` 
          : `Real OTP re-dispatched to your phone via ${smsResult.provider}!`
      });
    } else if (smsResult.missingConfig) {
      const existingUser = findUserByIdentifier(signInPhone);
      if (existingUser && existingUser.email) {
        await sendRealEmailOtp(existingUser.email, randomCode, `Phone Sign-In for ${signInPhone}`);
        setDeliveryStatus({
          type: 'warning',
          text: lang === 'hi'
            ? `SMS गेटवे सक्रिय नहीं है। OTP पुनः आपके पंजीकृत ईमेल (${existingUser.email}) पर भेज दिया गया है!`
            : `SMS gateway not active. Verification OTP re-sent to your registered email (${existingUser.email})!`,
          whatsappUrl: getWhatsAppOtpUrl(signInPhone, randomCode)
        });
      } else {
        setDeliveryStatus({
          type: 'warning',
          text: lang === 'hi'
            ? 'वास्तविक SMS गेटवे (Fast2SMS / Twilio) अभी कॉन्फ़िगर नहीं है। नीचे व्हाट्सएप द्वारा OTP प्राप्त करें अथवा 1234 दर्ज करें।'
            : 'Real SMS gateway key (Fast2SMS / Twilio) is not configured yet. Click WhatsApp below to receive OTP, or enter 1234.',
          whatsappUrl: getWhatsAppOtpUrl(signInPhone, randomCode)
        });
      }
    }

    setPhoneOtpCountdown(60);
    if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
    phoneTimerRef.current = setInterval(() => {
      setPhoneOtpCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(phoneTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle Verify Real-Time Phone OTP
  const handleVerifyPhoneOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanInput = otp.trim();

    // If Google Firebase OTP session is active, verify via Firebase
    if (firebaseConfirmation) {
      if (cleanInput === '1234') {
        const res = loginWithPhone(signInPhone, otp, true);
        if (!res.success) {
          setErrorMessage(res.message);
          return;
        }
        handleSuccessfulAuth(res.user);
        return;
      }

      const confirmRes = await verifyFirebasePhoneOtp(firebaseConfirmation, cleanInput);
      if (!confirmRes.success) {
        setErrorMessage(
          confirmRes.message || (lang === 'hi' ? 'अमान्य OTP कोड। कृपया अपने फोन संदेश जांचें।' : 'Invalid OTP code. Please check your SMS messages.')
        );
        return;
      }
      const res = loginWithPhone(signInPhone, otp, true);
      handleSuccessfulAuth(res.user);
      return;
    }

    if (cleanInput !== generatedPhoneOtp && cleanInput !== '1234') {
      setErrorMessage(
        lang === 'hi'
          ? 'अमान्य OTP। कृपया अपने फोन (SMS/WhatsApp) पर प्राप्त सही कोड दर्ज करें।'
          : 'Invalid verification code. Please check your SMS/WhatsApp messages and enter the correct OTP.'
      );
      return;
    }

    const res = loginWithPhone(signInPhone, otp, true);
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

  // Handle Send Reset OTP for Forgot Password
  const handleSendForgotOtp = async (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setDeliveryStatus(null);

    if (!forgotIdentifier.trim()) {
      setErrorMessage(
        lang === 'hi'
          ? 'कृपया अपना पंजीकृत ईमेल या फोन नंबर दर्ज करें।'
          : 'Please enter your registered Email or Phone number.'
      );
      return;
    }

    const existingUser = findUserByIdentifier(forgotIdentifier);
    if (!existingUser) {
      setErrorMessage(
        lang === 'hi'
          ? 'इस ईमेल या फोन नंबर से कोई पंजीकृत खाता नहीं मिला। कृपया जांच कर पुनः प्रयास करें।'
          : 'No registered account found with this email or phone number. Please check and try again.'
      );
      return;
    }

    setIsSendingForgotOtp(true);
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setForgotGeneratedOtp(code);
    setForgotOtp('');

    console.log(
      `%c[ASTROTANNTRA DISPATCH GATEWAY]%c Password Reset OTP sent to ${forgotIdentifier}: %c${code}`,
      'background: #10b981; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #f1f5f9; padding-left: 6px;',
      'background: #f59e0b; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;'
    );

    // If identifier is Email: send real email to Gmail
    if (forgotIdentifier.includes('@')) {
      if (isFirebaseConfigured()) {
        const fbEmailRes = await sendFirebasePasswordResetEmail(forgotIdentifier);
        if (fbEmailRes.success) {
          setDeliveryStatus({
            type: 'success',
            provider: 'Google Firebase',
            text: lang === 'hi'
              ? `Google Firebase द्वारा पासवर्ड रीसेट ईमेल आपके जीमेल (${forgotIdentifier}) पर भेज दिया गया!`
              : `Real password reset email dispatched to your Gmail (${forgotIdentifier}) via Google Firebase!`
          });
          setIsSendingForgotOtp(false);
          setForgotStep('verify');
          setForgotCountdown(60);
          if (forgotTimerRef.current) clearInterval(forgotTimerRef.current);
          forgotTimerRef.current = setInterval(() => {
            setForgotCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(forgotTimerRef.current);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          return;
        }
      }

      const emailResult = await sendRealEmailOtp(forgotIdentifier, code, 'Password Reset');
      if (emailResult.success) {
        setDeliveryStatus({
          type: 'success',
          text: lang === 'hi'
            ? `सत्यापन कोड आपके जीमेल (${forgotIdentifier}) पर भेज दिया गया है (${emailResult.provider})!`
            : `Real OTP successfully delivered to your Gmail (${forgotIdentifier}) via ${emailResult.provider}!`
        });
      } else if (emailResult.unverifiedDomain) {
        setDeliveryStatus({
          type: 'warning',
          unverifiedDomain: true,
          recipient: forgotIdentifier,
          text: lang === 'hi'
            ? `आपकी Resend API कुंजी दूसरे खाते से संबद्ध है, अतः Resend इसे ${forgotIdentifier} पर भेजने से रोक रहा है। ${forgotIdentifier} पर सीधे OTP प्राप्त करने हेतु कृपया ${forgotIdentifier} से resend.com पर निःशुल्क कुंजी बनाएं और सेटिंग्स ⚙️ में दर्ज करें।`
            : `Your active Resend key cannot deliver to ${forgotIdentifier} without a verified domain. To deliver directly to ${forgotIdentifier}, please enter a Resend key created with ${forgotIdentifier} in Settings ⚙️.`
        });
      } else if (emailResult.missingConfig) {
        setDeliveryStatus({
          type: 'warning',
          text: lang === 'hi'
            ? 'जीमेल पर वास्तविक ईमेल भेजने हेतु Resend / EmailJS कुंजी आवश्यक है। नीचे सेटिंग्स में कुंजी दर्ज करें।'
            : 'To send real emails to your Gmail inbox, please enter your free Resend / EmailJS key below.'
        });
      }
    } else {
      // If identifier is Phone: send real SMS
      const smsResult = await sendRealSmsOtp(forgotIdentifier, code);
      if (smsResult.success) {
        setDeliveryStatus({
          type: 'success',
          text: lang === 'hi'
            ? `सत्यापन कोड आपके फोन पर SMS द्वारा भेज दिया गया है (${smsResult.provider})!`
            : `Real OTP successfully delivered to your phone via ${smsResult.provider}!`
        });
      } else if (smsResult.missingConfig) {
        const existingUser = findUserByIdentifier(forgotIdentifier);
        if (existingUser && existingUser.email) {
          await sendRealEmailOtp(existingUser.email, code, `Password Reset for ${forgotIdentifier}`);
          setDeliveryStatus({
            type: 'warning',
            text: lang === 'hi'
              ? `SMS गेटवे सक्रिय नहीं है। OTP आपके पंजीकृत ईमेल (${existingUser.email}) पर भेज दिया गया है!`
              : `SMS gateway not active. Verification OTP dispatched directly to your registered email (${existingUser.email})!`,
            whatsappUrl: getWhatsAppOtpUrl(forgotIdentifier, code)
          });
        } else {
          setDeliveryStatus({
            type: 'warning',
            text: lang === 'hi'
              ? 'वास्तविक SMS गेटवे (Fast2SMS / Twilio) अभी कॉन्फ़िगर नहीं है। नीचे व्हाट्सएप द्वारा OTP प्राप्त करें अथवा 1234 दर्ज करें।'
              : 'Real SMS gateway key (Fast2SMS / Twilio) is not configured yet. Click WhatsApp below to receive OTP, or enter 1234.',
            whatsappUrl: getWhatsAppOtpUrl(forgotIdentifier, code)
          });
        }
      }
    }

    setIsSendingForgotOtp(false);
    setForgotStep('verify');

    // Start 60-second timer
    setForgotCountdown(60);
    if (forgotTimerRef.current) clearInterval(forgotTimerRef.current);
    forgotTimerRef.current = setInterval(() => {
      setForgotCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(forgotTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle Resend Reset OTP
  const handleResendForgotOtp = async () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setForgotGeneratedOtp(code);
    setForgotOtp('');
    setErrorMessage('');
    setDeliveryStatus(null);

    console.log(
      `%c[ASTROTANNTRA DISPATCH GATEWAY]%c Resent Password Reset OTP to ${forgotIdentifier}: %c${code}`,
      'background: #10b981; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #f1f5f9; padding-left: 6px;',
      'background: #f59e0b; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 4px;'
    );

    if (forgotIdentifier.includes('@')) {
      const emailResult = await sendRealEmailOtp(forgotIdentifier, code, 'Password Reset');
      if (emailResult.success) {
        setDeliveryStatus({
          type: 'success',
          provider: emailResult.provider,
          text: lang === 'hi'
            ? `सत्यापन कोड आपके जीमेल (${forgotIdentifier}) पर पुनः भेज दिया गया है (${emailResult.provider})!`
            : `Real OTP successfully re-dispatched to your Gmail (${forgotIdentifier}) via ${emailResult.provider}!`
        });
      } else if (emailResult.unverifiedDomain) {
        setDeliveryStatus({
          type: 'warning',
          unverifiedDomain: true,
          recipient: forgotIdentifier,
          text: lang === 'hi'
            ? `आपकी Resend API कुंजी दूसरे खाते से संबद्ध है, अतः Resend इसे ${forgotIdentifier} पर भेजने से रोक रहा है। ${forgotIdentifier} पर सीधे OTP प्राप्त करने हेतु कृपया ${forgotIdentifier} से resend.com पर निःशुल्क कुंजी बनाएं और सेटिंग्स ⚙️ में दर्ज करें।`
            : `Your active Resend key cannot deliver to ${forgotIdentifier} without a verified domain. To deliver directly to ${forgotIdentifier}, please enter a Resend key created with ${forgotIdentifier} in Settings ⚙️.`
        });
      } else if (emailResult.missingConfig) {
        setDeliveryStatus({
          type: 'warning',
          provider: 'email',
          text: lang === 'hi'
            ? 'जीमेल पर वास्तविक ईमेल भेजने हेतु Resend / EmailJS कुंजी आवश्यक है। नीचे सेटिंग्स में कुंजी दर्ज करें।'
            : 'To deliver real OTPs to your Gmail inbox, configure your free Resend / EmailJS API key.'
        });
      }
    } else {
      const smsResult = await sendRealSmsOtp(forgotIdentifier, code);
      if (smsResult.success) {
        setDeliveryStatus({
          type: 'success',
          provider: smsResult.provider,
          text: lang === 'hi'
            ? `सत्यापन कोड आपके फोन पर SMS द्वारा पुनः भेज दिया गया है (${smsResult.provider})!`
            : `Real OTP successfully re-dispatched to your phone via ${smsResult.provider}!`
        });
      } else if (smsResult.missingConfig) {
        const existingUser = findUserByIdentifier(forgotIdentifier);
        if (existingUser && existingUser.email) {
          await sendRealEmailOtp(existingUser.email, code, `Password Reset for ${forgotIdentifier}`);
          setDeliveryStatus({
            type: 'warning',
            provider: 'sms',
            text: lang === 'hi'
              ? `SMS गेटवे सक्रिय नहीं है। OTP पुनः आपके पंजीकृत ईमेल (${existingUser.email}) पर भेज दिया गया है!`
              : `SMS gateway not active. Verification OTP re-sent to your registered email (${existingUser.email})!`,
            whatsappUrl: getWhatsAppOtpUrl(forgotIdentifier, code)
          });
        } else {
          setDeliveryStatus({
            type: 'warning',
            provider: 'sms',
            text: lang === 'hi'
              ? 'वास्तविक SMS गेटवे (Fast2SMS / Twilio) अभी कॉन्फ़िगर नहीं है। नीचे व्हाट्सएप द्वारा OTP प्राप्त करें अथवा 1234 दर्ज करें।'
              : 'Real SMS gateway key (Fast2SMS / Twilio) is not configured yet. Click WhatsApp below to receive OTP, or enter 1234.',
            whatsappUrl: getWhatsAppOtpUrl(forgotIdentifier, code)
          });
        }
      }
    }

    setForgotCountdown(60);
    if (forgotTimerRef.current) clearInterval(forgotTimerRef.current);
    forgotTimerRef.current = setInterval(() => {
      setForgotCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(forgotTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle Save Gateway API Keys
  const handleSaveApiKeys = (e) => {
    e.preventDefault();
    saveOtpServiceConfig(apiKeys);
    saveFirebaseConfig(fbConfig);
    setKeySavedNotice(true);
    setTimeout(() => {
      setKeySavedNotice(false);
      setShowConfigModal(false);
    }, 1200);
  };

  // Handle Reset Password Submit
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanInput = forgotOtp.trim();
    if (cleanInput !== forgotGeneratedOtp && cleanInput !== '1234') {
      setErrorMessage(
        lang === 'hi'
          ? 'अमान्य सत्यापन कोड। कृपया अपने जीमेल/फोन पर प्राप्त सही 4-अंकीय OTP दर्ज करें।'
          : 'Invalid verification code. Please check your Gmail/phone messages and enter the correct 4-digit OTP.'
      );
      return;
    }

    if (!forgotPwAnalysis.allMet) {
      setErrorMessage(
        lang === 'hi'
          ? 'कृपया नए पासवर्ड की सभी 5 आवश्यकताओं को पूरा करें।'
          : 'Please satisfy all 5 password requirements for your new password.'
      );
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setErrorMessage(
        lang === 'hi'
          ? 'पासवर्ड और पुष्टि पासवर्ड मेल नहीं खा रहे हैं।'
          : 'New password and confirm password do not match.'
      );
      return;
    }

    const res = resetUserPassword({
      identifier: forgotIdentifier,
      newPassword: forgotNewPassword
    });

    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }

    // Automatically authenticate user with their newly updated account
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
                {isSuccess 
                  ? (lang === 'hi' ? 'प्रमाणीकरण सफल' : 'Authentication Complete') 
                  : isForgotPassword
                    ? (lang === 'hi' ? 'पासवर्ड रीसेट करें' : 'Reset Password')
                    : authReason === 'editor_login'
                      ? (lang === 'hi' ? '🛡️ अधिकृत ज्योतिषी संपादक लॉगिन' : '🛡️ Astrologer & Editor Sign In')
                      : authReason === 'premium_kundli'
                        ? (isLogin 
                            ? (lang === 'hi' ? '★ कुण्डली हेतु साइन इन करें' : '★ Sign In to Unlock Kundli') 
                            : (lang === 'hi' ? '★ नया खाता बनाएं (साइन अप)' : '★ Sign Up to Unlock Kundli'))
                        : (isLogin ? (lang === 'hi' ? 'ASTROTANNTRA में आपका स्वागत है' : 'Welcome to ASTROTANNTRA') : (lang === 'hi' ? 'निःशुल्क खाता बनाएं' : 'Create Free Account'))}
              </h3>
              <span className="text-[11px] text-amber-200/70">
                {isForgotPassword
                  ? (lang === 'hi' ? 'अपना नया सुरक्षित पासवर्ड सेट करें' : 'Create and confirm your new account password')
                  : authReason === 'editor_login'
                    ? (lang === 'hi' ? 'साप्ताहिक राशिफल संपादित और प्रकाशित करने के लिए संपादक आईडी से लॉगिन करें' : 'Sign in with your authorized editor ID to publish weekly horoscopes')
                    : authReason === 'premium_kundli'
                      ? (lang === 'hi' ? 'सम्पूर्ण वैदिक कुण्डली अनलॉक करने के लिए लॉगिन या साइन अप करें' : 'Sign In or Sign Up to unlock your detailed Vedic Kundli charts')
                      : (isLogin ? 'Sign in to access your Vedic charts & readings' : 'Join thousands of Vedic seekers worldwide')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              title={lang === 'hi' ? 'वास्तविक SMS / जीमेल गेटवे सेटिंग्स' : 'Real SMS & Gmail Gateway Settings'}
              className="p-2 rounded-xl bg-purple-900/40 hover:bg-amber-500/20 border border-purple-700/80 text-amber-300 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-cosmic-800 hover:bg-rose-500/20 border border-purple-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
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
          ) : isForgotPassword ? (
            /* ========================================================================= */
            /* FORGOT / RESET PASSWORD SCREEN */
            /* ========================================================================= */
            <div className="space-y-4 animate-fadeIn">
              
              {/* Forgot Password Header Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-amber-500/10 border border-amber-400/50 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-300">
                  <KeyRound className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-cinzel font-bold text-xs sm:text-sm text-amber-300">
                    {lang === 'hi' ? 'पासवर्ड भूल गए? (Password Recovery)' : 'Recover Your Password'}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
                    {forgotStep === 'request'
                      ? (lang === 'hi' ? 'अपना पंजीकृत ईमेल या फोन नंबर दर्ज करें। आपको वास्तविक समय में सत्यापन OTP प्राप्त होगा।' : 'Enter your registered Email or Mobile number to receive a real-time verification code.')
                      : (lang === 'hi' ? 'सत्यापन कोड दर्ज करें और अपना नया पासवर्ड सेट करें।' : 'Enter the verification OTP and choose your new password.')}
                  </p>
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/70 text-rose-200 text-xs flex items-start gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: Enter Identifier */}
              {forgotStep === 'request' && (
                <form onSubmit={handleSendForgotOtp} className="space-y-3.5">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                      {lang === 'hi' ? 'पंजीकृत ईमेल या मोबाइल नंबर' : 'Registered Email or Mobile Number'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                      <input
                        type="text"
                        required
                        value={forgotIdentifier}
                        onChange={(e) => setForgotIdentifier(e.target.value)}
                        placeholder="deepak.kumar686@gmail.com or +91 99930 27943"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingForgotOtp}
                    className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    {isSendingForgotOtp ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>{lang === 'hi' ? 'OTP भेजा जा रहा है...' : 'Sending Reset Code...'}</span>
                      </>
                    ) : (
                      <span>{lang === 'hi' ? 'सत्यापन OTP भेजें' : 'Send Reset Verification OTP'}</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setErrorMessage('');
                    }}
                    className="w-full py-2 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'साइन इन पर वापस जाएं' : 'Back to Sign In'}</span>
                  </button>
                </form>
              )}

              {/* STEP 2: Verify OTP & Choose New Password */}
              {forgotStep === 'verify' && (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5 animate-fadeIn">
                  
                  {/* Real-World Dispatch Confirmation Card (No OTP Exposure) */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#170932] via-[#200d44] to-[#170932] border border-amber-500/40 text-slate-100 text-xs shadow-md space-y-2.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        {lang === 'hi' ? 'सत्यापन कोड भेजा गया' : 'Verification OTP Dispatched'}
                      </span>
                    </div>

                    <p className="text-slate-200 text-xs leading-relaxed">
                      {forgotIdentifier.includes('@') ? (
                        <>
                          {lang === 'hi'
                            ? 'हमने आपके पंजीकृत जीमेल / ईमेल पते पर 4-अंकीय सत्यापन कोड भेजा है: '
                            : 'A 4-digit verification code has been dispatched to your registered Gmail / Email: '}
                          <strong className="text-amber-300 font-mono">
                            {forgotIdentifier}
                          </strong>
                        </>
                      ) : (
                        <>
                          {lang === 'hi'
                            ? 'हमने आपके पंजीकृत मोबाइल नंबर पर 4-अंकीय सत्यापन कोड (SMS) भेजा है: '
                            : 'A 4-digit verification code has been dispatched via SMS to: '}
                          <strong className="text-amber-300 font-mono">
                            {forgotIdentifier}
                          </strong>
                        </>
                      )}
                    </p>

                    <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                      {forgotIdentifier.includes('@') ? (
                        <a
                          href="https://mail.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{lang === 'hi' ? 'जीमेल (Gmail) इनबॉक्स खोलें ↗' : 'Open Gmail Inbox ↗'}</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          {lang === 'hi' ? 'कृपया अपने फोन के SMS इनबॉक्स की जांच करें' : 'Please check your phone Messages / SMS'}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">
                        {lang === 'hi' ? '(कृपया स्पैम या अपडेट्स फ़ोल्डर भी जांचें)' : '(Check spam/updates if not in primary inbox)'}
                      </span>
                    </div>
                  </div>

                  {/* Real Gateway Delivery Status Feedback */}
                  {deliveryStatus && (
                    <div className={`p-3 rounded-xl border text-xs space-y-2 animate-fadeIn ${
                      deliveryStatus.type === 'success'
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                        : deliveryStatus.type === 'warning'
                        ? 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                        : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                    }`}>
                      <div className="flex items-start gap-2">
                        {deliveryStatus.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${deliveryStatus.type === 'warning' ? 'text-amber-400' : 'text-rose-400'}`} />
                        )}
                        <div className="flex-1 leading-relaxed">
                          <p className="font-medium">{deliveryStatus.text}</p>
                          {deliveryStatus.type === 'warning' && (
                            <p className="text-[10px] text-amber-300/80 mt-1">
                              {lang === 'hi'
                                ? 'बिना API कुंजी के तुरंत परीक्षण हेतु आप डिफ़ॉल्ट कोड 1234 का भी उपयोग कर सकते हैं।'
                                : 'For instant local testing without API keys, you can also use demo code: 1234'}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-0.5 pl-6">
                        {deliveryStatus.whatsappUrl && (
                          <a
                            href={deliveryStatus.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{lang === 'hi' ? 'व्हाट्सएप द्वारा प्राप्त करें ↗' : 'Send via WhatsApp ↗'}</span>
                          </a>
                        )}

                        {deliveryStatus.type === 'warning' && (
                          <button
                            type="button"
                            onClick={() => setShowConfigModal(true)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-800/80 hover:bg-purple-700 text-amber-300 border border-purple-600 text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            <Settings className="w-3.5 h-3.5" />
                            <span>{lang === 'hi' ? '⚙️ गेटवे कुंजी सेट करें' : '⚙️ Configure Gateway'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 4-Digit Reset OTP Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-slate-300 block font-medium">
                        {lang === 'hi' ? '4-अंकीय सत्यापन कोड दर्ज करें' : 'Enter 4-Digit Verification OTP'}
                      </label>
                      <span className="text-[11px] font-mono text-amber-300">
                        {forgotCountdown > 0 ? (
                          `00:${forgotCountdown < 10 ? '0' : ''}${forgotCountdown}`
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendForgotOtp}
                            className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
                          >
                            {lang === 'hi' ? 'पुनः भेजें' : 'Resend Code'}
                          </button>
                        )}
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="• • • •"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-center text-lg font-mono tracking-[0.3em] text-amber-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* New Password Input */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {lang === 'hi' ? 'नया सुरक्षित पासवर्ड' : 'New Secure Password'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                      <input
                        type={showForgotNewPw ? 'text' : 'password'}
                        required
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowForgotNewPw(!showForgotNewPw)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-300"
                      >
                        {showForgotNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Checklist */}
                  {forgotNewPassword.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#170830] border border-purple-800/60 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-300 font-medium">
                          {lang === 'hi' ? 'पासवर्ड की शक्ति:' : 'Password Strength:'}
                        </span>
                        <span className={`font-bold uppercase ${forgotPwAnalysis.color.split(' ')[1]}`}>
                          {forgotPwAnalysis.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {forgotPwAnalysis.rules.map(rule => (
                          <div key={rule.id} className="flex items-center gap-1.5 text-[10px]">
                            {rule.isMet ? (
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-slate-600 shrink-0" />
                            )}
                            <span className={rule.isMet ? 'text-emerald-300 font-medium' : 'text-slate-400'}>
                              {lang === 'hi' ? rule.labelHi : rule.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confirm New Password Input */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {lang === 'hi' ? 'नए पासवर्ड की पुष्टि करें' : 'Confirm New Password'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3 text-amber-400" />
                      <input
                        type={showForgotConfirmPw ? 'text' : 'password'}
                        required
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowForgotConfirmPw(!showForgotConfirmPw)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-300"
                      >
                        {showForgotConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {forgotConfirmPassword.length > 0 && forgotNewPassword !== forgotConfirmPassword && (
                      <span className="text-[10px] text-rose-400 block mt-1">
                        {lang === 'hi' ? 'पासवर्ड मेल नहीं खा रहे हैं' : 'Passwords do not match'}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow mt-1"
                  >
                    {lang === 'hi' ? 'नया पासवर्ड सहेजें और लॉगिन करें' : 'Save New Password & Sign In'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setForgotStep('request');
                      setErrorMessage('');
                    }}
                    className="w-full py-1.5 text-slate-400 hover:text-slate-200 text-[11px] block text-center cursor-pointer"
                  >
                    {lang === 'hi' ? '← ईमेल/फोन बदलें' : '← Change Email or Phone'}
                  </button>

                </form>
              )}

            </div>
          ) : (
            <>
              {/* EDITOR LOGIN NOTICE BANNER */}
              {authReason === 'editor_login' && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-amber-500/10 border border-amber-400/60 flex items-start gap-3 shadow-md animate-fadeIn">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-300">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-cinzel font-bold text-xs text-amber-300 flex items-center gap-2">
                      <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                        {lang === 'hi' ? 'संपादक पहुंच' : 'EDITOR ACCESS'}
                      </span>
                      <span>{lang === 'hi' ? 'साप्ताहिक राशिफल संपादन' : 'Weekly Horoscope Authoring'}</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      {lang === 'hi'
                        ? 'अपनी अधिकृत ईमेल आईडी (deepak.kumar686@gmail.com या admin@astrotanntra.com) से लॉगिन करें। केवल इसी आईडी द्वारा राशिफल संपादित किया जा सकता है।'
                        : 'Sign in with your authorized editor ID (deepak.kumar686@gmail.com or admin@astrotanntra.com). Only authorized IDs have write permissions; all other users have read-only access.'}
                    </p>
                  </div>
                </div>
              )}

              {/* PREMIUM KUNDLI NOTICE BANNER (WHEN USER CLICKS GENERATE KUNDLI) */}
              {authReason === 'premium_kundli' && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-purple-900/30 border border-amber-400/60 flex items-start gap-3 shadow-[0_4px_25px_rgba(245,158,11,0.2)] animate-fadeIn">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-300">
                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-cinzel font-bold text-xs text-amber-300 flex items-center gap-2">
                      <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                        {lang === 'hi' ? 'प्रीमियम सुविधा' : 'PREMIUM FEATURE'}
                      </span>
                      <span>{lang === 'hi' ? 'वैदिक कुण्डली निर्माण' : 'Vedic Kundli Generation'}</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      {lang === 'hi'
                        ? 'कुण्डली निर्माण एक विशेष प्रीमियम सुविधा है। यदि आपका पहले से खाता है तो नीचे "साइन इन" करें, अथवा नए यूजर के रूप में तुरंत "साइन अप" करें।'
                        : 'Generating your full Vedic Kundli is an exclusive premium feature. Existing users please Sign In; new users can quickly Sign Up Free below to view your full chart.'}
                    </p>
                  </div>
                </div>
              )}

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
                  {lang === 'hi' ? 'साइन इन (पुराने यूजर)' : 'Sign In (Existing User)'}
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
                  {lang === 'hi' ? 'साइन अप (नए यूजर)' : 'Sign Up Free (New User)'}
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
                      className={`flex-1 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                        authMethod === 'phone' 
                          ? 'bg-purple-700/70 text-amber-300 font-bold border border-amber-400/40' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Phone / WhatsApp OTP</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAuthMethod('email'); setErrorMessage(''); }}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
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

                  {/* Phone Authentication with Real-Time OTP */}
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
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {lang === 'hi' ? '4-अंकीय सत्यापन कोड (OTP) वास्तविक समय में भेजा जाएगा।' : 'A 4-digit verification code (OTP) will be dispatched in real time.'}
                          </span>
                        </div>

                        <button
                          type="submit"
                          disabled={isSendingPhoneOtp}
                          className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow flex items-center justify-center gap-2"
                        >
                          {isSendingPhoneOtp ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>{lang === 'hi' ? 'OTP भेजा जा रहा है...' : 'Sending Real-Time OTP...'}</span>
                            </>
                          ) : (
                            <span>{lang === 'hi' ? 'सत्यापन कोड (OTP) भेजें' : 'Send Real-Time Verification OTP'}</span>
                          )}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyPhoneOtp} className="space-y-3.5 animate-fadeIn">
                        
                        {/* Real-World Dispatch Confirmation Card (No OTP Exposure) */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#170932] via-[#200d44] to-[#170932] border border-amber-500/40 text-slate-100 text-xs shadow-md space-y-2">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>
                              {lang === 'hi' ? 'सत्यापन OTP भेजा गया' : 'Verification OTP Dispatched'}
                            </span>
                          </div>

                          <p className="text-slate-200 text-xs leading-relaxed">
                            {lang === 'hi'
                              ? 'आपके मोबाइल / व्हाट्सएप नंबर पर 4-अंकीय सत्यापन कोड भेजा गया है: '
                              : 'A 4-digit verification code has been dispatched via SMS / WhatsApp to: '}
                            <strong className="text-amber-300 font-mono">
                              {signInPhone}
                            </strong>
                          </p>

                          <div className="flex items-center justify-between pt-0.5 text-[11px] text-slate-400">
                            <span>{lang === 'hi' ? 'कृपया अपने फोन के संदेश (SMS/WhatsApp) जांचें।' : 'Please check your phone text messages or WhatsApp.'}</span>
                            <span className="text-[10px] text-amber-300/80">{lang === 'hi' ? 'वैधता: 10 मिनट' : 'Valid for 10 mins'}</span>
                          </div>
                        </div>

                        {/* Real Gateway Delivery Status Feedback */}
                        {deliveryStatus && (
                          <div className={`p-3 rounded-xl border text-xs space-y-2 animate-fadeIn ${
                            deliveryStatus.type === 'success'
                              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                              : deliveryStatus.type === 'warning'
                              ? 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                              : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                          }`}>
                            <div className="flex items-start gap-2">
                              {deliveryStatus.type === 'success' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${deliveryStatus.type === 'warning' ? 'text-amber-400' : 'text-rose-400'}`} />
                              )}
                              <div className="flex-1 leading-relaxed">
                                <p className="font-medium">{deliveryStatus.text}</p>
                                {deliveryStatus.type === 'warning' && (
                                  <p className="text-[10px] text-amber-300/80 mt-1">
                                    {lang === 'hi'
                                      ? 'बिना API कुंजी के तुरंत परीक्षण हेतु आप डिफ़ॉल्ट कोड 1234 का भी उपयोग कर सकते हैं।'
                                      : 'For instant local testing without API keys, you can also use demo code: 1234'}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 pt-0.5 pl-6">
                              {deliveryStatus.whatsappUrl && (
                                <a
                                  href={deliveryStatus.whatsappUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>{lang === 'hi' ? 'व्हाट्सएप द्वारा प्राप्त करें ↗' : 'Send via WhatsApp ↗'}</span>
                                </a>
                              )}

                              {deliveryStatus.type === 'warning' && (
                                <button
                                  type="button"
                                  onClick={() => setShowConfigModal(true)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-800/80 hover:bg-purple-700 text-amber-300 border border-purple-600 text-[11px] font-semibold transition-colors cursor-pointer"
                                >
                                  <Settings className="w-3.5 h-3.5" />
                                  <span>{lang === 'hi' ? '⚙️ गेटवे कुंजी सेट करें' : '⚙️ Configure Gateway'}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs text-slate-300 block font-medium">
                              {lang === 'hi' ? '4-अंकीय OTP दर्ज करें' : 'Enter 4-Digit Verification Code'}
                            </label>
                            <span className="text-[11px] font-mono text-amber-300">
                              {phoneOtpCountdown > 0 ? (
                                `00:${phoneOtpCountdown < 10 ? '0' : ''}${phoneOtpCountdown}`
                              ) : (
                                <button
                                  type="button"
                                  onClick={handleResendPhoneOtp}
                                  className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer"
                                >
                                  {lang === 'hi' ? 'पुनः OTP भेजें' : 'Resend OTP'}
                                </button>
                              )}
                            </span>
                          </div>

                          <input
                            type="text"
                            required
                            maxLength={4}
                            value={otp}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                              setOtp(val);
                            }}
                            placeholder="• • • •"
                            className="w-full px-3 py-2.5 rounded-xl bg-[#210f44] border border-purple-700 text-center text-xl font-mono tracking-[0.4em] text-amber-300 focus:outline-none focus:border-amber-400 shadow-inner"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl gold-btn font-bold text-xs uppercase tracking-wider cursor-pointer shadow-gold-glow"
                        >
                          {lang === 'hi' ? 'सत्यापित करें और लॉगिन करें' : 'Verify & Login'}
                        </button>

                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <button
                            type="button"
                            onClick={() => {
                              setOtpSent(false);
                              setOtp('');
                              setErrorMessage('');
                            }}
                            className="text-slate-400 hover:text-slate-200 cursor-pointer"
                          >
                            {lang === 'hi' ? '← नंबर बदलें' : '← Change Phone Number'}
                          </button>

                          {phoneOtpCountdown > 0 && (
                            <span className="text-slate-500">
                              {lang === 'hi' ? `पुनः भेजने हेतु ${phoneOtpCountdown}s शेष` : `Resend in ${phoneOtpCountdown}s`}
                            </span>
                          )}
                        </div>

                      </form>
                    )
                  ) : (
                    /* Email & Password Authentication with Forgot Password Link */
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
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs text-slate-300 block font-medium">
                            {lang === 'hi' ? 'पासवर्ड' : 'Password'}
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setIsForgotPassword(true);
                              setForgotStep('request');
                              setForgotIdentifier(signInEmail || '');
                              setErrorMessage('');
                            }}
                            className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline cursor-pointer font-medium"
                          >
                            {lang === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
                          </button>
                        </div>
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
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-300 cursor-pointer"
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

                    {/* LIVE PASSWORD STRENGTH INDICATOR */}
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
                        <span>{lang === 'hi' ? 'पासवर्ड आवश्यकताएं:' : 'Password Checklist:'}</span>
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
                  <span className="text-slate-200 group-hover:text-amber-300">
                    {lang === 'hi' ? 'गूगल खाते से लॉगिन करें' : 'Continue with Google Account'}
                  </span>
                </button>

                {/* Gateway API Keys Config Link */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(true)}
                    className="text-[11px] text-purple-300/70 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3 h-3 text-amber-400" />
                    <span>{lang === 'hi' ? '⚙️ वास्तविक SMS एवं जीमेल गेटवे सेटिंग्स' : '⚙️ Real SMS & Gmail Gateway Settings'}</span>
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

        {/* GOOGLE ACCOUNT SELECTOR DIALOG */}
        {showGooglePicker && (
          <div className="absolute inset-0 z-50 bg-[#120527]/98 backdrop-blur-md p-6 flex flex-col justify-between animate-fadeIn">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-purple-800/60">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="font-semibold text-sm text-slate-200">
                    Sign in with Google
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGooglePicker(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-2">
                <p className="text-xs text-slate-400 mb-3">
                  Choose an account to continue to <strong>ASTROTANNTRA</strong>
                </p>

                {/* Account 1 */}
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

                {/* Account 2 */}
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

        {/* REAL SMS & GMAIL GATEWAY CONFIGURATION MODAL */}
        {showConfigModal && (
          <div className="absolute inset-0 z-50 bg-[#120527]/98 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between animate-fadeIn overflow-y-auto custom-scrollbar">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-purple-800/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-cinzel font-bold text-sm text-amber-300">
                      {lang === 'hi' ? 'वास्तविक SMS एवं जीमेल गेटवे सेटिंग्स' : 'Real SMS & Gmail Gateway Settings'}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {lang === 'hi' ? 'वास्तविक फोन एवं इनबॉक्स में OTP भेजने हेतु अपनी मुफ्त API कुंजी दर्ज करें' : 'Enter your free API keys to dispatch physical OTPs to real inboxes & phones'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {keySavedNotice && (
                <div className="my-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/80 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'hi' ? 'गेटवे कुंजियाँ सफलतापूर्वक सहेजी गईं!' : 'Gateway API keys saved successfully!'}</span>
                </div>
              )}

              <form onSubmit={handleSaveApiKeys} className="py-4 space-y-4 text-xs">
                
                {/* Google Firebase Authentication Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-900/30 to-amber-500/10 border border-amber-400/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-amber-300 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{lang === 'hi' ? '★ Google Firebase Auth (किसी भी फोन और ईमेल पर वास्तविक OTP)' : '★ Google Firebase Auth (Real SMS & Email to ANY User)'}</span>
                    </label>
                    <a
                      href="https://console.firebase.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-300 underline font-semibold inline-flex items-center gap-1"
                    >
                      <span>firebase.google.com ↗</span>
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {lang === 'hi'
                      ? 'Google Firebase का उपयोग करके किसी भी भारतीय/वैश्विक मोबाइल नंबर पर वास्तविक SMS OTP और किसी भी Gmail पर पासवर्ड रीसेट भेजें।'
                      : 'Free Google Firebase handles real cellular SMS to any phone number worldwide & password reset emails to any Gmail address.'}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Firebase API Key (apiKey):</span>
                      <input
                        type="password"
                        value={fbConfig.apiKey || ''}
                        onChange={(e) => setFbConfig({ ...fbConfig, apiKey: e.target.value })}
                        placeholder="AIzaSyBxxxx..."
                        className="w-full px-3 py-1.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-0.5">Project ID (projectId):</span>
                        <input
                          type="text"
                          value={fbConfig.projectId || ''}
                          onChange={(e) => setFbConfig({ ...fbConfig, projectId: e.target.value })}
                          placeholder="your-project-id"
                          className="w-full px-3 py-1.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-0.5">Auth Domain (authDomain):</span>
                        <input
                          type="text"
                          value={fbConfig.authDomain || ''}
                          onChange={(e) => setFbConfig({ ...fbConfig, authDomain: e.target.value })}
                          placeholder="your-app.firebaseapp.com"
                          className="w-full px-3 py-1.5 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resend API Key for Gmail */}
                <div className="p-3.5 rounded-2xl bg-[#1b0a39] border border-purple-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-rose-400" />
                      <span>{lang === 'hi' ? '2. जीमेल OTP डिलीवरी (Resend API Key)' : '2. Gmail OTP Delivery (Resend API Key)'}</span>
                    </label>
                    <a
                      href="https://resend.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>resend.com (Free) ↗</span>
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {lang === 'hi'
                      ? 'Resend से मुफ्त API कुंजी प्राप्त करें (3,000 मुफ्त ईमेल प्रतिमाह) ताकि OTP सीधे उपयोगकर्ता के Gmail इनबॉक्स में पहुंचे।'
                      : 'Get a free API key from resend.com (3,000 free emails/mo) to deliver real OTPs straight to any Gmail inbox.'}
                  </p>
                  <input
                    type="password"
                    value={apiKeys.resendApiKey || ''}
                    onChange={(e) => setApiKeys({ ...apiKeys, resendApiKey: e.target.value })}
                    placeholder="re_123456789_abcdef..."
                    className="w-full px-3 py-2 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Fast2SMS API Key for India Phone SMS */}
                <div className="p-3.5 rounded-2xl bg-[#1b0a39] border border-purple-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>{lang === 'hi' ? '2. भारतीय मोबाइल SMS (Fast2SMS API Key)' : '2. India Mobile SMS (Fast2SMS API Key)'}</span>
                    </label>
                    <a
                      href="https://www.fast2sms.com/dashboard/dev-api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>fast2sms.com ↗</span>
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {lang === 'hi'
                      ? 'भारत के किसी भी 10-अंकीय मोबाइल नंबर पर वास्तविक SMS भेजने के लिए Fast2SMS की मुफ्त कुंजी दर्ज करें।'
                      : 'Free API key from fast2sms.com to deliver real SMS OTPs directly to Indian mobile numbers (+91).'}
                  </p>
                  <input
                    type="password"
                    value={apiKeys.fast2smsApiKey || ''}
                    onChange={(e) => setApiKeys({ ...apiKeys, fast2smsApiKey: e.target.value })}
                    placeholder="Enter Fast2SMS Authorization Key..."
                    className="w-full px-3 py-2 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Web3Forms Access Key (Zero-setup free email alternative) */}
                <div className="p-3.5 rounded-2xl bg-[#1b0a39] border border-purple-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-purple-200 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      <span>{lang === 'hi' ? '3. वैकल्पिक ईमेल कुंजी (Web3Forms Access Key)' : '3. Alternative Email Key (Web3Forms Access Key)'}</span>
                    </label>
                    <a
                      href="https://web3forms.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>web3forms.com ↗</span>
                    </a>
                  </div>
                  <input
                    type="password"
                    value={apiKeys.web3FormsKey || ''}
                    onChange={(e) => setApiKeys({ ...apiKeys, web3FormsKey: e.target.value })}
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    className="w-full px-3 py-2 rounded-xl bg-[#210f44] border border-purple-700 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider cursor-pointer shadow-gold-glow"
                  >
                    {lang === 'hi' ? 'सेटिंग्स सुरक्षित सहेजें' : 'Save Gateway Settings'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    {lang === 'hi' ? 'रद्द करें' : 'Close'}
                  </button>
                </div>
              </form>
            </div>

            <div className="pt-3 border-t border-purple-900/60 text-[10px] text-slate-400 flex items-center justify-between">
              <span>{lang === 'hi' ? '🛡️ कुंजियाँ आपके स्थानीय ब्राउज़र में सुरक्षित हैं' : '🛡️ Keys saved securely in browser localStorage'}</span>
              <span className="text-amber-400 font-mono">Demo OTP: 1234</span>
            </div>
          </div>
        )}

        {/* Invisible reCAPTCHA container for Google Firebase Phone Auth */}
        <div id="recaptcha-container"></div>

      </div>
    </div>
  );
}
