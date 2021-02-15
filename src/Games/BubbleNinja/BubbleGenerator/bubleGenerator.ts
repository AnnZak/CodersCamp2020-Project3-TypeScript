import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import BlueBubble from "../GameObjects/BlueBubble";

export default class GameObjectGenerator {

    private _lastBubbleTime = 0;

    constructor(private _canvas: HTMLCanvasElement, private _engine: Engine) {}
    
    generator(deltaTime: number) { 

        console.log("in generator");

        let xposition: number = this._getRandomInt(50, this._canvas.width);
        let xvelocity: number = this._getRandomInt(-0.1, 0.1);
        let yvelocity = -this._getRandomInt(1, 2);


        if (this._lastBubbleTime > 1000) {
            this._lastBubbleTime = 0;
            this._engine.addEntity(new BlueBubble({x: 0 + xposition, y: this._canvas.height}, {x: 0 + xvelocity, y: 0 + yvelocity} ));
        }   

        this._lastBubbleTime += deltaTime;
    }

    private _getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
}
