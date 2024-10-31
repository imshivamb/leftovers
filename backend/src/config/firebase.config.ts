import { initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

// Initialize Firebase Admin with service account
const initializeFirebaseAdmin = (): App => {
  if (!admin.apps.length) {
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      })
    });
  }
  return admin.app(); 
};

// Initialize Firebase Admin
const firebaseAdmin = initializeFirebaseAdmin();

// Initialize Firebase Auth
export const adminAuth = getAuth(firebaseAdmin);
