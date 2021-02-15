import PhysicsEngine from "../src/Engine/PhysicsEngine/PhysicsEngine";
import {CPosition, CVelocity, CGravity} from "../src/Engine/Components";
import Entity from "../src/Engine/Entity/Entity";

class E extends Entity {};

describe("PhysicsEngine", () => {
    const physicsEngine = new PhysicsEngine();
    const e1 = new E([new CPosition({x:0, y:0}), new CVelocity({x:1, y:1}), new CGravity({x:1, y:1})]);
    const e2 = new E([new CPosition({x:2, y:2}), new CVelocity({x:1, y:1}), new CGravity({x:1, y:1})]);
    const position1 = e1.getComponent(CPosition);
    const position2 = e2.getComponent(CPosition);
    const velocity1 = e1.getComponent(CVelocity);
    const velocity2 = e2.getComponent(CVelocity);

    physicsEngine.updatePosition([e1,e2]);

    it("should update position", () => {
        expect(position1.x).toEqual(1);
        expect(position1.y).toEqual(1);
        expect(position2.x).toEqual(3);
        expect(position2.y).toEqual(3);
    })

    it("should update velocity", () => {
        expect(velocity1.x).toEqual(2);
        expect(velocity1.y).toEqual(2);
        expect(velocity2.x).toEqual(2);
        expect(velocity2.y).toEqual(2);
    })
})