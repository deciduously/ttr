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

export interface IActionNoop {
    actionType: "NOOP";
}

export interface IActionWait {
    actionType: "WAIT";
    millis: number;
}

export function newActionWait(duration: number): IActionWait {
    return {
        actionType: "WAIT",
        millis: duration,
    };
}

export type Action = IActionAddMessage | IActionNoop | IActionWait;
