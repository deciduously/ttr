import TileModel from "./TileModel";

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

export const ADD_MESSAGE = "ADD_MESSAGE";
export const NOOP = "NOOP";
export const WAIT = "WAIT";

export interface IActionAddMessage {
    actionType: "ADD_MESSAGE";
    message: string;
}

export function newActionAddMessage(msg: string): IActionAddMessage {
    return {
        actionType: "ADD_MESSAGE",
        message: msg,
    };
}

export interface IActionAddResource {
    actionType: "ADD_RESOURCE";
    resource: string;
    amt: number;
}

export function newActionAddResource(resource: string, amt: number): IActionAddResource {
    return {
        actionType: "ADD_RESOURCE",
        resource: resource,
        amt: amt
    }
}

export interface IActionAddResourceDelta {
    actionType: "ADD_RESOURCE_DELTA"
    resource: string;
    delta: number;
}

// TODO ActionAddResourceDelta

export interface IActionAddTile {
    actionType: "ADD_TILE";
    tile: TileModel;
}

export function newActionAddTile(t: TileModel): IActionAddTile {
    return {
        actionType: "ADD_TILE",
        tile: t,
    }
}

export interface IActionNoop {
    actionType: "NOOP";
}

export interface IActionWait {
    actionType: "WAIT";
    seconds: number;
}

export function newActionWait(duration: number): IActionWait {
    return {
        actionType: "WAIT",
        seconds: duration,
    };
}

export type Action = IActionAddMessage | IActionAddResource | IActionAddTile | IActionNoop | IActionWait;
