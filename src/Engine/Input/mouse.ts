import { IPointerDevice } from "./inputs.h";
import { Vector } from "../Utils/vector.h";

export default class Mouse implements IPointerDevice {

    public cursorPosition: Vector = {x: 0, y: 0}; //private?
    private rect;

    constructor (private _canvas: HTMLCanvasElement) {
        this.rect = this._canvas.getBoundingClientRect(); // abs. size of element
    }

    public getCursorPosition(event: MouseEvent) {

        let scaleX = this._canvas.width / this.rect.width;   // relationship bitmap vs. element for X
        let scaleY = this._canvas.height / this.rect.height;  // relationship bitmap vs. element for Y
      
        this.cursorPosition.x = (event.clientX - this.rect.left) * scaleX;   // scale mouse coordinates after they have
        this.cursorPosition.y = (event.clientY - this.rect.top) * scaleY;     // been adjusted to be relative to element


        return this.cursorPosition;
    }
}