import { useRef, useState } from 'react';
import { Rotate3d, Maximize2, Minimize2, Camera, Layers } from 'lucide-react';

// Free 3D models mapped by product category/brand
const modelMap = {
  'Apple': 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
  'Meta': 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
  'Microsoft': 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
  'Sony': 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
  'default': 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
};

export default function ThreeDViewer({ product }) {
  const viewerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAR, setIsAR] = useState(false);

  const modelUrl = modelMap[product?.brand] || modelMap['default'];

  const toggleFullscreen = () => {
    const el = viewerRef.current?.closest('.viewer-container');
    if (!document.fullscreenElement) {
      el?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const activateAR = async () => {
    const viewer = viewerRef.current;
    if (viewer && viewer.canActivateAR) {
      try {
        await viewer.activateAR();
        setIsAR(true);
      } catch (e) {
        console.log('AR activation failed:', e);
      }
    }
  };

  return (
    <div className="viewer-container">
      <div className="glass rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-primary-400" />
            <span className="text-white text-sm font-medium">3D Interactive View</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={toggleFullscreen}
              className="p-2 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors"
              title="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="relative bg-gradient-to-b from-dark-700 to-dark-800" style={{ height: '400px' }}>
          <model-viewer
            ref={viewerRef}
            src={modelUrl}
            alt={`3D view of ${product?.productName}`}
            auto-rotate
            camera-controls
            touch-action="pan-y"
            shadow-intensity="1"
            shadow-softness="0.5"
            exposure="1"
            environment-image="neutral"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
          >
            {/* AR Button - only shown on supported devices */}
            <button
              slot="ar-button"
              onClick={activateAR}
              className="absolute bottom-4 right-4 flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium shadow-lg transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>View in Your Space</span>
            </button>
          </model-viewer>

          {/* Overlay controls */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1.5 bg-dark-700/90 backdrop-blur-sm rounded-lg">
              <Rotate3d className="w-3 h-3 text-primary-400" />
              <span className="text-xs text-dark-200">Drag to rotate</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-dark-300">
            <span>🖱️ Scroll to zoom</span>
            <span>📱 Touch to rotate</span>
          </div>
          <span className="text-xs text-primary-400 font-medium">Powered by model-viewer</span>
        </div>
      </div>
    </div>
  );
}
