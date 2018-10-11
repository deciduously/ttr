import { action, computed, observable } from "mobx";

export default class ResourceModel {
    public name: string;
    @observable private value: number;
    @observable private delta: number;
    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
        this.delta = 0;
    }
    @computed get getValue() {
        return this.value;
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
    @action public adjustValue(n: number) {
        this.value += n;
    }
    @action public setValue(n: number) {
        this.value = n;
    }
}

export interface IResourceOxygen {
    resourceType: "OXYGEN";
    resource: ResourceModel;
}

export interface IResourcePower {
    resourceType: "POWER";
    resource: ResourceModel;
}

export type Resource
    =
    IResourceOxygen
    | IResourcePower;

export function newResource(s: string, amt: number): Resource {
    console.log("making new resource " + s);
    switch (s) {
        case "OXYGEN": {
            return {
                resourceType: "OXYGEN", resource: new ResourceModel(s, amt)
            };
        }
        case "POWER": {
            return { resourceType: "POWER", resource: new ResourceModel(s, amt) };
        }
        default: {
            throw new Error("That's not a real resource!");
        }
    }
}