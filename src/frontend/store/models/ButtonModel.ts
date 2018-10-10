import { action, computed, observable } from "mobx";
import { Action, newActionWait, newActionRemoveEffect } from "./ActionModel";

var currentId = 0;

// eventually ButtonType - Wait/Explore/Mine/Build etc

export class ButtonModel {
    public id: number;
    public actions: Action[];
    public text: string;
    @observable private active: boolean;
    constructor(actions: Action[], text: string) {
        this.id = currentId;
        currentId++;
        this.actions = actions;
        this.text = text;
        this.active = false;
    }

    @computed get is_active() {
        return this.active;
    }

    @action public toggle_active() {
        this.active = !this.active;
    }
}

export class ButtonsModel {
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
    @action addButton(b: ButtonModel) {
        this.buttons.push(b);
    }
    @action public toggleButton(buttonId: number) {
        this.buttons.forEach((b) => {
            if (b.id === buttonId) {
                b.toggle_active();
            }
        })
    }
}

export const Wait = (n: number) => new ButtonModel([newActionWait(n)], "Wait " + n + " s");

export const FixTank = new ButtonModel([newActionRemoveEffect("Leaky Tank")], "Fix that shizz");