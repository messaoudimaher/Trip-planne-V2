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

const TUNISIA_ACTIVITIES: Activity[] = [
  {
    id: 'tun-act1',
    name: 'Roundtrip Flights to Tunis-Carthage',
    date: '2026-03-20',
    time: '11:00',
    location: 'Tunis-Carthage Airport (TUN)',
    cost: 200,
    category: 'transit',
    coordinates: { lat: 36.8510, lng: 10.2272 },
    notes: 'Outbound flight from Paris. Arrived in the afternoon.'
  },
  {
    id: 'tun-act2',
    name: 'Boutique Riad stay in Tunis Medina',
    date: '2026-03-20',
    time: '14:30',
    location: 'Dar El Jeld Hotel & Spa, Tunis Medina',
    cost: 800,
    category: 'relax',
    coordinates: { lat: 36.8002, lng: 10.1697 },
    notes: 'Stunning traditional riad in the heart of the Medina. 15-night total stay.'
  },
  {
    id: 'tun-act3',
    name: 'Souk Food Tour & Dinner at Dar El Jeld',
    date: '2026-03-21',
    time: '18:00',
    location: 'Rue Dar El Jeld, Tunis',
    cost: 120,
    category: 'food',
    coordinates: { lat: 36.8005, lng: 10.1702 },
    notes: 'Tasted local delicacies in the Souk, followed by traditional Tunisian couscous.'
  },
  {
    id: 'tun-act4',
    name: 'Ancient Carthage & Sidi Bou Said Tour',
    date: '2026-03-23',
    time: '09:30',
    location: 'Carthage Ruins & Sidi Bou Said Village',
    cost: 80,
    category: 'culture',
    coordinates: { lat: 36.8524, lng: 10.3230 },
    notes: 'Visited the Antonine Baths, Carthage Museum, and walked the blue-and-white streets.'
  },
  {
    id: 'tun-act5',
    name: 'Bardo National Museum Guided Visit',
    date: '2026-03-25',
    time: '10:00',
    location: 'Bardo Palace, Tunis',
    cost: 40,
    category: 'culture',
    coordinates: { lat: 36.8093, lng: 10.1344 },
    notes: 'Stunning collection of Roman mosaics. Exceptional historical depth.'
  },
  {
    id: 'tun-act6',
    name: 'El Jem Roman Amphitheatre Day Trip',
    date: '2026-03-27',
    time: '08:30',
    location: 'Amphitheatre of El Jem',
    cost: 80,
    category: 'adventure',
    coordinates: { lat: 35.2964, lng: 10.7067 },
    notes: 'Explored one of the largest and best-preserved Roman amphitheaters in the world.'
  },
  {
    id: 'tun-act7',
    name: '2-Day Sahara Desert Tour & Camel Trek',
    date: '2026-03-29',
    time: '07:00',
    location: 'Douz & Ksar Ghilane Oasis',
    cost: 200,
    category: 'adventure',
    coordinates: { lat: 33.0039, lng: 9.6322 },
    notes: 'Camped in the desert under the stars, swam in hot springs at Ksar Ghilane.'
  },
  {
    id: 'tun-act8',
    name: 'Local Transport & Car Rental',
    date: '2026-03-31',
    time: '09:00',
    location: 'Tunis / Sousse',
    cost: 100,
    category: 'transit',
    coordinates: { lat: 35.8245, lng: 10.6387 },
    notes: 'Louage (shared taxi), trains, and airport shuttle.'
  },
  {
    id: 'tun-act9',
    name: 'Seafood Dinner in Sousse Marina',
    date: '2026-04-01',
    time: '19:30',
    location: 'Port El Kantaoui, Sousse',
    cost: 130,
    category: 'food',
    coordinates: { lat: 35.8953, lng: 10.5985 },
    notes: 'Fresh sea bass, grilled prawns, and local Tunisian wine.'
  },
  {
    id: 'tun-act10',
    name: 'Fine Dining at Restaurant L\'Astragale',
    date: '2026-04-02',
    time: '20:00',
    location: 'Avenue de la Liberte, Tunis',
    cost: 150,
    category: 'food',
    coordinates: { lat: 36.8188, lng: 10.1802 },
    notes: 'Sophisticated French-Tunisian fusion cuisine in a gorgeous setting.'
  },
  {
    id: 'tun-act11',
    name: 'Sidi Bou Said Cafes & Souvenirs',
    date: '2026-04-03',
    time: '15:00',
    location: 'Café des Délices, Sidi Bou Said',
    cost: 100,
    category: 'food',
    coordinates: { lat: 36.8712, lng: 10.3478 },
    notes: 'Famous mint tea with pine nuts, bought dates and Tunisian pottery.'
  }
];

const BRUSSELS_ACTIVITIES: Activity[] = [
  {
    id: 'bru-act1',
    name: 'Eurostar Train from Paris to Brussels',
    date: '2026-06-06',
    time: '08:00',
    location: 'Gare du Midi, Brussels',
    cost: 60,
    category: 'transit',
    coordinates: { lat: 50.8360, lng: 4.3355 },
    notes: 'Outbound train. Quick 1h 22m journey.'
  },
  {
    id: 'bru-act2',
    name: 'City Center Hotel Check-in',
    date: '2026-06-06',
    time: '10:30',
    location: 'Brussels City Center Hotel',
    cost: 200,
    category: 'relax',
    coordinates: { lat: 50.8466, lng: 4.3528 },
    notes: 'Stay in the city center for easy access to all landmarks.'
  },
  {
    id: 'bru-act3',
    name: 'Grand-Place, Galeries Saint-Hubert & Manneken Pis',
    date: '2026-06-06',
    time: '11:00',
    location: 'Grand-Place, 1000 Brussels',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 50.8467, lng: 4.3525 },
    notes: 'Explore stunning architecture, walk through Galeries Royales Saint-Hubert, see Manneken Pis.'
  },
  {
    id: 'bru-act4',
    name: 'Seafood Lunch at The Sea Tree',
    date: '2026-06-06',
    time: '13:00',
    location: 'The Sea Tree, Brussels',
    cost: 40,
    category: 'food',
    coordinates: { lat: 50.8475, lng: 4.3540 },
    notes: 'Delicious seafood lunch near Grand-Place (Mussels/Fish).'
  },
  {
    id: 'bru-act5',
    name: 'Royal Quarter & Chocolate Tasting',
    date: '2026-06-06',
    time: '15:00',
    location: 'Mont des Arts & Neuhaus Chocolate',
    cost: 30,
    category: 'food',
    coordinates: { lat: 50.8444, lng: 4.3590 },
    notes: 'Mont des Arts viewpoint, Royal Palace (outside), and chocolate tasting at Neuhaus/Leonidas.'
  },
  {
    id: 'bru-act6',
    name: 'Dinner & Night Lights at Le Caire',
    date: '2026-06-06',
    time: '20:00',
    location: 'Le Caire Restaurant, Brussels',
    cost: 50,
    category: 'food',
    coordinates: { lat: 50.8480, lng: 4.3510 },
    notes: 'Halal Egyptian & Mediterranean cuisine. Finish with a romantic walk to see Grand-Place illuminated.'
  },
  {
    id: 'bru-act7',
    name: 'Atomium & Mini-Europe Visit',
    date: '2026-06-07',
    time: '09:30',
    location: 'Atomium, Square de l\'Atomium',
    cost: 45,
    category: 'culture',
    coordinates: { lat: 50.8949, lng: 4.3415 },
    notes: 'Visit the iconic Atomium, enjoy panoramic views and the colorful Mini-Europe.'
  },
  {
    id: 'bru-act8',
    name: 'Seafood Lunch near Atomium',
    date: '2026-06-07',
    time: '13:00',
    location: 'Atomium area restaurant',
    cost: 35,
    category: 'food',
    coordinates: { lat: 50.8930, lng: 4.3440 },
    notes: 'Enjoy seafood pasta or fresh salads near the Atomium.'
  },
  {
    id: 'bru-act9',
    name: 'Parks & European Quarter Walk',
    date: '2026-06-07',
    time: '15:00',
    location: 'Parc du Cinquantenaire',
    cost: 0,
    category: 'culture',
    coordinates: { lat: 50.8385, lng: 4.3787 },
    notes: 'Walk around European Parliament area, admire the grand arch and modern architecture.'
  },
  {
    id: 'bru-act10',
    name: 'Sablon & Farewell Dinner',
    date: '2026-06-07',
    time: '19:30',
    location: 'Sablon Neighborhood, Brussels',
    cost: 60,
    category: 'food',
    coordinates: { lat: 50.8402, lng: 4.3538 },
    notes: 'Explore elegant Sablon, antique shops, chocolate stores. Relax and enjoy a farewell dinner.'
  },
  {
    id: 'bru-act11',
    name: 'Local Transport (Metro/Trams/Buses)',
    date: '2026-06-08',
    time: '10:00',
    location: 'Brussels Metro System',
    cost: 40,
    category: 'transit',
    coordinates: { lat: 50.8450, lng: 4.3500 },
    notes: 'Transit cards for navigating the city.'
  }
];

const BARCELONA_ACTIVITIES: Activity[] = [
  {
    id: 'bar-act1',
    name: 'Flight from Paris to Barcelona',
    date: '2026-06-08',
    time: '10:00',
    location: 'Barcelona-El Prat Airport (BCN)',
    cost: 100,
    category: 'transit',
    coordinates: { lat: 41.2974, lng: 2.0833 },
    notes: 'Outbound flight. Welcome to Catalonia!'
  },
  {
    id: 'bar-act2',
    name: 'Boutique Apartment Stay - El Born',
    date: '2026-06-08',
    time: '15:00',
    location: 'Carrer de la Princesa, El Born, Barcelona',
    cost: 600,
    category: 'relax',
    coordinates: { lat: 41.3853, lng: 2.1815 },
    notes: 'Perfect base apartment in the vibrant and historic El Born neighborhood.'
  },
  {
    id: 'bar-act3',
    name: 'Sunset Walk to Port Vell & Marina',
    date: '2026-06-08',
    time: '18:30',
    location: 'Port Vell Marina, Barcelona',
    cost: 0,
    category: 'relax',
    coordinates: { lat: 41.3780, lng: 2.1810 },
    notes: 'Explore Santa Maria del Mar, Parc de la Ciutadella, and enjoy sunset views at the marina.'
  },
  {
    id: 'bar-act4',
    name: 'Tapas Dinner at Bodega La Puntual',
    date: '2026-06-08',
    time: '20:30',
    location: 'Bodega La Puntual, Carrer de Montcada',
    cost: 60,
    category: 'food',
    coordinates: { lat: 41.3848, lng: 2.1811 },
    notes: 'Traditional tapas. Try Patatas Bravas, Jamon Iberico, and Pan con Tomate.'
  },
  {
    id: 'bar-act5',
    name: 'Casa Batllo Guided Tour',
    date: '2026-06-09',
    time: '09:00',
    location: 'Passeig de Gracia, 43',
    cost: 70,
    category: 'culture',
    coordinates: { lat: 41.3916, lng: 2.1649 },
    notes: 'Booked first morning slot to beat the crowds. Appreciate Gaudi\'s masterpiece (2-3h).'
  },
  {
    id: 'bar-act6',
    name: 'Lunch & Stroll at Passeig de Gracia',
    date: '2026-06-09',
    time: '13:30',
    location: 'Passeig de Gracia Area',
    cost: 50,
    category: 'food',
    coordinates: { lat: 41.3920, lng: 2.1645 },
    notes: 'Elegant lunch and walking tour of modernista architecture and shops.'
  },
  {
    id: 'bar-act7',
    name: 'Romantic Dinner at Terraza Martinez',
    date: '2026-06-09',
    time: '20:30',
    location: 'Ctra. de Miramar, Montjuic',
    cost: 120,
    category: 'food',
    coordinates: { lat: 41.3693, lng: 2.1706 },
    notes: 'Stunning sunset and romantic dinner with panoramic views over the city and sea.'
  },
  {
    id: 'bar-act8',
    name: 'Spotify Camp Nou & FC Barcelona Museum',
    date: '2026-06-10',
    time: '09:30',
    location: 'Spotify Camp Nou Stadium',
    cost: 60,
    category: 'culture',
    coordinates: { lat: 41.3809, lng: 2.1228 },
    notes: 'Touring the iconic stadium, trophies, and interactive club history exhibits (3-4h).'
  },
  {
    id: 'bar-act9',
    name: 'Lunch at Les Corts Neighborhood',
    date: '2026-06-10',
    time: '13:30',
    location: 'Les Corts district, Barcelona',
    cost: 40,
    category: 'food',
    coordinates: { lat: 41.3850, lng: 2.1290 },
    notes: 'Delicious local lunch near the stadium.'
  },
  {
    id: 'bar-act10',
    name: 'Dinner at Arcano Restaurant',
    date: '2026-06-10',
    time: '20:30',
    location: 'Arcano, Carrer dels Mercaders',
    cost: 100,
    category: 'food',
    coordinates: { lat: 41.3852, lng: 2.1793 },
    notes: 'Romantic, intimate dinner setting inside a historic 17th-century stone arch building.'
  },
  {
    id: 'bar-act11',
    name: 'Park Guell Monumental Zone Tour',
    date: '2026-06-11',
    time: '09:00',
    location: 'Park Guell, Barcelona',
    cost: 30,
    category: 'culture',
    coordinates: { lat: 41.4145, lng: 2.1527 },
    notes: 'Booked early slot. Enjoy amazing colorful mosaics and the serpentine bench.'
  },
  {
    id: 'bar-act12',
    name: 'Lunch & Wander in Gracia District',
    date: '2026-06-11',
    time: '13:00',
    location: 'Gracia Neighborhood, Barcelona',
    cost: 30,
    category: 'food',
    coordinates: { lat: 41.4025, lng: 2.1560 },
    notes: 'Cozy lunch in a tree-lined square and walk through bohemian streets.'
  },
  {
    id: 'bar-act13',
    name: 'Sunset at Bunkers del Carmel',
    date: '2026-06-11',
    time: '18:30',
    location: 'Bunkers del Carmel viewpoint',
    cost: 0,
    category: 'adventure',
    coordinates: { lat: 41.4193, lng: 2.1618 },
    notes: 'Undoubtedly the best 360-degree panoramic sunset viewpoint in Barcelona.'
  },
  {
    id: 'bar-act14',
    name: 'Dinner at Can Fisher Seafood',
    date: '2026-06-11',
    time: '21:00',
    location: 'Avinguda del Litoral, Bogatell',
    cost: 80,
    category: 'food',
    coordinates: { lat: 41.3934, lng: 2.2030 },
    notes: 'Fresh Mediterranean seafood, beach views, and wonderful romantic atmosphere.'
  },
  {
    id: 'bar-act15',
    name: 'Bogatell Beach Day',
    date: '2026-06-12',
    time: '10:00',
    location: 'Bogatell Beach, Barcelona',
    cost: 0,
    category: 'relax',
    coordinates: { lat: 41.3936, lng: 2.2045 },
    notes: 'Relaxing, swimming, and sunbathing at Bogatell beach.'
  },
  {
    id: 'bar-act16',
    name: 'Seafood Lunch by Bogatell Beach',
    date: '2026-06-12',
    time: '13:30',
    location: 'Bogatell Beach promenade',
    cost: 50,
    category: 'food',
    coordinates: { lat: 41.3930, lng: 2.2025 },
    notes: 'Enjoying fresh paella or fideua next to the sand.'
  },
  {
    id: 'bar-act17',
    name: 'Sunset Catamaran Sailing Cruise',
    date: '2026-06-12',
    time: '19:30',
    location: 'Port Olimpic, Barcelona',
    cost: 120,
    category: 'adventure',
    coordinates: { lat: 41.3854, lng: 2.1970 },
    notes: 'A romantic sunset sail on the Mediterranean Sea with drinks and light music.'
  },
  {
    id: 'bar-act18',
    name: 'Farewell Dinner at 7 Portes',
    date: '2026-06-12',
    time: '21:30',
    location: 'Passeig d\'Isabel II, 14',
    cost: 120,
    category: 'food',
    coordinates: { lat: 41.3822, lng: 2.1834 },
    notes: 'Classic Catalan cuisine and paella in a legendary, historic atmosphere.'
  },
  {
    id: 'bar-act19',
    name: 'Local Transport & Metro Card',
    date: '2026-06-13',
    time: '10:00',
    location: 'Barcelona Metro / Taxis',
    cost: 50,
    category: 'transit',
    coordinates: { lat: 41.3850, lng: 2.1734 },
    notes: 'T-Casual cards and taxi to the airport.'
  },
  {
    id: 'bar-act20',
    name: 'Return Flight to Paris',
    date: '2026-06-13',
    time: '14:00',
    location: 'Barcelona-El Prat Airport (BCN)',
    cost: 100,
    category: 'transit',
    coordinates: { lat: 41.2974, lng: 2.0833 },
    notes: 'Heading home after an amazing trip.'
  }
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 't-brussels-2026',
    destination: 'Brussels, Belgium',
    startDate: '2026-06-06',
    endDate: '2026-06-08',
    totalBudget: 300,
    image: 'https://images.unsplash.com/photo-1642291373721-8431835753ea?q=80&w=1000&auto=format&fit=crop',
    programImage: '/programs/brussels_2026.png',
    budgetCategories: [
      { id: 'bru-b1', name: 'Accommodation', allocated: 151, spent: 0, color: COLORS.sage },
      { id: 'bru-b2', name: 'Food & Dining', allocated: 50, spent: 0, color: COLORS.warm },
      { id: 'bru-b3', name: 'Match Tickets', allocated: 50, spent: 0, color: COLORS.violet },
      { id: 'bru-b4', name: 'FlixBus Transport', allocated: 50, spent: 0, color: COLORS.sky },
    ],
    activities: BRUSSELS_ACTIVITIES
  },
  {
    id: 't-barcelona-2026',
    destination: 'Barcelona, Spain',
    startDate: '2026-06-08',
    endDate: '2026-06-13',
    totalBudget: 970,
    image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=1000&auto=format&fit=crop',
    programImage: '/programs/barcelona_2026.png',
    budgetCategories: [
      { id: 'bar-b1', name: 'Airbnb Accommodation', allocated: 689, spent: 0, color: COLORS.sage },
      { id: 'bar-b2', name: 'Flight to DUS', allocated: 150, spent: 0, color: COLORS.sky },
      { id: 'bar-b3', name: 'Flight to BCN', allocated: 130, spent: 0, color: COLORS.amber },
    ],
    activities: BARCELONA_ACTIVITIES
  },
  {
    id: 't-tunisia-2026',
    destination: 'Tunisia',
    startDate: '2026-03-20',
    endDate: '2026-04-04',
    totalBudget: 2000,
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1000&auto=format&fit=crop',
    budgetCategories: [
      { id: 'tun-b1', name: 'Accommodation', allocated: 800, spent: 800, color: COLORS.sage },
      { id: 'tun-b2', name: 'Food & Dining', allocated: 500, spent: 500, color: COLORS.warm },
      { id: 'tun-b3', name: 'Activities & Entry Fees', allocated: 400, spent: 400, color: COLORS.violet },
      { id: 'tun-b4', name: 'Transportation', allocated: 300, spent: 300, color: COLORS.sky },
    ],
    activities: TUNISIA_ACTIVITIES
  },
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