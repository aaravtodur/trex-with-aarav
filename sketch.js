var PLAY = 1;
var END = 0;
var gameState = PLAY;

var back;
var ground;
var trex, trex_running, trexcollided, collided;
var obstaclesGroup, obstacle, obstacleimage;
var invisibleground;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var restart, resetimg;
var score = 0;


function preload() {
  trex_running = loadAnimation("D5.png", "D4.png", "D6.png");

  back = loadImage("volcano-eruption-cartoon-vector-15670209.jpg");

  mountainimg = loadImage("download.jpg")

  obstacle1 = loadImage("Rock2.png");
  obstacle2 = loadImage("Rock3.png");
  obstacle3 = loadImage("Rock4.png");
  obstacle4 = loadImage("Rock5.png");
  obstacle5 = loadImage("Rock6.png");
  obstacle6 = loadImage("Rock7.png");

  resetimg = loadImage("restart image.png");

  trexcollided = loadImage("D5.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backa = createSprite(400, 400, 400, 400);
  backa.shapeColor = "orange";
  scale.backa = 0.5;

  ground = createSprite(250, 500, 1000, 200);
  ground.shapeColor = "brown";
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(300, 408, 400, 10);
  invisibleGround.visible = false;

  restart = createSprite(250, 150, 200, 100)
  restart.addImage(resetimg);
  restart.scale = 0.8;

  trex = createSprite(400, 100, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexcollided);
  trex.scale = 0.2;

  obstaclesGroup = createGroup();

  trex.setCollider("circle", 0, 0, 200);
  //trex.debug = true
}

function draw() {
  background("orange")


  if (gameState === PLAY) {


    restart.visible = false;

    fill("black");
    textSize(20);
    text("score " + score, 300, 30)
    score = score + Math.round(getFrameRate() / 60);

     ground.velocityX = -(6 + 1*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
      jumpSound.play( )
      trex.velocityY = -10;
       touches = [];
    }
    if (keyDown("space") && trex.y >= 310) {
      trex.velocityY = -12;
    }

    trex.velocityY = trex.velocityY + 0.9

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    trex.collide(invisibleGround);


    if (obstaclesGroup.isTouching(trex)) {

      gameState = END;
    }
    spawnObstacles();
    drawSprites();
  } else if (gameState === END) {

    restart.visible = true;

    ground.velocityX = 0;
    // trex.velocityY = 0

    trex.collide(invisibleGround);

    trex.changeAnimation("collided", trexcollided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);





    if (mousePressedOver(restart)) {
      reset();
    }
    drawSprites();
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(0, 387, 10, 40);
    obstacle.velocityX = (6 + 1*score/100);
    obstacle.setCollider("circle", 0, 0, 100);
    //obstacle.debug = true   
    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;

  restart.visible = false;

  obstaclesGroup.destroyEach();


  trex.changeAnimation("running", trex_running)

  score = 0;
}