export function animationOne(p5) {
    let rotation = 0;
  
    p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);
  
    p5.updateWithProps = props => {
      if (props.rotation) {
        rotation = (props.rotation * Math.PI) / 180;
      }
    };
  
    p5.draw = () => {
      p5.background(100);
      p5.normalMaterial();
      p5.noStroke();
      p5.push();
      p5.rotateY(rotation);
      p5.box(100);
      p5.pop();
    };
  }

  export function sphere(p5) { 
    let time = 0;
    var img; // for the UV Grid (used to map the image to the sphere)

    // Overall main output canvas size
    let canvasWidth = 3840;
    let canvasHeight = 2160;

    // Pool dimensions
    let poolWidth = 3072;
    let poolHeight = 1280;

    // (cameraX, cameraY, cameraZ) dictate position of the camera
    let cameraX = 0;
    let cameraY = 0;
    let cameraZ = 100;

    // (centerX, centerY, centerZ) dictate position the camera is pointed towards
    let centerX = 0;
    let centerY = 0;
    let centerZ = 0;

    let text = "Say something positive."

    p5.updateWithProps = props => {
      if (props.text) {
        text = props.text
      }
    };

    let pg = p5.createGraphics(800, 800); // rectangle that will be mapped onto sphere
    p5.preload = () => {
      img = p5.loadImage('./UV_Grid_Sm.jpg');
    }

    p5.setup = () => {
      this.textBuffer = text
      p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
      
      pg.textSize(40); // size of text
      
      let fov = 60.0;  // 60 degrees FOV
       p5.perspective(p5.PI * fov / 180.0, p5.width / p5.height, 0.1, 2000);
    }

    p5.keyTyped = () => {
      this.textBuffer += p5.key;
    }

    p5.keyPressed = () => {
      if (p5.keyCode === p5.BACKSPACE) {
        this.textBuffer = this.textBuffer.slice(0, -1);
      } else if (p5.keyCode === p5.ENTER) {
        this.textBuffer += "\n";
      }
    }

    p5.draw = () => {
      p5.background(0);
      
      // set the virtual camera position
      p5.camera(cameraX, cameraY, cameraZ, centerX, centerY, centerZ, 0, 1, 0);
      
      // include some light even in shadows
      p5.ambientLight(100, 100, 100);
      
      let centerAxis = p5.createVector(0, 1, 0);
      
      //pg.background(200);
      pg.fill(255);
      pg.text(this.textBuffer, -4, 0);

      //pass image as texture
      p5.vtexture(pg);
      p5.noStroke();
      
      p5.push();
      p5.rotate(0.25 * time, centerAxis);
      p5.sphere(40);
      p5.pop();
      

      
      time += 0.03;  // update the time
      
    }
  }

  export function bounce(p5) {
    let x, y;

    p5.setup = () => {
      p5.createCanvas(720, 400);
      // Starts in the middle
      x = p5.width / 2;
      y = p5.height;
    }

    p5.draw = () => {
      p5.background(200);
      
      // Draw a circle
      p5.stroke(50);
      p5.fill(100);
      p5.ellipse(x, y, 24, 24);
      
      // Jiggling randomly on the horizontal axis
      x = x + p5.random(-1, 1);
      // Moving up at a constant speed
      y = y - 1;
      
      // Reset to the bottom
      if (y < 0) {
        y = p5.height;
      }
    }

  }

  export function displayText(p5) {
    let text = "Say something positive.";
    p5.setup = () => {
      p5.createCanvas(720, 400);
    }
    p5.updateWithProps = props => {
      if (props.text) {
        text = props.text
      }
    };
    
    p5.draw = () => {
      p5.background(51);
      p5.fill(255);
      p5.textFont("monospace", 18);
      p5.text(text, 8, 60);
      p5.textFont("sans-serif", 24);
      p5.text(text, 8, 100);  
      p5.textFont("serif", 38);
      p5.text(text, 8, 145);
    }
  }

  export function run(p5) { 

  let message="Say something positive.";
  var positions = [];
  var targets = [];

  let runFont;
  let restFont;

  let runTowards = true;
  let runSpeed = 40;
  let restSpeed = -1;
  let currentSpeed = restSpeed;
  let ts = 94;

  let pauseTime = 1000;
  let reachedTargetAt = 0;
  let hasReachedTarget = true;

  p5.preload = () => {
    runFont = p5.loadFont("./assets/Poppins-SemiBoldItalic.ttf");
    restFont = p5.loadFont("./assets/Poppins-SemiBold.ttf");
  }

  p5.updateWithProps = props => {
    if (props.text) {
      message = props.text
    }
  };

  p5.setup = () => {
    p5.createCanvas(1000, 500);
    
    // Set up the positions and targets arrays
    while(positions.push([0, 0]) < message.length);
    while(targets.push([0, 0]) < message.length);
    
    p5.textSize(ts);
    p5.textFont(restFont);
    
    p5.fill(0);
    p5.background(255);

    p5.pickNewTarget();
  }

  p5.draw = () => {  
    p5.background(255);
    p5.fill(0);
      
    if (hasReachedTarget){
      p5.textFont(restFont);
      
      if (runTowards){
        p5.fill(255, 0, 0);
      }
      
      let elapsedTime = p5.millis() - reachedTargetAt;

      if (elapsedTime > pauseTime){
        p5.pickNewTarget();
      }
    }
    else {
      p5.textFont(runFont);
    }

    p5.drawChars();
    
    p5.updatePositions();
    p5.updateCurrentSpeed();
  }

  p5.mousePressed = () => {
    p5.pickNewTarget();
  }

  p5.drawChars = () => {
    for (let i = 0; i < message.length; i++){
      p5.text(message.charAt(i), positions[i][0], positions[i][1]);
    }
  }

  p5.updatePositions = () => {
    let allHaveReached = true;
    let thisHasReached = false;
    
    // Update the positions a little bit
    for (let i = 0; i < message.length; i++){
      let distX = p5.abs(positions[i][0] - targets[i][0]);
      let distY = p5.abs(positions[i][1] - targets[i][1]);

      let changeX = p5.random(currentSpeed);
      let changeY = p5.random(currentSpeed);

      thisHasReached = changeX > distX && changeY > distY;
      
      if (positions[i][0] > targets[i][0]){
        changeX = -changeX;
      }
      
      if (positions[i][1] > targets[i][1]){
        changeY = -changeY;
      }
      
      positions[i][0] += changeX;
      positions[i][1] += changeY;
      
      allHaveReached = allHaveReached && thisHasReached;
    }
    
    if (!hasReachedTarget && allHaveReached){
        hasReachedTarget = true;
        reachedTargetAt = p5.millis();  
      }
  }

  p5.updateCurrentSpeed = () => {
    if (hasReachedTarget){
      console.log('here')
      // if (currentSpeed >= restSpeed){
        currentSpeed = -1;
      // }
      // else {
      //   currentSpeed += 1;
      // }
    }
    else {
      if (currentSpeed <= runSpeed){
        currentSpeed = 1
        // currentSpeed += (runSpeed - currentSpeed) * 0.25;
      }
      else {
        currentSpeed -= 1;
      }
    }
  }

  p5.pickNewTarget = () => {
    if (!runTowards && p5.random(1) > 0.75){
      runTowards = true;
      
      let tX = p5.random(ts, p5.width - 3 * ts);
      let tY = p5.random(ts, p5.height - ts);
      
      for (let i = 0; i < message.length; i++){
        targets[i][0] = tX + i * ts;
        targets[i][1] = tY;
      }
    }
    else {
      runTowards = false;
      
      for (let i = 0; i < message.length; i++){
        targets[i][0] = p5.random(ts, p5.width - ts);
        targets[i][1] = p5.random(ts, p5.height - ts);
      }
    }
    
    hasReachedTarget = false;
  }
  }

  export function particles(p5) { 
    let font;
    let points;
    let bounds;
    let message;

    p5.preload = () => {
      font = p5.loadFont('./assets/Avenir.otf');
    }

    p5.updateWithProps = props => {
      if (props.text) {
        message = props.text
        console.log(message)
      }
    };

    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);

      
        p5.cursor(p5.CROSS);
        p5.fill(255, 127);
        p5.noStroke();
    }



    p5.draw = () => {
      points = font.textToPoints(
        message, 0, 0, 200, {
          sampleFactor: 1,
          simplifyThreshold: 0
        });

      bounds = font.textBounds(
        message, 0, 0, 200);

      p5.background(0);
      
      p5.stroke(51);
      p5.line(p5.width / 2, 0, p5.width / 2, p5.height);
      p5.line(0, p5.height / 2, p5.width, p5.height / 2);
      p5.noStroke();
      
      let centerDist = p5.dist(p5.mouseX, p5.mouseY, p5.width / 2, p5.height / 2);

      let transparency = p5.map(centerDist, 0, p5.width / 2, 200, 50);
      transparency = p5.constrain(transparency, 50, 200);
      p5.fill(255, transparency);
      
      let jiggle = p5.map(centerDist, 0, p5.width, 1, 300);

      p5.translate((p5.width - p5.abs(bounds.w)) / 2, 
                (p5.height + p5.abs(bounds.h)) / 2);
      
      
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        p5.ellipse(p.x + jiggle * p5.randomGaussian(), 
          p.y + jiggle * p5.randomGaussian(), 5, 5);
      }

    }
  }