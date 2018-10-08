import ActionModel from "./ActionModel";

export default class ButtonModel {
    public actions: ActionModel[];
    public text: string;
    constructor(actions: ActionModel[], text: string) {
        this.actions = actions;
        this.text = text;
    }
}
