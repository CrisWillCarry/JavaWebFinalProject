package com.example.jpahello.controller;

import com.example.jpahello.entity.Player;
import com.example.jpahello.entity.Team;
import com.example.jpahello.request.PlayerRequest;
import com.example.jpahello.request.TeamRequest;
import com.example.jpahello.response.PlayerResponse;
import com.example.jpahello.response.TeamResponse;
import com.example.jpahello.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/teams")
public class TeamController {
    @Autowired
    TeamService teamService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{team_id}/players")
    public PlayerResponse addPlayers(
            @PathVariable long team_id,
            @Valid @RequestBody PlayerRequest playerRequest
            ){
        return new PlayerResponse(teamService.addPlayer(team_id, playerRequest));
    }

    @GetMapping("/{teamId}/players")
    public List<PlayerResponse> getAllPlayers(@PathVariable long teamId){
        List<Player> players = teamService.getAllPlayers(teamId);
        List<PlayerResponse> playerResponses = new ArrayList<>();
        for(int i=0; i < players.size(); i++){
            playerResponses.add(new PlayerResponse(players.get(i)));
        }

        return playerResponses;
    }

    @DeleteMapping("/{teamId}/players")
    public void deleteAllPlayers(@PathVariable long teamId){
        teamService.deleteAllPlayers(teamId);
    }
    @GetMapping()
    public List<TeamResponse> getAllTeams(@RequestParam(required = false) String teamName){
        
        List<Team> teams = teamService.getAllTeams(teamName);
        List<TeamResponse> teamResponses = new ArrayList<>();
        teams.forEach(team -> {
            TeamResponse teamResponse = new TeamResponse(team);
            teamResponses.add(teamResponse);
        });
        return teamResponses;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public TeamResponse addTeam(@Valid @RequestBody TeamRequest teamRequest)
    {

            Team savedTeam = teamService.addTeam(teamRequest);

            return new TeamResponse(savedTeam);

    }

    @PutMapping("/{id}")
    public TeamResponse updateTeam
            (@PathVariable long id,
             @Valid @RequestBody TeamRequest teamRequest){

        Team updatedTeam = teamService.updateTeam(id, teamRequest);
        return new TeamResponse(updatedTeam);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable long id)
    {
        teamService.deleteTeam(id);
    }
}
