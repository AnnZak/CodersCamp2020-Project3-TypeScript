import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector, Mouse } from "../../Engine";

class mockMouse implements IPointerDevice {
    public cursorPosition: Vector = {x: 1, y: 1}
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const engine = new Engine(canvas, new mockMouse());

class Bubble extends Entity {
    constructor(position: Vector, velocity: Vector, arrayComponents: Array<Component> = []) {
        super([...arrayComponents,
            new CRenderable("blue", Shape.circle, {width: 50, height:50}),
            new CPosition(position),
            new CVelocity(velocity),
            new CGravity(gravity)
        ]);
    }
}

const cw = canvas.width;
const ch = canvas.height;

const gravity: Vector = {x: 0, y: 0};

engine.changeBackground({color: "ivory"});

let lastBubbleTime = 0;

engine.mainLoop((deltaTime) => {

    if(lastBubbleTime > 1000){
        lastBubbleTime = 0;
        engine.addEntity(new Bubble({x: 60, y: 200}, {x: 5, y: 0}));
    }
    lastBubbleTime += deltaTime;

    engine.entities.forEach(object => {
        if (object.getComponent(CPosition).x + 50 >= canvas.width || object.getComponent(CPosition).x -50 <= 0)
            object.getComponent(CVelocity).x *= -1;
        if (object.getComponent(CPosition).y + 50 >= canvas.height || object.getComponent(CPosition).y -50 <= 0)
            object.getComponent(CVelocity).y *= -1;
        if(25 ** 2 >= (engine.cursorPosition.x - object.getComponent(CPosition).x) ** 2 + (engine.cursorPosition.y - object.getComponent(CPosition).y) ** 2)
            engine.removeEntity(object);
    })
});