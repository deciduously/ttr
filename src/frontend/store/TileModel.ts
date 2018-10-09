import { Action, newActionWait, newActionAddResource, newActionAddMessage } from "./ActionModel";
import ButtonModel from "./ButtonModel";

// A Tile carries with it several things:
// A set of Actions to trigger when it's added to the game
// A set of Buttons to add to the players Controls
// 

export default class TileModel {
    private id: number;
    public name: string;
    public actions: Action[];
    public buttons: ButtonModel[];
    constructor(id: number, name: string, actions: Action[], buttons: ButtonModel[]) {
        this.id = id;
        this.name = name;
        this.actions = actions;
        this.buttons = buttons;
    }
}

export const shipTile =
    new TileModel(
        0,
        "Ship",
        [newActionAddResource("Oxygen", 100), newActionAddMessage("Ah shit, you've crashed.")],
        [new ButtonModel([newActionWait(1)], "Wait one second")]
    );
