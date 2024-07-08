package com.campaign.DTOs;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.*;
import java.util.List;

@Getter
@Setter
public class CampaignDTO {

    @NotBlank(message = "Campaign name cannot be blank!")
    @Pattern(regexp = "^[A-Za-z0-9 ]{1,20}$", message = "Campaign name must be up to 20 alphanumeric characters")
    private String campaignName;

    @NotNull(message = "Keywords cannot be null")
    @NotEmpty(message = "Keywords cannot be empty")
    @Size(max = 10, message = "Keywords cannot contain more than 10 words")
    private List<@Pattern(regexp = "^[A-Za-z]+$", message = "Keywords must contain only letters") String> keywords;

    @NotNull(message = "Bid amount must be higher than zero!")
    @Min(value = 0, message = "Bid amount must be higher than zero")
    @Max(value = 1000000, message = "Bid amount must not exceed 1,000,000")
    private Long bidAmount;

    @NotNull(message = "Campaign fund must be higher than zero")
    @Min(value = 0, message = "Campaign fund must be higher than zero")
    @Max(value = 1000000, message = "Campaign fund must not exceed 1,000,000")
    private Long campaignFund;

    @NotNull(message = "Status cannot be null")
    private Boolean status;

    @NotBlank(message = "Town cannot be blank")
    @Pattern(regexp = "^[A-Za-z\\s\\p{IsLatin}]+$", message = "Town must contain only Latin letters")
    private String town;

    @NotNull(message = "Radius must be higher than zero")
    @Min(value = 0, message = "Radius must be higher than zero")
    @Max(value = 40075, message = "Radius must not exceed the Earth's circumference (40075 km)")
    private Long radius;
}