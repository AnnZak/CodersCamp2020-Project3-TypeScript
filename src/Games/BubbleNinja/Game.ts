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

    constructor(private _canvas: HTMLCanvasElement, private _inputDevice: IPointerDevice, private _playerName: string){ //setting might include difficulty: number of lifes between gameover, etc.
        this._maxGameTime = 60000;
        this._engine = new Engine(this._canvas, this._inputDevice, true);
        this._bubbleGenerator = new GameObjectGenerator(this._canvas, this._engine);
    }

    public start() {

        this._engine.changeBackground({imagePath: "https://images.unsplash.com/photo-1530053969600-caed2596d242?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80"});
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

            if(this._gameTime >= this._maxGameTime && this._engine.entities.length === 0)
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
      let topScoresArr: { name: string, score: number }[] = [];

      if (localStorage.getItem('topScores')) {
          topScoresArr = JSON.parse(localStorage.getItem('topScores')!)
          localStorage.removeItem('topScores');
      }

      topScoresArr.push({ name:  this._playerName, score: this._points});

      if (topScoresArr.length > 3) {
          topScoresArr.sort((a, b) => a.score - b.score);
          topScoresArr.pop();
      }

      localStorage.setItem('topScores', JSON.stringify(topScoresArr));
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