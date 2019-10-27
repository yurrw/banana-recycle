
export const BETA = "http://localhost:8000";
export const PROD = "https://trashpay.ddns.me/api/";
export const DEV = "http://localhost:8000";

export const ROOT = process.env.NODE_ENV === 'production' ? PROD : (process.env.NODE_ENV === 'beta' ? BETA : DEV);