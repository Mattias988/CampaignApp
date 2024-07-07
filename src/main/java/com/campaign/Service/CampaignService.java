package com.campaign.Service;

import com.campaign.DTOs.CampaignDTO;
import com.campaign.Entity.Campaign;
import com.campaign.Repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    public Campaign addCampaign(@Valid Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Campaign getCampaign(Long campaignId) {
        return campaignRepository.findById(campaignId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found with id:" + campaignId));
    }

    public Campaign deleteCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found with id:" + campaignId));;
        campaignRepository.delete(campaign);
        return null;
    }

    public Campaign updateCampaign(Long campaignId, CampaignDTO campaignDTO) {
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot found campaign with id:" + campaignId));
        campaign.setCampaignFund(campaignDTO.getCampaignFund());
        campaign.setCampaignName(campaignDTO.getCampaignName());
        campaign.setRadius(campaignDTO.getRadius());
        campaign.setBidAmount(campaignDTO.getBidAmount());
        campaign.setTown(campaignDTO.getTown());
        campaign.setStatus(campaignDTO.getStatus());
        campaign.setKeywords(campaignDTO.getKeywords());
        return null;
    }
}
