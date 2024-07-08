import React from 'react';
import CampaignCard from './CampaignCard';

const CampaignList = ({ campaigns, onDelete, onEdit }) => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map(campaign => (
        <CampaignCard 
          key={campaign.id} 
          campaign={campaign} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
}

export default CampaignList;
