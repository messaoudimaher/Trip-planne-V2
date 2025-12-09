
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  onSnapshot,
  Firestore 
} from 'firebase/firestore';
import { Trip } from '../types';

let db: Firestore | null = null;

export const initFirebase = (config: any) => {
  try {
    const app = !getApps().length ? initializeApp(config) : getApp();
    db = getFirestore(app);
    return true;
  } catch (error) {
    console.error("Firebase Init Error:", error);
    return false;
  }
};

export const getDb = () => db;

export const subscribeToTrips = (callback: (trips: Trip[]) => void) => {
  if (!db) return () => {};
  
  const tripsCollection = collection(db, 'trips');
  return onSnapshot(tripsCollection, (snapshot) => {
    const trips = snapshot.docs.map(doc => doc.data() as Trip);
    callback(trips);
  });
};

export const saveTripToFirebase = async (trip: Trip) => {
  if (!db) return;
  try {
    await setDoc(doc(db, 'trips', trip.id), trip);
  } catch (error) {
    console.error("Error saving trip:", error);
  }
};

export const deleteTripFromFirebase = async (tripId: string) => {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'trips', tripId));
  } catch (error) {
    console.error("Error deleting trip:", error);
  }
};

export const syncLocalToCloud = async (localTrips: Trip[]) => {
  if (!db) return;
  
  for (const trip of localTrips) {
    await saveTripToFirebase(trip);
  }
};
