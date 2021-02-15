import { IPointerDevice } from "./inputs.h";
import { Vector } from "../Utils/vector.h";

export default class Mouse implements IPointerDevice {

    private _cursorPosition: Vector = {x: 0, y: 0};

    constructor (private _canvas: HTMLCanvasElement) {
        
        document.addEventListener("mousemove", (event) => {

            this._cursorPosition.x = Math.floor(event.clientX);
            this._cursorPosition.y = Math.floor(event.clientY);

        });
    }

    public get cursorPosition() {
        return this._cursorPosition;
    }
}