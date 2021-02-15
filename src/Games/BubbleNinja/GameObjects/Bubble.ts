import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import Renderable from "../../../Engine/Components/Renderable";
import Pointable from "../GameComponents/Pointable";

export default class Bubble extends Entity {
    constructor(position: Vector, velocity: Vector, color: string, points: number, radius: number, isBomb: boolean, img?: HTMLImageElement){
        super([
            new CGravity({x: 0, y: 0}), 
            new CVelocity(velocity), 
            new CPosition(position), 
            new Renderable(color, Shape.circle, {width: radius, height: radius}, img),
            new Pointable(points, radius, isBomb)
        ]);
    }
}