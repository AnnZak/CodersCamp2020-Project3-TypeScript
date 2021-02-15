import Bubble from "./Bubble";
import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../../../Engine";
import Renderable from "../../../Engine/Components/Renderable";

export default class BlueBubble extends Bubble {
    constructor(position: Vector, velocity: Vector, radius: number = 50) {

        const bubble = new Image();
        bubble.src = 'https://github.com/Cidebur/CodersCamp2020-Project3-TypeScript/blob/new-bubbles-texture/src/Games/BubbleNinja/img/babelek.png?raw=true';

        super(position, velocity, "blue", 10, radius, false, bubble);
    }
}
