import Bubble from "./Bubble";
import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import Renderable from "../../../Engine/Components/Renderable";

export default class BombBubble extends Bubble {
    
    constructor(position: Vector, velocity: Vector) {
        const bomb = new Image();
        bomb.src = "https://github.com/Cidebur/CodersCamp2020-Project3-TypeScript/blob/dev/src/Games/BubbleNinja/img/blowfish.png?raw=true";

        super(position, velocity, "red", 0, 80, true, bomb);
    }
}