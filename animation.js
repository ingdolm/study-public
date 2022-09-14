
//canvas setting
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 800;
document.body.appendChild(canvas);


//loadImage
let backgroundImg, spaceshipImg, bulletImg, enemyImg, gameoverImg;

//우주선좌표
let spaceshipX = canvas.width/2-32;
let spaceshipY = canvas.height-84;

function loadImage(){
    backgroundImg = new Image();
    backgroundImg.src = "imgs/jack-charles-f8cdJZwI3oI-unsplash.jpg"

    spaceshipImg = new Image();
    spaceshipImg.src = "imgs/icons8-spaceship-64.png"

    bulletImg = new Image();
    bulletImg.src = "imgs/icons8-bullet-24.png"

    enemyImg = new Image();
    enemyImg.src = "imgs/icons8-military-plane-67.png"

    gameoverImg = new Image();
    gameoverImg.src = "imgs/game-over.png"
}


function render(){
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY);
}

function main(){
    render();
    // console.log("animation calls main function")
    requestAnimationFrame(main);
}


loadImage();
main();
