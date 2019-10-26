export const BETA = "http://sottam.damnserver.com:9091";
export const PROD = "http://api.biobody.com.br:9091";
export const DEV = "http://localhost:8000";

export const ROOT = process.env.NODE_ENV === 'production' ? PROD : (process.env.NODE_ENV === 'beta' ? BETA : DEV);