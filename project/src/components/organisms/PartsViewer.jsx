import React, { useState } from 'react';

const PartsViewer = ({ organism, onClose }) => {
  const [selectedPartIndex, setSelectedPartIndex] = useState(0);
  const selectedPart = organism.parts[selectedPartIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{organism.name} - Anatomy</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Image */}
            <div>
              <img
                src={selectedPart.image}
                alt={selectedPart.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Part Details */}
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedPart.name}</h3>
              <p className="text-gray-700 mb-4">{selectedPart.description}</p>

              {/* Part Navigation */}
              <div className="flex flex-wrap gap-2">
                {organism.parts.map((part, index) => (
                  <button
                    key={part.name}
                    onClick={() => setSelectedPartIndex(index)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedPartIndex === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {part.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsViewer;