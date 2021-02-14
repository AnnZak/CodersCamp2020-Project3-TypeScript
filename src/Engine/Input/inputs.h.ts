import { Vector } from "../Utils/vector.h"

export interface IPointerDevice {
    getCursorPosition(event: MouseEvent): Vector
}