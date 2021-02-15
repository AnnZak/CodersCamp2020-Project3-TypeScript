import { Vector } from "../../../Engine";

export { collisionCirclePoint };

function collisionCirclePoint(center: Vector, radius: number, point: Vector): boolean {
    return radius ** 2 >= (point.x - center.x) ** 2 + (point.y - center.y) ** 2;
}