//import game engine
import { Engine, Entity, Component, Renderable, Colidable, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../Engine";

//import game objects
class Pointable extends Component { //this one goes to separate file, i just haven't figured out where exactly
    constructor(private _points: number){
        super()
    }

    public get points() {
        return this._points;
    }
}

export default class Game {

    private _engine: Engine;
    private _points = 0;

    constructor(private _canvas: HTMLCanvasElement, private _inputDevice: IPointerDevice, private _settings = {}){ //setting might include difficulty: number of lifes between gameover, etc.
        this._engine = new Engine(this._canvas, this._inputDevice, true);
    }

    public start() {
        this._engine.mainLoop((deltaTime) => {

            //generate bubbles if the time is right (use deltaTime accumulation)

            this._engine.entities.forEach(entity => {
                if(entity.hasComponent(Pointable)){
                    //if entity and cursor crossed
                    this._points += entity.getComponent(Pointable).points;
                    entity.removeComponent(Pointable);
                }

            })

        })
    }

    public pause() {
        this._engine.pauseGame();
    }

    public resume() {
        this._engine.resumeGame();
    }

    private _gameOver() {
        //add final point calculation and write to localstorage
    }
}