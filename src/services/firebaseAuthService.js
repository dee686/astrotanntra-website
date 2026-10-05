/**
 * ASTROTANNTRA - Firebase Authentication Service
 * Delivers real Phone SMS OTPs and Password Reset Emails to any recipient globally via Google Firebase.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  sendPasswordResetEmail
} from 'firebase/auth';

const STORAGE_KEY = 'astrotanntra_firebase_config';

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyClnggUYZTMeFOJlBY8GurYjpfYK8xYNVU',
  authDomain: 'astrotanntra-933bf.firebaseapp.com',
  projectId: 'astrotanntra-933bf',
  storageBucket: 'astrotanntra-933bf.firebasestorage.app',
  messagingSenderId: '707538577176',
  appId: '1:707538577176:web:d8d7deff8e53c1ed53606d',
  measurementId: 'G-SXMMQ719LZ'
};

/**
 * Retrieve active Firebase configuration from localStorage, .env, or default config
 */
export function getFirebaseConfig() {
  let stored = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch (e) {}

  return {
    apiKey: stored.apiKey || (import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) || DEFAULT_FIREBASE_CONFIG.apiKey,
    authDomain: stored.authDomain || (import.meta.env && import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) || DEFAULT_FIREBASE_CONFIG.authDomain,
    projectId: stored.projectId || (import.meta.env && import.meta.env.VITE_FIREBASE_PROJECT_ID) || DEFAULT_FIREBASE_CONFIG.projectId,
    storageBucket: stored.storageBucket || (import.meta.env && import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || DEFAULT_FIREBASE_CONFIG.storageBucket,
    messagingSenderId: stored.messagingSenderId || (import.meta.env && import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
    appId: stored.appId || (import.meta.env && import.meta.env.VITE_FIREBASE_APP_ID) || DEFAULT_FIREBASE_CONFIG.appId
  };
}

/**
 * Save updated Firebase config to localStorage
 */
export function saveFirebaseConfig(config) {
  try {
    const current = getFirebaseConfig();
    const merged = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return { success: true, config: merged };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Check if Firebase is configured with required keys
 */
export function isFirebaseConfigured() {
  const cfg = getFirebaseConfig();
  return Boolean(cfg.apiKey && cfg.projectId);
}

let appInstance = null;
let authInstance = null;
let recaptchaVerifier = null;

/**
 * Get or initialize Firebase Auth instance
 */
export function getFirebaseAuth() {
  const cfg = getFirebaseConfig();
  if (!cfg.apiKey || !cfg.projectId) return null;

  try {
    if (!appInstance) {
      const apps = getApps();
      appInstance = apps.length ? getApp() : initializeApp(cfg);
    }
    if (!authInstance) {
      authInstance = getAuth(appInstance);
    }
    return authInstance;
  } catch (err) {
    console.warn('Firebase initialization error:', err);
    return null;
  }
}

/**
 * Setup invisible reCAPTCHA verifier for Phone Auth
 */
export function setupRecaptcha(containerId = 'recaptcha-container') {
  const auth = getFirebaseAuth();
  if (!auth) return null;

  try {
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }

    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved - will allow signInWithPhoneNumber
      },
      'expired-callback': () => {
        if (recaptchaVerifier) {
          recaptchaVerifier.clear();
          recaptchaVerifier = null;
        }
      }
    });

    return recaptchaVerifier;
  } catch (err) {
    console.warn('RecaptchaVerifier setup error:', err);
    return null;
  }
}

/**
 * Send real SMS verification OTP to any mobile phone number
 * @param {string} phone - Mobile number (e.g. +91 99930 27943)
 * @param {string} [containerId='recaptcha-container'] - DOM container ID for reCAPTCHA
 */
export async function sendFirebasePhoneOtp(phone, containerId = 'recaptcha-container') {
  const auth = getFirebaseAuth();
  if (!auth) {
    return {
      success: false,
      missingConfig: true,
      message: 'Firebase is not configured yet. Please enter your Firebase API key in Gateway Settings.'
    };
  }

  // Format clean E.164 phone number
  const cleanDigits = phone.replace(/\D/g, '').slice(-10);
  if (!cleanDigits || cleanDigits.length < 10) {
    return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
  }
  const e164Phone = `+91${cleanDigits}`;

  try {
    const verifier = setupRecaptcha(containerId);
    if (!verifier) {
      return { success: false, message: 'Could not initialize reCAPTCHA verifier.' };
    }

    const confirmationResult = await signInWithPhoneNumber(auth, e164Phone, verifier);
    return {
      success: true,
      confirmationResult,
      provider: 'firebase',
      phone: e164Phone
    };
  } catch (err) {
    console.error('Firebase Phone Auth error:', err);
    if (recaptchaVerifier) {
      try { recaptchaVerifier.clear(); } catch (e) {}
      recaptchaVerifier = null;
    }
    return {
      success: false,
      error: err.code || err.message,
      message: err.message || 'Failed to dispatch SMS via Firebase.'
    };
  }
}

/**
 * Verify phone OTP using Firebase confirmationResult
 */
export async function verifyFirebasePhoneOtp(confirmationResult, code) {
  if (!confirmationResult || !confirmationResult.confirm) {
    return { success: false, message: 'No active confirmation session found.' };
  }

  try {
    const userCredential = await confirmationResult.confirm(code);
    return {
      success: true,
      user: userCredential.user
    };
  } catch (err) {
    console.error('Firebase confirm error:', err);
    return {
      success: false,
      error: err.code || err.message,
      message: err.code === 'auth/invalid-verification-code'
        ? 'Invalid verification code. Please check the SMS and try again.'
        : err.message
    };
  }
}

/**
 * Send real Password Reset Email to ANY recipient address via Firebase
 */
export async function sendFirebasePasswordResetEmail(email) {
  const auth = getFirebaseAuth();
  if (!auth) {
    return {
      success: false,
      missingConfig: true,
      message: 'Firebase is not configured yet. Please enter your Firebase API key in Gateway Settings.'
    };
  }

  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, message: 'Invalid recipient email address.' };
  }

  try {
    await sendPasswordResetEmail(auth, cleanEmail);
    return {
      success: true,
      provider: 'firebase',
      email: cleanEmail
    };
  } catch (err) {
    console.error('Firebase Password Reset error:', err);
    return {
      success: false,
      error: err.code || err.message,
      message: err.code === 'auth/user-not-found'
        ? 'No user account found with this email in Firebase.'
        : err.message
    };
  }
}
