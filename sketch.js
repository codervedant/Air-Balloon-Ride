   var balloon, balloonImage1, balloonImage2;
   var database, position;


 function preload(){
     bg = loadImage("cityImage.png");
     balloonImage1 = loadAnimation("hotairballoon1.png");
     balloonImage2 = loadAnimation("hotairballoon2.png", "hotairballoon2.png",
                                   "hotairballoon1.png", "hotairballoon2.png", "hotairballoon2.png",
                                   "hotairballoon2.png", "hotairballoon3.png", "hotairballoon3.png",
                                   "hotairballoon3.png");
}


 function setup() {
  
     createCanvas(1500,550);

     database = firebase.database();

     balloon = createSprite(150, 350, 150, 150);
     balloon.addAnimation("hotAirBalloon", balloonImage1);
     balloon.scale = 0.5;

   var balloonPosition = database.ref('balloon/position');
     balloonPosition.on("value", readPosition, showError);
}


 function draw() {
     background(bg);

    if(keyCode === 37){

     updatePosition(-10, 0);
     balloon.changeAnimation("hotAirBalloon", balloonImage2);
}
    else if(keyCode === 39){
     updatePosition(+10, 0);
     balloon.changeAnimation("hotAirBalloon", balloonImage2);
}
    else if(keyCode === 38){
     updatePosition(0, -10);
     balloon.changeAnimation("hotAirBalloon", balloonImage2);
     balloon.scale = balloon.scale - 0.01;
}
    else if(keyCode === 40){
     updatePosition(0, +10);
     balloon.changeAnimation("hotAirBalloon", balloonImage2);
     balloon.scale = balloon.scale + 0.01;
}

     drawSprites();
     fill(0);
     stroke("white");
     textSize(25);
     text("**Use arrow keys to move Hot Air Balloon!!", 40, 40);
}


 function updatePosition(x, y){
     database.ref('balloon/position').set({
     'x': position.x + x,
     'y': position.y + y
})
}


 function readPosition(data){
     position = data.val();
     balloon.x = position.x;
     balloon.y = position.y;
}


 function showError(){
     console.log("Error in writing to the database");
}
