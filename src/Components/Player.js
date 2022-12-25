function Player({player,primaryColor,secondaryColor}){
    return(
        <div style={{backgroundColor:primaryColor,color:secondaryColor}}>
            <h1>Name: {player.fullName}</h1>
            <img src={player.imageUrl} alt='The link to the image is not valid, go to google images, choose the image you wish to use, right-click it and copy Image adress' style={{maxWidth:1902,minWidth:1902,minHeight:1080,maxHeight:1080}}/>
            <h2>Position: {player.position}</h2>
            <h3>Age: {player.age}</h3>
            <h3>Life story: {player.story}</h3>
        </div>
    )
    }
    export default Player;