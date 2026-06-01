import React, { useState, useEffect, useRef } from 'react';
import { HomeView } from './views/HomeView';
import { TripDashboardView } from './views/TripDashboardView';
import { GlobalAnalyticsView } from './views/GlobalAnalyticsView';
import { CreateTripView } from './views/CreateTripView';
import { ChatAssistant } from './components/ChatAssistant';
import { Navbar } from './components/Navbar';
import { View, Trip } from './types';
import { MOCK_TRIPS, FIREBASE_CONFIG } from './constants';
import { X, Key, Check, RefreshCw, Database, Cloud } from 'lucide-react';
import { initFirebase, subscribeToTrips, saveTripToFirebase, deleteTripFromFirebase, syncLocalToCloud, getDb } from './services/firebase';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // Initialize trips from LocalStorage or fallback to MOCK_TRIPS
  const [trips, setTrips] = useState<Trip[]>(() => {
    try {
      const savedTrips = localStorage.getItem('maher_trips_data');
      if (!savedTrips) {
        localStorage.setItem('maher_trips_data', JSON.stringify(MOCK_TRIPS));
        return [...MOCK_TRIPS];
      }

      let currentTrips = JSON.parse(savedTrips);
      let modified = false;

      // Sync mock trips from constants.ts into local storage cache automatically
      MOCK_TRIPS.forEach(mockTrip => {
        const index = currentTrips.findIndex((t: Trip) => t.id === mockTrip.id);
        if (index === -1) {
          currentTrips.unshift(mockTrip);
          modified = true;
        } else {
          const localTrip = currentTrips[index];
          // Check if properties have changed in constants.ts
          const hasBudgetChanged = localTrip.totalBudget !== mockTrip.totalBudget;
          const hasImageChanged = localTrip.image !== mockTrip.image;
          const hasProgramImageChanged = localTrip.programImage !== mockTrip.programImage;
          const hasCategoriesChanged = localTrip.budgetCategories.length !== mockTrip.budgetCategories.length;

          if (hasBudgetChanged || hasImageChanged || hasProgramImageChanged || hasCategoriesChanged) {
            const mergedCategories = mockTrip.budgetCategories.map(mockCat => {
              const localCat = localTrip.budgetCategories.find((c: any) => c.id === mockCat.id || c.name === mockCat.name);
              return {
                ...mockCat,
                spent: localCat ? localCat.spent : 0
              };
            });

            currentTrips[index] = {
              ...localTrip,
              totalBudget: mockTrip.totalBudget,
              image: mockTrip.image,
              programImage: mockTrip.programImage,
              budgetCategories: mergedCategories
            };
            modified = true;
          }
        }
      });

      if (modified) {
        localStorage.setItem('maher_trips_data', JSON.stringify(currentTrips));
      }
      return currentTrips;
    } catch (error) {
      console.error('Error loading trips from local storage:', error);
      return MOCK_TRIPS;
    }
  });

  // Settings / API Key / Firebase State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  // Firebase Config State
  const [firebaseConfigStr, setFirebaseConfigStr] = useState('');
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Initialize Data & Keys
  useEffect(() => {
    // 1. Gemini Key
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsKeySaved(true);
    }

    // 2. Firebase Config (Prioritize Local Storage, fallback to Constant)
    let configToUse = null;
    const storedFirebaseConfig = localStorage.getItem('firebase_config');

    if (storedFirebaseConfig) {
      setFirebaseConfigStr(storedFirebaseConfig);
      try {
        configToUse = JSON.parse(storedFirebaseConfig);
      } catch (e) {
        console.error("Invalid stored config");
      }
    } else if (FIREBASE_CONFIG) {
      // Use the hardcoded config from constants.ts if no local override
      configToUse = FIREBASE_CONFIG;
      setFirebaseConfigStr(JSON.stringify(FIREBASE_CONFIG, null, 2));
    }

    if (configToUse) {
      const success = initFirebase(configToUse);
      if (success) {
        setIsDbConnected(true);
      }
    }
  }, []);

  // Listen for Firebase Updates (Real-time Sync)
  // Note: Local changes are handled optimistically for instant UI feedback
  useEffect(() => {
    if (isDbConnected) {
      let isFirstLoad = true;
      const unsubscribe = subscribeToTrips((cloudTrips) => {
        // On first load, check if we need to sync local trips to cloud
        if (isFirstLoad) {
          isFirstLoad = false;

          // Get current local trips at time of subscription
          const currentLocalTrips = localStorage.getItem('maher_trips_data');
          const localTrips = currentLocalTrips ? JSON.parse(currentLocalTrips) : [];

          // If Firebase is empty but we have local trips, sync them to cloud
          if (cloudTrips.length === 0 && localTrips.length > 0) {
            console.log("Firebase empty, syncing local trips to cloud...");
            localTrips.forEach((trip: Trip) => saveTripToFirebase(trip));
            return; // Don't overwrite local data yet
          }
        }

        // Update from Firebase (this keeps all devices in sync)
        setTrips(cloudTrips);
        localStorage.setItem('maher_trips_data', JSON.stringify(cloudTrips));
      });
      return () => unsubscribe();
    }
  }, [isDbConnected]);

  // ALWAYS persist trips to LocalStorage (as backup and for offline use)
  useEffect(() => {
    localStorage.setItem('maher_trips_data', JSON.stringify(trips));
  }, [trips]);


  // --- Handlers ---

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsKeySaved(true);
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsKeySaved(false);
  };

  const handleConnectDb = () => {
    try {
      // Allow user to paste simple JSON or the full JS object (try to clean it up slightly)
      let cleanStr = firebaseConfigStr.trim();
      // If user pasted "const firebaseConfig = { ... };", strip the variable part
      if (cleanStr.includes('=')) {
        cleanStr = cleanStr.split('=')[1].trim();
        if (cleanStr.endsWith(';')) cleanStr = cleanStr.slice(0, -1);
      }

      const config = JSON.parse(cleanStr);
      const success = initFirebase(config);
      if (success) {
        localStorage.setItem('firebase_config', cleanStr);
        setIsDbConnected(true);
        alert("Successfully connected to Firebase!");
      } else {
        alert("Failed to connect. Check console for errors.");
      }
    } catch (error) {
      alert("Invalid JSON format. Please paste the configuration object correctly.");
    }
  };

  const handleDisconnectDb = () => {
    localStorage.removeItem('firebase_config');
    setIsDbConnected(false);
    setFirebaseConfigStr('');
    window.location.reload(); // Reload to clear Firebase instance
  };

  const handleSyncToCloud = async () => {
    if (!isDbConnected) return;
    setIsSyncing(true);
    try {
      await syncLocalToCloud(trips);
      alert("All local trips synced to Cloud Database!");
    } catch (e) {
      alert("Sync failed. Check console.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all trip data to defaults? This cannot be undone.')) {
      setTrips(MOCK_TRIPS);
      localStorage.setItem('maher_trips_data', JSON.stringify(MOCK_TRIPS));
      // If connected, this needs to reset cloud data too? Maybe safer to just reset local context for now to avoid massive deletion.
      window.location.reload();
    }
  };

  const handleNavigate = (view: View, tripId?: string) => {
    if (tripId) {
      setSelectedTripId(tripId);
    }
    setCurrentView(view);
  };

  // CRUD Operations with DB Support
  const handleCreateTrip = (newTrip: Trip) => {
    // Always update local state immediately for instant feedback
    setTrips(prev => [newTrip, ...prev]);

    // Also sync to Firebase if connected
    if (isDbConnected) {
      saveTripToFirebase(newTrip);
    }

    setCurrentView('home');
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    // Always update local state immediately
    setTrips(prevTrips => prevTrips.map(t => t.id === updatedTrip.id ? updatedTrip : t));

    // Also sync to Firebase if connected
    if (isDbConnected) {
      saveTripToFirebase(updatedTrip);
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    // Always update local state immediately
    setTrips(prevTrips => prevTrips.filter(t => t.id !== tripId));

    // Also sync to Firebase if connected
    if (isDbConnected) {
      deleteTripFromFirebase(tripId);
    }

    if (selectedTripId === tripId) {
      setSelectedTripId(null);
      setCurrentView('home');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            trips={trips}
            onNavigate={handleNavigate}
            onDeleteTrip={handleDeleteTrip}
          />
        );
      case 'dashboard':
        const trip = trips.find(t => t.id === selectedTripId);
        return trip ? (
          <TripDashboardView
            trip={trip}
            onNavigate={handleNavigate}
            onTripUpdate={handleUpdateTrip}
            onDeleteTrip={handleDeleteTrip}
          />
        ) : (
          <HomeView trips={trips} onNavigate={handleNavigate} onDeleteTrip={handleDeleteTrip} />
        );
      case 'analytics':
        return <GlobalAnalyticsView trips={trips} onNavigate={handleNavigate} />;
      case 'create':
        return <CreateTripView onSave={handleCreateTrip} onCancel={() => setCurrentView('home')} />;
      default:
        return <HomeView trips={trips} onNavigate={handleNavigate} onDeleteTrip={handleDeleteTrip} />;
    }
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-brand-100">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl pb-32">
        {renderView()}
      </main>

      <ChatAssistant currentView={currentView} currentTrip={trips.find(t => t.id === selectedTripId)} />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsSettingsOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 animate-scale-up p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-brand-500 to-violet-600 p-2.5 rounded-xl text-white shadow-lg shadow-brand-500/30">
                  <Key size={18} />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">App Settings</h3>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"><X size={18} /></button>
            </div>

            <div className="space-y-5">
              {/* API Key Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Google Gemini API Key</label>
                <p className="text-sm text-slate-400 mb-3">Required for AI travel suggestions.</p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/10 font-mono text-sm transition-all"
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  {isKeySaved ? (
                    <button onClick={handleClearKey} className="px-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">Clear</button>
                  ) : (
                    <button onClick={handleSaveKey} className="px-4 bg-gradient-to-r from-brand-500 to-violet-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-brand-500/30 transition-all">Save</button>
                  )}
                </div>
              </div>

              {/* Database Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={16} className={isDbConnected ? "text-emerald-500" : "text-slate-400"} />
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Cloud Database (Firebase)</label>
                  {isDbConnected && <span className="text-xs bg-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-full font-bold">Connected</span>}
                </div>

                {!isDbConnected ? (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-400">Paste your Firebase Config JSON to sync across devices.</p>
                    <textarea
                      className="w-full h-32 bg-white border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-600 focus:outline-none focus:border-brand-400 transition-colors"
                      placeholder='{ "apiKey": "...", "authDomain": "...", "projectId": "..." }'
                      value={firebaseConfigStr}
                      onChange={(e) => setFirebaseConfigStr(e.target.value)}
                    />
                    <button
                      onClick={handleConnectDb}
                      className="w-full bg-gradient-to-r from-brand-500 to-violet-600 text-white font-bold py-2.5 rounded-xl hover:shadow-lg hover:shadow-brand-500/30 transition-all"
                    >
                      Connect Database
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button
                        onClick={handleSyncToCloud}
                        disabled={isSyncing}
                        className="flex-1 bg-emerald-500 text-white font-bold py-2 rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                      >
                        {isSyncing ? <RefreshCw size={16} className="animate-spin" /> : <Cloud size={16} />}
                        Sync Local Data
                      </button>
                      <button
                        onClick={handleDisconnectDb}
                        className="px-4 bg-rose-50 text-rose-500 font-bold rounded-xl hover:bg-rose-100 transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 text-center">Data auto-syncs. Click 'Sync Local Data' to push local trips to cloud.</p>
                  </div>
                )}
              </div>

              {/* Reset Data */}
              <div className="pt-1">
                <button
                  onClick={handleResetData}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} />
                  Reset App Data (Debug)
                </button>
              </div>

              <div className="text-center">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand-500 hover:text-brand-700 hover:underline transition-colors"
                >
                  Get a free Gemini API Key →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;