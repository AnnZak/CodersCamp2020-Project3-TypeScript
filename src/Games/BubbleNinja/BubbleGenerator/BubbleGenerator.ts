import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import BlueBubble from "../GameObjects/BlueBubble";
import BombBubble from "../GameObjects/BombBubble"

export default class GameObjectGenerator {

    private _lastBubbleTime = 0;
    private _difficultyUpTime = 0;
    private _nextBubbleTime = 0;

    private _bubblePeriodMin = 1000;
    private _bubblePeriodDelta = 400;
    private _difficultyPeriod = 15000;

    private _redProb = 6;
    private _minSpeedY = 2;
    private _deltaSpeedY = 1;
    private _sideSpeed = 0.5;
    private _incRedProb = -1;
    private _incSpeedY = 0.5;
    private _incSideSpeed = 0.1;
    private _decBubbleTime = 200;
    
    private _edgeDistance = 50;

    constructor(private _canvas: HTMLCanvasElement, private _engine: Engine) {}
    
    public generate (deltaTime: number) {

        if (this._lastBubbleTime >= this._nextBubbleTime) {

            this._lastBubbleTime = 0;
            this._nextBubbleTime = this._getRandomInt(this._bubblePeriodMin, this._bubblePeriodMin + this._bubblePeriodDelta);

            const xposition = this._getRandomInt(0 + this._edgeDistance, this._canvas.width - this._edgeDistance);
            const xvelocity = this._getRandomInt(-this._sideSpeed, this._sideSpeed);
            const yvelocity = this._getRandomInt(this._minSpeedY, this._minSpeedY + this._deltaSpeedY);

            if(this._getRandomInt(1, this._redProb) === 1)
                this._engine.addEntity(new BombBubble({x: xposition, y: this._canvas.height}, {x: xvelocity, y: - yvelocity} ));
            else
                this._engine.addEntity(new BlueBubble({x: xposition, y: this._canvas.height}, {x: xvelocity, y: - yvelocity} ));

            if(this._difficultyUpTime >= this._difficultyPeriod){

                this._difficultyUpTime = 0;

                this._bubblePeriodMin -= this._decBubbleTime;
                this._minSpeedY += this._incSpeedY;
                this._sideSpeed += this._incSideSpeed;
                this._redProb += this._incRedProb;

            }
        }

        this._lastBubbleTime += deltaTime;
        this._difficultyUpTime += deltaTime;
    }

    private _getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
}
