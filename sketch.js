var PLAY=1;
var END =0;
var gameState = PLAY;
var backgroundSound;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var survivaltime;
var score = 0;

function preload(){  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png",  "sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png",  "sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundSound = loadSound("Dance Monkey.mp3");
}

function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(80,415,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.15;
  
  ground = createSprite(400,450,1000,10);
  ground.velocityX=-5;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  backgroundSound.play();
  
}

function draw() {
  
  background("lightblue");
  
  textSize(20);
  fill("red");
  text("Score: "+score,400,30);
  
  survivaltime=Math.ceil(frameCount/40);
  textSize(20);
  fill("blue");
  text("Survival Time: "+survivaltime,20,30);
  
  ground.x=ground.width/2;

  if(keyDown("space") && monkey.y >= 200){
   monkey.velocityY=-10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
 
  monkey.collide(ground);
  
  monkey.setCollider("rectangle",0,100,480,400);
  //monkey.debug = true;
  
  
  if(gameState===PLAY){
    
   bananas();
   obstacles();
    
   
   
   obstacle.setCollider("rectangle",0,0,300,300);
   //obstacle.debug = true;

    
  if(monkey.isTouching(bananaGroup)){
     score = score+5;
     bananaGroup.destroyEach();
    }
   
   if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  if(gameState===END){
 
     monkey.visible = false;
     bananaGroup.destroyEach();
     obstacle.visible = false;
     ground.visible = false;
     fill("red");
     textSize(100);
     text("Game",130,200);
     text("Over",150,300);
     
  }

  drawSprites();
}

function bananas(){
  banana = createSprite(450,600);
  if(frameCount%80===0){
  banana.addImage(bananaImage);
  banana.scale=0.2;
  banana.lifetime=100;
  banana.y=Math.round(random(200,350));
  banana.velocityX=-5;
  }
  bananaGroup.add(banana);
} 

function obstacles(){
  obstacle = createSprite(490,800);
  if(frameCount%80===0){
  obstacle.y = 410;
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  obstacle.lifetime=120;
  obstacle.velocityX=-8;
  }
  obstacleGroup.add(obstacle);
}



