
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
let gameOver = false //true=게임 끝 , false=게임 중
let score = 0;

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
        this.alive = true // true면 살아있는 총알 false 죽은 총알
        bulletList.push(this);
    };
    this.update = function(){
        this.y -= 7;
    };

    this.update = function(){
        this.y -= 7;
    };

    this.checkHit = function(){

        //총알.y <= 적군.y and
        //총알.x >= 적군.x and
        //총알.x <= 적군.x + 적군의 넓이
        for(let i=0; i<enemyList.length; i++){
            if(this.y <= enemyList[i].y &&
                this.x >= enemyList[i].x &&
                this.x <= enemyList[i].x+48
                ){
                //총알에 적군이 맞으면 적군없어지고, 점수획득
                score++;
                this.alive = false; //적군 맞힌 총알
                enemyList.splice(i, 1);
            };
            
        }
    }
}

//적군 만들기
function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+11)) + min; //최대값,최소값 사이에서 랜덤값을 받기
    return randomNum;
}
let enemyList = [];
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.y = 0;
        this.x = generateRandomValue(0, canvas.width-48);
        enemyList.push(this);
    };

    this.update = function(){
        this.y += 3; //적군속도조절

        if(this.y >= canvas.height - 48){
            gameOver = true;
            console.log("gameover");
        };
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
    enemyImg.width = 20;
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

function createEnemy(){
    const interval = setInterval(() => {
        let e = new Enemy();
        e.init();
    }, 1000); //적군이 반복 생성
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

    //총알이 y방향으로 업데이트
    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit(); //총알의 y값이 적군을 맞혔나
        }
    };

    //적군이 y방향으로 업데이트
    for(let i=0; i<enemyList.length; i++){
        enemyList[i].update();
    };



};


function render(){
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY);
    ctx.fillText(`Score : ${score}`, 20, 50);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    
    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            ctx.drawImage(bulletImg, bulletList[i].x, bulletList[i].y);
        };
    };

    //적군이 계속 내려오게함
    for(let i=0; i<enemyList.length; i++){
        ctx.drawImage(enemyImg, enemyList[i].x, enemyList[i].y);
    };
};

function main(){
    if(!gameOver){
        update();
        //좌표값 업데이트
        render();
        //spaceshipImg 이동
        // console.log("animation calls main function")
        requestAnimationFrame(main);
    } else {
        ctx.drawImage(gameoverImg, 60, 180, 380, 380);
    };
};


loadImage();
setupKeyboard();
createEnemy();
main();



