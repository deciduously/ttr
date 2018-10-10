import { action, observable } from "mobx";

export default class ResourceModel {
    public name: string;
    @observable public value: number;
    @observable private delta: number;
    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
        this.delta = 0;
    }
    @action public tick() {
        this.value > 0 ? this.value += this.delta : this.value = 0;
    }
    @action public adjustDelta(n: number) {
        this.delta += n;
    }
    @action public setDelta(n: number) {
        this.delta = n;
    }
}

export interface IResourceOxygen {
    resourceType: "OXYGEN";
    resource: ResourceModel;
}

export interface IResourcePower {
    resourceTyle: "POWER";
    resource: ResourceModel
}

export type Resource
    =
    IResourceOxygen
    | IResourcePower;