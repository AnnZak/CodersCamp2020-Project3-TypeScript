import Bubble from "./Bubble";
import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import Renderable from "../../../Engine/Components/Renderable";

class BombBubble extends Bubble {
    
    constructor(position: Vector, velocity: Vector) {
        const bomb = new Image();
        bomb.src = "https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180818104/108105662-duck-vector-icon-isolated-on-transparent-background-duck-logo-concept.jpg";

        super(position, velocity, "blue", {width: 50, height: 50}, bomb);
    }
}