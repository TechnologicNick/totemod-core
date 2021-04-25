import { WorkshopMod, Description } from "scrap-mechanic-common";

export default class Totemod extends WorkshopMod {

    constructor(dir: string, description: Description, isFake: boolean = false, preview?: string) {
        super(dir, description, isFake, preview);
    }

    static fromWorkshopMod(workshopMod: WorkshopMod) {
        return new this(workshopMod.dir, workshopMod.description, workshopMod.isFake, workshopMod.preview);
    }

}
