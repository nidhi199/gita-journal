import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { JournalEntry, ReminderSettings } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyA1w1_WqSpCJrUl6cR5ZIA2mGxL7gW6HxU",
  authDomain: "gita-mindfulness.firebaseapp.com",
  projectId: "gita-mindfulness",
  storageBucket: "gita-mindfulness.firebasestorage.app",
  messagingSenderId: "118305566357",
  appId: "1:118305566357:web:a714885485b9b880b9f59c"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
const databaseId = firebaseConfigJson.firestoreDatabaseId || '(default)';
export const db = getFirestore(app, databaseId);

export const googleProvider = new GoogleAuthProvider();
// prompt: 'select_account' ensures account chooser is always shown, allowing users to select any Gmail ID
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Popup sign-in error:', error);
    // If popup blocked on mobile phone browser, attempt redirect or surface descriptive error
    throw error;
  }
}

export async function signInWithGoogleRedirect(): Promise<void> {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error: any) {
    console.error('Redirect sign-in error:', error);
    throw error;
  }
}

export async function checkRedirectSignIn(): Promise<User | null> {
  try {
    const result = await getRedirectResult(auth);
    return result ? result.user : null;
  } catch (error) {
    console.warn('Redirect result check:', error);
    return null;
  }
}

export function formatAuthError(error: any): { title: string; message: string; code: string; isDomainError: boolean } {
  const code = error?.code || '';
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';

  if (code === 'auth/unauthorized-domain') {
    return {
      title: 'Domain Not Authorized in Firebase',
      message: `The domain "${currentHost}" is not yet authorized in Firebase Console -> Authentication -> Settings -> Authorized Domains. To use on a mobile phone or another device, add "${currentHost}" in Firebase or use the Instant Mobile Phone Sanctuary / Sync Code below!`,
      code,
      isDomainError: true
    };
  }

  if (code === 'auth/popup-blocked') {
    return {
      title: 'Mobile Popup Blocked',
      message: 'Your mobile browser blocked the Google sign-in window. Please enable popups, use "Sign In with Mobile Redirect", or use the Instant Mobile Phone Sanctuary option.',
      code,
      isDomainError: false
    };
  }

  if (code === 'auth/popup-closed-by-user') {
    return {
      title: 'Sign-In Cancelled',
      message: 'The sign-in popup was closed before completing. Please try again or choose another sign-in method.',
      code,
      isDomainError: false
    };
  }

  return {
    title: 'Sign-In Notice',
    message: error?.message || 'Unable to complete sign-in. You can use the Instant Mobile Sanctuary option below.',
    code,
    isDomainError: false
  };
}

export async function logOut(): Promise<void> {
  await fbSignOut(auth);
}

// Clean object helper to strip undefined values before Firestore writes
function cleanForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        cleaned[key] = cleanForFirestore(value);
      } else if (Array.isArray(value)) {
        cleaned[key] = value.map(item => (item && typeof item === 'object' ? cleanForFirestore(item) : item));
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
}

// Firestore operations isolated strictly by userId
export async function saveJournalEntry(userId: string, entry: JournalEntry): Promise<void> {
  if (!userId) throw new Error('User must be authenticated to save entries');
  // Safe in-memory pass-through for demo mode
  if (userId === 'demo-user') {
    return;
  }
  const entryRef = doc(db, 'users', userId, 'entries', entry.id);
  const data = cleanForFirestore(entry);
  await setDoc(entryRef, data, { merge: true });
}

export async function fetchUserEntries(userId: string): Promise<JournalEntry[]> {
  if (!userId || userId === 'demo-user') return [];
  const entriesRef = collection(db, 'users', userId, 'entries');
  const q = query(entriesRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  const entries: JournalEntry[] = [];
  snapshot.forEach(docSnap => {
    const data = docSnap.data() as JournalEntry;
    entries.push({
      ...data,
      id: docSnap.id,
    });
  });
  return entries;
}

export async function deleteJournalEntry(userId: string, entryId: string): Promise<void> {
  if (!userId) throw new Error('User must be authenticated to delete entries');
  if (userId === 'demo-user') {
    return;
  }
  const entryRef = doc(db, 'users', userId, 'entries', entryId);
  await deleteDoc(entryRef);
}

export async function saveUserReminderSettings(userId: string, settings: ReminderSettings): Promise<void> {
  if (!userId) return;
  const userRef = doc(db, 'users', userId);
  const data = cleanForFirestore({ reminderSettings: settings });
  await setDoc(userRef, data, { merge: true });
}

export async function fetchUserReminderSettings(userId: string): Promise<ReminderSettings | null> {
  if (!userId) return null;
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      return data.reminderSettings || null;
    }
  } catch (error) {
    console.warn('Could not retrieve remote reminder settings, using local fallback:', error);
  }
  return null;
}
