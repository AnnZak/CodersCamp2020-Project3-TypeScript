import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import Renderable from "../../../Engine/Components/Renderable";

export default class Bubble extends Entity {
    constructor(position: Vector, velocity: Vector, color: string, size: Size){
        super([new CGravity({x: 0, y: 0}), new CPosition(position), new Renderable(color, Shape.circle, size)]);
    }
}