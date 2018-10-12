import { action, computed, observable } from "mobx";
import ButtonModel from "./ButtonModel";

export default class ButtonsModel {
  @observable private buttons: ButtonModel[];
  constructor() {
    this.buttons = [];
  }
  @computed get activeButtons() {
    return this.buttons.filter((b) => b.is_active);
  }
  @computed get availableButtons() {
    return this.buttons.filter((b) => !b.is_active);
  }
  @action public addButton(b: ButtonModel) {
    this.buttons.push(b);
  }
  @action public removeButton(bid: number) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].id === bid) {
        this.buttons.splice(i, 1);
      }
    }
  }
  @action public toggleButton(buttonId: number, now: number) {
    this.buttons.forEach((b) => {
      if (b.id === buttonId) {
        b.toggle_active(now);
      }
    });
  }
}
