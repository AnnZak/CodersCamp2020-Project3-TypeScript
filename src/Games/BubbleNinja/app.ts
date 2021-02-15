import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector, Mouse } from "../../Engine";
import Game from "./Game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

class mockMouse implements IPointerDevice {
    public cursorPosition: Vector = {x: 1100, y: 310}
}

const game = new Game(canvas, new mockMouse());
game.start();