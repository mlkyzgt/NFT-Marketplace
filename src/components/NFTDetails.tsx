// components/NFTDetails.tsx
"use client"
import React from 'react';

interface NFTProps {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

const NFTDetails: React.FC<NFTProps> = ({ name, description, image, attributes }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">{name}</h2>
        <img src={image} alt={name} className="mb-4 rounded-lg" style={{ maxWidth: '100%' }} />
        <p className="text-gray-700 mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {attributes.map((attribute, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-2">{attribute.trait_type}</h3>
              <p className="text-gray-700">{attribute.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
