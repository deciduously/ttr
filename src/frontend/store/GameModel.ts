import { action, computed, observable } from "mobx";
import PlayerModel from "./PlayerModel";
import TileModel from "./TileModel";

export default class GameModel {
    public id: string;
    @observable public messages: string[];
    public player: PlayerModel;
    public world: TileModel[];
    constructor(id: string, name: string, currentTile: number, chutzpah: number) {
        this.id = id;
        this.player = new PlayerModel(name, chutzpah, currentTile);
        this.world = [new TileModel(0)];
        this.messages = [];
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
