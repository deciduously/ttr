import { action, computed, observable } from "mobx";
import { Action, newActionAddTile, newActionSetResourceValue } from "./ActionModel";
import { ButtonsModel } from "./ButtonModel";
import PlayerModel from "./PlayerModel";
import ResourceModel, { newResource } from "./ResourceModel";
import TileModel, { shipTile } from "./TileModel";
import TimeModel from "./TimeModel";
import { EffectModel } from "./EffectModel";

export default class GameModel {
    public player: PlayerModel;
    @observable public resources: ResourceModel[];
    public world: TileModel[];
    private id: string;
    @observable private effects: EffectModel[];
    @observable private gameTime: TimeModel;
    public buttons: ButtonsModel;
    private messages: string[];
    constructor(id: string, name: string, currentTile: number, chutzpah: number) {
        // first, stuff we're passed in
        this.id = id;
        this.player = new PlayerModel(name, chutzpah, currentTile);

        // Everything else starts empty
        this.world = [];
        this.messages = [];
        this.effects = [];
        this.buttons = new ButtonsModel;
        this.gameTime = new TimeModel;
        this.resources = [];
    }
    @computed get currentTime(): number {
        return this.gameTime.time;
    }
    get messagesLength(): number {
        return this.messages.length;
    }
    get lastFifteenMessages(): string[] {
        const len = this.messagesLength;
        const startIdx = (len <= 15) ? 0 : len - 15;
        return this.messages.slice(startIdx, len);
    }
    // big ol' reducer, redux-style?
    // i guess it's a hard habit to break
    public applyAction(a: Action) {
        console.log(a.actionType);
        switch (a.actionType) {
            case "ADD_EFFECT": {
                a.effect.activateActions.forEach(action => {
                    this.applyAction(action);
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
                        eff.deactivateActions.forEach(action => {
                            this.applyAction(action);
                        });
                    }
                });
                break;
            }
            case "ADD_RESOURCE_DELTA": {
                this.resources.forEach((r) =>
                    r.name === a.resource.resourceType ? r.adjustDelta(a.resource.resource.getValue) : r
                );
                break;
            }
            case "SET_RESOURCE_DELTA": {
                this.resources.forEach((r) =>
                    r.name === a.resource.resourceType ? r.setDelta(a.resource.resource.getValue) : r);
                break;
            }
            case "ADD_RESOURCE_VALUE": {
                var need_to_add = true;
                this.resources.forEach((e) => {
                    if (e.name === a.resource.resourceType) {
                        need_to_add = false;
                        e.adjustValue(a.resource.resource.getValue);
                    }
                });
                if (need_to_add) {
                    this.applyAction(newActionSetResourceValue(a.resource));
                }
                break;
            }
            case "SET_RESOURCE_VALUE": {
                this.resources.push(a.resource.resource);
                break;
            }
            case "ADD_TILE": {
                a.tile.actions.forEach((a) => this.applyAction(a));
                a.tile.buttons.map((b) => this.buttons.addButton(b));
                this.world.push(a.tile);
                break;
            };
            case "NOOP": break;
            case "WAIT": {
                for (var i = 0; i < a.seconds; i++) {
                    this.tick();
                }
                break;
            };
        }
    }
    @action public applyButton(bId: number) {
        this.buttons.availableButtons.forEach((b) => {
            if (bId === b.id) {
                b.actions.forEach((a) => this.applyAction(a));
                b.toggle_active();
            }
        });
    }
    @action private tick() {
        this.gameTime.tick();
        for (var i = 0; i < this.gameTime.delta; i++) {
            this.resources.forEach((r) => r.tick());
        }
    }
}
