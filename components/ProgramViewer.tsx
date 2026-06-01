import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, X, Download } from 'lucide-react';

interface ProgramViewerProps {
  imageUrl: string;
  destination: string;
  isFullscreen?: boolean;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

const getAssetUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${cleanUrl}`;
};

export const ProgramViewer: React.FC<ProgramViewerProps> = ({ 
  imageUrl, 
  destination,
  isFullscreen: controlledIsFullscreen,
  onFullscreenChange
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [localIsFullscreen, setLocalIsFullscreen] = useState<boolean>(false);
  
  const isFullscreen = controlledIsFullscreen !== undefined ? controlledIsFullscreen : localIsFullscreen;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset zoom & pan when image url changes or fullscreen toggles
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [imageUrl, isFullscreen]);

  // Handle active wheel zooming with e.preventDefault() (requires non-passive listener)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = 1.15;
      setZoom((prevZoom) => {
        let nextZoom = prevZoom;
        if (e.deltaY < 0) {
          nextZoom = Math.min(prevZoom * zoomFactor, 5);
        } else {
          nextZoom = Math.max(prevZoom / zoomFactor, 1);
        }
        
        // Reset pan if zoomed out to 1
        if (nextZoom === 1) {
          setPan({ x: 0, y: 0 });
        }
        return nextZoom;
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom === 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || zoom === 1) return;
    e.preventDefault();
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (zoom === 1 || !e.touches[0]) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || zoom === 1 || !e.touches[0]) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom button triggers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const nextVal = !isFullscreen;
    if (onFullscreenChange) {
      onFullscreenChange(nextVal);
    }
    setLocalIsFullscreen(nextVal);
  };

  // Render zoom overlay controls
  const renderControls = () => (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/80 flex items-center gap-4 z-[210] transition-all hover:scale-[1.02] duration-200 select-none">
      <button
        onClick={handleZoomOut}
        disabled={zoom === 1}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        title="Zoom Out"
      >
        <ZoomOut size={16} />
      </button>

      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 min-w-[45px] text-center">
        {Math.round(zoom * 100)}%
      </span>

      <button
        onClick={handleZoomIn}
        disabled={zoom >= 5}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        title="Zoom In"
      >
        <ZoomIn size={16} />
      </button>

      <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800" />

      <button
        onClick={handleReset}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
        title="Reset Zoom"
      >
        <RotateCcw size={16} />
      </button>

      <button
        onClick={toggleFullscreen}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewer"}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );

  const viewerContent = (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full overflow-hidden select-none bg-slate-900/5 dark:bg-slate-950/20 flex items-center justify-center transition-all ${
        isFullscreen 
          ? 'h-full w-full' 
          : 'h-[500px] md:h-[650px] rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-inner'
      }`}
      style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
    >
      {/* Scrollable container when zoom = 1 for natural vertical scanning of infographics */}
      <div 
        className={`w-full h-full flex justify-center items-start p-4 ${
          zoom === 1 ? 'overflow-y-auto' : 'overflow-hidden'
        }`}
      >
        <img
          ref={imageRef}
          src={getAssetUrl(imageUrl)}
          alt={`${destination} program guide`}
          className={`max-w-full shadow-lg pointer-events-none transition-transform duration-300 rounded-2xl ${
            zoom === 1 
              ? 'h-auto object-contain max-w-2xl mt-2 mb-20' 
              : 'object-none'
          }`}
          style={{
            transform: zoom > 1 ? `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` : 'none',
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            maxHeight: zoom === 1 ? 'none' : '2200px',
          }}
        />
      </div>

      {renderControls()}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[150] bg-slate-950/98 backdrop-blur-xl flex flex-col animate-fade-in select-none">
        {/* Fullscreen Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md z-[160]">
          <div>
            <h3 className="font-display font-extrabold text-lg text-white">{destination} – Trip Program</h3>
            <p className="text-xs text-slate-400">Detailed Day-by-Day Travel Guide</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={getAssetUrl(imageUrl)}
              download={`${destination.replace(/\s+/g, '_')}_itinerary.png`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl transition-all border border-slate-800"
            >
              <Download size={13} />
              Save Image
            </a>
            <button
              onClick={toggleFullscreen}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition-colors"
              title="Close Fullscreen"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Fullscreen Body */}
        <div className="flex-1 w-full h-full relative overflow-hidden">
          {viewerContent}
        </div>
      </div>
    );
  }

  return viewerContent;
};
