import { action, computed, observable } from "mobx";
import { Action, newActionWait, newActionAddTile } from "./ActionModel";
import ButtonModel from "./ButtonModel";
import PlayerModel from "./PlayerModel";
import ResourceModel from "./ResourceModel";
import TileModel, { shipTile } from "./TileModel";

export default class GameModel {
    public player: PlayerModel;
    public resources: ResourceModel[];
    public world: TileModel[];
    private id: string;
    @observable private elapsedTime: number;
    private buttons: ButtonModel[];
    private messages: string[];
    constructor(id: string, name: string, currentTile: number, chutzpah: number) {
        this.id = id;
        this.player = new PlayerModel(name, chutzpah, currentTile);
        this.world = [];
        this.messages = [];
        this.buttons = [];
        this.elapsedTime = 0;
        this.resources = [];

        this.applyAction(newActionAddTile(shipTile));
    }
    get currentTime(): number {
        return this.elapsedTime;
    }
    get visibleButtons(): ButtonModel[] {
        return this.buttons;
    }
    get messagesLength(): number {
        return this.messages.length;
    }
    get lastFifteenMessages(): string[] {
        const len = this.messagesLength;
        const startIdx = (len <= 15) ? 0 : len - 15;
        return this.messages.slice(startIdx, len);
    }
    // big ol' reducer, redux-style
    public applyAction(a: Action) {
        switch (a.actionType) {
            case "ADD_MESSAGE": { this.messages.push(a.message); break; }
            case "ADD_RESOURCE": {
                this.resources.push(new ResourceModel(a.resource, a.amt));
                break;
            }
            case "ADD_TILE": {
                a.tile.actions.forEach((a) => this.applyAction(a));
                a.tile.buttons.map((b) => this.buttons.push(b));
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
    @action private tick() {
        this.elapsedTime += 1;
        this.resources.forEach((r) => r.tick());
    }
}
