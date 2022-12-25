
import { useEffect, useState } from 'react';
import './App.css';
import Team from './Components/Team';
import Player from './Components/Player';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Avvvatars from 'avvvatars-react'

function App() {
  var myImageUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/2048px-Soccerball.svg.png';
  const[navWidth,setNavWidht]=useState(0);
  const[teamList,setTeamList]=useState([]);
  const[playerList,setPlayerList]=useState([]);
  const[formOpen,setFormOpen]=useState(false);
  const[playerFormOpen,setPlayerFormOpen]=useState(false);
  const[editTeamFormOpen,setEditTeamFormOpen]=useState(false);
  const[teamSelected,setTeamSelected]=useState(false);
  const[primaryColor,setPrimaryColor]=useState("");
  const[secondaryColor,setSecondColor]=useState("");
  const[teamSelectedObject,setTeamSelectedObject]=useState(undefined);
  useEffect(()=>getTeamList(),[]);
  useEffect(()=> {if(!teamSelected)
    return 
    else getPlayerList()},[teamSelectedObject]);
  
  
  const getTeamList=()=>{
axios.get('http://localhost:8080/api/teams')
.then(res=>{console.log(res.data);
  if(res.status === 200)
  {
   setTeamList(res.data);
  }
  }
   )
   .catch(function (error){
   console.log(error);
   }
   )
  }
  
  const getPlayerList=()=>{
    axios.get('http://localhost:8080/api/teams/'+teamSelectedObject.id+'/players')
    .then(res=>{console.log(res.data);
      if(res.status === 200)
      {
       setPlayerList(res.data);
      }
      }
       )
       .catch(function (error){
       console.log(error);
       }
       )
    
  }
  
  const addTeam=(team)=>{
    axios.post('http://localhost:8080/api/teams',{teamName:team.teamName,
  managerName:team.managerName,
  color: team.color,
  secondColor: team.secondColor,
  flagUrl: team.flagUrl,
  isSelected: team.isSelected,
  statistic:{goals: team.stat.goals,trophies: team.stat.trophies}})
  .catch(err=> console.log(err))
  .then(res=>{if(res.status===200)console.log("Team has been sucessufuly added!")})
  .then(res=> getTeamList())
  }

  const addPlayer = (player)=>{
    axios.post('http://localhost:8080/api/teams/'+player.team.id+'/players',player)
.catch(err=> console.log(err))
.then(res=>{if(res.status===200)console.log("Player has been sucessufuly added!")})
.then(res=> getPlayerList())
.then(res=> getTeamList())
  }

  const deleteTeam=(id)=>{
    axios.delete('http://localhost:8080/api/teams/'+id)
    .then(res=>{if(res.status===200){console.log("Team ",teamSelectedObject.teamName," has been deleted ")}})
    .catch(err=> console.log(err))
    .then(res=> getTeamList())
  }

  const editTeam=(team)=>{
    axios.put('http://localhost:8080/api/teams/'+teamSelectedObject.id,{teamName:team.teamName,
    managerName:team.managerName,
    color: team.color,
    secondColor: team.secondColor,
    flagUrl: team.flagUrl,
    isSelected: team.isSelected,
    statistic:{goals: team.stat.goals,trophies: team.stat.trophies}})
    .catch(err=> console.log(err))
    .then(res=> getTeamList())
  }
  return (
    
    <div>
      {/*This div will be the top of my page where The title and the Nav opener is */}
      <div className='header' style={teamSelected?{color:primaryColor,backgroundColor:secondaryColor}:{color:'white',backgroundColor:'purple'}}>
        <h2 className='title'>FoOtRaters</h2>
        <p className='navP' onClick={()=> setNavWidht(250)}>&#9776;NAV</p>
         
        <img src={myImageUrl} className='ball' alt="Soccer ball"></img>
        
      </div>

      {/*My navigation bar , I use onClick to open it. Use map for <p> with country name on the list */}
      <nav id="mySidenav" className='sidenav'  style={teamSelected?{width:navWidth,backgroundColor:secondaryColor}:{width:navWidth,backgroundColor:'purple'}}>
        <p className='closebtn' style={teamSelected?{color:primaryColor}:{color:'white'}} onClick={()=>setNavWidht(0)}>&times;</p>
        <h3 style={teamSelected?{color:primaryColor}:{color:'white'}} >Your Teams:</h3>
        {teamList.map((team)=> <p style={teamSelected?{color:primaryColor}:{color:'white'}} onClick={()=>{
        setTeamSelected(true);
        setTeamSelectedObject(team);
        setPrimaryColor(team.color);
        setSecondColor(team.secondColor);
        setFormOpen(false);
        setPlayerFormOpen(false);
        setNavWidht(0);
        }}>
          {team.teamName}<img src={team.flagUrl} alt='Team symbol' className='navImages'/></p>)}

          {teamList.length>0 && !formOpen &&(<button className='AddTeamButton' style={teamSelected?{color:secondaryColor,backgroundColor:primaryColor}:{color:'purple',backgroundColor:'white'}} onClick={()=>{
          setFormOpen(true);
          setNavWidht(0);
          }}>Add New Team</button>)}

      </nav>
    
    {/*Body of the page */}
      <div className='body' style={teamSelected?{color:secondaryColor,backgroundColor:primaryColor}:{color:'purple',backgroundColor:'white'}}>
    
        {!formOpen && !playerFormOpen && !editTeamFormOpen && teamSelected &&(
          <div>
            <Team key={teamSelectedObject.id} team={teamSelectedObject} players={playerList}/>
            
            <h1 style={{borderBottom:'black'}}>PLAYERS:</h1>
            {playerList.map((player)=> player.team.id===teamSelectedObject.id?<Player key={player.id} player={player} primaryColor={teamSelectedObject.color} secondaryColor={teamSelectedObject.secondColor}/>:<></>)}
          </div>
        )}
          {/*Add team button and Form*/}
        {teamList.length===0 && !formOpen && (<div className='ButtonBorder'><button className='AddButNoTeams'onClick={()=>{
          setFormOpen(true);
          }}>Add Team</button></div>)}

          {!playerFormOpen && !editTeamFormOpen && formOpen && (<form className='Form' style={teamSelected?{color:primaryColor,backgroundColor:secondaryColor}:{color:'white',backgroundColor:'purple'}} onSubmit={(event)=>{
                          event.preventDefault();
                          var name=event.target.teamName.value;
                          var manager=event.target.managerName.value;
                          var color= event.target.color.value;
                          var secondColor=event.target.secondColor.value;
                          var flagUrl=event.target.flagUrl.value;
                          var goals=event.target.goals.value;
                          var trophies=event.target.trophies.value;
                          var isSelected=false;
                          if(name===""||manager===""||color==="none"||secondColor==="none"||flagUrl===""||goals===""||trophies===""){
                            cogoToast.error("All fields must be filled!");
                          }
                          else if(goals<0){
                            cogoToast.error("Please insert a valid goal ammount");
                          }
                          else if(trophies<0)
                          {
                            cogoToast.error("Please insert a valid trophy ammount");
                          }
                          else if(color===secondColor){
                            cogoToast.warn("Please choose a different color for Secondary color");
                          }
                          else if(flagUrl.length>255){
                            cogoToast.warn("Please choose another image");
                          }
                          else{
                          var team={teamName:name,managerName:manager,color:color,secondColor:secondColor,isSelected:isSelected,flagUrl:flagUrl,stat:{goals:goals,trophies:trophies}}
                          addTeam(team);
                          event.target.teamName.value="";
                          event.target.managerName.value="";
                          event.target.color.value="";
                          event.target.secondColor.value="";
                          event.target.flagUrl.value="";
                          event.target.goals.value="";
                          event.target.trophies.value="";
                          getTeamList();
                          setFormOpen(false);
                          cogoToast.success("Team Added!");
                          }}}>
                          <h3 className='FormTitle' style={teamSelected?{color:secondaryColor,backgroundColor:primaryColor}:{color:'purple',backgroundColor:'white'}}>TEAM</h3>
                          <label for="userInput">Team Name: </label>
                          <input type="text" id="teamName" name="teamName"/> <br/>

                          <label for="userInput">Manager Full Name: </label>
                          <input type="text" id="managerName" name="managerName"/> <br/>

                          <label for="userInput">Primary Color: </label>
                          <select name="color" id="color">
                            <option value="none">None</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                            <option value="red">Red</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="orange">Orange</option>
                          </select><br/>

                          <label for="userInput">Secondary Color: </label>
                          <select name="secondColor" id="secondColor">
                              <option value="none">None</option>
                              <option value="white">White</option>
                              <option value="black">Black</option>
                              <option value="red">Red</option>
                              <option value="yellow">Yellow</option>
                              <option value="green">Green</option>
                              <option value="blue">Blue</option>
                              <option value="orange">Orange</option>
                            </select><br/>

                            <label for="userInput">Flag URL (copy image address from an image in google images): </label>
                            <input type="text" id="flagUrl" name="flagUrl"/> <br/>

                            <label for="userInput">All Time Goals: </label>
                            <input type="number" id="goals" name="goals" step="20"/><br/>

                            <label for="userInput">Number of Trophies: </label>
                            <input type="number" id="trophies" name="trophies" step="1"/><br/>
                            <input type="submit" className='subTeamButton'/>
                            <button className='cancelTeamButton' onClick={()=>setFormOpen(false)}>Cancel</button>
                        </form>)
        }

        {/*Add Player Form */}
        {!formOpen && !editTeamFormOpen && !playerFormOpen && (<button className='AddPlayerButton' style={teamSelected?{color:primaryColor,backgroundColor:secondaryColor}:{color:'white',backgroundColor:'purple'}} onClick={()=>{
          setPlayerFormOpen(true);
          }}>Add New Player</button>)}

        {teamSelected && !editTeamFormOpen && !formOpen && !playerFormOpen && (<button className='DeleteTeamButton' style={teamSelected?{color:primaryColor,backgroundColor:secondaryColor}:{color:'white',backgroundColor:'purple'}} onClick={()=>{
          deleteTeam(teamSelectedObject.id);
          setTeamSelected(false);
          getTeamList();
          cogoToast.success("Item deleted sucessfully!");
          }}>Delete team</button>)}

        {teamSelected && !editTeamFormOpen && !formOpen && !playerFormOpen && (<button className='EditTeamButton' style={teamSelected?{color:primaryColor,backgroundColor:secondaryColor}:{color:'white',backgroundColor:'purple'}} onClick={()=>{
          setEditTeamFormOpen(true)}}>Edit Team</button>)}
        
         {!playerFormOpen && !formOpen && editTeamFormOpen && (<form className='Form' style={teamSelected?{color:primaryColor,backgroundColor:secondaryColor}:{color:'white',backgroundColor:'purple'}} onSubmit={(event)=>{
            event.preventDefault();
            var name=event.target.teamName.value;
            var manager=event.target.managerName.value;
            var color= event.target.color.value;
            var secondColor=event.target.secondColor.value;
            var flagUrl=event.target.flagUrl.value;
            var goals=event.target.goals.value;
            var trophies=event.target.trophies.value;
            var isSelected=false;
            if(name===""||manager===""||color==="none"||secondColor==="none"||flagUrl===""||goals===""||trophies===""){
              cogoToast.error("All fields must be filled!");
            }
            else if(goals<0){
              cogoToast.error("Please insert a valid goal ammount");
            }
            else if(trophies<0)
            {
              cogoToast.error("Please insert a valid trophy ammount");
            }
            else if(color===secondColor){
              cogoToast.warn("Please choose a different color for Secondary color");
            }
            else if(flagUrl.length>255){
              cogoToast.warn("Please choose another image");
            }
            else if(name===teamSelectedObject.teamName && manager===teamSelectedObject.managerName && color===teamSelectedObject.color && secondColor===teamSelectedObject.secondColor 
              && flagUrl===teamSelectedObject.flagUrl && goals===teamSelectedObject.stat.goals && trophies===teamSelectedObject.stat.trophies){
              window.alert("Changes have to be made else just click on CANCEL");
            }
            else{
            var team={teamName:name,managerName:manager,color:color,secondColor:secondColor,isSelected:isSelected,flagUrl:flagUrl,stat:{goals:goals,trophies:trophies}}
            editTeam(team);
            event.target.teamName.value="";
            event.target.managerName.value="";
            event.target.color.value="";
            event.target.secondColor.value="";
            event.target.flagUrl.value="";
            event.target.goals.value="";
            event.target.trophies.value="";
            getTeamList();
            setEditTeamFormOpen(false);
            cogoToast.success("Team Edited!");
            }}}>
            <h3 className='FormTitle' style={teamSelected?{color:secondaryColor,backgroundColor:primaryColor}:{color:'purple',backgroundColor:'white'}}>EDIT TEAM</h3>
            <label for="userInput">Team Name: </label>
            <input type="text" id="teamName" name="teamName"></input> <br/>

            <label for="userInput">Manager Full Name: </label>
            <input type="text" id="managerName" name="managerName"></input> <br/>

            <label for="userInput">Primary Color: </label>
            <select name="color" id="color">
              <option value="none">None</option>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="orange">Orange</option>
            </select><br/>

            <label for="userInput">Secondary Color: </label>
            <select name="secondColor" id="secondColor">
                <option value="none">None</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="orange">Orange</option>
              </select><br/>

              <label for="userInput">Flag URL (copy image address from an image in google images): </label>
              <input type="text" id="flagUrl" name="flagUrl"></input> <br/>

              <label for="userInput">All Time Goals: </label>
              <input type="number" id="goals" name="goals" step="20"></input><br/>

              <label for="userInput">Number of Trophies: </label>
              <input type="number" id="trophies" name="trophies" step="1"></input><br/>
              <input type="submit" className='subTeamButton'/>
              <button className='cancelTeamButton' onClick={()=>setEditTeamFormOpen(false)}>Cancel</button>
          </form>)}
          


          {playerFormOpen && !editTeamFormOpen && !formOpen &&(<form className='Form' style={teamSelected?{color:primaryColor,backgroundColor:secondaryColor}:{color:'white',backgroundColor:'purple'}} onSubmit={
            (event)=>{
              event.preventDefault();
              var name=event.target.fullName.value;
              var position=event.target.position.value;
              var age= event.target.age.value;
              var story=event.target.story.value;
              var imageUrl=event.target.imageURL.value;
              if(name===""||position==="none"||age===""||story===""||imageUrl===""){
                cogoToast.error("All fields must be filled!");
              }
              else if(age<16|| age>45){
                cogoToast.error("Please Insert A valid age number");
              }
              else if(imageUrl.length>255){
                cogoToast.warn("Please choose another image");
              }
              else{
              var player={fullName:name,position:position,age:Number(age),story:story,imageUrl:imageUrl,team:{id:teamSelectedObject.id}}
              addPlayer(player);
              event.target.fullName.value="";
              event.target.position.value="";
              event.target.age.value="";
              event.target.story.value="";
              event.target.imageURL.value="";
              getPlayerList();
              getTeamList();
              setPlayerFormOpen(false);
              cogoToast.success("Player Added Sucessfully!");
              }}}>
          <h3 className='FormTitle' style={teamSelected?{color:secondaryColor,backgroundColor:primaryColor}:{color:'purple',backgroundColor:'white'}}>PLAYER </h3>
          <label for="UserInput">Full Name: </label>
          <input type="text" id="fullName" name="fullName"/> <br/>

          <label for="UserInput">Position: </label>
          <select name="position" id="position">
                <option value="none">None</option>
                <option value="GK">GK</option>
                <option value="LB">LB</option>
                <option value="RB">RB</option>
                <option value="CB">CB</option>
                <option value="CDM">CDM</option>
                <option value="CAM">CAM</option>
                <option value="CM">CM</option>
                <option value="RM">RM</option>
                <option value="LM">LM</option>
                <option value="RW">RW</option>
                <option value="LW">LW</option>
                <option value="CF">CF</option>
                <option value="ST">ST</option>
            </select><br/>

          <label for="UserInput">Age: </label>
          <input type="number" id="age" name="age" step="1"/><br/>

          <label for="UserInput">Story: </label>
          <input type="text" id="story" name="story" className='story'/><br/>

          <label for="UserInput">imageURL: </label>
          <input type="text" id="imageURL" name="imageURL"/>
          <input type="submit" className='subPlayerButton'/>
          <button className='cancelPlayerButton' onClick={()=>{setPlayerFormOpen(false)}}>Cancel</button>
          </form>)}

      </div>                                    

      {/* The bottom of the page where Copyright goes*/}
      <footer style={teamSelected?{color:primaryColor,backgroundColor:secondaryColor}:{color:'white',backgroundColor:'purple'}}><p>&#169;Copyright Cristian Barros Ferreira <br/> Student ID: 2132258</p>
      </footer>
    </div>
  );
            }

export default App;
