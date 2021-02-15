//import game engine
import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../Engine";

//import game components, objects, modules
import Pointable from "./GameComponents/Pointable"
import * as Collisions from "./GameModules/Collisions";
import GameObjectGenerator from "./BubbleGenerator/BubbleGenerator";

export default class Game {

    private _engine: Engine;
    private _points = 0;
    private _gameTime = 0;
    private _maxGameTime;
    private _bubbleGenerator;

    constructor(private _canvas: HTMLCanvasElement, private _inputDevice: IPointerDevice){ //setting might include difficulty: number of lifes between gameover, etc.
        this._maxGameTime = 60000;
        this._engine = new Engine(this._canvas, this._inputDevice, true);
        this._bubbleGenerator = new GameObjectGenerator(this._canvas, this._engine);
    }

    public start() {

        this._engine.resumeGame();
        this._engine.mainLoop((deltaTime) => {

            this._gameTime += deltaTime;

            if(this._gameTime < this._maxGameTime){
                this._bubbleGenerator.generate(deltaTime);
            }

            this._engine.entities.forEach(entity => {

                if(this._detectCursorCollision(entity)) {

                    const pointable = entity.getComponent(Pointable);

                    if(pointable.isBomb)
                        this._gameOver();
                    
                    this._points += pointable.points;
                    this._engine.removeEntity(entity);
                }

                if(this._detectTopCollision(entity)) {

                    const pointable = entity.getComponent(Pointable);

                    if(!pointable.isBomb){
                        this._points -= pointable.points;
                    }

                    this._engine.removeEntity(entity);
                }
            });

            console.log(this._engine.entities.length);

            if(this._engine.entities.length === 0)
                this._gameOver();
        });
    }

    public pause() {
        this._engine.pauseGame();
    }

    public resume() {
        this._engine.resumeGame();
    }

    private _gameOver() {
        this._engine.pauseGame();
        console.log(this._points);
        //add final point calculation and write to localstorage
    }

    private _detectCursorCollision(object: Entity): boolean {
        if(object.hasComponent(CPosition) && object.hasComponent(Pointable)){

            const position: Vector = object.getComponent(CPosition);
            const radius = object.getComponent(Pointable).radius;

            return Collisions.collisionCirclePoint(position, radius, this._engine.cursorPosition);
        }
        return false;
    }

    private _detectTopCollision(object: Entity): boolean {
        if(object.hasComponent(CPosition) && object.hasComponent(Pointable)){

            const position: Vector = object.getComponent(CPosition);
            const radius = object.getComponent(Pointable).radius;

            return position.y < -radius;
        }
        return false;
    }
}