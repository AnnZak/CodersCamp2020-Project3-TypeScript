import { Engine, Entity, Component, Renderable, Colidable, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector } from "../Engine";

class mockMouse implements IPointerDevice {
    getCursorPosition(): Vector {
        return {x: 1, y: 1};
    }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const engine = new Engine(canvas, new mockMouse());

class Bubble extends Entity {
    constructor(arrayComponents: Array<Component>) {
        super(arrayComponents);
        this.addComponent(new Renderable("blue", Shape.circle, {width: 20, height:20}));
    }
}

engine.addEntity(new Bubble([new Colidable({x: 20, y: 50}, {x: 50, y: 0}, {x: 0, y: 0})]));
engine.init(() => {});