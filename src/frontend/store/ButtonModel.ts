import { Action } from "./ActionModel";

export default class ButtonModel {
    public actions: Action[];
    public text: string;
    constructor(actions: Action[], text: string) {
        this.actions = actions;
        this.text = text;
    }
}
