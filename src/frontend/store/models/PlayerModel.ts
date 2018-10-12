import { action, computed, observable } from "mobx";

export default class PlayerModel {
  public currentTile: number;
  public name: string;
  @observable private chutzpah: number;
  constructor(name: string, chutzpah: number, currentTile: number) {
    this.name = name;
    this.chutzpah = chutzpah;
    this.currentTile = currentTile;
  }
  @computed get getChutzpah(): number {
    return this.chutzpah;
  }
  @action public incrementChutzpah() {
    this.chutzpah += 1;
  }
}
