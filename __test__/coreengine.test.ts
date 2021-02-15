/**
 * @jest-environment jsdom
 */

import CoreEngine from "../src/Engine/CoreEngine/CoreEngine";
import Entity from "../src/Engine/Entity/Entity";
import { Vector } from "../src/Engine/Utils/vector.h";
import { IPointerDevice } from "../src/Engine/Input/inputs.h";

describe("CoreEngine", () => {

    class GameObject extends Entity {};
    const obj1 = new GameObject();
    const obj2 = new GameObject();

    document.body.innerHTML = '<canvas id="canvas"></canvas>';
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;


    class mockMouse implements IPointerDevice {
        cursorPosition: Vector = {x: 1, y: 1}
    }

    const engine = new CoreEngine(canvas, new mockMouse());

    it("adds entities to array of entities", () => {
        expect(engine.entities).toStrictEqual([]);
        expect(engine.addEntity(obj1)).toBe(obj1);
        expect(engine.addEntity(obj2)).toBe(obj2);
        expect(engine.entities).toStrictEqual([obj1, obj2]);
    });

    it("removes entities from array of entities", () => {
        engine.removeEntity(obj1);
        expect(engine.entities).toStrictEqual([obj2]);
    });

    it("changes gamePaused property to true", () => {
        engine.pauseGame();
        expect(engine.gamePaused).toBeTruthy();
    });
  
});