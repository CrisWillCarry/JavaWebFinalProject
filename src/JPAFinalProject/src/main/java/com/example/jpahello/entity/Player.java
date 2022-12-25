package com.example.jpahello.entity;


import com.example.jpahello.request.PlayerRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "players")
@Getter
@Setter
@NoArgsConstructor
public class Player {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String fullName;
    @Column(nullable = false)
    private String position;
    @Column(nullable = false)
    private Integer age;
    @Column(nullable = false)
    private String story;
    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="team_id")
    private Team team;

    public Player(PlayerRequest playerRequest){
        fullName = playerRequest.getFullName();
        position = playerRequest.getPosition();
        imageUrl= playerRequest.getImageUrl();
        age=playerRequest.getAge();
        story=playerRequest.getStory();
        team=playerRequest.getTeam();
    }

}
