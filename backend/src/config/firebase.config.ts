import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require('../../src/secrets/firebase-service-account.json');

export const initializeFirebase = () => {
  const app = initializeApp({
    credential: cert(serviceAccount)
  });

  return {
    auth: getAuth(app)
  };
};
