import { action, observable } from "mobx";
import GameModel from "./models/GameModel";

export class AppStore {
    @observable public game?: GameModel;
    constructor() {
        this.game = undefined;
    }
    @action public newGame(newPlayerName: string) {
        fetch("http://localhost:8080/new/" + newPlayerName)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok");
            }).then((r) => {
                this.game = new GameModel(r.id, r.playername, r.currenttile, r.chutzpah);
            }).catch((e) => {
                this.game = errorGame;
            });
    }
}

// This should actually throw an error!
export const errorGame = new GameModel("00000", "ERROR", -1, -1);