import { Engine, Entity, Component, Renderable, Colidable, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector, Mouse } from "../../Engine";

class mockMouse implements IPointerDevice {
    public cursorPosition: Vector = {x: 1, y: 1}
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const engine = new Engine(canvas, new mockMouse());

class Bubble extends Entity {
    constructor(arrayComponents: Array<Component>) {
        super(arrayComponents);
        this.addComponent(new Renderable("blue", Shape.circle, {width: 50, height:50}));
    }
}

const cw = canvas.width;
const ch = canvas.height;

const gravity: Vector = {x: 0, y: 0.01};

const bubble1 = engine.addEntity(new Bubble([new Colidable({x: 60, y: 200}, {x: 5, y: 0}, gravity)]));
const bubble2 = engine.addEntity(new Bubble([new Colidable({x: 60, y: 60}, {x: 6, y: -0.3}, gravity)]));
const bubble3 = engine.addEntity(new Bubble([new Colidable({x: cw - 60, y: 100}, {x: -5, y: 0}, gravity)]));

engine.changeBackground({color: "green"});

engine.init(() => {
    console.log("one loop passed")
    engine.entities.forEach(object => {
        if (object.getComponent(Colidable).position.x + 50 >= canvas.width || object.getComponent(Colidable).position.x -50 <= 0)
            object.getComponent(Colidable).velocity.x *= -1;
        if (object.getComponent(Colidable).position.y + 50 >= canvas.height || object.getComponent(Colidable).position.y -50 <= 0)
            object.getComponent(Colidable).velocity.y *= -1;
    })
});