import Component from "./Component";
import { Vector } from "../Utils/vector.h";
import { Shape } from "../Utils/shape.h";
import { Size } from "../Utils/size.h";

export default class Renderable extends Component {

    constructor(public position: Vector, public color: string = "#000", public shape: Shape, public size: Size, public texture: string) {
        super();
    }
}