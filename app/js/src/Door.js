import{tile} from './resaurses'

export default class Door extends createjs.Bitmap {
    constructor(queue) {
        super (queue.getResult('door'))
        this.reset()
    }
    reset(){
        this.x = Math.floor(Math.random()*6+1)*tile.WIDTH;
        this.y=-83;
    }
}