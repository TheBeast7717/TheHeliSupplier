const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine,world;

var dropGround,dropGroundFace;

var dropBoxLeft,dropBoxLeftFace,dropBoxCenter,dropBoxCenterFace,dropBoxRight,dropBoxRight;


var leftBar,rightBar,upBar,downBar;
var boxStopperBar;

var bgImage;
var boxImage;

var pos = "notClicked";
var posTimer = 10;
var collectState = "false";
var boxCollect ;


var chopper,chopperRightImage,chopperLeftImage;
var chopperHook,chopperHookImage;

var demoBox1;
var dropBox1;
var bgSound;

var dropState = "notDropped";

var gameState = "play";

var timer = 15;


function preload(){
 

  chopperRightImage = loadAnimation("heli-1-removebg-preview.png","heli-2-removebg-preview.png","heli-3-removebg-preview.png","heli-4-removebg-preview.png");
  chopperLeftImage = loadAnimation("heli-1-removebg-preview Left.png","heli-2-removebg-preview Left.png","heli-3-removebg-preview Left.png","heli-4-removebg-preview Left.png");
  
//   chopperHookImage = loadImage("MISC_hook_image-removebg-preview.png");

  bgImage = loadImage("Bg image.jpg");
  boxImage = loadImage("package.png");

  bgSound = loadSound("Chopper overhead with sirens.mp3");


}


function setup(){
	createCanvas(windowWidth,windowHeight);

	engine = Engine.create();
	world = engine.world;
	bgSound.play();
	bgSound.loop();



	var dropGroundOptions = {
		isStatic:true
		// vertices:Array(4)
		

	}

	// Creating dropGround
	dropGround = Bodies.rectangle(windowWidth/2,windowHeight/1,5400,15,dropGroundOptions);
	//console.log(dropGround,width);
	World.add(world,dropGround);

	dropGroundFace = createSprite(dropGround.position.x,dropGround.position.y,5400,15);
	dropGroundFace.shapeColor = "green";


	var dropBoxOptions = {
		restitution:0.6
	}

	// creating drop box left
	dropBoxLeft = Bodies.rectangle(windowWidth/2.7,windowHeight/1.6,30,150,dropBoxOptions);
	World.add(world,dropBoxLeft);

	dropBoxLeftFace = createSprite(dropBoxLeft.position.x,dropBoxLeft.position.y,30,150);
	dropBoxLeftFace.shapeColor = "red"


	// creating drop box center
	dropBoxRight = Bodies.rectangle(windowWidth/1.7,windowHeight/1.6,30,150,dropBoxOptions);
	World.add(world,dropBoxRight);

	dropBoxRightFace = createSprite(dropBoxRight.position.x,dropBoxRight.position.y,30,150);
	dropBoxRightFace.shapeColor = "red"

	
	// creating drop box center
	dropBoxCenter = Bodies.rectangle(windowWidth/2.086,windowHeight/4,245,30,dropBoxOptions);
	World.add(world,dropBoxCenter);
	
	dropBoxCenterFace = createSprite(dropBoxCenter.position.x,dropBoxCenter.position.y,245,30);
	dropBoxCenterFace.shapeColor = "red"


	

	// chopperHook = createSprite(chopper.x,chopper.y+100);
	// chopperHook.scale = 0.4;
	// chopperHook.addImage(chopperHookImage);
	// chopperHook.debug = true;
	// chopperHook.setCollider("rectangle",-30,100,40,40);
	
	

	// demoBoxA = Bodies.rectangle(20,windowHeight/1.2,40,40);
	// World.add(world,demoBoxA);

	// demoBoxFaceA = createSprite(demoBoxA.position.x,demoBoxA.position.y,40,40);
	// demoBoxFaceA.addImage(boxImage);
	// demoBoxFaceA.scale = 0.5;


	// testBox1 = Bodies.rectangle(-200,windowHeight/3,100,100);
	// World.add(world,testBox1);

	// testBox1Face = createSprite(testBox1.position.x,testBox1.position.y,100,100);
	// testBox1Face.addImage(boxImage);
	// testBox1Face.scale = 0.4;


	// creating the chopper
	chopper = createSprite(windowWidth/2,windowHeight/6);
	chopper.addAnimation("movingRight",chopperRightImage);
	chopper.addAnimation("movingLeft",chopperLeftImage);
	chopper.scale = 1.3;
	chopper.frameDelay = 2;
	//chopper.debug = true;
	chopper.setCollider("rectangle",-30,0,130,30);





	dropBoxOptions = {
		isStatic:true,
		restitution:0.8
	}





	dropBox1 = Bodies.rectangle(chopper.x,chopper.y,40,40,dropBoxOptions);
	World.add(world,dropBox1);

	dropBox1Sprite = createSprite(dropBox1.position.x,dropBox1.position.y,40,40);
	dropBox1Sprite.addImage(boxImage);
	dropBox1Sprite.scale = 0.2;
	dropBox1Sprite.visible = false;







//   grabLaser = createSprite(chopper.x,chopper.y,30,30);

// Creating the barriers
    leftBar = createSprite(-1000,windowHeight/1.3,10,1000);
	leftBar.visible = false;

    rightBar = createSprite(2000,windowHeight/1.3,10,1000);
	rightBar.visible = false;

	upBar = createSprite(windowWidth/2,windowHeight/12,5400,10);
	upBar.visible = false;

	//boxStopperBar = createSprite(500,windowHeight/2.5,5400,10);


	



	box1 = new FreeBox(50,350,70,40);
	box2 = new FreeBox(20,500,40,70)

	boxCollect = createSprite(2000,585,40,40);
	boxCollect.addImage(boxImage);
	boxCollect.scale = 0.3;





}


function draw(){
	background(bgImage);
	Engine.update(engine);

	chopper.depth = dropBox1Sprite.depth;
	chopper.depth = chopper.depth+1;

	timer = timer-0.03;
	if(timer<=0){
		timer = timer+0.03;
		
		// textSize(35);
		// fill(255,0,0);
		// text("You are out of time !!",windowWidth/2.8,windowHeight/2);
		


	}

	


	
	text("Gamestate"+gameState,400,200)

	fill("white");
	textSize(28);
	text("Time Left: "+Math.round(timer)+" secs",20,40);

	textSize(24);
	text("Go 'opposite' to right's 'opposite'",20,70);
	text("Collect box -drop box- before timer hits 0",20,100);


	 
// 






	

	// displaying the boxes
	box1.display();
	box2.display();

	camera.on();
	camera.x = chopper.x;
	//camera.y = chopper.y;

  // Calling Functions
  chopperMovement();
  keyPressed(); 
 

//   grabLaserBox();

	//   collisions
	chopper.collide(leftBar);
	chopper.collide(rightBar);
	chopper.collide(upBar);
	chopper.collide(dropGroundFace);

//chopper.collide(boxStopperBar);


	// dropGroundFace position
	dropGroundFace.x = dropGround.position.x;
	dropGroundFace.y = dropGround.position.y;
	


	// dropBoxLeft position
	dropBoxLeftFace.x = dropBoxLeft.position.x;
	dropBoxLeftFace.y = dropBoxLeft.position.y;

	// dropBoxRight position
	dropBoxRightFace.x = dropBoxRight.position.x;
	dropBoxRightFace.y = dropBoxRight.position.y;

	// dropBoxCenter position
	dropBoxCenterFace.x = dropBoxCenter.position.x;
	dropBoxCenterFace.y = dropBoxCenter.position.y;

	// // Demo box (body)
	// demoBoxFaceA.x = demoBoxA.position.x;
	// demoBoxFaceA.y = demoBoxA.position.y;

	// // testBox1 position
	// testBox1Face.x = testBox1.position.x;
	// testBox1Face.y = testBox1.position.y;

	dropBox1Sprite.x = dropBox1.position.x;
	dropBox1Sprite.y = dropBox1.position.y;

	// if(keyDown("space")===false&&dropState==="notDropped"){
	// dropBox1.position.x = chopper.x;
	// dropBox1.position.y = chopper.y;
	// }else if(keyDown("space")===true){
		
	//     //dropBox1.position.y != chopper.y;
		
	// }


	if(dropBox1Sprite.isTouching(dropBoxCenterFace)){
		gameState = "win";
	}
	
	if(gameState==="win"){
		textSize(35);
		fill(0,255,0);
		text("Perfectly dropped !!",windowWidth/2.6,windowHeight/2);
	}

	if(dropBox1Sprite.isTouching(dropGroundFace)){
		gameState = "lose";
	}

	if((gameState==="lose"||timer<1)&&gameState!="win"){
		textSize(35);
		fill(255,0,0);
		text("You lost !!",windowWidth/2.4,windowHeight/2);

	}
	
	// if(timer===0){
		
	// 	textSize(35);
	// 	fill(255,0,0);
	// 	text("You lost !!",windowWidth/2.4,windowHeight/2);




	//  }



	// Hook position
	// chopperHook.x = chopper.x;
	// chopperHook.y = chopper.y+100;  

	


	



	
	// if(keyDown("space")&&dropState==="notDropped"){
	// 	Matter.Body.setStatic(dropBox1,false);
	// 	dropState = "dropped";
	// 	dropBox1.position.x = chopper.x;
	//     dropBox1.position.y = chopper.y;

	// }

	// if(dropState==="dropped"){
		
	// 	Matter.Body.setStatic(dropBox1,false);
		
	
	// }

	

    // console.log(dropGround);
    // Fixing detphs
	// chopper.depth = chopperHook.depth;
	// chopperHook.depth = chopper.depth+1;

	if(keyWentDown("space")&&dropState==="notDropped"&&collectState==="true"&&timer>1){
		Matter.Body.setStatic(dropBox1,false);
		//dropBox1.position.x = chopper.x;
	    //dropBox1.position.y = chopper.y;
		pos = "clicked";
	    dropState = "dropped";
		

	

	}

	if(pos==="clicked"){
		dropBox1.position.x = chopper.x;
	    dropBox1.position.y = chopper.y;
		posTimer = posTimer-0.8;
		
	

	}


	if(pos==="clicked"&&dropBox1Sprite.y>chopper.y){
		dropBox1Sprite.visible = true;
	}



	if(posTimer<=0){
		pos = "notClicked";
		posTimer = 10;
		
	}


	// Collecting Box
	if(chopper.isTouching(boxCollect)&&timer>=1){
		collectState = "true";
		boxCollect.visible = false;

	}
	


	drawSprites();

	// text("PosTimer:"+posTimer,200,200);
	text("Collect Me",boxCollect.x-30,boxCollect.y-30);

}






function keyPressed() {
	if (keyCode === ENTER) {
	  Matter.Body.setStatic(dropBox1,false);
	} 
  }
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	// dropGround.width = windowWidth;
	// dropGroundFace.width = dropGround.width;
  }

function chopperMovement(){

  if(keyDown("right")){
    chopper.changeAnimation("movingRight",chopperRightImage);
    chopper.x = chopper.x+12;
	chopper.setCollider("rectangle",-30,0,130,30);

	// chopperHook.setCollider("rectangle",-5,100,40,30);
  }

  
//   if(keyDown("right")&&key==="shift"){
// 	// chopper.changeAnimation("movingRight",chopperRightImage);
//     // chopper.x = chopper.x+15;
// 	// chopper.setCollider("rectangle",-30,0,130,30);

// 	// chopperHook.setCollider("rectangle",-5,100,40,30);

// 	chopper.x = chopper.x+15;
//   }





//   if(keyWentUp("right")){
// 	chopperHook.setCollider("rectangle",-30,100,40,30);
	  
//   }




  if(keyDown("left")){
    chopper.changeAnimation("movingLeft",chopperLeftImage);
    chopper.x = chopper.x-12;
	chopper.setCollider("rectangle",30,0,130,30);

	// chopperHook.setCollider("rectangle",-70,100,40,30);
	

  }

//   if(keyWentUp("left")){
// 	chopperHook.setCollider("rectangle",-30,100,40,30);
//   }





  if(keyDown("up")&&chopper.y>upBar.y+30){
    chopper.y = chopper.y-12;
	chopper.scale = chopper.scale-0.013;
	// chopperHook.scale = chopperHook.scale-0.003;
	// chopperHook.setCollider("rectangle",-30,80,40,30);

	
  }

//   if(keyWentUp("up")){
// 	chopperHook.setCollider("rectangle",-30,100,40,30);

//   }


  if(keyDown("down")&&chopper.y<dropGroundFace.y-70){
    chopper.y = chopper.y+12;
	chopper.scale = chopper.scale+0.013;
	// chopperHook.scale = chopperHook.scale+0.003;
	// chopperHook.setCollider("rectangle",-30,140,40,30);

  }

//   if(keyWentUp("down")){
// 	chopperHook.setCollider("rectangle",-30,100,40,30);

//   }





}




// function grabLaserBox(){
// 	grabLaser.collide(dropGroundFace);

	


// 	if(keyDown("c")){
// 		grabLaser.height = grabLaser.height +10;
// 		grabLaser.y = grabLaser.y+5;

// 		grabLaser.x = chopper.x;
	


// 	}

// 	if(keyWentUp("c")){
// 		grabLaser.x = chopper.x;
// 	}
	


// 	// if(grabLaser.isTouching(dropGroundFace)){
// 	// 	grabLaserMode = "grabbed";
// 	// }


	





// }


// function boxCollect(){

	// if(chopperHook.isTouching(demoBox1)){
	// 	demoBox1.x = chopperHook.x-5;
	// 	demoBox1.y = chopperHook.y+40;
	// }



	// if(keyWentDown("space")){
	// 	demoBox1.velocityY = demoBox1.velocityY+1;
	// }


	// if(chopperHook.isTouching(testBox1Face)&&key!="space"){
	// 	testBox1.position.x = chopperHook.x;
	// 	testBox1.position.y = chopperHook.y+20;
	// 	Matter.Body.setStatic(testBox1,true);
	// }else if(keyDown("space")){
	// 	Matter.Body.setStatic(testBox1,false);
	// }


	



// }

// function keyPressed(){
// 	if(keyDown("space")){
// 		Matter.Body.setStatic(testBox1,false);
// 	}
// }










