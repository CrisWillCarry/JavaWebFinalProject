
function Team({team}){

    return(
        <div style={{backgroundColor:team.color,color:team.secondColor}}>
            <div>
                <img src={team.flagUrl} alt='The link to the image is not valid, go to google images, choose the image you wish to use, right-click it and copy Image adress'/>
                <h1>{team.teamName}</h1>
                <h3>Manager: {team.managerName}</h3>
                <h3>All Time Goals: {team.stat.goals}</h3>
                <h3>Number of Trophies: {team.stat.trophies}</h3>
                </div>
        </div>
    )
}
export default Team;