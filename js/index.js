let imgRoad = new Image()
imgRoad.src = "../images/road.png"
let imgCar = new Image()
imgCar.src = "../images/car.png"
let interval = null
let frames = 0
let widthCar = 79
let heightCar = 159
let x = 210
let y = 520
let speedX = 0
let speedY = 0
let obstacles = []
function newPos(){
  x += speedX
  y += speedY
}

class component {
  constructor(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
    this.speedX = 0
    this.speedY = 0
  }

  left() {
    return this.x
  }

  right() {
    return this.x + this.width
  }

  top() {
    return this.y
  }

  bottom() {
    return this.y + this.height
  }

  newPos() {
    this.x += this.speedX
    this.y += this.speedY
  }

  crash(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    )
  }

  draw() {
    const ctx = document.querySelector("#canvas").getContext("2d")
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
function updateObstacles(){
  obstacles.forEach((obstacle) => {
    obstacle.y += 1
    obstacle.draw()
  })

  if(frames% 120 === 0 ){
    let y = 20
    let maxWidth = 500 - widthCar - 20
    let minWidth = 20
    let width = Math.floor(Math.random()*(maxWidth-minWidth+1)+ minWidth)

    let minGap = widthCar + 20
    let maxGap = maxWidth
    let gap = Math.floor(Math.random()*(maxGap-minGap+1)+ minGap)
    obstacles.push(new component(width, 20, "red"), 0, y)
    obstacles.push(new component(20, y - width - gap , "red"), width + gap, y)
  }
}



function loadArea(){
  
 
    document.querySelector("#canvas").getContext("2d").drawImage(imgRoad,0,0,500,700)
    loadCar()
  
  
}

function loadCar(){
  
    document.querySelector("#canvas").getContext("2d").drawImage(imgCar,x,y,79,159)
  

}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    interval = setInterval(()=>{
      frames += 1
      newPos()
      document.querySelector("#canvas").getContext("2d").clearRect(0,0,500,700)
      loadArea()
      
      updateObstacles()
      console.log(obstacles)
    },20)
  }
};
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      speedY = -10
      break
    case 'ArrowDown':
      speedY = 10
      break
    case 'ArrowLeft': // left arrow
      speedX = -10
      break
    case 'ArrowRight': // right arrow
      speedX = 10
      break
  }
})
document.addEventListener('keyup', (e) => {
  speedX = 0
  speedY = 0
})
