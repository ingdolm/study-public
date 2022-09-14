
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

let keysDown = {};
function setupKeyboard(){
    document.addEventListener("keydown", function(event){
        // console.log("어떤 키보드를 눌렀나?", event.keyCode);
        keysDown[event.keyCode] = true;
        // console.log("keysDown에 들어간 값?", keysDown);
    });
    document.addEventListener("keyup",function(){
        delete keysDown[event.keyCode];
        // console.log("keyup 후 삭제됐나?",keysDown);
    });
}

function update(){
    if( 39 in keysDown){
        spaceshipX += 5;
    } //우주선 right 이동
    if(37 in keysDown){
        spaceshipX -= 5;
    } //우주선 left 이동

    if(spaceshipX <= 0){
        spaceshipX = 0;
    }
    if(spaceshipX >= canvas.width-64){
        spaceshipX = canvas.width-64;
    }
    //우주선x값이 0보다 크거나 작아지면 캔버스 밖으로 못나가게 고정
}


function render(){
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY);
}

function main(){
    update();
    //좌표값 업데이트

    render();
    //spaceshipImg 이동
    // console.log("animation calls main function")
    requestAnimationFrame(main);
}


loadImage();
setupKeyboard();
main();



