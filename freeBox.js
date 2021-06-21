class FreeBox{
    constructor(x,y,width,height){
        var options = {
            restitution:0.67
        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width;
        this.height = height;

        World.add(world,this.body);

      

    }

    display(){
        
        //this.sprite = createSprite(this.body.position.x,this.body.position.y,this.width,this.height);
        // rectMode(CENTER);
        // rect(0,0,this.width,this.height);
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x,pos.y)
    rotate(angle);


    rectMode(CENTER);
    fill(255);
    rect(0,0, this.width, this.height);
    pop();
  


    }
}