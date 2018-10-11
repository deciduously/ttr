import { Action, newActionAddMessage, newActionAddResourceDelta, newActionAddResourceValue } from "./ActionModel";
import { newResource } from "./ResourceModel";

export class EffectModel {
    public name: string;
    public activateActions: Action[];
    public deactivateActions: Action[];
    constructor(name: string, activateActions: Action[], deactivateActions: Action[]) {
        this.name = name;
        this.activateActions = activateActions;
        this.deactivateActions = deactivateActions;
    }
}

export const LeakyTank =
    new EffectModel(
        "Leaky Tank",
        [newActionAddResourceValue(newResource("OXYGEN", 100)), newActionAddResourceDelta(newResource("OXYGEN", -1)), newActionAddMessage("Oxygen Tank Leaking!!")],
        [newActionAddResourceDelta(newResource("OXYGEN", 1)), newActionAddMessage("Tank repaired!")]
    );