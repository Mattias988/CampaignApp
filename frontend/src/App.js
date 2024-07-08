import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CampaignList from './components/CampaignList';
import Modal from './components/Modal';
import { getAllCampaigns, createCampaign, updateCampaign, deleteCampaign } from './api';
import { Helmet } from 'react-helmet';

const App = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await getAllCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    }
  };

  const handleAddCampaign = async (newCampaign) => {
    try {
      await createCampaign(newCampaign);
      fetchCampaigns();
      setKeywords(newCampaign.keywords);
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  const handleUpdateCampaign = async (campaignId, updatedCampaign) => {
    try {
      await updateCampaign(campaignId, updatedCampaign);
      fetchCampaigns();
      setKeywords(updatedCampaign.keywords);
    } catch (error) {
      console.error('Failed to update campaign:', error);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      await deleteCampaign(campaignId);
      fetchCampaigns();
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleSaveCampaign = async (campaign) => {
    if (selectedCampaign) {
      await handleUpdateCampaign(selectedCampaign.campaignId, campaign);
    } else {
      await handleAddCampaign(campaign);
    }
    setSelectedCampaign(null);
    setIsModalOpen(false);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <meta name="keywords" content={keywords.join(', ')} />
      </Helmet>
      <Header 
        onAddCampaign={() => {
          setSelectedCampaign(null);
          setIsModalOpen(true);
        }} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <CampaignList 
        campaigns={filteredCampaigns} 
        onDelete={handleDeleteCampaign} 
        onEdit={handleEditCampaign} 
      />
      {isModalOpen && 
        <Modal 
          onClose={() => {
            setSelectedCampaign(null);
            setIsModalOpen(false);
          }} 
          onSave={handleSaveCampaign} 
          campaign={selectedCampaign}
        />
      }
    </div>
  );
}

export default App;
