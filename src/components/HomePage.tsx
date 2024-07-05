import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const numberOfNFTs = 10;
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const simulatedData = Array.from({ length: numberOfNFTs }).map((_, index) => ({
          id: index + 1,
          imageUrl: `https://ivory-accurate-prawn-544.mypinata.cloud/ipfs/QmXgcG3LbukSX6ZVNsowzqof2VvekmszpfTELyarEXAB8z/${index + 1}.png`,
          name: `Sepolia NFT #${index + 1}`,
          description: 'A randomly generated unique Sepolia face.',
          price: Math.floor(Math.random() * 100) + 1,
        }));

        setNfts(simulatedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [numberOfNFTs]);

  const sortByPrice = () => {
    const sortedNfts = [...nfts].sort((a, b) => {
      if (sortByPriceAsc) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setNfts(sortedNfts);
    setSortByPriceAsc(!sortByPriceAsc);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredNfts = [...nfts].filter((nft) =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === 'lowToHigh') {
    filteredNfts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'highToLow') {
    filteredNfts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Welcome to Sepolia NFT Marketplace!</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
            className="px-2 py-1 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {loading ? (
          <p className="text-gray-600">Loading NFTs...</p>
        ) : filteredNfts.length === 0 ? (
          <p className="text-gray-600">No NFTs found.</p>
        ) : (
          filteredNfts.map((nft) => (
            <div key={nft.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img
                src={nft.imageUrl}
                alt={`Sepolia NFT #${nft.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{nft.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{nft.description}</p>
                <p className="text-sm text-gray-600 mb-2">{`Price: ${nft.price} USD`}</p>
                <Link
                  to={`/nft-details/${nft.id}`}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
