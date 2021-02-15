import { Vector } from "..";
import Component from "./Component";

export default class CVelocity extends Component implements Vector {
    
    public x;
    public y;
    
    constructor(velocity: Vector){
        super();
        this.x = velocity.x;
        this.y = velocity.y;
    }
}