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

// 7-Day Istanbul Itinerary: History, Culture, Food & Chill Time
const ISTANBUL_ACTIVITIES: Activity[] = [
  // DAY 1 (December 17): Classic Landmarks - Sultanahmet District
  {
    id: 'ist1',
    name: 'Hagia Sophia Museum',
    date: '2025-12-17',
    time: '09:00',
    location: 'Sultanahmet Square',
    cost: 25,
    category: 'culture',
    coordinates: { lat: 41.0086, lng: 28.9802 },
    notes: '90 min visit. Marvel at Byzantine architecture & Ottoman heritage. Arrive early to beat crowds.'
  },
  {
    id: 'ist2',
    name: 'Blue Mosque (Sultan Ahmed)',
    date: '2025-12-17',
    time: '11:00',
    location: 'Sultanahmet',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 41.0054, lng: 28.9768 },
    notes: '45 min. Free entry. Dress modestly. Closed during prayer times. Beautiful blue tiles.'
  },
  {
    id: 'ist3',
    name: 'Lunch at Sultanahmet Köftecisi',
    date: '2025-12-17',
    time: '12:30',
    location: 'Divanyolu Caddesi',
    cost: 15,
    category: 'food',
    coordinates: { lat: 41.0083, lng: 28.9745 },
    notes: 'Famous meatballs since 1920. Quick traditional meal.'
  },
  {
    id: 'ist4',
    name: 'Basilica Cistern',
    date: '2025-12-17',
    time: '14:00',
    location: 'Alemdar Mahallesi',
    cost: 20,
    category: 'culture',
    coordinates: { lat: 41.0084, lng: 28.9779 },
    notes: '45 min. Ancient underground water reservoir. Medusa heads. Cool escape from heat.'
  },
  {
    id: 'ist5',
    name: 'Sunset Tea at Café Mesale',
    date: '2025-12-17',
    time: '17:00',
    location: 'Arasta Bazaar',
    cost: 10,
    category: 'relax',
    coordinates: { lat: 41.0048, lng: 28.9741 },
    notes: 'Turkish tea with Blue Mosque views. Relax after busy sightseeing day.'
  },

  // DAY 2 (December 18): Palaces & Bosphorus Views
  {
    id: 'ist6',
    name: 'Topkapi Palace & Harem',
    date: '2025-12-18',
    time: '09:00',
    location: 'Cankurtaran',
    cost: 40,
    category: 'culture',
    coordinates: { lat: 41.0115, lng: 28.9833 },
    notes: '2-3 hrs. Ottoman palace with stunning Bosphorus views. Harem extra ticket. Book online.'
  },
  {
    id: 'ist7',
    name: 'Gülhane Park Stroll',
    date: '2025-12-18',
    time: '12:00',
    location: 'Cankurtaran',
    cost: 0,
    category: 'relax',
    coordinates: { lat: 41.0130, lng: 28.9818 },
    notes: '30 min walk. Beautiful park next to palace. Great for photos and relaxation.'
  },
  {
    id: 'ist8',
    name: 'Lunch at Hamdi Restaurant',
    date: '2025-12-18',
    time: '13:00',
    location: 'Eminönü',
    cost: 30,
    category: 'food',
    coordinates: { lat: 41.0186, lng: 28.9700 },
    notes: 'Rooftop Golden Horn views. Try kebabs & mezes. Moderate prices, great atmosphere.'
  },
  {
    id: 'ist9',
    name: 'Bosphorus Sunset Cruise',
    date: '2025-12-18',
    time: '16:30',
    location: 'Eminönü Pier',
    cost: 35,
    category: 'adventure',
    coordinates: { lat: 41.0196, lng: 28.9708 },
    notes: '2 hrs. See palaces, bridges & waterfront mansions. Sunset timing is perfect. Book ahead.'
  },
  {
    id: 'ist10',
    name: 'Dinner at Karaköy Lokantası',
    date: '2025-12-18',
    time: '19:30',
    location: 'Karaköy',
    cost: 35,
    category: 'food',
    coordinates: { lat: 41.0237, lng: 28.9741 },
    notes: 'Modern Turkish cuisine. Mezes, seafood, local wines. Trendy neighborhood vibe.'
  },

  // DAY 3 (December 19): Markets & Grand Bazaar
  {
    id: 'ist11',
    name: 'Spice Bazaar (Egyptian Bazaar)',
    date: '2025-12-19',
    time: '09:30',
    location: 'Eminönü',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 41.0166, lng: 28.9704 },
    notes: '1 hr. Spices, sweets, Turkish delight, tea. Sensory overload! Try free samples.'
  },
  {
    id: 'ist12',
    name: 'Grand Bazaar Shopping',
    date: '2025-12-19',
    time: '11:00',
    location: 'Beyazıt',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 41.0108, lng: 28.9680 },
    notes: '2-3 hrs. 4000+ shops! Carpets, ceramics, jewelry, lamps. Bargain expected. Easy to get lost!'
  },
  {
    id: 'ist13',
    name: 'Street Food Lunch - Balık Ekmek',
    date: '2025-12-19',
    time: '13:30',
    location: 'Eminönü Waterfront',
    cost: 8,
    category: 'food',
    coordinates: { lat: 41.0198, lng: 28.9715 },
    notes: 'Famous fish sandwich from boats. Authentic Istanbul street food experience.'
  },
  {
    id: 'ist14',
    name: 'Süleymaniye Mosque',
    date: '2025-12-19',
    time: '15:00',
    location: 'Süleymaniye',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 41.0166, lng: 28.9638 },
    notes: '1 hr. Ottoman masterpiece by Sinan. Less touristy than Blue Mosque. Panoramic city views.'
  },
  {
    id: 'ist15',
    name: 'Turkish Coffee at Vefa Bozacısı',
    date: '2025-12-19',
    time: '16:30',
    location: 'Vefa',
    cost: 5,
    category: 'food',
    coordinates: { lat: 41.0180, lng: 28.9585 },
    notes: 'Historic 1876 café. Try boza (fermented millet drink) & Turkish coffee.'
  },

  // DAY 4 (December 20): CHILL DAY - Neighborhoods & Waterfront
  {
    id: 'ist16',
    name: 'Breakfast at Van Kahvaltı Evi',
    date: '2025-12-20',
    time: '09:00',
    location: 'Cihangir, Beyoğlu',
    cost: 20,
    category: 'food',
    coordinates: { lat: 41.1213, lng: 28.9864 },
    notes: 'Traditional Turkish breakfast spread. Cheese, olives, honey, menemen. Take your time!'
  },
  {
    id: 'ist17',
    name: 'Cihangir Neighborhood Wander',
    date: '2025-12-20',
    time: '10:30',
    location: 'Cihangir',
    cost: 0,
    category: 'relax',
    coordinates: { lat: 41.1220, lng: 28.9850 },
    notes: '2 hrs. Bohemian area. Indie cafés, vintage shops, street art. Bosphorus views. Very local.'
  },
  {
    id: 'ist18',
    name: 'Galata Tower Visit (Optional)',
    date: '2025-12-20',
    time: '13:00',
    location: 'Galata',
    cost: 15,
    category: 'culture',
    coordinates: { lat: 41.0256, lng: 28.9744 },
    notes: '45 min. 360° city views. Long queues possible. Optional - can skip if prefer chill time.'
  },
  {
    id: 'ist19',
    name: 'Lunch at Karaköy Güllüoğlu',
    date: '2025-12-20',
    time: '14:00',
    location: 'Karaköy',
    cost: 12,
    category: 'food',
    coordinates: { lat: 41.0246, lng: 28.9755 },
    notes: 'Best baklava in Istanbul since 1949. Light lunch + dessert.'
  },
  {
    id: 'ist20',
    name: 'Karaköy Waterfront Stroll',
    date: '2025-12-20',
    time: '15:00',
    location: 'Karaköy to Beşiktaş',
    cost: 0,
    category: 'relax',
    coordinates: { lat: 41.0240, lng: 28.9760 },
    notes: '1-2 hrs walk. Bosphorus views, street performers, waterfront cafés. Relax & people-watch.'
  },
  {
    id: 'ist21',
    name: 'Sunset at Bebek Park',
    date: '2025-12-20',
    time: '17:30',
    location: 'Bebek',
    cost: 5,
    category: 'relax',
    coordinates: { lat: 41.0775, lng: 29.0433 },
    notes: 'Upscale waterfront neighborhood. Get çay (tea), sit by water. Very peaceful.'
  },

  // DAY 5 (December 21): Asian Side - Local Life
  {
    id: 'ist22',
    name: 'Ferry to Kadıköy',
    date: '2025-12-21',
    time: '09:00',
    location: 'Eminönü to Kadıköy',
    cost: 3,
    category: 'transit',
    coordinates: { lat: 40.9923, lng: 29.0253 },
    notes: '20 min ferry ride. Best way to see Bosphorus. Locals commute. Feed seagulls!'
  },
  {
    id: 'ist23',
    name: 'Kadıköy Market & Street Life',
    date: '2025-12-21',
    time: '09:30',
    location: 'Kadıköy Çarşı',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 40.9903, lng: 29.0280 },
    notes: '2 hrs. Produce market, cheese shops, pickle vendors. Real Istanbul life. Very authentic.'
  },
  {
    id: 'ist24',
    name: 'Çiya Sofrası Lunch',
    date: '2025-12-21',
    time: '12:00',
    location: 'Kadıköy',
    cost: 25,
    category: 'food',
    coordinates: { lat: 40.9886, lng: 29.0265 },
    notes: 'Legendary restaurant. Anatolian cuisine, daily specials. Try stuffed vegetables & kebabs.'
  },
  {
    id: 'ist25',
    name: 'Moda Neighborhood Walk',
    date: '2025-12-21',
    time: '14:00',
    location: 'Moda, Kadıköy',
    cost: 0,
    category: 'relax',
    coordinates: { lat: 40.9830, lng: 29.0300 },
    notes: '1.5 hrs. Residential area, sea views, Moda Pier. Locals reading by water. Very peaceful.'
  },
  {
    id: 'ist26',
    name: 'Tea at Moda Çay Bahçesi',
    date: '2025-12-21',
    time: '16:00',
    location: 'Moda Pier',
    cost: 3,
    category: 'relax',
    coordinates: { lat: 40.9812, lng: 29.0315 },
    notes: 'Waterfront tea garden. Watch sunset over European side. Perfect chill spot.'
  },
  {
    id: 'ist27',
    name: 'Dinner at Kadıköy Fish Market',
    date: '2025-12-21',
    time: '19:00',
    location: 'Kadıköy Balık Pazarı',
    cost: 30,
    category: 'food',
    coordinates: { lat: 40.9898, lng: 29.0273 },
    notes: 'Fresh seafood restaurants. Mezes & rakı. Lively atmosphere with locals.'
  },

  // DAY 6 (December 22): Dolmabahçe & Beşiktaş
  {
    id: 'ist28',
    name: 'Dolmabahçe Palace',
    date: '2025-12-22',
    time: '09:00',
    location: 'Beşiktaş',
    cost: 30,
    category: 'culture',
    coordinates: { lat: 41.0391, lng: 29.0000 },
    notes: '2 hrs. Opulent 19th-century palace. Crystal staircase & largest chandelier. Guided tour only.'
  },
  {
    id: 'ist29',
    name: 'Coffee at House Café Ortaköy',
    date: '2025-12-22',
    time: '11:30',
    location: 'Ortaköy',
    cost: 8,
    category: 'relax',
    coordinates: { lat: 41.0475, lng: 29.0267 },
    notes: 'Waterfront café. Bosphorus bridge views. Modern vibe. Instagram worthy.'
  },
  {
    id: 'ist30',
    name: 'Ortaköy Square & Mosque',
    date: '2025-12-22',
    time: '12:30',
    location: 'Ortaköy',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 41.0476, lng: 29.0290 },
    notes: '45 min. Baroque mosque on waterfront. Try kumpir (stuffed baked potato) from street vendors.'
  },
  {
    id: 'ist31',
    name: 'Lunch - Kumpir & Street Food',
    date: '2025-12-22',
    time: '13:30',
    location: 'Ortaköy Square',
    cost: 10,
    category: 'food',
    coordinates: { lat: 41.0478, lng: 29.0285 },
    notes: 'Famous Ortaköy kumpir. Choose 10+ toppings. Cheap & filling street food.'
  },
  {
    id: 'ist32',
    name: 'Istanbul Modern Art Museum',
    date: '2025-12-22',
    time: '15:00',
    location: 'Karaköy',
    cost: 12,
    category: 'culture',
    coordinates: { lat: 41.0264, lng: 28.9741 },
    notes: '1.5 hrs. Contemporary Turkish art. Bosphorus views from terrace. Optional - can swap for neighborhood walk.'
  },
  {
    id: 'ist33',
    name: 'Istiklal Street Evening Walk',
    date: '2025-12-22',
    time: '18:00',
    location: 'Beyoğlu',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 41.0351, lng: 28.9779 },
    notes: '1.5 hrs. Pedestrian avenue. Street music, shops, galleries. Take historic tram. Lively energy.'
  },
  {
    id: 'ist34',
    name: 'Dinner at Mikla',
    date: '2025-12-22',
    time: '20:00',
    location: 'Beyoğlu (Marmara Pera Hotel)',
    cost: 80,
    category: 'food',
    coordinates: { lat: 41.0341, lng: 28.9772 },
    notes: 'Rooftop fine dining. Panoramic views. Modern Turkish cuisine. Splurge meal - book ahead!'
  },

  // DAY 7 (December 23): Flexible Day - Chora Church & Final Moments
  {
    id: 'ist35',
    name: 'Chora Church (Kariye Museum)',
    date: '2025-12-23',
    time: '09:30',
    location: 'Edirnekapı',
    cost: 15,
    category: 'culture',
    coordinates: { lat: 41.0313, lng: 28.9395 },
    notes: '1 hr. Stunning Byzantine mosaics. Off beaten path. 30 min from center by tram/bus.'
  },
  {
    id: 'ist36',
    name: 'Balat Neighborhood Colors',
    date: '2025-12-23',
    time: '11:00',
    location: 'Balat',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 41.0275, lng: 28.9485 },
    notes: '2 hrs. Colorful houses, vintage cafés, antique shops. Historic Jewish & Greek quarter. Instagram heaven.'
  },
  {
    id: 'ist37',
    name: 'Lunch at Forno Balat',
    date: '2025-12-23',
    time: '13:00',
    location: 'Balat',
    cost: 15,
    category: 'food',
    coordinates: { lat: 41.0268, lng: 28.9478 },
    notes: 'Cozy café in colorful street. Pastries, sandwiches, Turkish coffee. Perfect brunch spot.'
  },
  {
    id: 'ist38',
    name: 'Pierre Loti Café & Cable Car',
    date: '2025-12-23',
    time: '15:00',
    location: 'Eyüp',
    cost: 10,
    category: 'relax',
    coordinates: { lat: 41.0483, lng: 28.9343 },
    notes: 'Cable car up hill. Panoramic Golden Horn views. Historic tea garden. Perfect final Istanbul moment.'
  },
  {
    id: 'ist39',
    name: 'Farewell Dinner at Asitane',
    date: '2025-12-23',
    time: '19:00',
    location: 'Edirnekapı',
    cost: 50,
    category: 'food',
    coordinates: { lat: 41.0315, lng: 28.9387 },
    notes: 'Ottoman palace cuisine recipes. Historical dishes. Special experience for last night.'
  },
  {
    id: 'ist40',
    name: 'Hotel Check-in & Accommodation',
    date: '2025-12-17',
    time: '14:00',
    location: 'Sultanahmet Area',
    cost: 350,
    category: 'relax',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    notes: '7 nights mid-range hotel. Central location. Walking distance to main sights.'
  }
];

const TRABZON_ACTIVITIES: Activity[] = [
  {
    id: 't1',
    name: 'Sumela Monastery',
    date: '2025-12-23',
    time: '09:30',
    location: 'Altındere, Maçka',
    cost: 25,
    category: 'culture',
    coordinates: { lat: 40.6903, lng: 39.6582 }
  },
  {
    id: 't2',
    name: 'Uzungöl Lake Day Trip',
    date: '2025-12-22',
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
    date: '2025-12-23',
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
    id: 't-istanbul-2025',
    destination: 'Istanbul, Turkey',
    startDate: '2025-12-17',
    endDate: '2025-12-23',
    totalBudget: 900,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1000&auto=format&fit=crop',
    budgetCategories: [
      { id: 'ist-b1', name: 'Accommodation', allocated: 350, spent: 350, color: COLORS.sage },
      { id: 'ist-b2', name: 'Food & Dining', allocated: 300, spent: 301, color: COLORS.warm },
      { id: 'ist-b3', name: 'Activities & Entry Fees', allocated: 200, spent: 197, color: COLORS.violet },
      { id: 'ist-b4', name: 'Transportation', allocated: 50, spent: 3, color: COLORS.sky },
    ],
    activities: ISTANBUL_ACTIVITIES
  },
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
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1000&auto=format&fit=crop', // Trabzon Sumela Monastery
    budgetCategories: [
      { id: 'bt1', name: 'Accommodation', allocated: 180, spent: 180, color: COLORS.sage },
      { id: 'bt2', name: 'Transportation', allocated: 300, spent: 300, color: COLORS.slate },
      { id: 'bt3', name: 'Activities', allocated: 100, spent: 100, color: COLORS.violet },
      { id: 'bt4', name: 'Food', allocated: 120, spent: 60, color: COLORS.warm },
    ],
    activities: TRABZON_ACTIVITIES
  }
];