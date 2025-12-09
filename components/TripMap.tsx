import React, { useEffect, useRef } from 'react';
import { Activity } from '../types';
import { renderToString } from 'react-dom/server';
import { MapPin, Utensils, Camera, Coffee, Ticket, Train } from 'lucide-react';

// Declare Leaflet globally since we're loading it from CDN
declare global {
  const L: any;
}

interface TripMapProps {
  activities: Activity[];
  center?: { lat: number; lng: number };
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'food': return <Utensils size={18} strokeWidth={2.5} />;
    case 'adventure': return <Camera size={18} strokeWidth={2.5} />;
    case 'relax': return <Coffee size={18} strokeWidth={2.5} />;
    case 'transit': return <Train size={18} strokeWidth={2.5} />;
    case 'culture': return <Ticket size={18} strokeWidth={2.5} />;
    default: return <MapPin size={18} strokeWidth={2.5} />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'food': return '#d4a373'; // warm
    case 'adventure': return '#6d9c7e'; // sage
    case 'relax': return '#0ea5e9'; // sky
    case 'transit': return '#64748b'; // slate
    case 'culture': return '#8b5cf6'; // violet
    default: return '#f43f5e'; // rose
  }
};

export const TripMap: React.FC<TripMapProps> = ({ activities, center }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any>(null);

  // Default to Paris if no center
  const defaultCenter = center ? [center.lat, center.lng] : [48.8566, 2.3522];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(defaultCenter, 13);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);

      // Create marker cluster group
      markersRef.current = L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        iconCreateFunction: function(cluster: any) {
            return L.divIcon({ 
                html: `<div class="flex items-center justify-center w-10 h-10 bg-stone-800 text-white rounded-full font-bold shadow-lg border-2 border-white">${cluster.getChildCount()}</div>`, 
                className: 'custom-cluster-icon', 
                iconSize: L.point(40, 40) 
            });
        }
      });
      mapRef.current.addLayer(markersRef.current);
    }

    // Update markers
    if (markersRef.current) {
      markersRef.current.clearLayers();

      const validActivities = activities.filter(a => a.coordinates?.lat && a.coordinates?.lng);
      const bounds = L.latLngBounds([]);

      validActivities.forEach(activity => {
        if (!activity.coordinates) return;
        const { lat, lng } = activity.coordinates;
        
        const color = getCategoryColor(activity.category);
        const iconHtml = renderToString(getCategoryIcon(activity.category));
        
        const customIcon = L.divIcon({
          className: 'custom-marker-icon',
          html: `
            <div class="marker-pin" style="background-color: ${color}">
               <div class="marker-content text-white">${iconHtml}</div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -35]
        });

        const marker = L.marker([lat, lng], { icon: customIcon })
          .bindPopup(`
            <div class="font-sans">
              <h3 class="font-bold text-stone-800 text-sm mb-1">${activity.name}</h3>
              <p class="text-xs text-stone-500 mb-2">${activity.location}</p>
              <div class="flex items-center gap-2">
                 <span class="text-xs font-bold text-white px-2 py-0.5 rounded-full" style="background-color: ${color}">${activity.category}</span>
                 ${activity.cost > 0 ? `<span class="text-xs font-bold text-stone-600">$${activity.cost}</span>` : ''}
              </div>
            </div>
          `);
        
        markersRef.current.addLayer(marker);
        bounds.extend([lat, lng]);
      });

      // Fit bounds if we have points
      if (validActivities.length > 0) {
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }

    // Cleanup on unmount
    return () => {
       // We usually don't destroy the map in React unless absolutely necessary to avoid re-init issues
       // But for strict cleanup:
       // if (mapRef.current) {
       //   mapRef.current.remove();
       //   mapRef.current = null;
       // }
    };
  }, [activities]);

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-sm border border-stone-100 z-0">
      <div ref={mapContainerRef} className="w-full h-full" style={{ zIndex: 0 }} />
      
      {/* Legend Overlay */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-stone-100 z-[400] text-xs">
         <h4 className="font-bold text-stone-800 mb-2 px-1">Legend</h4>
         <div className="space-y-1.5">
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background: '#d4a373'}}></div><span>Food & Dining</span></div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background: '#6d9c7e'}}></div><span>Adventure</span></div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background: '#8b5cf6'}}></div><span>Culture</span></div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background: '#0ea5e9'}}></div><span>Relaxation</span></div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background: '#64748b'}}></div><span>Transit</span></div>
         </div>
      </div>
    </div>
  );
};