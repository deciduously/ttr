import { EffectModel } from "./EffectModel";
import TileModel from "./TileModel";

/*
An Action will
    AddMessage(String), - done
    SetBoolFlag(BoolFlag),
    ClearBoolFlag(BoolFlag),
    SetResourceValue(Resource, i64), - done
    AddResourceValue(Resource, i64),
    AddResourceDelta(Resource, i64), - done as Set
    //SetIntFlag(IntFlag, i64),
    //SetFloatFlag(FloatFlag, i64),
    EnableButton(ButtonID), - done
    DisableButton(ButtonID),
    AddTile(TileID), - done
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

export interface IActionSetResourceValue {
    actionType: "SET_RESOURCE_VALUE";
    resource: string;
    amt: number;
}

export function newActionSetResourceValue(resource: string, amt: number): IActionSetResourceValue {
    return {
        actionType: "SET_RESOURCE_VALUE",
        resource: resource,
        amt: amt
    }
}

export interface IActionSetResourceDelta {
    actionType: "SET_RESOURCE_DELTA";
    resource: string;
    delta: number;
}

export function newActionSetResourceDelta(resource: string, delta: number): IActionSetResourceDelta {
    return {
        actionType: "SET_RESOURCE_DELTA",
        resource: resource,
        delta: delta,
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
    | IActionSetResourceDelta
    | IActionSetResourceValue
    | IActionAddTile
    | IActionNoop
    | IActionRemoveEffect
    | IActionWait;
