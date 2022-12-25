package com.example.jpahello.repository;


import com.example.jpahello.entity.Team;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends CrudRepository<Team, Long> {
    public List<Team> findAllByTeamNameIgnoreCase(String teamName);
}
