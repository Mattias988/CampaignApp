package com.campaign.DTOs;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class CampaignDTO {

    @NotBlank
    private String CampaignName;

    @NotNull
    private Long bidAmount;

    @NotBlank
    private List<String> keywords;

    @NotNull
    private Long campaignFund;

    @NotBlank
    private Boolean status;

    @NotBlank
    private String Town;

    @NotNull
    private Long radius;
}
