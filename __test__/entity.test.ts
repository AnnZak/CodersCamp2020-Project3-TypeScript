import Component from "../src/Engine/Components/Component";
import Entity from "../src/Engine/Entity/Entity";

class E1 extends Entity {}
class E2 extends Entity {}
class E3 extends Entity {}
class C1 extends Component {}
class C2 extends Component {}
class C3 extends Component {}

describe("Entity", () => {
    let e: E1;
    const c1 = new C1();
    const c2 = new C2();
    const c3 = new C3();
    const c4 = new C3();

    beforeEach(() => {
        e = new E1();
    });

    it("should have a unique ID", () =>{

        const e2 = new E2();
        const e3 = new E3();
        expect(e.id).toBe(0);
        expect(e2.id).toBe(1);
        expect(e3.id).toBe(2);
    });

    it("should add, remove, get, and check components", () => {
        expect(e.components.length).toBe(0);

        e.addComponent(c1);
        e.addComponent(c2);
        e.addComponent(c3);

        // expect(e1.components.length).toBe(3);
        // expect(e1.components[0]).toBe(c1);
        // expect(e1.components[1]).toBe(c2);
        // expect(e1.components[2]).toBe(c3);
        expect(e.components).toStrictEqual([c1, c2, c3]);

        e.removeComponent(C2);

        expect(e.components).toStrictEqual([c1, c3]);

        expect(e.getComponent(C1)).toBe(c1);
        expect(e.getComponent(C3)).toBe(c3);

        expect(e.hasComponent(C1)).toBeTruthy();
        expect(e.hasComponent(C3)).toBeTruthy();
    });

    // it("should overwrite component of the same class"), () => {
    //     e.addComponent(c3);
    //     expect(e.getComponent(C3)).toBe(c3);

    //     e.addComponent(c4);
    //     expect(e.getComponent(C3)).toBe(c4);
    //     expect(e.components.length).toBe(1);
    // }

    it("should throw error if component has not been found", () => {
        expect(e.hasComponent(C1)).toBeFalsy();
        expect(() => e.getComponent(C1)).toThrowError();
    });
})