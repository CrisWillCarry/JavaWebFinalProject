package com.example.jpahello.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class TeamRequest {
    @NotBlank
    private String teamName;
    @NotBlank
    private String managerName;
    @NotBlank
    private String color;
    @NotBlank
    private String secondColor;
    @NotBlank
    private String flagUrl;
    @NotNull
    @Valid
    private StatRequest statistic;

}
