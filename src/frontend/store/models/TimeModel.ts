import { action, computed, observable } from "mobx";

export default class TimeModel {
    @observable private elapsedTime: number;
    @observable public delta: number;
    constructor() {
        this.elapsedTime = 0;
        this.delta = 1;
    }
    @computed get time() {
        return this.elapsedTime;
    }
    @action adjustDelta(n: number) {
        this.elapsedTime += n
    }
    @action setDelta(n: number) {
        this.elapsedTime = n
    }
    @action tick() {
        this.elapsedTime += this.delta;
    }
}