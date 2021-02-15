import Component from "./Component";
import { Shape } from "../Utils/shape.h";
import { Size } from "../Utils/size.h";

export default class Renderable extends Component {

    constructor(public color: string = "white", public shape: Shape, public size: Size, public img?: HTMLImageElement) {
        super();
    }
}