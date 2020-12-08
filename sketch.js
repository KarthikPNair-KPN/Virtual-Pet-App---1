var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dogImage;
var happyDogImage;

function preload()
{
  happyDogImage = loadImage("Dog.png");
  dogImage = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();
  textSize(20);
  stroke("white");
  fill("white");
  text("Press UP_ARROW Key To Feed Drago Milk!",80,50);

  textSize(15);
  fill("white");
  text("Food remaining: "+foodS,180,180);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } 
  else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}


