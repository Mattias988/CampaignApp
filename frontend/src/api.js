const API_BASE_URL = 'http://localhost:8080/api/campaign';

export const getAllCampaigns = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }
  return response.json();
};

export const createCampaign = async (campaign) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaign),
  });
  if (!response.ok) {
    throw new Error('Failed to create campaign');
  }
  return response.json();
};

export const getCampaign = async (campaignId) => {
  const response = await fetch(`${API_BASE_URL}/${campaignId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch campaign with id: ${campaignId}`);
  }
  return response.json();
};

export const updateCampaign = async (campaignId, campaign) => {
  const response = await fetch(`${API_BASE_URL}/${campaignId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaign),
  });
  if (!response.ok) {
    throw new Error(`Failed to update campaign with id: ${campaignId}`);
  }
  return response.json();
};

export const deleteCampaign = async (campaignId) => {
  const response = await fetch(`${API_BASE_URL}/${campaignId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete campaign with id: ${campaignId}`);
  }
};
