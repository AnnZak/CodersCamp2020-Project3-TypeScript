import {CPosition, CVelocity, CGravity} from "../Components";
import Entity from "../Entity/Entity";

export default class PhysicsEngine {

    public updatePosition(entitiesArray: Array<Entity>) : void {
        for (const entity of entitiesArray) {

            const position = entity.getComponent(CPosition);
            const velocity = entity.getComponent(CVelocity);
            
            position.x += velocity.x;
            position.y += velocity.y;

            if(entity.hasComponent(CGravity)){
                const gravity = entity.getComponent(CGravity);
                velocity.y += gravity.y;
                velocity.x += gravity.x;
            }
        }
    }
}

