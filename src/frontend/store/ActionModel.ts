/*
An Action will
    AddMessage(String),
    SetBoolFlag(BoolFlag),
    ClearBoolFlag(BoolFlag),
    SetResourceValue(Resource, i64),
    AddResourceValue(Resource, i64),
    AddResourceDelta(Resource, i64),
    //SetIntFlag(IntFlag, i64),
    //SetFloatFlag(FloatFlag, i64),
    EnableButton(ButtonID),
    DisableButton(ButtonID),
    AddTile(TileID),\
*/

export default class ActionModel {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}
