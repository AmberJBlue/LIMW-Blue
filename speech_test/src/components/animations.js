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
      this.textBuffer = '\n'
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