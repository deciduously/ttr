import { action, computed, observable } from 'mobx';

export class Game {
  id: string;
  playerName: string;
  currentTile: number;
  chutzpah: number;
  constructor(id: string, name: string, currentTile: number, chutzpah: number) {
    this.id = id;
    this.playerName = name;
    this.currentTile = currentTile;
    this.chutzpah = chutzpah;
  }
  get getPlayerName(): string {
    return this.playerName;
  }
}

export class AppState {
  @observable game?: Game;
  constructor() {
    // instead of setting game to undefined or null or whatever, do nothing
  }
  @computed get getName(): string {
    return this.game ? this.game.getPlayerName : "No active game"; // write a wrapper fn?
  }
  @computed get getChutzpah(): number {
    return this.game ? this.game.chutzpah : -1;
  }
  @computed get getCurrentTile(): number {
    return this.game ? this.game.currentTile : -1;
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
      }).catch(e => {
        console.log('Failed fetch operation: ', e.message)
      })
  }
}