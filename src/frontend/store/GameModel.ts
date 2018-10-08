import { action, computed, observable } from "mobx";
import { Action, newActionWait } from "./ActionModel";
import ButtonModel from "./ButtonModel";
import PlayerModel from "./PlayerModel";
import TileModel, { defaultWorld } from "./TileModel";

export default class GameModel {
    public player: PlayerModel;
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
        this.buttons = [new ButtonModel([newActionWait(1000)], "Wait a sec!")];
        this.elapsedTime = 0;
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
            case "WAIT": this.elapsedTime += a.millis;
        }
    }
}
