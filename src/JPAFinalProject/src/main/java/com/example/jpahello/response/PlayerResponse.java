package com.example.jpahello.response;


import com.example.jpahello.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayerResponse {
    private long id;
    private String fullName;
    private String position;
    private String imageUrl;
    private Integer age;
    private String story;
    private TeamResponse team;

    public PlayerResponse(Player player){
        id = player.getId();
        fullName = player.getFullName();
        position = player.getPosition();
        imageUrl = player.getImageUrl();
        age=player.getAge();
        story=player.getStory();
        team = new TeamResponse(player.getTeam());
    }
}
