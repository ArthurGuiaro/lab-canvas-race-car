let button = document.querySelector("#start-button")
let imgRoad= new Image()
let imgCar= new Image()
imgRoad.src = "../images/road.png"
imgCar.src = "../images/car.png"
let obstacles= []
let game = {
    widthCanvas: 500,
    heightCanvas: 700,
    Canvas: document.querySelector("#canvas"),
    frames: 0,
    interval: null,
    startGame(){
        this.interval = setInterval(() => {
            updateGameArea()
        }, 20);
    },

}

class component {
    constructor(image,color,x,y,width,height){
        this.image = image
        this.color = color
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speedX = 0
        this.speedY = 0
    }
    
    newPos(){
        if(this.x + this.speedX > 421 ){
            this.x = 421
        } if(this.x +this.speedX < 0){
            this.x = 0
        } if(this.y + this.speedY > 541){
            this.y = 541
            } if(this.y + this.speedY < 0){
                this.y= 0
        }
        else{
            this.x += this.speedX
            this.y += this.speedY
        }
    }

    crash(){}

    draw(){
        let context = game.Canvas.getContext("2d")
        if(this.image === "none"){
            context.fillStyle = this.color
            context.fillRect(this.x,this.y,this.width,this.height)
        } else{
            context.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
    }

}
let background = new component(imgRoad,null,0,0,game.widthCanvas,game.heightCanvas)
let car = new component(imgCar,null,210,510,79,159)
function updateObstacles(){
    obstacles.forEach(obstacle => {
        obstacle.y += 1
        obstacle.draw()
    })

    game.frames += 1

    if(game.frames% 120 === 0){
        let y = 20
        let maxWidth = 541 
        let minWidth = 40
        let width = Math.floor(Math.random()* (maxWidth - minWidth + 1) + minWidth)

        let minGap = 119
        let maxGap = 541
        let gap = Math.floor(Math.random()* (maxGap - minGap + 1) + minGap)
        
        obstacles.push(new component("none","red",0,y, width, 30))
        obstacles.push(new component("none", "red",width + gap, y, 700 - width-gap,30 ))
    }

}
function updateGameArea(){
    background.draw()
    car.newPos()
    car.draw()
    updateObstacles()
}

button.addEventListener("click", game.startGame)
document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        car.speedY = -10
        break
      case 'ArrowDown':
        car.speedY = 10
        break
      case 'ArrowLeft': // left arrow
        car.speedX = -10
        break
      case 'ArrowRight': // right arrow
        car.speedX = 10
        break
    }
  })
  document.addEventListener('keyup', (e) => {
    car.speedX = 0
    car.speedY = 0
  })
