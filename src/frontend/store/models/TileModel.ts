import { Action, newActionAddEffect, newActionAddMessage } from "./ActionModel";
import ButtonModel, { FixTank } from "./ButtonModel";
import { LeakyTank } from "./EffectModel";

// A Tile carries with it several things:
// A set of Actions to trigger when it's added to the game
// A set of Buttons to add to the players Controls

export default class TileModel {
  public name: string;
  public mapChar: string;
  public actions: Action[];
  public buttons: ButtonModel[];
  private id: number;
  constructor(id: number, name: string, mapChar: string, actions: Action[], buttons: ButtonModel[]) {
    this.id = id;
    this.name = name;
    this.mapChar = mapChar;
    this.actions = actions;
    this.buttons = buttons;
  }
}

export const shipTile =
  new TileModel(
    0,
    "Ship",
    "^",
    [newActionAddEffect(LeakyTank), newActionAddMessage("Ah shit, you've crashed.")],
    [FixTank],
  );
