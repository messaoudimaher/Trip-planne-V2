
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
  if (!db) {
    console.warn("Firebase not initialized - trip not synced to cloud");
    return false;
  }
  try {
    await setDoc(doc(db, 'trips', trip.id), trip);
    console.log("Trip saved to Firebase:", trip.id);
    return true;
  } catch (error) {
    console.error("Error saving trip to Firebase:", error);
    return false;
  }
};

export const deleteTripFromFirebase = async (tripId: string) => {
  if (!db) {
    console.warn("Firebase not initialized - trip not deleted from cloud");
    return false;
  }
  try {
    await deleteDoc(doc(db, 'trips', tripId));
    console.log("Trip deleted from Firebase:", tripId);
    return true;
  } catch (error) {
    console.error("Error deleting trip from Firebase:", error);
    return false;
  }
};

export const syncLocalToCloud = async (localTrips: Trip[]) => {
  if (!db) return;
  
  for (const trip of localTrips) {
    await saveTripToFirebase(trip);
  }
};
