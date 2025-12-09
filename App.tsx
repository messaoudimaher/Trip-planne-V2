import React, { useState, useEffect } from 'react';
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
      return savedTrips ? JSON.parse(savedTrips) : MOCK_TRIPS;
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
  useEffect(() => {
    if (isDbConnected) {
      const unsubscribe = subscribeToTrips((cloudTrips) => {
        setTrips(cloudTrips);
        // We also update local storage as a cache/backup
        localStorage.setItem('maher_trips_data', JSON.stringify(cloudTrips));
      });
      return () => unsubscribe();
    }
  }, [isDbConnected]);

  // Persist trips to LocalStorage (Only if NOT connected to DB, otherwise DB listener handles it)
  useEffect(() => {
    if (!isDbConnected) {
      localStorage.setItem('maher_trips_data', JSON.stringify(trips));
    }
  }, [trips, isDbConnected]);


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
    if (isDbConnected) {
      saveTripToFirebase(newTrip);
    } else {
      setTrips(prev => [newTrip, ...prev]);
    }
    setCurrentView('home');
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    if (isDbConnected) {
      saveTripToFirebase(updatedTrip);
    } else {
      setTrips(prevTrips => prevTrips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    if (isDbConnected) {
      deleteTripFromFirebase(tripId);
    } else {
      setTrips(prevTrips => prevTrips.filter(t => t.id !== tripId));
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
    <div className="min-h-screen text-stone-800 font-sans selection:bg-sage-200">
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl pb-24">
        {renderView()}
      </main>

      <ChatAssistant currentView={currentView} currentTrip={trips.find(t => t.id === selectedTripId)} />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 animate-scale-up p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-sage-100 p-2 rounded-full text-sage-600">
                  <Key size={20} />
                </div>
                <h3 className="text-xl font-bold text-stone-800">App Settings</h3>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-6">
              {/* API Key Section */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">Google Gemini API Key</label>
                <p className="text-sm text-stone-400 mb-3">Required for AI suggestions.</p>
                <div className="flex gap-2">
                   <input 
                    type="password" 
                    className="flex-1 bg-white border border-stone-200 rounded-xl p-3 text-stone-800 focus:outline-none focus:border-sage-400 font-mono text-sm"
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  {isKeySaved ? (
                     <button onClick={handleClearKey} className="px-4 bg-stone-200 text-stone-600 rounded-xl font-bold text-sm hover:bg-stone-300">Clear</button>
                  ) : (
                     <button onClick={handleSaveKey} className="px-4 bg-stone-800 text-white rounded-xl font-bold text-sm hover:bg-stone-700">Save</button>
                  )}
                </div>
              </div>

              {/* Database Section */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                 <div className="flex items-center gap-2 mb-2">
                    <Database size={16} className={isDbConnected ? "text-green-500" : "text-stone-400"} />
                    <label className="block text-sm font-bold text-stone-500 uppercase tracking-wider">Cloud Database (Firebase)</label>
                    {isDbConnected && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">Connected</span>}
                 </div>
                 
                 {!isDbConnected ? (
                    <div className="space-y-3">
                       <p className="text-sm text-stone-400">Paste your Firebase Config JSON object below to sync data across devices.</p>
                       <textarea 
                          className="w-full h-32 bg-white border border-stone-200 rounded-xl p-3 text-xs font-mono text-stone-600 focus:outline-none focus:border-sage-400"
                          placeholder='{ "apiKey": "...", "authDomain": "...", "projectId": "..." }'
                          value={firebaseConfigStr}
                          onChange={(e) => setFirebaseConfigStr(e.target.value)}
                       />
                       <button 
                          onClick={handleConnectDb}
                          className="w-full bg-stone-800 text-white font-bold py-2 rounded-xl hover:bg-stone-700 transition-colors"
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
                             className="flex-1 bg-sage-500 text-white font-bold py-2 rounded-xl hover:bg-sage-600 transition-colors flex items-center justify-center gap-2"
                          >
                             {isSyncing ? <RefreshCw size={16} className="animate-spin" /> : <Cloud size={16} />}
                             Sync Local Data
                          </button>
                          <button 
                             onClick={handleDisconnectDb}
                             className="px-4 bg-red-100 text-red-500 font-bold rounded-xl hover:bg-red-200 transition-colors"
                          >
                             Disconnect
                          </button>
                       </div>
                       <p className="text-xs text-stone-400 text-center">Data is automatically synced. Click 'Sync Local Data' to upload your existing local trips.</p>
                    </div>
                 )}
              </div>
              
              {/* Reset Data */}
              <div className="pt-2">
                <button 
                  onClick={handleResetData}
                  className="w-full py-2 px-4 rounded-xl border border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} />
                  Reset App Data (Debug)
                </button>
              </div>

              <div className="mt-2 text-center">
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-sage-600 hover:underline"
                >
                  Get Gemini API Key
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