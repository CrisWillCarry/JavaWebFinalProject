package com.example.jpahello.response;

import com.example.jpahello.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeamResponse {
    private long id;
    private String teamName;

    private String managerName;

    private String color;

    private String secondColor;

    private String flagUrl;



    private StatResponse stat;
    public TeamResponse(Team team){
        id = team.getId();
        teamName = team.getTeamName();
        managerName = team.getManagerName();
        color = team.getColor();
        secondColor=team.getSecondColor();
        flagUrl=team.getFlagUrl();

        stat = new StatResponse(team.getStatistics());
    }
}
