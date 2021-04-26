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

}