package com.example.jpahello.entity;
import com.example.jpahello.request.TeamRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.stat.Statistics;

import javax.persistence.*;

@Entity
@Table(name="teams")
@Getter
@Setter
@NoArgsConstructor
public class Team {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="team_name", nullable = false)
    private String teamName;
    @Column(name="manager_name", nullable = false)
    private String managerName;
    @Column(name="color", nullable = false)
    private String color;
    @Column(name="second_color", nullable = false)
    private String secondColor;
    @Column(name="flag_url", nullable = false)
    private String flagUrl;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    private Stats statistics;

    public Team(TeamRequest teamRequest)
    {
        teamName=teamRequest.getTeamName();
        managerName = teamRequest.getManagerName();
        color = teamRequest.getColor();
        secondColor=teamRequest.getSecondColor();
        flagUrl=teamRequest.getFlagUrl();
        statistics = new Stats(teamRequest.getStatistic()) {
        };
    }

}
