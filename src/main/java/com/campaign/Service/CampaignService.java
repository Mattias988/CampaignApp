package com.campaign.Service;

import com.campaign.DTOs.CampaignDTO;
import com.campaign.Entity.Campaign;
import com.campaign.Repository.CampaignRepository;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public Campaign addCampaign(CampaignDTO campaignDTO) {
        Campaign campaign = objectMapper.convertValue(campaignDTO, Campaign.class);
        try {
            return campaignRepository.save(campaign);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Campaign name must be unique");
        }
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

    public Campaign updateCampaign(Long campaignId, CampaignDTO campaignDTO) throws JsonMappingException {
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find campaign with id: " + campaignId));

        objectMapper.updateValue(campaign, campaignDTO);

        return campaignRepository.save(campaign);
    }
}
