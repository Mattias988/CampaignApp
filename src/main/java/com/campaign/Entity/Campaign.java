package com.campaign.Entity;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long campaignId;

    @NotBlank(message = "Campaign name cannot be blank!")
    private String campaignName;

    @ElementCollection
    @NotNull
    @NotBlank
    private List<String> keywords;

    @NotNull(message = "Bid amount must be higher than zero!")
    private Long bidAmount;

    @NotNull
    private Long campaignFund;

    @NotEmpty
    private Boolean status;

    @NotBlank
    private String town;

    @NotNull
    private Long radius;
}
