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
        let base = path.join(process.env.APPDATA ?? "AppdataNotFound", "Axolot Games", "Scrap Mechanic", "User");

        let USER_DIR = fs.readdirSync(base) // Get all files and directories
            .filter(dir => dir.match(/^User_\d+$/g)) // Check if it matches a Steam id
            .map(dir => path.join(base, dir, "ugccache.json")) // Combine the base, directory name and filename to be checked
            .filter(file => fs.existsSync(file))
            .sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime()) // Sort by modified date (high to low)
            .map(file => path.dirname(file))
            [0]; // Return the first

        console.log(USER_DIR);

        const modpack = new Modpack({ name: name, description: description });

        const dir = path.join(Core.getModpacksDirectory(), sanitize(name));

        if (fs.existsSync(dir)) throw "A modpack with that name already exists!";

        await fs.promises.mkdir(dir);

        await modpack.exportToDirectory(dir);
    }

}