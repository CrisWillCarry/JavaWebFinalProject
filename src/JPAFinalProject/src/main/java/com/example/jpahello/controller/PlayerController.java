package com.example.jpahello.controller;

import com.example.jpahello.request.PlayerRequest;
import com.example.jpahello.response.PlayerResponse;
import com.example.jpahello.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    //GET /api/players/:playerId
    @GetMapping("/{playerId}")
    public PlayerResponse getPlayer(@PathVariable long playerId) {
        return new PlayerResponse(playerService.getPlayer(playerId));
    }
    //PUT /api/players/:playerId
    @PutMapping("/{playerId}")
    public PlayerResponse updatePlayer(@PathVariable long playerId, @Valid @RequestBody PlayerRequest playerRequest){
        return new PlayerResponse(playerService.updatePlayer(playerId, playerRequest));
    }
    //DELETE /api/players/:playerId
    @DeleteMapping("/{playerId}")
    public void deletePlayer(@PathVariable long playerId)
    {
        playerService.deletePlayer(playerId);
    }
}
