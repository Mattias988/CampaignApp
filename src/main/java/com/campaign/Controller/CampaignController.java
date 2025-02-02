package com.campaign.Controller;

import com.campaign.DTOs.CampaignDTO;
import com.campaign.Entity.Campaign;
import com.campaign.Service.CampaignService;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/campaign")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping
    public ResponseEntity<Campaign> addCampaign(@Valid @RequestBody CampaignDTO campaignDTO) {
        Campaign newCampaign = campaignService.addCampaign(campaignDTO);
        return new ResponseEntity<>(newCampaign, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        List<Campaign> campaignList = campaignService.getAllCampaigns();
        return new ResponseEntity<>(campaignList, HttpStatus.OK);
    }

    @GetMapping("/{campaignId}")
    public ResponseEntity<Campaign> getCampaign(@PathVariable Long campaignId) {
        Campaign campaign = campaignService.getCampaign(campaignId);
        return new ResponseEntity<>(campaign, HttpStatus.OK);
    }

    @DeleteMapping("/{campaignId}")
    public ResponseEntity<Campaign> deleteCampaign(@PathVariable Long campaignId) {
        Campaign campaign = campaignService.deleteCampaign(campaignId);
        return new ResponseEntity<>(campaign, HttpStatus.OK);
    }

    @PutMapping("/{campaignId}")
    public ResponseEntity<Campaign> updateCampaign(@PathVariable Long campaignId, @Valid @RequestBody CampaignDTO campaignDTO) throws JsonMappingException {
        Campaign campaign = campaignService.updateCampaign(campaignId, campaignDTO);
        return new ResponseEntity<>(campaign, HttpStatus.OK);
    }


}