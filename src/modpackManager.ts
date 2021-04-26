import path from 'path';
import { Modpack } from './modpack'
import { Core } from './core';
import sanitize from 'sanitize-filename';
import fs from 'fs';

export default class ModpackManager {
    static modpacks: {
        [localId: string]: Modpack;
    } = {};

    static async createModpack(name: string, description: string) {
        const modpack = new Modpack({ name: name, description: description });

        const dir = path.join(Core.getModpacksDirectory(), sanitize(name));

        if (fs.existsSync(dir)) throw "A modpack with that name already exists!";

        await fs.promises.mkdir(dir);

        await modpack.exportToDirectory(dir);
    }

    static async reloadModpacks() {
        // Clear ModpackManager.modpacks first
        for (let localId in this.modpacks) delete this.modpacks[localId];

        let modpackCount = 0;

        for (let dirname of await fs.promises.readdir(Core.getModpacksDirectory())) {
            let dir = path.join(Core.getModpacksDirectory(), dirname);
            let modpackJson = path.join(dir, "modpack.json");

            if (!fs.existsSync(modpackJson)) {
                console.warn(`Directory in modpacks directory is not a modpack: "${dir}"`);
                continue;
            }

            let modpack = new Modpack();
            modpack.dir = dir;
            modpack.loadConfig();

            this.modpacks[modpack.config.localId] = modpack;

            modpackCount++;
        }

        console.log(`Loaded ${modpackCount} modpack${modpackCount === 1 ? '' : 's'}`);

        return modpackCount;
    }

}