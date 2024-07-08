import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const CampaignCard = ({ campaign, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(campaign.campaignId);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-xl font-bold">{campaign.campaignName}</h2>
      <p>Bid Amount: {campaign.bidAmount} zł</p>
      <p>Campaign Fund: {campaign.campaignFund} zł</p>
      <p>Radius: {campaign.radius} km</p>
      <p>Town: {campaign.town}</p>
      <p>Keywords: {campaign.keywords.join(', ')}</p>
      <p>Status: {campaign.status ? "Active" : "Inactive"}</p>
      <div className="flex space-x-2 mt-4">
        <button 
          onClick={() => onEdit(campaign)} 
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          <img src='/edit.svg' alt='Edit campaign' width="24px" height="24px" className=''/>
        </button>
        <button 
          onClick={handleDeleteClick} 
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          <img src='/delete.svg' alt='Delete campaign' width="24px" height="24px" />
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the campaign "${campaign.campaignName}"?`}
      />
    </div>
  );
}

export default CampaignCard;
