export const MODE = import.meta.env.MODE;
export const SITE = import.meta.env.SITE;
export const BASE_URL = MODE === 'development' ? 'http://localhost:8080' : SITE;
