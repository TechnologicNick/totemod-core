import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface Contributor {
    name: string;
    steamId64: string;
    url: {
        discord?: string;
        github?: string;
        steam?: string;
        website?: string
        youtube?: string;
    }[];
}

export interface Dependency {
    name: string;
    optional?: boolean;
    localId: string;
    preview?: string;
    steam?: {
        fileId: number;
    };
    thirdParty?: {
        provider: "github" | string;
        homepage: string;
        downloadUrl: string;
    }[];
}

export interface ModpackConfig {
    name: string;
    description: string;
    version: string;
    localId: string;

    modloader: string;

    author?: string;
    contributors: Contributor[];

    dependencies: Dependency[];
}

export class Modpack {
    dir!: string;
    config!: ModpackConfig;
    isInstalled: boolean | undefined;
    isBuilt: boolean | undefined;
    isPlayable: boolean | undefined;

    constructor(config?: ModpackConfig | {}) {
        console.log("Config", config);

        this.config = Object.assign({
            name: "Unnamed modpack",
            description: "This modpack has no description",
            version: "1.0.0",
            localId: uuidv4(),

            modloader: "totemod-core",

            contributors: [],

            dependencies: []
        }, config);
    }

    static async fromDirectory(dir: string) {
        const modpack = new Modpack({});
        modpack.dir = dir;

        await modpack.loadConfig();
    }

    async exportToDirectory(dir?: string ) {
        dir = dir ?? this.dir;

        await this.saveConfig(dir);
    }

    async loadConfig(dir?: string ) {
        dir = dir ?? this.dir;

        if (!dir) throw "No directory specified";

        const jsonPath = path.join(dir, "modpack.json");
        
        if (!jsonPath) throw `No modpack.json found in "${dir}"`;

        const config = JSON.parse(await (await fs.promises.readFile(jsonPath)).toString());
        
        return Object.assign(this.config, config);
    }

    async saveConfig(dir?: string ) {
        dir = dir ?? this.dir;

        if (!dir) throw "No directory specified";

        if (!fs.existsSync(dir)) throw `Modpack directory does not exist: "${dir}"`;

        const jsonPath = path.join(dir, "modpack.json");

        fs.promises.writeFile(jsonPath, JSON.stringify(this.config, null, '\t'));
    }

    addDependency(...dependency: Dependency[]) {
        return this.config.dependencies.push(...dependency)
    }

    setDependencies(dependencies: Dependency[]) {
        return this.config.dependencies = dependencies;
    }

    async checkInstalled() {
        console.log("Checking if all dependencies are installed...");

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isInstalled = false;
    }

    async install() {
        console.log("Faking install...");

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isInstalled = true;
    }

    async checkBuilt() {
        console.log("Checking if the modpack is built...");

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isBuilt = false;
    }

    async build() {
        console.log("Faking build...");

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isBuilt = true;
    }

}