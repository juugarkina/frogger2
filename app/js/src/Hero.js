import{tile} from './resaurses'

export default class Hero extends createjs.Bitmap{
    constructor(queue){
        super(queue.getResult('hero'))
        this.reset()
    }
    reset(){
        this.x=tile.WIDTH*3
        this.y = tile.HEIGHT*4
    }
    move(action){
        let newX = this.x
        let newY = this.y
        switch(action){
            case 'up':
                newY-=tile.HEIGHT
                break;
            case 'down':
                newY+=tile.HEIGHT
                break;
            case 'left':
                newX-=tile.WIDTH
                break;
            case 'right':
                newX+=tile.WIDTH
                break;
        }
        if ( (newX <= tile.WIDTH * 6) && (newX >= 0) &&
            (newY >= -tile.HEIGHT) && (newY<=tile.HEIGHT*4) ) {
            this.x = newX
            this.y = newY
        }
    }
}