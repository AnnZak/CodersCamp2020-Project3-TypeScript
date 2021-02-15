import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import Bubble from "../GameObjects/Bubble";

export default class GameObjectGenerator {

    private _lastBubbleTime = 0;

    constructor(private _canvas: HTMLCanvasElement, private _engine: Engine) {}
    
    generator(deltaTime: number) { 

        let xposition: number = this._getRandomInt(50, this._canvas.width);
        let xvelocity: number = this._getRandomInt(-0.1, 0.1);
        let yvelocity = this._getRandomInt(1, 2);


        if (this._lastBubbleTime > 1000) {
            this._lastBubbleTime = 0;
            this._engine.addEntity(new Bubble({x: 0 + xposition, y: this._canvas.width}, {x: 0 + xvelocity, y: 0 + yvelocity}, "blue", {width: 50, height:50} ));
        }   

        this._lastBubbleTime += deltaTime;
    }

    private _getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
}
