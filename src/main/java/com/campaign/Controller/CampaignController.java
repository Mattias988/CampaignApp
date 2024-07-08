package com.campaign.Controller;

import com.campaign.DTOs.CampaignDTO;
import com.campaign.Entity.Campaign;
import com.campaign.Service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/campaign")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping
    public ResponseEntity<Campaign> addCampaign(@Valid @RequestBody Campaign campaign) {
        Campaign newCampaign = campaignService.addCampaign(campaign);
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
    public ResponseEntity<Campaign> updateCampaign(@PathVariable Long campaignId, @Valid @RequestBody CampaignDTO campaignDTO) {
        Campaign campaign = campaignService.updateCampaign(campaignId, campaignDTO);
        return new ResponseEntity<>(campaign, HttpStatus.OK);
    }

    //Exception handler for easier error management and easier operation on the frontend
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}