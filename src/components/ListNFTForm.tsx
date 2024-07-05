import React, { useState } from 'react';

interface ListNFTFormProps {
  tokenId: number;
  contractAddress: string;
  listNFT: (tokenId: number, price: number) => Promise<void>;
}

const ListNFTForm: React.FC<ListNFTFormProps> = ({ tokenId, contractAddress, listNFT }) => {
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await listNFT(tokenId, price);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (ETH)
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        List NFT
      </button>
    </form>
  );
};

export default ListNFTForm;
