import Bubble from "./Bubble";
import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import Renderable from "../../../Engine/Components/Renderable";

class BlueBubble extends Bubble {
    constructor(position: Vector, velocity: Vector) {
        super(position, velocity, "blue", {width: 50, height: 50});
    }
}


