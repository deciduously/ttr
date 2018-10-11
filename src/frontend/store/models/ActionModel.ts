import { EffectModel } from "./EffectModel";
import { Resource } from "./ResourceModel";
import TileModel from "./TileModel";

/*
An Action will
    SetBoolFlag(BoolFlag),
    ClearBoolFlag(BoolFlag),
    //SetIntFlag(IntFlag, i64),
    //SetFloatFlag(FloatFlag, i64),
    DisableButton(ButtonID),
*/

export const ADD_MESSAGE = "ADD_MESSAGE";
export const NOOP = "NOOP";
export const WAIT = "WAIT";

export interface IActionAddEffect {
    actionType: "ADD_EFFECT";
    effect: EffectModel;
}

export function newActionAddEffect(e: EffectModel): IActionAddEffect {
    return {
        actionType: "ADD_EFFECT",
        effect: e,
    }
}

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

export interface IActionAddResourceValue {
    actionType: "ADD_RESOURCE_VALUE";
    resource: Resource;
}

export function newActionAddResourceValue(resource: Resource): IActionAddResourceValue {
    return {
        actionType: "ADD_RESOURCE_VALUE",
        resource: resource,
    }
}

export interface IActionSetResourceValue {
    actionType: "SET_RESOURCE_VALUE";
    resource: Resource;
}

export function newActionSetResourceValue(resource: Resource): IActionSetResourceValue {
    return {
        actionType: "SET_RESOURCE_VALUE",
        resource: resource,
    }
}

export interface IActionAddResourceDelta {
    actionType: "ADD_RESOURCE_DELTA";
    resource: Resource;
}

export function newActionAddResourceDelta(resource: Resource): IActionAddResourceDelta {
    return {
        actionType: "ADD_RESOURCE_DELTA",
        resource: resource,
    }
}

export interface IActionSetResourceDelta {
    actionType: "SET_RESOURCE_DELTA";
    resource: Resource;
}

export function newActionSetResourceDelta(resource: Resource): IActionSetResourceDelta {
    return {
        actionType: "SET_RESOURCE_DELTA",
        resource: resource,
    }
}

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

export interface IActionRemoveEffect {
    actionType: "REMOVE_EFFECT";
    name: string;
}

export function newActionRemoveEffect(s: string): IActionRemoveEffect {
    return {
        actionType: "REMOVE_EFFECT",
        name: s,
    }
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

export type Action
    = IActionAddEffect
    | IActionAddMessage
    | IActionAddResourceDelta
    | IActionAddResourceValue
    | IActionSetResourceDelta
    | IActionSetResourceValue
    | IActionAddTile
    | IActionNoop
    | IActionRemoveEffect
    | IActionWait;
