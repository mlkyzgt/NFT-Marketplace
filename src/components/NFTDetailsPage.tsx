import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { writeContract } from '@wagmi/core';
import NFTAbi from '../contracts/EmojiFaces.json';
import { config } from '../config';
import { injected } from '@wagmi/connectors'

const NFTDetailsPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [nft, setNft] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState<number>(0); // State for price
  const account = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const contractAddress = "0x5D3bbE63e8aF59BbC6C3A4b69a30D906e2AC5967";

  useEffect(() => {
    const fetchNFTDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`https://ivory-accurate-prawn-544.mypinata.cloud/ipfs/QmZEhb9gLdVJeSg1mkff9NhoXpYFjsLy9R26ysV2Z4Vq2L/${id}.json`);
        const data = await response.json();
        setNft(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFT details:', error);
        setLoading(false);
      }
    };

    fetchNFTDetails();
  }, [id]);

  const listNFT = async (tokenId: number, price: number) => {
    try {
      const result = await writeContract(config, {
        abi: NFTAbi,
        address: contractAddress,
        functionName: "listNFT",
        args: [tokenId, price],
      });

      console.log("List NFT result:", result);

    } catch (error) {
      console.error('Failed to list NFT:', error);
      alert('Failed to list NFT. Please try again.');
    }
  };

  const unlistNFT = async (tokenId: number) => {
    try {
      const result = await writeContract(config, {
        abi: NFTAbi,
        address: contractAddress,
        functionName: "unlistNFT",
        args: [tokenId],
      });

      console.log("Unlist NFT result:", result);

    } catch (error) {
      console.error('Failed to unlist NFT:', error);
      alert('Failed to unlist NFT. Please try again.');
    }
  };

  const handleListNFT = async () => {
    if (!nft) return; 
    await listNFT(parseInt(id!), price); 
  };

  const handleUnlistNFT = async () => {
    if (!nft) return; 
    await unlistNFT(parseInt(id!));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!nft) {
    return <p>NFT not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="max-w-md">
          <img src={nft.image} alt={`NFT ${nft.edition}`} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{nft.name}</h1>
          <p className="text-lg text-gray-600 mb-6">Description: {nft.description}</p>
          <div className="mb-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Edition:</span> {nft.edition}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Date:</span> {new Date(nft.date).toLocaleString()}
            </p>
            <div className="mt-2">
              <h2 className="text-xl font-semibold mb-2">Attributes</h2>
              <ul className="list-disc list-inside">
                {nft.attributes.map((attribute: any, index: number) => (
                  <li key={index}>{`${attribute.trait_type}: ${attribute.value}`}</li>
                ))}
              </ul>
            </div>
          </div>
          {account.status === "connected" ? (
            <>
              <div className="flex items-center">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
                <button className="text-white bg-blue-500 rounded-md hover:bg-blue-700 px-4 py-2 ml-3" onClick={handleListNFT}>
                  List NFT
                </button>
                <button className="text-white bg-red-500 rounded-md hover:bg-red-700 px-4 py-2 ml-3" onClick={handleUnlistNFT}>
                  Unlist NFT
                </button>
              </div>
              <button className="text-white bg-blue-500 rounded-md hover:bg-blue-700 px-4 py-2 mt-3" onClick={() => disconnect()}>
                Disconnect Wallet
              </button>
            </>
          ) : (
            <button className="text-white bg-blue-500 rounded-md hover:bg-blue-700 px-4 py-2" onClick={() => connect({ connector: injected() })}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTDetailsPage;
