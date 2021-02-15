import Entity from "../Entity/Entity";

export default abstract class Component {
    public entity: Entity | null = null;
}