import { Engine, Entity, Component, CRenderable, CPosition, CVelocity, CGravity, IPointerDevice, CanvasBackground, RenderSettings, Shape, Size, Vector, Mouse } from "../../Engine";
import Game from "./Game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const mouse = new Mouse(canvas);

const playButton: HTMLButtonElement = document.getElementById('play-button') as HTMLButtonElement;
const contentDiv: HTMLElement = document.getElementById('content') as HTMLButtonElement;
const cont: HTMLElement = document.getElementById('cont') as HTMLButtonElement;
const username = document.getElementById('username') as HTMLInputElement;

playButton.addEventListener("click", e => {
    const container: HTMLElement = document.querySelector(".container") as HTMLElement;
    container.classList.add("not-visible");

    const game = new Game(canvas, mouse, username.value);
    game.onGameEnd((points) => {
        contentDiv.innerHTML = `${points} points!`;
        cont.classList.remove("not-visible");
        cont.classList.add("flex-container");
        contentDiv.classList.remove("not-visible");
        contentDiv.classList.add("content-visible");
        window.setTimeout(() => {
            cont.classList.add("not-visible");
            contentDiv.classList.add("not-visible");
            container.classList.remove("not-visible");
        }, 5000);
    })

    game.start();
});