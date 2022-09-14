
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

//총알좌표
let bulletList = []; //총알들을 저장하는 리스트
function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init =  function(){
        this.x = spaceshipX + 20;
        this.y = spaceshipY;

        bulletList.push(this);
    };
    this.update = function(){
        this.y -= 7;
    };

    this.update = function(){
        this.y -= 7;
    };
}


function loadImage(){
    backgroundImg = new Image();
    backgroundImg.src = "imgs/jack-charles-f8cdJZwI3oI-unsplash.jpg"

    spaceshipImg = new Image();
    spaceshipImg.src = "imgs/icons8-spaceship-64.png"

    bulletImg = new Image();
    bulletImg.src = "imgs/icons8-bullet-24.png"

    enemyImg = new Image();
    enemyImg.src = "imgs/spaceship.png"

    gameoverImg = new Image();
    gameoverImg.src = "imgs/game-over.png"
};

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

        if(event.keyCode == 32){
            createBullet() //총알 생성
        };
    });
};

function createBullet(){
    console.log("총알 생성!!");
    let B = new Bullet(); //총알 하나 생성
    B.init();
    console.log("새로운 총알 생성",bulletList);
};

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

    //총알이 y방향으로 업데이트
    for(let i=0; i<bulletList.length; i++){
        bulletList[i].update();
    };
};


function render(){
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY);
    
    for(let i=0; i<bulletList.length; i++){
        ctx.drawImage(bulletImg, bulletList[i].x, bulletList[i].y);
    };
};

function main(){
    update();
    //좌표값 업데이트

    render();
    //spaceshipImg 이동
    // console.log("animation calls main function")
    requestAnimationFrame(main);
};


loadImage();
setupKeyboard();
main();



