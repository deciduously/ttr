import { action, computed, observable } from 'mobx';

export class PlayerModel {
    name: string;
    @observable chutzpah: number;
    @computed get getChutzpah(): number {
        return this.chutzpah;
    }
    @action incrementChutzpah() {
        this.chutzpah += 1;
    }
    currentTile: number;
    constructor(name: string, chutzpah: number, currentTile: number) {
        this.name = name;
        this.chutzpah = chutzpah;
        this.currentTile = currentTile;
    }
}

export class Game {
    id: string;
    player: PlayerModel;
    @observable messages: string[];
    @computed get messagesLength(): number {
        return this.messages.length;
    }
    @computed get lastFifteenMessages(): string[] {
        const len = this.messagesLength;
        const start_idx = (len <= 15) ? 0 : len - 15;
        return this.messages.slice(start_idx, len);
    }
    @action addMessage(msg: string) {
        this.messages.push(msg);
    }
    world: TileModel[];
    constructor(id: string, name: string, currentTile: number, chutzpah: number) {
        this.id = id;
        this.player = new PlayerModel(name, chutzpah, currentTile);
        this.world = [new TileModel(0)];
        this.messages = [];
    }
}

export class TileModel {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}

export class AppStore {
    @observable game?: Game;
    constructor() {
        this.game = undefined;
    }
    @action newGame(newPlayerName: string) {
        fetch('http://localhost:8080/new/' + newPlayerName)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Network response was not ok')
            }).then(r => {
                this.game = new Game(r.id, r.playername, r.currenttile, r.chutzpah);
                this.game.addMessage('Well shit, you crashed.');
            }).catch(e => {
                console.log('Failed fetch operation: ', e.message)
            })
    }
}

// This should actually throw an error!
export const errorGame = new Game("00000", "ERROR", -1, -1);