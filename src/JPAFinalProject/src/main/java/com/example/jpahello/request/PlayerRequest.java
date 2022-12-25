package com.example.jpahello.request;

import com.example.jpahello.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class PlayerRequest {

    @NotBlank
    private String fullName;
    @NotBlank
    private String position;
    @NotBlank
    private String imageUrl;
    @NotNull
    private Integer age;
    @NotBlank
    private String story;
    @NotNull
    @Valid
    private Team team;

}
