import { action, computed, observable } from "mobx";
import { Action, newActionAddMessage, newActionRemoveEffect } from "./ActionModel";

let currentId = 0;

// eventually ButtonType - Wait/Explore/Mine/Build etc

export default class ButtonModel {

  @computed get is_active() {
    return this.active;
  }
  public id: number;
  public engageActions: Action[];
  public completeActions: Action[];
  public text: string;
  public timeCost: number;
  @observable public clickedAt: number;
  @observable private active: boolean;
  constructor(engageActions: Action[], completeActions: Action[], text: string, timeCost: number) {
    this.id = currentId;
    currentId++;
    this.engageActions = engageActions;
    this.completeActions = completeActions;
    this.text = text;
    this.active = false;
    this.clickedAt = 0;
    this.timeCost = timeCost;
  }

  @action public toggle_active(now: number) {
    this.active = !this.active;
    this.clickedAt = now;
  }
}

export const FixTank = new ButtonModel(
  [newActionAddMessage("You hurl a nearby roll of auto-tape at the leaking tank.  The nanobots get to work.")],
  [newActionRemoveEffect("Leaky Tank")],
  "Engage emergency auto-tape",
  5000);
