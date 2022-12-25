package com.example.jpahello.entity;

import com.example.jpahello.request.StatRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "stats")
public class Stats {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private int goals;
    @Column(nullable = false)
    private int trophies;


    public Stats(StatRequest statRequest)
    {
        goals = statRequest.getGoals();
        trophies = statRequest.getTrophies();

    }
}
