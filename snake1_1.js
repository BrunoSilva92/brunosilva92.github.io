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

let snkWidth = 10;
let snkHeight = 10;
let snackSize = 10;
let running = false;
let incrPos = 2;
let snake = [];
let snack = {
  posX: 0,
  posY: 0,
  width: snackSize,
  height: snackSize,
  wasAte: true
}

snake.push({
  posX: 60,
  posY: 10,
  prevPosX: 0,
  prevPosY: 0,
  width: snkWidth,
  height: snkHeight,
  wayX: wayX.RIGHT,
  wayY: wayY.NONE
});   // cabeça

function addSnakeBody(){
  snake.push({
    posX: 0,
    posY: 0,
    prevPosX: 0,
    prevPosY: 0,
    width: snkWidth,
    height: snkHeight,
    wayX: wayX.NONE,
    wayY: wayY.NONE
  });
}

function createSnack(){
  if (snack.wasAte){
    snack.posX = Math.floor(Math.random() * 50) * snackSize;
    snack.posY = Math.floor(Math.random() * 50) * snackSize;
    snack.wasAte = false;
  }

}

function collisionChecker(){
  if ( (snake[0].posX < snack.posX + snack.width) && (snake[0].posX + snake[0].width > snack.posX) && (snake[0].posY < snack.posY + snack.height) && (snake[0].posY + snake[0].height > snack.posY) ) {
    addSnakeBody();
    snack.wasAte = true;
  }
}

const render = () => {  
  // We clean everything in the canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';

  // draw snake
  if (snake.length){
    for(var i = 0;i < snake.length; i++){
      ctx.fillRect(snake[i].posX, snake[i].posY, snake[i].width, snake[i].height);
    }
  }

  // create snack
  createSnack();

  // draw snack
  ctx.fillStyle = 'blue';
  ctx.fillRect(snack.posX, snack.posY, snack.width, snack.height);

  // update position
  if (snake.length){
    for(var i = 0;i < snake.length; i++){
      
      // update previous position
      snake[i].prevPosX = snake[i].posX;
      snake[i].prevPosY = snake[i].posY;
    
      if (i == 0){  // if is snake head
        // update current position of snake head

        // eixo X
        if (snake[i].wayX == wayX.RIGHT){
          snake[i].posX += incrPos;
      
          if (snake[i].posX >= 490){
            snake[i].posX = 0;
          }
      
        }else if (snake[i].wayX == wayX.LEFT){
          snake[i].posX -= incrPos;
      
          if (snake[i].posX <= 0){
            snake[i].posX = canvas.width;
          }
      
        }
        
        // eixo Y
        if (snake[i].wayY == wayY.DOWN){
          snake[i].posY += incrPos;    
      
          if (snake[i].posY >= 490){
            snake[i].posY = 0;
          }
        }else if (snake[i].wayY == wayY.UP){
          snake[i].posY -= incrPos;    
          
          if (snake[i].posY <= 0){
            snake[i].posY = canvas.height;
          }
      
        }
      }else{
        // update current position of snake body
        snake[i].posX = snake[i-1].prevPosX;
        snake[i].posY = snake[i-1].prevPosY;
      }

    }
  }
  
  collisionChecker();

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
    snake[0].wayX = wayX.LEFT;
    snake[0].wayY = wayY.NONE;
  }
  // Right arrow key.
  if (e.keyCode === 39) {
    snake[0].wayX = wayX.RIGHT;
    snake[0].wayY = wayY.NONE;
  }    

  // Up arrow key.
  if (e.keyCode === 38) {
    snake[0].wayX = wayX.NONE;
    snake[0].wayY = wayY.UP;
  }  

   // Down arrow key.
   if (e.keyCode === 40) {
    snake[0].wayX = wayX.NONE;
    snake[0].wayY = wayY.DOWN;
   }  

});
