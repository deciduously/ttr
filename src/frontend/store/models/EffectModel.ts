import { Action, newActionAddMessage, newActionSetResourceDelta, newActionSetResourceValue } from "./ActionModel";

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
        [newActionSetResourceValue("Oxygen", 100), newActionSetResourceDelta("Oxygen", -1), newActionAddMessage("Oxygen Tank Leaking!!")],
        [newActionSetResourceDelta("Oxygen", +1), newActionAddMessage("Tank repaired!")]
    );