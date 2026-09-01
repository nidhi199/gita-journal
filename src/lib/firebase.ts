import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
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
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Sign-in error:', error);
    throw error;
  }
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
  const entryRef = doc(db, 'users', userId, 'entries', entry.id);
  const data = cleanForFirestore(entry);
  await setDoc(entryRef, data, { merge: true });
}

export async function fetchUserEntries(userId: string): Promise<JournalEntry[]> {
  if (!userId) return [];
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
