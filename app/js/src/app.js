
import {manifest, actions} from'./resaurses';
import Level from './level'
import Bug from './Bug'
import Hero from './Hero'
import{tile} from './resaurses'
import Door from './Door'
// import Key from './Key'


const stage = new createjs.Stage('game-stage');
const queue = new createjs.LoadQueue();


queue.addEventListener("complete",init);
queue.loadManifest( manifest);

const bugs = []
let level
let hero
let door
let key
let levelCounter = 1
let hudLevel
let keyObtain = false


function createHud(){
hudLevel=new createjs.Text('lvl:1','30px Arial','#fff');
hudLevel.x=15;
hudLevel.y=20;
stage.addChild(hudLevel)
};

class Key extends createjs.Bitmap {
    constructor (queue) {
        super(queue.getResult('key'))
        this.reset()
    }
    reset() {
        this.x = Math.floor(Math.random()*6+1)*tile.WIDTH;
        this.y = Math.floor(Math.random()*3+1)*tile.HEIGHT;
        keyObtain = false
        this.scaleX = 1
        this.scaleY = 1
    }
}

function init(){
  level = new Level(queue)
  hero = new Hero(queue)
  key = new Key(queue)
  door = new Door(queue)
  for (let i=0;i<6;i++){
    bugs.push(new Bug(queue))
  }


  stage.addChild(level, ...bugs, hero, door, key)
  createHud();
  bindEvents()

  createjs.Ticker.timingMode = createjs.Ticker.RAF
  createjs.Ticker.addEventListener('tick', onTick)
}
function onTick(){
  bugs.forEach(bug=>{
    bug.move()
    if (checkCollision(bug)){
       loseLevel()
    }
  })

  if (takeKey()){
    keyObtain = true
    key.scaleY=0.4
    key.scaleX=0.4
    key.x= 65
    key.y = 5
    console.log(keyObtain)
  }

  if (enterDoor()&&keyObtain){
    winLevel()
    console.log('door!')
  }
  stage.update()
}


function bindEvents(){
  window.addEventListener('keydown', e=>{
    hero.move(actions[e.keyCode])
    if(hero.y<0&& (enterDoor()===false)){
      loseLevel()
          }
  })
}
function checkCollision(bug){
return hero.y===bug.y&&
       hero.x<bug.x+tile.WIDTH*0.75&&
       bug.x<hero.x +tile.WIDTH*0.75;
}

 function winLevel(){

    hudLevel.text='lvl:'+ ++levelCounter;
   resetAll()
};

function takeKey(){
  return hero.y===key.y&&
       hero.x<key.x+tile.WIDTH*0.75&&
       key.x<hero.x +tile.WIDTH*0.75
       }
function enterDoor(){
  return hero.y===door.y&&
       hero.x<door.x+tile.WIDTH*0.75&&
       door.x<hero.x +tile.WIDTH*0.75
}

function resetAll(){
  hero.reset();
    key.reset();
    door.reset()
    bugs.forEach(bug=>{bug.reset()})
}

function loseLevel(){
  resetAll()
  hudLevel.text='lvl:1'
  levelCounter = 1
}
