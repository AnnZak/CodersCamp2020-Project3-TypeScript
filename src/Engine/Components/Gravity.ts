import { Vector } from "..";
import Component from "./Component";

export default class CGravity extends Component implements Vector {
    
    public x;
    public y;
    
    constructor(gravity: Vector){
        super();
        this.x = gravity.x;
        this.y = gravity.y;
    }
}