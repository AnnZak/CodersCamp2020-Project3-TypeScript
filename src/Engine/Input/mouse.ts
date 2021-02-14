import { IPointerDevice } from "./inputs.h";
import { Vector } from "../Utils/vector.h";

export default class Mouse implements IPointerDevice {

    private _cursorPosition: Vector = {x: 0, y: 0};
    private _rect;

    constructor (private _canvas: HTMLCanvasElement) {
        this._rect = this._canvas.getBoundingClientRect(); // object with info about size and position (relative to the viewport) of canvas element
        
        document.addEventListener("mousemove", (event) => {

            let scaleX = this._canvas.width / this._rect.width;   // scale of canvas vs bitmap size on x
            let scaleY = this._canvas.height / this._rect.height;  // scale of canvas vs bitmap size on x
        
            this._cursorPosition.x = Math.floor((event.clientX - this._rect.left) * scaleX);
            this._cursorPosition.y = Math.floor((event.clientY - this._rect.top) * scaleY);

        });
    }

    public get cursorPosition() {
        return this._cursorPosition;
    }
}