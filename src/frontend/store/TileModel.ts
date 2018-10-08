export default class TileModel {
    private id: number;
    private name: string;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    get getName() {
        return this.name;
    }
}

export const defaultWorld = [
    new TileModel(0, "Ship"),
];
