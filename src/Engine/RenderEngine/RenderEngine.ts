import Renderable from "../Components/Renderable";
import Entity from "../Entity/Entity"
import { RenderSettings } from "../Utils/renderSettings.h";
import { CanvasBackground } from "../Utils/canvasBackground.h";

export default class RenderEngine {

    constructor(private _canvas: HTMLCanvasElement, private _ctx: CanvasRenderingContext2D | null, private settings?: RenderSettings) {
        this._canvas.width = 0;
        this._canvas.height = 0;
        this.settings = settings;
        this._setupCanvasSize();
    }

    private _setupCanvasSize(): void {

        this._canvas.width = document.body.clientWidth;
        this._canvas.height = document.body.clientHeight;

        if(this.settings) {
            if (this.settings.height || this.settings.width) {
                this._canvas.width = this.settings.width || 0;
                this._canvas.height = this.settings.height || 0;
                return;
            }
        }

        window.addEventListener('resize', () => {
            this._canvas.width = document.body.clientWidth;
            this._canvas.height = document.body.clientHeight;
        });
    }

    public render(entitiesArray: Array<Entity>): void {
        if(!this._ctx) {
            throw new Error("Canvas context is null / not found");
        }
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // czyści canvas

        for (const entity of entitiesArray) {
            try {
                const component = entity.getComponent(Renderable);
                component.drawSelf(this._ctx); // obiekty renderują się same (po wybraniu, czym chcą być)
            } catch (err) {
                console.error(`Could not find component of class Renderable in entity: ${entity.constructor.name}`);
            }
        }
    }

    public renderBackground(background: CanvasBackground): void {
        if (background.imagePath) {
            this._canvas.style.background = `url("${background.imagePath}")`;
            return;
        }
        
        if (background.gradient) {
            this._canvas.style.background = `${background.gradient}`;
            return;
        }
        
        if (background.color) {
            this._canvas.style.background = `${background.color}`;
            return;
        }
    }
}