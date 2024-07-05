"use client"
import { WagmiProvider } from 'wagmi'
import { config } from '../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import NFTDetailsPage from '../components/NFTDetailsPage';
const App = () => {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nft-details/:id" element={<NFTDetailsPage />} />
      </Routes>
    </Router>
    </QueryClientProvider>
    </WagmiProvider>

  );
};


export default App;
