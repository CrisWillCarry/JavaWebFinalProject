package com.example.jpahello.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatRequest {
    @NotNull
    private Integer goals;
    @NotNull
    private Integer trophies;

}
