import {Component} from "../../../Engine";

export default class Pointable extends Component {
    constructor(private _points: number, private _radius: number, private _isBomb: boolean){
        super()
    }

    public get points() {
        return this._points;
    }

    public get radius() {
        return this._radius
    }

    public get isBomb() {
        return this._isBomb;
    }
}