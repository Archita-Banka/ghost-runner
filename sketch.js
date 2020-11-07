var PLAY = 1;
var END = 0;
var tower, tower_Image;
var door, door_Image, doorGroup;
var climber, climber_Image, climberG;
var ghost, ghostImg;
var invisible, invisibleG;
var gamestate = PLAY;



function preload() {
  tower_Image = loadImage("tower.png");
  door_Image = loadImage("door.png");
  climber_Image = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("towr", tower_Image);
  tower.velocityY = 1.5;
  //tower.y = 300;

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;

  doorGroup = new Group();
  climberG = new Group();
  invisibleG = new Group();
}

function draw() {
  background(0);
  if (gamestate === 1) {
    if (tower.y >= 400) {
      tower.y = 300;
    }

    if (keyDown("space")) {
      ghost.velocityY = -4;
    }

    ghost.velocityY = ghost.velocityY + 0.5;

    if (keyDown("right")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("left")) {
      ghost.x = ghost.x - 3;
    }

    if (ghost.isTouching(climberG)) {
      ghost.velocityY = 0;
    }

    if (ghost.isTouching(invisibleG) || ghost.y > 600) {
      gamestate = END;
    }
    spawndoors();
  }

  else if (gamestate ===0){
    ghost.destroy();
    stroke("red");
    fill("red");
    textSize(30);
    text("GAME OVER!!",200,300);
    tower.destroy();
    
  }
  drawSprites();
}

function spawndoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    door.addImage("door", door_Image);
    door.velocityY = 1.5;
    door.lifetime = 800;
    door.x = Math.round(random(120, 400));
    doorGroup.add(door);

    climber = createSprite(200, 10);
    climber.addImage("climb", climber_Image);
    climber.velocityY = 1.5;
    climber.lifetime = 800;
    climber.x = door.x;
    climberG.add(climber);

    ghost.depth = door.depth;
    ghost.depth += 1;

    invisible = createSprite(200, 15);
    invisible.width = climber.width;
    invisible.height = 2;
    invisible.visible = false;
    invisible.x = door.x;
    invisible.velocityY = 1.5;
    invisibleG.add(invisible);

  }
}