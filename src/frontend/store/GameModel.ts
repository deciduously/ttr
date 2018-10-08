import { action, computed, observable } from "mobx";
import ActionModel from "./ActionModel";
import ButtonModel from "./ButtonModel";
import PlayerModel from "./PlayerModel";
import TileModel, { defaultWorld } from "./TileModel";

export default class GameModel {
    public player: PlayerModel;
    public world: TileModel[];
    private id: string;
    @observable private buttons: ButtonModel[];
    @observable private messages: string[];
    constructor(id: string, name: string, currentTile: number, chutzpah: number) {
        this.id = id;
        this.player = new PlayerModel(name, chutzpah, currentTile);
        this.world = defaultWorld;
        this.messages = [];
        this.buttons = [new ButtonModel([new ActionModel("Wait a sec-action!")], "Wait a sec!")];
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
    @action public addMessage(msg: string) {
        this.messages.push(msg);
    }
}
