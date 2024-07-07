package com.campaign.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CampaignDTO {

    private String CampaignName;

    private Long bidAmount;

    private List<String> keywords;

    private Long campaignFund;

    private Boolean status;

    private String Town;

    private Long radius;
}
