// InteractiveGlobe.jsx
import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './InteractiveGlobe.css';
import pinImage from '../assets/icons/pin.png';
import homeIcon from '../assets/icons/home-icon.png';
import closeIcon from '../assets/icons/x.png';
import AutoScrollGallery from './AutoScrollGallery';

const importAll = r => r.keys().map(r);
const sfImages      = importAll(require.context('../assets/globe/sanfrancisco', false, /\.(png|jpe?g|svg)$/));
const laImages      = importAll(require.context('../assets/globe/losangeles',    false, /\.(png|jpe?g|svg)$/));
const seattleImages = importAll(require.context('../assets/globe/seattle',       false, /\.(png|jpe?g|JPG|svg)$/));
const parisImages   = importAll(require.context('../assets/globe/paris',         false, /\.(png|jpe?g|svg)$/));

export default function InteractiveGlobe({ className, onPhotoClick }) {
  const globeContainerRef = useRef(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [locationImages,  setLocationImages]  = useState([]);

  // map clicked feature → images
  useEffect(() => {
    if (!selectedFeature) return setLocationImages([]);
    const name = selectedFeature.name.toLowerCase();
    let imgs = [];
    if (name.includes('san francisco')) imgs = sfImages;
    else if (name.includes('los angeles'))  imgs = laImages;
    else if (name.includes('seattle'))      imgs = seattleImages;
    else if (name.includes('paris'))        imgs = parisImages;
    setLocationImages(imgs);
  }, [selectedFeature]);

  // build Esri globe
  useEffect(() => {
    window.require([
      'esri/Map', 'esri/views/SceneView', 'esri/layers/TileLayer',
      'esri/layers/GeoJSONLayer','esri/Basemap'
    ], (Map, SceneView, TileLayer, GeoJSONLayer, Basemap) => {
      const basemap = new Basemap({ baseLayers: [ new TileLayer({ url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer' }) ] });
      const map     = new Map({ basemap });
      const view = new SceneView({
                  container: globeContainerRef.current,
                  map: map,
                  alphaCompositingEnabled: true,
                  qualityProfile: "high",
                  camera: {
                    position: [-100.2437, 37.0522, 15000000]
                  },
                  environment: {
                    background: { type: "color", color: [244, 244, 244, 0] },
                    starsEnabled: false,
                    atmosphereEnabled: true
                  },
                  constraints: {
                    altitude: { min: 100000, max: 15000000 }
                  },
                  popup: {
                    dockEnabled: true,
                    dockOptions: {
                      position: "top-right",
                      breakpoint: false,
                      buttonEnabled: false
                    },
                    collapseEnabled: false
                  },
                  highlightOptions: {
                    color: [255, 255, 255],
                    haloOpacity: 0.5
                  }
                });
      view.ui.empty('top-left');

      const uniqueRenderer = { type: 'unique-value', field: 'name', defaultSymbol: { type: 'point-3d', symbolLayers: [{ type: 'icon', resource: { href: pinImage }, size: 30 }] },
        uniqueValueInfos: [
          { value: 'Singapore',   symbol: { type: 'point-3d', symbolLayers:[{ type:'icon', resource:{href:homeIcon}, size:30 }] } },
          { value: 'Los Angeles', symbol: { type: 'point-3d', symbolLayers:[{ type:'icon', resource:{href:homeIcon}, size:30 }] } }
        ]
      };

      const geoLayer = new GeoJSONLayer({ url:'/visits.geojson', outFields:['*'], elevationInfo:{ mode:'absolute-height', offset:0 }, renderer: uniqueRenderer });
      map.layers.add(geoLayer);

      view.on('click', evt => {
        view.hitTest(evt).then(({ results }) => {
          const g = results.find(r => r.graphic)?.graphic;
          if (g?.attributes) {
            setSelectedFeature({
              name:        g.attributes.name,
              description: g.attributes.description,
              fact:        g.attributes.fact,
              visit:       g.attributes.visit
            });
            onPhotoClick?.(g.attributes);
          }
        });
      });
    });
  }, []);

  

  return (
    <>
      <div className={className || 'globe-wrapper'}>
        <div id="viewDiv" ref={globeContainerRef}></div>
      </div>

      {selectedFeature && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedFeature(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="global-close-btn" onClick={() => setSelectedFeature(null)}>
              <img src={closeIcon} alt="Close" />
            </button>
            <h2>{selectedFeature.name}</h2>
            {selectedFeature.description && <p>{selectedFeature.description}</p>}
            {selectedFeature.visit       && <p>{selectedFeature.visit}</p>}
            {selectedFeature.fact        && <p><em>{selectedFeature.fact}</em></p>}
            {locationImages.length
              ? <AutoScrollGallery images={locationImages} />
              : <p className="no-images-message">No photos found for this spot.</p>
            }
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
