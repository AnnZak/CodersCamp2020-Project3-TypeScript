import { Vector } from "..";
import Component from "./Component";

export default class CPosition extends Component implements Vector {
    
    public x;
    public y;
    
    constructor(position: Vector){
        super();
        this.x = position.x;
        this.y = position.y;
    }
}