import React, { useState } from 'react';
import { organisms } from './organismsdata';
import OrganismCard from './organisms';

function Org() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(Object.keys(organisms))];

  const getFilteredOrganisms = () => {
    if (selectedCategory === 'all') {
      return Object.values(organisms).flat();
    }
    return organisms[selectedCategory] || [];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Organism Encyclopedia
        </h1>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Organism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredOrganisms().map((organism) => (
            <OrganismCard key={organism.id} organism={organism} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Org;