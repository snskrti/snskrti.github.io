// src/firebase/clientApp.ts
/**
 * NOTE: Direct Firebase operations have been moved to Netlify functions
 * This file remains as a placeholder to maintain backward compatibility
 * but no longer initializes a real Firebase connection
 * 
 * This approach enhances security by keeping sensitive Firebase credentials
 * on the server side only
 */

// Dummy app and db objects to maintain interface compatibility
const app = { name: 'dummy-app' };
const db = { name: 'dummy-db' };

export { app, db };
