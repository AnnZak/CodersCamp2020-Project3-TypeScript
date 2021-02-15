import Renderable from "../Components/Renderable";
import Entity from "../Entity/Entity"
import { RenderSettings } from "../Utils/renderSettings.h";
import { CanvasBackground } from "../Utils/canvasBackground.h";
import { CPosition } from "../Components";

export default class RenderEngine {

    constructor(private _canvas: HTMLCanvasElement, private _ctx: CanvasRenderingContext2D, private settings?: RenderSettings) {
        this._canvas.width = 0;
        this._canvas.height = 0;
        if (settings) {
            this.settings = settings;
        }
        this._setupCanvasSize();
    }

    public render(entitiesArray: Array<Entity>): void {
        if(!this._ctx) {
            throw new Error("Canvas context is null / not found");
        }
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // czyści canvas

        for (const entity of entitiesArray) {
            try {
                const component = entity.getComponent(Renderable);
                const position = entity.getComponent(CPosition);

                if (component.img) {
                    this._objectTexture(position.x, position.y, component.size.width, component.img);  
                } else {
                    switch(component.shape) {
                        case "SQUARE":
                            this._drawSquare(position.x, position.y, component.size.width, component.size.height, component.color);
                            break;
                        default: 
                        this._drawCircle(position.x, position.y, component.size.width, component.color);
                    }
                }
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

    private _drawSquare(x: number, y: number, width: number, height: number, color: string) {
        const square = new Path2D();
        square.rect(x-width/2, y-height/2, width, height);
        this._ctx.fillStyle = color;
        this._ctx.fill(square);
        this._ctx.stroke(square);
    }

    private _drawCircle(x: number, y: number, width: number, color: string) {
        const circle = new Path2D();
        circle.arc(x, y, width/2, 0, 2 * Math.PI);
        this._ctx.fillStyle = color;
        this._ctx.fill(circle);        
    }

    private _objectTexture(x: number, y: number, width: number, img: HTMLImageElement) {
        this._ctx.drawImage(img, x-width/2, y-width/2, width, width);
        this._ctx.fill();
      }
}