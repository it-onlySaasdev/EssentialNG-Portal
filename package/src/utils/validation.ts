// src/utils/validation.ts

const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";

  const domain = email.split("@")[1].toLowerCase();
  if (!allowedDomains.includes(domain)) {
    return "Only Gmail, Hotmail, Yahoo, or Outlook emails are allowed";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  // at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPassword.test(password)) {
    return "Password must be at least 8 chars, include uppercase, lowercase, number, and special character";
  }
  return null;
}
