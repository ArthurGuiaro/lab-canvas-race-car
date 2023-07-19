let imgRoad= new Image()
let imgCar= new Image()
window.onload(() => {
    imgRoad.src = "../images/road.png"
    imgCar.src = "../images/car.png"

})
let button = document.querySelector("#start-button")
let obstacles= []
let interval = null
let game = {
    widthCanvas: 500,
    heightCanvas: 700,
    Canvas: document.querySelector("#canvas"),
    frames: 0,
    score: 0,
    running:false,
    
    startGame(){
        interval = setInterval(() => {
            updateGameArea()
        }, 20);
        this.running = true
        button.innerHTML = "Pause"
    },
    stop(){
        clearInterval(interval)
        context = this.Canvas.getContext("2d")
        context.clearRect(0, 0, 500, 700)
        context.font = '30px serif'
        context.fillStyle = 'red'
        context.fillText(`GAME OVER`, 200, 340)
        context.font = '20px serif'
        context.fillStyle = 'black'
        context.fillText(`Score: ${this.score}`, 250, 365)
        this.reset()
        console.log("acabou")
    },
    reset(){
        this.frames = 0
        this.score = 0
        this.running = false
        obstacles = []
        car.x = 210
        car.y= 510
        button.innerHTML = "RestartGame"
    },
    pause(){
        context = this.Canvas.getContext("2d")
        button.innerHTML = "Continue"
        this.running = false
        clearInterval(interval)
        context.font = '100px serif'
        context.fillStyle = 'red'
        context.fillText(`Pause`, 125, 340)

    }
    
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
    
    top(){
        return this.y
    }
    
    bottom(){
        return this.y + this.height
    }
    
    left(){
        return this.x
    }
    
    right(){
        return this.x + this.width
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
    
    crash(obstacle){
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
            )
        }

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

let divisor = 60
let speed = 5

function calculateSpeedObstacles(){
    if(game.frames % 1000 === 0 && game.frames > 0){
        console.log("speed up")
        if(divisor > 30) divisor -= 5
        speed += 1
        
    }
}

function updateScore(){
    game.score = Math.floor(game.frames / 5)
    let context = game.Canvas.getContext("2d")
    context.font = '18px serif'
    context.fillStyle = 'black'
    context.fillText(`Score: ${game.score}`, 20, 40)
}

function checkCrash(){
    let status = obstacles.some((obstacle) => {
        return car.crash(obstacle)
    })
    
    if(status){
        game.stop()
    }
}

function updateObstacles(){
    obstacles.forEach(obstacle => {
        obstacle.y += speed// começa em 5
        obstacle.draw()
    })

    game.frames += 1

    if(game.frames% divisor === 0){
        let y = 20
        let maxWidth = 341 
        let minWidth = 40
        let width = Math.floor(Math.random()* (maxWidth - minWidth + 1) + minWidth)

        let minGap = 119
        let maxGap = 341
        let gap = Math.floor(Math.random()* (maxGap - minGap + 1) + minGap)
        
        obstacles.push(new component("none","red",0,y, width, 30))
        obstacles.push(new component("none", "red",width + gap, y, 700 - width-gap,30 ))
    }

}
function updateGameArea(){
    background.draw()
    car.newPos()
    car.draw()
    calculateSpeedObstacles()
    updateObstacles()
    updateScore()
    checkCrash()
   

}

button.addEventListener("click", () => {
    if(!game.running) game.startGame()
    else game.pause()
}
)
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
