import { action, computed, observable } from 'mobx';

export class GameState {
  @observable name: string;
  constructor(s: string) {
    this.name = s;
  }
  @computed get getPlayerName(): string {
    return this.name;
  }
}

export class AppState {
  @observable game?: GameState;
  constructor() {
    // instead of setting game to undefined or null or whatever, do nothing
  }
  @computed get getName(): string {
    return this.game ? this.game.getPlayerName : "No active game";
  }
  @action newGame(s: string) {
    this.game = new GameState(s);
  }
}