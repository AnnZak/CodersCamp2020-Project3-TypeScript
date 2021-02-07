import Renderable from "../Components/Renderable";
import Colidable from "../Components/Colidable"; 
import Entity from "../Entity/Entity"

export default class RenderEngine {

    constructor(private _canvas: HTMLCanvasElement, private _ctx: CanvasRenderingContext2D | null) {
    }

    public render(entitiesArray: Array<Entity>): void {
        if(!this._ctx) {
            throw new Error("Canvas context is null / not found");
        }
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // czyści canvas

        for (const entity of entitiesArray) {
            try {
                const component = entity.getComponent(Renderable);
                const component1 = entity.getComponent(Colidable);

                if (component.texture) {
                    this._objectTexture(component1.position.x, component1.position.y, component.size.width, component.texture);  
                } else {
                    switch(component.shape) {
                        case "SQUARE":
                            this._drawSquare(component1.position.x, component1.position.y, component.size.width, component.size.height, component.color);
                            break;
                        default: 
                        this._drawCircle(component1.position.x, component1.position.y, component.size.width, component.color);
                    }
                }
            } catch (err) {
                console.error(`Could not find component of class Renderable in entity: ${entity.constructor.name}`);
            }
        }

    }

    private _drawSquare(x: number, y: number, width: number, height: number, color: string) {
        const square = new Path2D();
        square.rect(x-width/2, y-height/2, width, height);
        this._ctx!.fillStyle = color;
        this._ctx!.fill(square);
        this._ctx!.stroke(square);
    }

    private _drawCircle(x: number, y: number, width: number, color: string) {
        const circle = new Path2D();
        circle.arc(x, y, width/2, 0, 2 * Math.PI);
        this._ctx!.fillStyle = color;
        this._ctx!.fill(circle);        
    }

    private _objectTexture(x: number, y: number, width: number, texture: string) {
        const img = new Image();
        const ctx = this._ctx;
        img.addEventListener('load', function(e) {
            ctx!.drawImage(this, x-width/2, y-width/2, width, width);
            ctx!.fill();
        }, true);
        img.src = texture;
      }

}