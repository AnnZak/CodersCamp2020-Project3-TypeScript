import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector, Mouse } from "../../Engine";
import Game from "./Game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const mouse = new Mouse(canvas);

const playButton: HTMLButtonElement = document.getElementById('play-button') as HTMLButtonElement;
const startel: HTMLElement = document.getElementById('content') as HTMLButtonElement;
const username = document.getElementById('username') as HTMLInputElement;

playButton.addEventListener("click", e => {
    const container: HTMLElement = document.querySelector(".container") as HTMLElement;
    container.classList.add("content-not-visible");

    const game = new Game(canvas, mouse, username.value);
    game.onGameEnd((points) => {
        
        console.log(points);
    })

    const el: HTMLElement = document.getElementById('content')!;
    el.classList.add("content-visible");
    game.start();
});