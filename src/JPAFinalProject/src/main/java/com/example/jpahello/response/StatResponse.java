package com.example.jpahello.response;

import com.example.jpahello.entity.Stats;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatResponse {
    private Integer goals;
    private Integer trophies;

    public StatResponse(Stats stats){
        goals = stats.getGoals();
        trophies = stats.getTrophies();
    }
}
