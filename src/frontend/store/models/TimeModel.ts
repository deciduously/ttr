import { action, computed, observable } from "mobx";
import { start } from "repl";

export default class TimeModel {
  @observable
  public isRunning: boolean;
  @observable
  private elapsedTime: number;
  constructor(initialTime = 0) {
    this.isRunning = false;
    this.elapsedTime = initialTime;
  }
  @computed
  public get display() {
    return (
      ((this.elapsedTime >= (1000 * 60 * 60))
        ? Math.floor(this.elapsedTime / (1000 * 60 * 60)) % (60 * 60) + "h"
        : "")
      + ((this.elapsedTime >= (1000 * 60))
        ? Math.floor((this.elapsedTime / (1000 * 60)) % 60) + "m"
        : "")
      + Math.floor((this.elapsedTime / 1000) % 60) + "s");
    // + ((this.elapsedTime / 10) % 100) + "ms"; -- hard ot look at?
  }
  @computed public get millis() {
    return this.elapsedTime;
  }
  @action
  public tick() {
    this.elapsedTime = this.elapsedTime += 10;
  }
}
