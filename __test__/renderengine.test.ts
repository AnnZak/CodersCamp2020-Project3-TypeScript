/**
 * @jest-environment jsdom
 */

import RenderEngine from "../src/Engine/RenderEngine/RenderEngine";

describe("RenderEngine", () => {
    document.body.innerHTML = '<canvas id="canvas"></canvas>';
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    
    it("creates canvas in size of full window if no size parameters are specified", () => {
        const re = new RenderEngine(canvas, context);
        expect(canvas.width).toEqual(document.body.clientWidth);
        expect(canvas.height).toEqual(document.body.clientHeight);
    });
    
    it("creates canvas in size of full window if no size parameters are specified", () => {
        const re = new RenderEngine(canvas, context, {});
        expect(canvas.width).toEqual(document.body.clientWidth);
        expect(canvas.height).toEqual(document.body.clientHeight);
    });
    
    it("creates canvas of width specified", () => {
        const re = new RenderEngine(canvas, context, {width: 100});
        expect(canvas.width).toEqual(100);
        expect(canvas.height).toEqual(0);
    });
    
    it("creates canvas of height specified", () => {
        const re = new RenderEngine(canvas, context, {height: 200});
        expect(canvas.width).toEqual(0);
        expect(canvas.height).toEqual(200);
    });
    
    it("creates canvas of width & height specified", () => {
        const re = new RenderEngine(canvas, context, {width: 300, height: 400});
        expect(canvas.width).toEqual(300);
        expect(canvas.height).toEqual(400);
    });
    
    // renderBackground()
    
    it("changes background to color red", () => {
        const re = new RenderEngine(canvas, context, {width: 300, height: 400});
        re.renderBackground({color: "red"});
        expect(canvas.style.background).toEqual("red");
    });
    
    // it("changes background to given gradient", () => {
    //     const re = new RenderEngine(canvas, context, {width: 300, height: 400});
    //     re.renderBackground({gradient: "linear-gradient(90deg, rgba(84,0,49,1) 0%, rgba(121,9,37,1) 35%, rgba(0,70,100,1) 100%);"});
    //     expect(canvas.style.background).toEqual("linear-gradient(90deg, rgba(84,0,49,1) 0%, rgba(121,9,37,1) 35%, rgba(0,70,100,1) 100%);");
    // });

    it("changes background to given image", () => {
        const re = new RenderEngine(canvas, context, {width: 300, height: 400});
        re.renderBackground({imagePath: "./img/forest.jpg"});
        expect(canvas.style.background).toEqual("url(./img/forest.jpg)");
    });

});