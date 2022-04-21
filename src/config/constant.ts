const L_SITE_URL = "http://localhost:3008";
export const L_API_URL = "http://localhost:8080/graphql";
const P_SITE_URL = "http://codegem.app";
export const P_API_URL = "http://3.111.51.96/graphql";
export const SITE_URL = process.env.NODE_ENV === "production" ? P_SITE_URL : L_SITE_URL;
export const API_URL = process.env.NODE_ENV === "production" ? P_API_URL : L_API_URL;
export const JWTToken = (process.env.REACT_APP_JWTToken || "");