import React, { useState } from 'react';
import PartsViewer from './PartsViewer';
import Notes from './Notes';

const OrganismCard = ({ organism }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showPartsViewer, setShowPartsViewer] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img 
            src={organism.image} 
            alt={organism.name}
            className="w-full h-48 object-cover cursor-pointer transition-transform hover:scale-105"
            onClick={() => setShowPartsViewer(true)}
          />
          <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            Click to view parts
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{organism.name}</h3>
          <p className="text-gray-600 mb-2">{organism.shortDesc}</p>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {showDetails ? 'Show Less' : 'Learn More'}
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              {showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>
          </div>

          {showDetails && (
            <div className="mt-4">
              <p className="text-gray-700 mb-4">{organism.fullDesc}</p>
            </div>
          )}

          {showNotes && (
            <Notes organismId={organism.id} />
          )}
        </div>
      </div>

      {showPartsViewer && (
        <PartsViewer 
          organism={organism} 
          onClose={() => setShowPartsViewer(false)} 
        />
      )}
    </>
  );
};

export default OrganismCard;