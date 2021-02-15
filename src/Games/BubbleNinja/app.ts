import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector, Mouse, HandTracker } from "../../Engine";
import Game from "./Game";

const playButton: HTMLButtonElement = document.getElementById('play-button') as HTMLButtonElement;
const startel: HTMLElement = document.getElementById('content') as HTMLButtonElement;
startel.classList.add("content-not-visible");


playButton.addEventListener("click", e => {
    const container: HTMLElement = document.querySelector(".container") as HTMLElement;
    container.classList.add("content-not-visible");

    
    const el: HTMLElement = document.getElementById('content')!;
    el.classList.add("content-visible");



});

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const mouse = new Mouse(canvas);
const game = new Game(canvas, mouse,"MC");
game.start();
