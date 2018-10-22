import { action, observable } from "mobx";
import {
  Action,
  newActionAddMessage,
  newActionSetResourceValue,
} from "./ActionModel";
import ButtonsModel from "./ButtonsModel";
import { EffectModel } from "./EffectModel";
import PlayerModel from "./PlayerModel";
import ResourceModel from "./ResourceModel";
import TileModel from "./TileModel";
import TimeModel from "./TimeModel";

export default class GameModel {
  get messagesLength(): number {
    return this.messages.length;
  }
  get lastFifteenMessages(): string[] {
    const len = this.messagesLength;
    const startIdx = len <= 15 ? 0 : len - 15;
    return this.messages.slice(startIdx, len);
  }
  public player: PlayerModel;
  @observable
  public resources: ResourceModel[];
  public world: TileModel[];
  public buttons: ButtonsModel;
  @observable
  public gameTime: TimeModel;
  private id: string;
  @observable
  private effects: EffectModel[];
  @observable private messages: string[];
  constructor(id: string, name: string, currentTile: number, chutzpah: number) {
    // first, stuff we're passed in
    this.id = id;
    this.player = new PlayerModel(name, chutzpah, currentTile);

    // Everything else starts empty
    this.world = [];
    this.messages = [];
    this.effects = [];
    this.buttons = new ButtonsModel();
    this.gameTime = new TimeModel();
    this.resources = [];

    this.startGame();
  }
  // big ol' reducer, redux-style?
  // i guess it's a hard habit to break
  public applyAction(a: Action) {
    switch (a.actionType) {
      case "ADD_EFFECT": {
        a.effect.activateActions.forEach((aAction) => {
          this.applyAction(aAction);
        });
        this.effects.push(a.effect);
        break;
      }
      case "ADD_MESSAGE": {
        this.messages.push(a.message);
        break;
      }
      case "REMOVE_EFFECT": {
        this.effects.forEach((eff) => {
          if (eff.name === a.name) {
            eff.deactivateActions.forEach((aAction) => {
              this.applyAction(aAction);
            });
          }
        });
        break;
      }
      case "ADD_RESOURCE_DELTA": {
        this.resources.forEach((r) => {
          return r.name === a.resource.resourceType
            ? r.adjustDelta(a.resource.resource.getValue)
            : r;
        });
        break;
      }
      case "SET_RESOURCE_DELTA": {
        this.resources.forEach(
          (r) =>
            r.name === a.resource.resourceType
              ? r.setDelta(a.resource.resource.getValue)
              : r,
        );
        break;
      }
      case "ADD_RESOURCE_VALUE": {
        let needToAdd = true;
        this.resources.forEach((e) => {
          if (e.name === a.resource.resourceType) {
            needToAdd = false;
            e.adjustValue(a.resource.resource.getValue);
          }
        });
        if (needToAdd) {
          this.applyAction(newActionSetResourceValue(a.resource));
        }
        break;
      }
      case "SET_RESOURCE_VALUE": {
        this.resources.push(a.resource.resource);
        break;
      }
      case "ADD_TILE": {
        a.tile.actions.forEach((tAction) => this.applyAction(tAction));
        a.tile.buttons.map((b) => this.buttons.addButton(b));
        this.world.push(a.tile);
        break;
      }
      case "NOOP":
        break;
    }
  }
  @action
  public applyButton(bId: number) {
    this.buttons.availableButtons.forEach((b) => {
      if (bId === b.id) {
        // Nope this should go when its done.
        // TO active, awe hjust kick off the counter
        b.engageActions.forEach((a) => this.applyAction(a));
        b.toggle_active(this.gameTime.millis);
      }
    });
  }
  @action
  public move(s: string) {
    console.log("moving: " + s);
  }
  @action
  public toggleRunning() {
    this.gameTime.isRunning = !this.gameTime.isRunning;
    if (this.gameTime.isRunning) { this.tick(); }
  }
  @action
  private checkButtons() {
    this.buttons.activeButtons.forEach((b) => {
      if (!b.is_active) { return; }
      if (b.timeCost === 0) {
        b.completeActions.forEach((a) => {
          this.applyAction(a);
        });
        this.buttons.removeButton(b.id);
      } else {
        b.timeCost -= 10;
      }
    });
  }
  @action
  private startGame() {
    this.applyAction(
      newActionAddMessage(
        "A pop, a low hiss, everything goes black for a moment - 30 seconds, maybe?   You can't tell.",
      ),
    );
    this.applyAction(
      newActionAddMessage(
        "You come to and everything around you has changed...  Your head aches and you're thirsty.",
      ),
    );
    this.toggleRunning();
  }
  @action
  private tick() {
    if (!this.gameTime.isRunning) {
      return;
    }
    this.checkButtons();
    this.resources.forEach((r) => {
      if (this.gameTime.millis - r.lastTick > 1000) {
        r.tick();
        r.lastTick = this.gameTime.millis;
      }
    });
    this.gameTime.tick();
    // Going to start at 100 updates/second
    setTimeout(() => this.tick(), 10);
  }
}
