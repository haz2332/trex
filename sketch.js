var trex, trex_running, edges;
var groundImage;
var groundSprite;
var ground2;
var cloud;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var rand;
var score=0;
var cloudsgroup;
var obstaclesgroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var gameOver;
var restart;
var checkpointSound;
var dieSound;
var jumpSound;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
gameoverImage=loadImage("gameOver.png")
restartImage= loadImage("restart.png")
trexcollidedImage=loadImage("trex_collided.png")
checkpointSound=loadSound("checkpoint.mp3")
dieSound=loadSound("die.mp3")
jumpSound=loadSound("jump.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  var message="hello";
  console.log(message)
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexcollidedImage);
  edges = createEdgeSprites();
  //trex.debug=true;
  trex.setCollider("rectangle",0,0,200,100)
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  //groundSprite
  groundSprite= createSprite(200,windowHeight-10,600,20);
  groundSprite.addImage(groundImage)

  //ground2
  ground2= createSprite(200,windowHeight-10,600,10);
  ground2.visible=false;

  cloudsgroup= new Group()
  obstaclesgroup= new Group()

  gameOver= createSprite(windowWidth/2,windowHeight/2)
  gameOver.addImage(gameoverImage)
gameOver.visible=false;

  restart=createSprite(windowWidth/2,windowHeight/2+50)
  restart.addImage(restartImage)
  restart.scale=0.6
  restart.visible=false;

}


  function draw(){
      //set background color 
      background("white");
      
  
      
      if(gamestate===PLAY){
        groundSprite.velocityX=-4
        if(groundSprite.x<0){
          groundSprite.x=200}
          //jump when space key is pressed
      if((touches.length>0||keyDown("space"))&& trex.y>80){
        trex.velocityY = -10;
        jumpSound.play()
      }
        trex.velocityY = trex.velocityY + 0.5 ;
      spawnclouds()
      spawnobstacles()
      //stop trex from falling down
      if(score>0&&score%30 === 0){
       // checkpointSound.play()
      }
      
  score=score+Math.round(frameCount/900 )
       if(obstaclesgroup.isTouching(trex)){
       dieSound.play()
       gamestate=END
       }
      
      }


      else if(gamestate===END){
        groundSprite.velocityX=0
        obstaclesgroup.setVelocityXEach(0)
        cloudsgroup.setVelocityXEach(0)
        obstaclesgroup.setLifetimeEach(-1)
        cloudsgroup.setLifetimeEach(-1)
        trex.changeAnimation("collided",trexcollidedImage)
        gameOver.visible=true;
        restart.visible=true;
        if(mousePressedOver(restart)){
        reset()  
        }
      }
      text("Score: "+score,30,30)
      trex.collide(ground2)


     
     
     
      drawSprites();
}
  function spawnclouds(){
if(frameCount%60===0){
cloud=createSprite(windowWidth,50,20,20)
cloud.addImage(cloudImage)
cloud.y=Math.round(random(10,100))
cloud.velocityX=-2.5
cloud.lifetime=260
cloud.depth=trex.depth
trex.depth=trex.depth+1
cloudsgroup.add(cloud)
}
console.log(frameCount)


}

function spawnobstacles(){
  if(frameCount%90===0){
    obstacle= createSprite(windowWidth,windowHeight-20,20,50)
    obstacle.scale=0.5     
    obstacle.lifetime=320 
    rand=Math.round(random(1,6))
    obstaclesgroup.add(obstacle)
    obstacle.velocityX=-(6+score/100)
    switch(rand){

      case 1:
        obstacle.addImage(obstacle1)
        break;

      case 2:
      obstacle.addImage(obstacle2)
      break;

      case 3:
      obstacle.addImage(obstacle3)
      break;

      case 4:
      obstacle.addImage(obstacle4)
      break;

      case 5:
      obstacle.addImage(obstacle5)
      break; 
                
      case 6:
      obstacle.addImage(obstacle6)
      break;

      default:
        break;
          
    }
  }
}

function reset(){
  gamestate=PLAY
  obstaclesgroup.destroyEach()
  cloudsgroup.destroyEach()
  trex.changeAnimation("running", trex_running);
  gameOver.visible=false;
  restart.visible=false;
  score=0

}