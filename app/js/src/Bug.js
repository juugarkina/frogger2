import {tile} from './resaurses'

export default class Bug extends createjs.Bitmap{
    constructor(queue){
        super (queue.getResult('bug'))
        this.reset()
    }
    reset(){
        this.speed = (Math.random()+1)*2
        this.x = -tile.WIDTH
        this.y = Math.floor(Math.random()*4)*tile.HEIGHT
    }
    move(){
        this.x+=this.speed
        if (this.x>tile.WIDTH*7){
            this.reset()
        }
    }
}