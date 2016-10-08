import {tile} from './resaurses'

const GRASS = 5
const WATER=0

export default class Level extends createjs.Container{
constructor(queue){
    super()
    for(let i=0;i<6;i++){
        this.setImageType(i, queue);
        this.createRow(i);
    }
    this.cache(0,0,tile.WIDTH*7, tile.HEIGHT*6)
}
setImageType(i, queue){
    let type = 'stone'
    if(i=== GRASS){
        type = 'grass';
    }else if (i=== WATER){
        type = 'water'
    }
    this.blockImg = queue.getResult(type)
}
createRow(i){
    for (let j=0;j<7;j++){
        this.createBlock(i,j)
    }
}
createBlock(i,j){
    const block = new createjs.Bitmap(this.blockImg)
    block.y = tile.HEIGHT*i-50
    block.x = tile.WIDTH*j

    this.addChild(block)
}
}