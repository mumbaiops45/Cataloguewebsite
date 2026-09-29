// Shared form validation for every input on the site.
// Each rule returns "" when valid, or an error message.

// name@domain.tld — letters/digits/._%+- before @, no leading/trailing or double dots,
// domain labels of letters/digits/hyphens, and a 2+ letter TLD.
const EMAIL_RE = /^(?!\.)(?!.*\.\.)[a-z0-9._%+-]+(?<!\.)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
const NAME_RE = /^[a-zA-Z][a-zA-Z .'-]*$/;
const PLACE_RE = /^[a-zA-Z][a-zA-Z .'-]*$/;

export const rules = {
  name: (v, label = "name") => {
    const s = v.trim();
    if (!s) return `Please enter your ${label}.`;
    if (!NAME_RE.test(s)) return `The ${label} can only contain letters and spaces — no numbers.`;
    if (s.length < 2) return `The ${label} must be at least 2 characters.`;
    if (s.length > 50) return `The ${label} must be under 50 characters.`;
    return "";
  },
  email: (v, { required = true } = {}) => {
    const s = v.trim();
    if (!s) return required ? "Please enter your email address." : "";
    if (s.length > 100) return "Email must be under 100 characters.";
    if (!s.includes("@")) return "Email must contain an @ (e.g. you@example.com).";
    if (!EMAIL_RE.test(s)) return "Please enter a valid email address (e.g. you@example.com).";
    return "";
  },
  // Indian mobile: 10 digits starting with 6-9.
  phone: (v, { required = true } = {}) => {
    const s = v.trim();
    if (!s) return required ? "Please enter your phone number." : "";
    if (!/^\d+$/.test(s)) return "Phone number can only contain digits.";
    if (s.length !== 10) return "Phone number must be exactly 10 digits.";
    if (!/^[6-9]/.test(s)) return "Please enter a valid mobile number starting with 6, 7, 8 or 9.";
    return "";
  },
  password: (v, { strict = true } = {}) => {
    if (!v) return "Please enter your password.";
    if (!strict) return "";
    if (v.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Password must contain at least one letter and one number.";
    if (/\s/.test(v)) return "Password cannot contain spaces.";
    return "";
  },
  pincode: (v) => {
    const s = v.trim();
    if (!s) return "Please enter the pincode.";
    if (!/^[1-9]\d{5}$/.test(s)) return "Please enter a valid 6-digit pincode.";
    return "";
  },
  place: (v, label) => {
    const s = v.trim();
    if (!s) return `Please enter the ${label}.`;
    if (!PLACE_RE.test(s)) return `The ${label} can only contain letters — no numbers.`;
    return "";
  },
  text: (v, label, { min = 1, max = 500 } = {}) => {
    const s = v.trim();
    if (!s) return `Please enter the ${label}.`;
    if (s.length < min) return `The ${label} must be at least ${min} characters.`;
    if (s.length > max) return `The ${label} must be under ${max} characters.`;
    return "";
  },
};

// Input filters — stop invalid characters being typed at all.
export const only = {
  digits: (v, max) => v.replace(/\D/g, "").slice(0, max),
  letters: (v) => v.replace(/[^a-zA-Z .'-]/g, ""),
  noSpaces: (v) => v.replace(/\s/g, ""),
};

// Runs a { field: errorString } map and returns the first message, plus the map.
export const firstError = (errors) => Object.values(errors).find(Boolean) || "";
