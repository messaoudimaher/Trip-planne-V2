import { Trip, Activity } from './types';

export const COLORS = {
  sage: '#6d9c7e',
  warm: '#d4a373',
  sky: '#0ea5e9',
  rose: '#f43f5e',
  violet: '#8b5cf6',
  amber: '#f59e0b',
  slate: '#64748b',
};

// User's Firebase Configuration
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDzC1PPLKAlCfBYMOwtaSCEjFBia8eHB7w",
  authDomain: "trip-planner-975a3.firebaseapp.com",
  projectId: "trip-planner-975a3",
  storageBucket: "trip-planner-975a3.firebasestorage.app",
  messagingSenderId: "25549813250",
  appId: "1:25549813250:web:86833e9f85ed8db50d591b",
  measurementId: "G-JB8T80P17Z"
};

const PARIS_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    name: 'Eiffel Tower Visit',
    date: '2025-10-02',
    time: '10:00',
    location: 'Champ de Mars, 5 Av. Anatole France',
    cost: 85,
    category: 'culture',
    coordinates: { lat: 48.8584, lng: 2.2945 }
  },
  {
    id: 'a2',
    name: 'Seine River Cruise',
    date: '2025-10-02',
    time: '19:30',
    location: 'Port de la Bourdonnais',
    cost: 45,
    category: 'relax',
    coordinates: { lat: 48.8596, lng: 2.2938 }
  },
  {
    id: 'a3',
    name: 'Louvre Museum',
    date: '2025-10-03',
    time: '09:00',
    location: 'Rue de Rivoli',
    cost: 60,
    category: 'culture',
    coordinates: { lat: 48.8606, lng: 2.3376 }
  },
  {
    id: 'a4',
    name: 'Lunch at Le Relais',
    date: '2025-10-03',
    time: '13:00',
    location: 'Saint-Germain-des-Prés',
    cost: 80,
    category: 'food',
    coordinates: { lat: 48.8539, lng: 2.3331 }
  },
  {
    id: 'a5',
    name: 'Montmartre Walk',
    date: '2025-10-04',
    time: '15:00',
    location: '18th Arrondissement',
    cost: 0,
    category: 'adventure',
    coordinates: { lat: 48.8867, lng: 2.3431 }
  },
  {
    id: 'a6',
    name: 'Hotel Le Meurice',
    date: '2025-10-02',
    time: '14:00',
    location: '228 Rue de Rivoli',
    cost: 250,
    category: 'relax', // Treating accommodation as relax/base for now
    coordinates: { lat: 48.8654, lng: 2.3284 }
  }
];

const TRABZON_ACTIVITIES: Activity[] = [
  {
    id: 't1',
    name: 'Sumela Monastery',
    date: '2025-12-15',
    time: '09:30',
    location: 'Altındere, Maçka',
    cost: 25,
    category: 'culture',
    coordinates: { lat: 40.6903, lng: 39.6582 }
  },
  {
    id: 't2',
    name: 'Uzungöl Lake Day Trip',
    date: '2025-12-16',
    time: '10:00',
    location: 'Çaykara, Trabzon',
    cost: 50,
    category: 'adventure',
    coordinates: { lat: 40.6189, lng: 40.2878 }
  },
  {
    id: 't3',
    name: 'Sunset Tea at Boztepe',
    date: '2025-12-14',
    time: '16:30',
    location: 'Boztepe, Trabzon City',
    cost: 15,
    category: 'relax',
    coordinates: { lat: 41.0003, lng: 39.7342 }
  },
  {
    id: 't4',
    name: 'Hagia Sophia Museum',
    date: '2025-12-15',
    time: '14:00',
    location: 'Fatih, Trabzon',
    cost: 10,
    category: 'culture',
    coordinates: { lat: 41.0033, lng: 39.6960 }
  },
  {
    id: 't5',
    name: 'Local Dinner at Akçaabat',
    date: '2025-12-14',
    time: '19:00',
    location: 'Akçaabat Coast',
    cost: 60,
    category: 'food',
    coordinates: { lat: 41.0205, lng: 39.5694 }
  },
  {
    id: 't6',
    name: 'Hotel Zorlu Grand',
    date: '2025-12-14',
    time: '14:00',
    location: 'Kahramanmaraş Cad.',
    cost: 180,
    category: 'relax',
    coordinates: { lat: 41.0053, lng: 39.7306 }
  },
  {
    id: 't7',
    name: 'Car Rental & Fuel',
    date: '2025-12-14',
    time: '08:00',
    location: 'Trabzon Airport',
    cost: 300,
    category: 'transit',
    coordinates: { lat: 40.9951, lng: 39.7897 }
  }
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 't-paris-2025',
    destination: 'Paris, France',
    startDate: '2025-10-02',
    endDate: '2025-10-06',
    totalBudget: 700,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    budgetCategories: [
      { id: 'b1', name: 'Accommodation', allocated: 250, spent: 250, color: COLORS.sage },
      { id: 'b2', name: 'Transport', allocated: 200, spent: 200, color: COLORS.sky },
      { id: 'b3', name: 'Activities', allocated: 150, spent: 150, color: COLORS.violet },
      { id: 'b4', name: 'Food', allocated: 100, spent: 100, color: COLORS.warm },
    ],
    activities: PARIS_ACTIVITIES
  },
  {
    id: 't-trabzon-2025',
    destination: 'Trabzon, Turkey',
    startDate: '2025-12-14',
    endDate: '2025-12-16',
    totalBudget: 700, // 180+300+100+120
    image: 'https://images.unsplash.com/photo-1622587854449-6512eb2243d6?q=80&w=1000&auto=format&fit=crop', // Reliable Turkey image
    budgetCategories: [
      { id: 'bt1', name: 'Accommodation', allocated: 180, spent: 180, color: COLORS.sage },
      { id: 'bt2', name: 'Transportation', allocated: 300, spent: 300, color: COLORS.slate },
      { id: 'bt3', name: 'Activities', allocated: 100, spent: 100, color: COLORS.violet },
      { id: 'bt4', name: 'Food', allocated: 120, spent: 60, color: COLORS.warm },
    ],
    activities: TRABZON_ACTIVITIES
  }
];