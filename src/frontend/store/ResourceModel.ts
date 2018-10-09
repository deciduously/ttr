import { action, observable } from "mobx";

export default class ResourceModel {
    public name: string;
    @observable public value: number;
    @observable private delta: number; // is this how I wanna do this?  lets try it.
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