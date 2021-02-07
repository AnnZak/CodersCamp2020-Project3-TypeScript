import Entity from "../Entity/Entity"
import RenderEngine from "../RenderEngine/RenderEngine"
import PhysicsEngine from "../PhysicsEngine/PhysicsEngine"
import Renderable from "../Components/Renderable"
import Colidable from "../Components/Colidable"
import { IPointerDevice } from "../Input/inputs.h"
import { Vector } from "../Utils/vector.h"
import { CanvasBackground } from "../Utils/canvasBackground.h";

export default class CoreEngine {

    private _cursorPosition: Vector = {x: 0, y: 0};
    private _prevCursorPosition: Vector = {x: 0, y: 0};
    private _entities: Array<Entity> =[];
    private _ctx: CanvasRenderingContext2D;
    private _renderEngine;
    // private _uiEngine;
    private _physicsEngine = new PhysicsEngine();
    // private _audioEngine: AudioEngine = new AudioEngine();

    constructor(private _canvas: HTMLCanvasElement, private _controller: IPointerDevice, public gamePaused: Boolean = false) {
        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
        this._renderEngine = new RenderEngine(this._canvas, this._ctx);
        //this._uiEngine = new UIEngine(this._canvas);
    }

    public get cursorPosition() {
        return this._cursorPosition;
    }

    public get previousCursorPosition() {
        return this._prevCursorPosition;
    }

    public get entities() {
        return this._entities;
    }

    public init(callback = () => {}) {
        window.requestAnimationFrame(() => {this._mainLoop(callback)});
    }

    public addEntity(entity: Entity): Entity {
        this._entities.push(entity);
        return entity;
    }

    public removeEntity(entity: Entity) {
        const index = this._entities.indexOf(entity);
        if(index > -1)
            this._entities.splice(index, 1);
        else
            throw new Error("This entity does not exist");
    }

    public pauseGame() {
        this.gamePaused = !this.gamePaused;
    }

    public changeBackground(canvasBackground: CanvasBackground) {
        this._renderEngine.renderBackground(canvasBackground);
    }

    private _mainLoop(callback: () => void) {
        if (this.gamePaused) {
            return;
        }
        this._physicsEngine.updatePosition(this._entities.filter(entity => entity.hasComponent(Colidable)));
        this._renderEngine.render(this._entities.filter(entity => entity.hasComponent(Renderable)));
        this._readInput();

        callback();
        this.init(callback);
    }

    private _readInput(): void {

        this._prevCursorPosition = this._cursorPosition;
        this._cursorPosition = this._controller.getCursorPosition();

    }
}