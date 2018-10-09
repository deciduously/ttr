import { action, computed, observable } from "mobx";
import { Action, newActionWait } from "./ActionModel";
import ButtonModel from "./ButtonModel";
import PlayerModel from "./PlayerModel";
import ResourceModel from "./ResourceModel";
import TileModel, { defaultWorld } from "./TileModel";

export default class GameModel {
    public player: PlayerModel;
    public resources: ResourceModel[];
    public world: TileModel[];
    private id: string;
    @observable private elapsedTime: number;
    @observable private buttons: ButtonModel[];
    @observable private messages: string[];
    constructor(id: string, name: string, currentTile: number, chutzpah: number) {
        this.id = id;
        this.player = new PlayerModel(name, chutzpah, currentTile);
        this.world = defaultWorld;
        this.messages = [];
        this.buttons = [new ButtonModel([newActionWait(5)], "Wait five seconds"), new ButtonModel([newActionWait(1)], "Wait one second")];
        this.elapsedTime = 0;
        this.resources = [new ResourceModel("Oxygen", 100)];
        this.resources[0].setDelta(-1);
    }
    @computed get currentTime(): number {
        return this.elapsedTime;
    }
    @computed get visibleButtons(): ButtonModel[] {
        return this.buttons;
    }
    @computed get messagesLength(): number {
        return this.messages.length;
    }
    @computed get lastFifteenMessages(): string[] {
        const len = this.messagesLength;
        const startIdx = (len <= 15) ? 0 : len - 15;
        return this.messages.slice(startIdx, len);
    }
    // big ol' reducer, redux-style
    @action public applyAction(a: Action) {
        switch (a.actionType) {
            case "ADD_MESSAGE": this.messages.push(a.message);
            case "NOOP": break;
            case "WAIT": {
                for (var i = 0; i < a.seconds; i++) {
                    this.tick();
                }
            };
        }
    }
    @action private tick() {
        this.elapsedTime += 1;
        this.resources.forEach((r) => r.tick());
    }
}
