/**
 * ASTROTANNTRA - Authentication & User Persistence Service
 * Manages user accounts, duplicate prevention, password strength validation,
 * and session state in localStorage.
 */

const USERS_STORAGE_KEY = 'astrotanntra_registered_users';
const ACTIVE_USER_STORAGE_KEY = 'astrotanntra_active_user';

// Initial pre-registered users for seamless demonstration
const DEFAULT_USERS = [
  {
    id: 'user_1',
    name: 'Deepak Kumar',
    email: 'deepak.kumar686@gmail.com',
    phone: '+91 99930 27943',
    password: 'Password@123',
    provider: 'local',
    createdAt: '2026-09-01T10:00:00.000Z'
  }
];

/**
 * Get all registered users from localStorage
 */
export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_USERS;
  } catch (e) {
    return DEFAULT_USERS;
  }
}

/**
 * Get currently active logged-in user
 */
export function getActiveUser() {
  try {
    const raw = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Set active logged-in user (or logout if null)
 */
export function setActiveUser(user) {
  try {
    if (user) {
      localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
    }
  } catch (e) {}
}

/**
 * Check if a user already exists with the given email or phone
 */
export function checkUserExists(email, phone) {
  const users = getRegisteredUsers();
  const cleanPhone = phone ? phone.replace(/\D/g, '').slice(-10) : '';
  const cleanEmail = email ? email.trim().toLowerCase() : '';

  return users.find(u => {
    const uPhone = u.phone ? u.phone.replace(/\D/g, '').slice(-10) : '';
    const uEmail = u.email ? u.email.trim().toLowerCase() : '';

    if (cleanEmail && uEmail && cleanEmail === uEmail) return true;
    if (cleanPhone && uPhone && cleanPhone === uPhone) return true;
    return false;
  });
}

/**
 * Register a new user account with duplicate prevention
 */
export function registerUser({ name, email, phone, password, provider = 'local' }) {
  const users = getRegisteredUsers();
  const cleanPhone = phone ? phone.trim() : '';
  const cleanEmail = email ? email.trim().toLowerCase() : '';

  // Duplicate check
  const existing = checkUserExists(cleanEmail, cleanPhone);
  if (existing) {
    const cleanDigits = cleanPhone.replace(/\D/g, '').slice(-10);
    const existingDigits = existing.phone ? existing.phone.replace(/\D/g, '').slice(-10) : '';

    if (cleanEmail && existing.email?.toLowerCase() === cleanEmail) {
      return { 
        success: false, 
        field: 'email',
        message: 'User already exists with this email address. Please sign in instead.' 
      };
    }
    if (cleanDigits && existingDigits && cleanDigits === existingDigits) {
      return { 
        success: false, 
        field: 'phone',
        message: 'User already exists with this phone number. Please sign in instead.' 
      };
    }
    return {
      success: false,
      message: 'User already exists with these credentials. Please sign in.'
    };
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name: (name && name.trim()) ? name.trim() : (cleanEmail ? cleanEmail.split('@')[0] : 'Vedic Seeker'),
    email: cleanEmail,
    phone: cleanPhone,
    password: password || '',
    provider,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {}

  setActiveUser(newUser);
  return { success: true, user: newUser };
}

/**
 * Login with email and password
 */
export function loginWithEmail(email, password) {
  const users = getRegisteredUsers();
  const cleanEmail = email ? email.trim().toLowerCase() : '';
  const user = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return {
      success: false,
      message: 'No account found with this email address. Please Sign Up first.'
    };
  }

  if (user.password && user.password !== password) {
    return {
      success: false,
      message: 'Incorrect password. Please check your password and try again.'
    };
  }

  setActiveUser(user);
  return { success: true, user };
}

/**
 * Login with phone and simulated OTP
 */
export function loginWithPhone(phone, otp) {
  const users = getRegisteredUsers();
  const cleanPhone = phone ? phone.replace(/\D/g, '').slice(-10) : '';
  const user = users.find(u => u.phone && u.phone.replace(/\D/g, '').slice(-10) === cleanPhone);

  if (!user) {
    return {
      success: false,
      message: 'No account registered with this phone number. Please Sign Up first.'
    };
  }

  if (!otp || otp.trim().length < 4) {
    return {
      success: false,
      message: 'Please enter a valid 4-digit verification code.'
    };
  }

  setActiveUser(user);
  return { success: true, user };
}

/**
 * One-click Google Account Sign-In / Sign-Up
 */
export function loginWithGoogleAccount({ name, email, avatar = null }) {
  const users = getRegisteredUsers();
  const cleanEmail = email ? email.trim().toLowerCase() : 'user@gmail.com';
  let user = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);

  if (!user) {
    // Automatically register new user authenticated via Google
    user = {
      id: 'google_' + Date.now(),
      name: name || cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: '',
      provider: 'google',
      avatar,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {}
  }

  setActiveUser(user);
  return { success: true, user };
}

/**
 * Evaluate password strength and check individual criteria
 */
export function evaluatePasswordRules(password = '') {
  const rules = [
    {
      id: 'length',
      label: 'At least 8 characters',
      labelHi: 'कम से कम 8 अक्षर',
      isMet: password.length >= 8
    },
    {
      id: 'uppercase',
      label: 'At least one uppercase letter (A-Z)',
      labelHi: 'कम से कम एक बड़ा अक्षर (A-Z)',
      isMet: /[A-Z]/.test(password)
    },
    {
      id: 'lowercase',
      label: 'At least one lowercase letter (a-z)',
      labelHi: 'कम से कम एक छोटा अक्षर (a-z)',
      isMet: /[a-z]/.test(password)
    },
    {
      id: 'number',
      label: 'At least one number (0-9)',
      labelHi: 'कम से कम एक संख्या (0-9)',
      isMet: /[0-9]/.test(password)
    },
    {
      id: 'special',
      label: 'At least one special character (!@#$%^&*)',
      labelHi: 'कम से कम एक विशेष चिन्ह (!@#$%...)',
      isMet: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)
    }
  ];

  const metCount = rules.filter(r => r.isMet).length;
  let strength = 'empty';
  let score = 0;
  let label = '';
  let color = '';

  if (password.length > 0) {
    if (metCount <= 2) {
      strength = 'weak';
      score = 30;
      label = 'Weak';
      color = 'bg-rose-500 text-rose-400';
    } else if (metCount <= 4) {
      strength = 'medium';
      score = 70;
      label = 'Medium';
      color = 'bg-amber-400 text-amber-300';
    } else {
      strength = 'strong';
      score = 100;
      label = 'Strong';
      color = 'bg-emerald-500 text-emerald-400';
    }
  }

  return {
    rules,
    metCount,
    allMet: metCount === 5,
    strength,
    score,
    label,
    color
  };
}
