import Entity from "../Entity/Entity"
import RenderEngine from "../RenderEngine/RenderEngine"
import PhysicsEngine from "../PhysicsEngine/PhysicsEngine"
import {Component, CRenderable, CPosition, CVelocity, CGravity} from "../Components"
import { IPointerDevice } from "../Input/inputs.h"
import { Vector } from "../Utils/vector.h"
import { CanvasBackground } from "../Utils/canvasBackground.h";

export default class CoreEngine {

    private _cursorPosition: Vector = {x: 0, y: 0};
    private _prevCursorPosition: Vector = {x: 0, y: 0};
    private _entities: Array<Entity> =[];
    private _ctx: CanvasRenderingContext2D;
    private _renderEngine;
    private _physicsEngine = new PhysicsEngine();
    private _lastTimestamp: number;

    constructor(private _canvas: HTMLCanvasElement, private _controller: IPointerDevice, private _gamePaused: Boolean = false) {
        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
        this._renderEngine = new RenderEngine(this._canvas, this._ctx);
        this._lastTimestamp = Date.now();
    }

    public get gamePaused() {
        return this._gamePaused;
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

    public mainLoop(callback = (deltaTime: number) => {console.log(deltaTime)}) {
        
        window.requestAnimationFrame(() => {
        if (this._gamePaused) return;
        
        const deltaTime = Date.now() - this._lastTimestamp;

        this._physicsEngine.updatePosition(this._entities.filter(entity => entity.hasComponent(CVelocity)));
        this._renderEngine.render(this._entities.filter(entity => entity.hasComponent(CRenderable)));
        this._readInput();

        callback(deltaTime);
        this._lastTimestamp = Date.now();
        this.mainLoop(callback);
        });
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
        this._gamePaused = true;
    }

    public resumeGame() {
        this._gamePaused = false;
    }

    public changeBackground(canvasBackground: CanvasBackground) {
        this._renderEngine.renderBackground(canvasBackground);
    }

    private _readInput(): void {
        this._prevCursorPosition = this._cursorPosition;
        this._cursorPosition = this._controller.cursorPosition;
    }
}
