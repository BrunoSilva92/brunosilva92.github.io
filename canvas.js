// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

let running = false;
let posX = 10;
let posY = 10;
let currWay = 1;            // 1=Direita  2=Baixo

const render = () => {
  // We clean everything in the canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  
  ctx.fillRect(posX, posY, 20, 20);
  
  if (currWay == 1){
    posX += 2;
  }

  if (currWay == 2){
      posY += 2;
  }
  
  //posY += 2;

  if (posX >= 480)
    posX = 0;

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
    }

    // Right arrow key.
    if (e.keyCode === 39) {
    }    
  
    // Up arrow key.
    if (e.keyCode === 38) {
    }  
  
     // Down arrow key.
     if (e.keyCode === 40) {
        currWay = 2;
    }  
  
  });
