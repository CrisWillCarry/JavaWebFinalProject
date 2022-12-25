package com.example.jpahello.service;


import com.example.jpahello.entity.Player;
import com.example.jpahello.entity.Team;
import com.example.jpahello.exception.ResourceNotFoundException;
import com.example.jpahello.repository.PlayerRepository;
import com.example.jpahello.repository.TeamRepository;
import com.example.jpahello.request.PlayerRequest;
import com.example.jpahello.request.TeamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    PlayerRepository playerRepository;

    public Player addPlayer(long team_id, PlayerRequest playerRequest){
        Team team =  teamRepository.findById(team_id).orElseThrow(
                ()->new ResourceNotFoundException("team id is not found"));

        Player playerToBeSaved = new Player(playerRequest);
        playerToBeSaved.setTeam(team);

        return playerRepository.save(playerToBeSaved);
    }

    public List<Player> getAllPlayers(long teamId){
        return playerRepository.findAllByTeamId(teamId);
    }
    public void deleteAllPlayers(long teamId){
        if(teamRepository.existsById(teamId)){
            playerRepository.deleteAllByTeamId(teamId);
        }
        else{
            throw new ResourceNotFoundException("team id not found");
        }
    }
    public List<Team> getAllTeams(String teamNameParam){
        if(teamNameParam == null || teamNameParam.isBlank())
            return (List<Team>) teamRepository.findAll();


        return teamRepository.findAllByTeamNameIgnoreCase(teamNameParam);
    }

    public Team addTeam(TeamRequest teamRequest)
    {
        Team team = new Team(teamRequest);

        return teamRepository.save(team);
    }

    public Team updateTeam(long teamId, TeamRequest teamRequest)
    {
        teamRepository.findById(teamId)
                .orElseThrow(()->new ResourceNotFoundException("team id is not found"));

        Team teamToBeUpdated = new Team(teamRequest);
        teamToBeUpdated.setId(teamId);

        return teamRepository.save(teamToBeUpdated);

    }

    public void deleteTeam(long teamId){
        if(teamRepository.existsById(teamId)){
            teamRepository.deleteById(teamId);
        }
        else{
            throw new ResourceNotFoundException("team id not found");
        }
    }
}
