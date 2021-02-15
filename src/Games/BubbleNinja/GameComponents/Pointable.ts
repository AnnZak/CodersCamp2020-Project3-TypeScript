import {Component} from "../../../Engine";

export default class Pointable extends Component {
    constructor(private _points: number){
        super()
    }

    public get points() {
        return this._points;
    }
}