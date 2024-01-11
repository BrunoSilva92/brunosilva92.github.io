// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

var wayX = {
  NONE: 0,
  RIGHT: 1,
  LEFT: 2
}

var wayY = {
  NONE: 0,
  UP: 1,
  DOWN: 2
}

let posX = 0;
let posY = 0;
let snkWidth = 20;
let snkHeight = 20;
let running = false;
let currWayX = wayX.RIGHT;
let currWayY = wayY.NONE;
let incrPos = 2;

const render = () => {
  // console.log(snake[currSnakeBody].posX);
  
  // We clean everything in the canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  
  ctx.fillRect(posX, posY, snkWidth, snkHeight);
  
  if (currWayX == wayX.RIGHT){
    posX += incrPos;

    if (posX >= 490){
      posX = 0;
    }

  }else if (currWayX == wayX.LEFT){
    posX -= incrPos;

    if (posX <= 0){
      posX = canvas.width;
    }

  }

  if (currWayY == wayY.DOWN){
    posY += incrPos;    

    if (posY >= 490){
      posY = 0;
    }
  }else if (currWayY == wayY.UP){
    posY -= incrPos;    
    
    if (posY <= 0){
      posY = canvas.height;
    }

  }
  
  // Calling the animation again and again.
  if (running) {
    window.requestAnimationFrame(render);
  }

}


running = true;
render();

window.addEventListener('keydown', (e) => {
  // Left arrow key.
  if (e.keyCode === 37) {
    currWayY = wayY.NONE;
    currWayX = wayX.LEFT;
    currSnakeBody = 0;
  }
  // Right arrow key.
  if (e.keyCode === 39) {
    currWayY = wayY.NONE;
    currWayX = wayX.RIGHT;
    currSnakeBody = 0;
  }    

  // Up arrow key.
  if (e.keyCode === 38) {
    currWayY = wayY.UP;
    currWayX = wayX.NONE;
    currSnakeBody = 0;
  }  

   // Down arrow key.
   if (e.keyCode === 40) {
    currWayY = wayY.DOWN;
    currWayX = wayX.NONE;
    currSnakeBody = 0;
  }  

});
