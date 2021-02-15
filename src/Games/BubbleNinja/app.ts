import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector, Mouse } from "../../Engine";
import Game from "./Game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const mouse = new Mouse(canvas);
const game = new Game(canvas, mouse, "MC");
game.start();