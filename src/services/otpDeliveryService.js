/**
 * ASTROTANNTRA - Real OTP Delivery Service
 * Dispatches real verification OTP codes to actual Gmail inboxes and Mobile Phones.
 * Supports Resend, EmailJS, Web3Forms for Gmail, and Fast2SMS / Twilio / WhatsApp for Mobile.
 */

const STORAGE_KEY = 'astrotanntra_otp_service_config';

/**
 * Retrieve active API keys from environment or localStorage
 */
export function getOtpServiceConfig() {
  let stored = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch (e) {}

  return {
    // Email Providers (Resend or EmailJS or Web3Forms)
    resendApiKey: stored.resendApiKey || (import.meta.env && import.meta.env.VITE_RESEND_API_KEY) || '',
    emailJsServiceId: stored.emailJsServiceId || (import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID) || '',
    emailJsTemplateId: stored.emailJsTemplateId || (import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID) || '',
    emailJsPublicKey: stored.emailJsPublicKey || (import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY) || '',
    web3FormsKey: stored.web3FormsKey || (import.meta.env && import.meta.env.VITE_WEB3FORMS_KEY) || '',

    // SMS Providers (Fast2SMS for India or Twilio for International)
    fast2smsApiKey: stored.fast2smsApiKey || (import.meta.env && import.meta.env.VITE_FAST2SMS_API_KEY) || '',
    twilioSid: stored.twilioSid || (import.meta.env && import.meta.env.VITE_TWILIO_SID) || '',
    twilioAuthToken: stored.twilioAuthToken || (import.meta.env && import.meta.env.VITE_TWILIO_AUTH_TOKEN) || '',
    twilioFromPhone: stored.twilioFromPhone || (import.meta.env && import.meta.env.VITE_TWILIO_FROM_PHONE) || ''
  };
}

/**
 * Save updated API keys to localStorage
 */
export function saveOtpServiceConfig(newConfig) {
  try {
    const current = getOtpServiceConfig();
    const merged = { ...current, ...newConfig };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return { success: true, config: merged };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Send real OTP to recipient Gmail / Email address
 * @param {string} email - Destination email address
 * @param {string} otp - 4-digit verification code
 * @param {string} [purpose='verification'] - Purpose text
 */
export async function sendRealEmailOtp(email, otp, purpose = 'verification') {
  const config = getOtpServiceConfig();
  const cleanEmail = (email || '').trim().toLowerCase();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, message: 'Invalid recipient email address.' };
  }

  // 1. Try Resend API (Most reliable modern transactional email delivery)
  if (config.resendApiKey) {
    const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const endpoint = isLocalhost ? '/api/resend' : 'https://api.resend.com/emails';

    const dispatchResend = async (targetEmail, subjectPrefix = '') => {
      const payload = {
        from: 'Astrotanntra Security <onboarding@resend.dev>',
        to: [targetEmail],
        subject: `${subjectPrefix}Your ASTROTANNTRA Verification Code: ${otp}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0d041e; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 500px; margin: auto; border: 1px solid #d97706;">
            <h2 style="color: #fbbf24; margin-top: 0; text-align: center;">ASTROTANNTRA</h2>
            <p style="font-size: 15px; color: #cbd5e1; text-align: center;">Your security verification code for ${purpose} is:</p>
            <div style="background-color: #1e0b3d; border: 2px dashed #f59e0b; padding: 16px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #fbbf24;">${otp}</span>
            </div>
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">Target Account: <b>${cleanEmail}</b></p>
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">This code will expire in 10 minutes. Please do not share this OTP with anyone.</p>
            <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
            <p style="font-size: 11px; color: #64748b; text-align: center;">Astrotanntra Vedic Astrology & Spiritual Insights</p>
          </div>
        `
      };

      const headers = {
        'Authorization': `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json'
      };

      let res;
      try {
        res = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
        // If proxy fails or returns HTML / 404 (e.g. if dev server was started before proxy config), retry direct
        if (!res.ok && isLocalhost && res.status !== 403) {
          res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
          });
        }
      } catch (err) {
        if (isLocalhost) {
          res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
          });
        } else {
          throw err;
        }
      }

      return res;
    };

    try {
      let response = await dispatchResend(cleanEmail);
      let data = await response.json().catch(() => ({}));

      if (response.ok) {
        return { success: true, provider: 'resend', data, recipient: cleanEmail };
      }

      // Check if Resend failed due to free-tier single-recipient restriction
      if (response.status === 403 || (data.message && data.message.includes('own email address'))) {
        console.warn(`Resend blocked sending to ${cleanEmail}:`, data.message);
        return {
          success: false,
          unverifiedDomain: true,
          provider: 'resend',
          recipient: cleanEmail,
          message: data.message || `Resend free test mode only allows sending to its registered account owner.`
        };
      }

      console.warn('Resend API returned an error:', data);
    } catch (err) {
      console.warn('Resend dispatch failed:', err);
    }
  }

  // 2. Try EmailJS API
  if (config.emailJsServiceId && config.emailJsTemplateId && config.emailJsPublicKey) {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: config.emailJsServiceId,
          template_id: config.emailJsTemplateId,
          user_id: config.emailJsPublicKey,
          template_params: {
            to_email: cleanEmail,
            otp_code: otp,
            app_name: 'ASTROTANNTRA',
            purpose: purpose
          }
        })
      });

      if (response.ok) {
        return { success: true, provider: 'emailjs' };
      }
    } catch (err) {
      console.warn('EmailJS dispatch failed:', err);
    }
  }

  // 3. Try Web3Forms (Simple free API key)
  if (config.web3FormsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: config.web3FormsKey,
          email: cleanEmail,
          subject: `ASTROTANNTRA Verification OTP: ${otp}`,
          message: `Your ASTROTANNTRA 4-digit verification code is: ${otp}. Valid for 10 minutes.`
        })
      });

      const data = await response.json();
      if (data.success) {
        return { success: true, provider: 'web3forms' };
      }
    } catch (err) {
      console.warn('Web3Forms dispatch failed:', err);
    }
  }

  // If no email delivery provider is configured yet
  return {
    success: false,
    missingConfig: true,
    provider: 'email',
    message: 'No active email provider key found (Resend / EmailJS / Web3Forms).'
  };
}

/**
 * Send real SMS to recipient mobile phone number
 * @param {string} phone - Recipient mobile phone number
 * @param {string} otp - 4-digit verification code
 */
export async function sendRealSmsOtp(phone, otp) {
  const config = getOtpServiceConfig();
  const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);

  if (!cleanPhone || cleanPhone.length < 10) {
    return { success: false, message: 'Invalid 10-digit mobile number.' };
  }

  // 1. Try Fast2SMS (Fastest & most popular SMS API for Indian numbers)
  if (config.fast2smsApiKey) {
    try {
      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': config.fast2smsApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: otp,
          numbers: cleanPhone
        })
      });

      const data = await response.json();
      if (data.return) {
        return { success: true, provider: 'fast2sms', data };
      } else {
        console.warn('Fast2SMS returned error:', data);
      }
    } catch (err) {
      console.warn('Fast2SMS dispatch failed:', err);
    }
  }

  // 2. Try Twilio SMS API
  if (config.twilioSid && config.twilioAuthToken && config.twilioFromPhone) {
    try {
      const fullPhone = phone.startsWith('+') ? phone : `+91${cleanPhone}`;
      const auth = btoa(`${config.twilioSid}:${config.twilioAuthToken}`);
      const body = new URLSearchParams({
        To: fullPhone,
        From: config.twilioFromPhone,
        Body: `Your ASTROTANNTRA verification OTP is: ${otp}. Valid for 10 minutes.`
      });

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.twilioSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });

      const data = await response.json();
      if (response.ok) {
        return { success: true, provider: 'twilio', data };
      }
    } catch (err) {
      console.warn('Twilio dispatch failed:', err);
    }
  }

  // If no SMS gateway is configured yet
  return {
    success: false,
    missingConfig: true,
    provider: 'sms',
    message: 'No active SMS gateway key found (Fast2SMS / Twilio).'
  };
}

/**
 * Generate a direct WhatsApp link to send the OTP to the user's WhatsApp number
 */
export function getWhatsAppOtpUrl(phone, otp) {
  const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
  const text = encodeURIComponent(`Your ASTROTANNTRA verification code is: ${otp}. Valid for 10 minutes.`);
  return `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${text}`;
}
