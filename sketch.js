
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survival=0;
var ground;
var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(380,350);
    
    monkey=createSprite(100,280,10,10);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.12;
  
    ground=createSprite(200,320,800,10);
    ground.velocityX=-5; 
      
    bananaGroup = new Group();
    obstacleGroup = new Group(); 
  
    monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);  
    monkey.debug = true
  
}

function draw() {
  background("white");
  
  text("score:"+score,300,10);
  text("survival time:"+survival,180,10);
  
  if(ground.x<0){
      ground.x=ground.width/2;
  }
  
  if(gameState==="play"){
    monkey.velocityY=monkey.velocityY+0.8;
    survival=Math.ceil(frameCount/frameRate());
    console.log(score);
    
    if(keyDown("space") && monkey.y>=200){
      monkey.velocityY=-12;
    }
  
    monkey.collide(ground);
  
    if(monkey.isTouching(bananaGroup)){
        bananaGroup.destroyEach();
        score=score+1;
       }   
    if(monkey.isTouching(obstacleGroup)){
      gameState="end";
      
    }
  }
  
  if(gameState==="end"){
    monkey.x=500;
     obstacleGroup.destroyEach();
     bananaGroup.destroyEach();
  }
  
  bananas();
  rock();
  
  drawSprites();  
}

function bananas(){
  if(frameCount%80===0){
    y=Math.round(random(100,200));
    banana=createSprite(400,y,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6;
    banana.lifetime=150;
    bananaGroup.add(banana);
  }
}

function rock(){
  if(frameCount%300===0){
    obstacle=createSprite(400,290,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-6;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);
  }
}






