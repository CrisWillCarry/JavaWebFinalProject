package com.example.jpahello.service;

import com.example.jpahello.entity.Player;
import com.example.jpahello.exception.ResourceNotFoundException;
import com.example.jpahello.repository.PlayerRepository;
import com.example.jpahello.request.PlayerRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    public Player getPlayer(long playerId)
    {
        Player player = playerRepository.findById(playerId).orElseThrow(()->new ResourceNotFoundException("player id not found"));
        return player;
    }

    public Player updatePlayer(long playerId, PlayerRequest playerRequest){
        if(playerRepository.existsById(playerId))
        {
            Player playerToBeUpdated = new Player(playerRequest);
            playerToBeUpdated.setId(playerId);
            return playerRepository.save(playerToBeUpdated);
        }
        else{
            throw new ResourceNotFoundException("player id not found");
        }
    }

    public void deletePlayer(long playerId){
        if(playerRepository.existsById(playerId)){
            playerRepository.deleteById(playerId);
        }
        else{
            throw new ResourceNotFoundException("player id not found");

        }
    }
}
