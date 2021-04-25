import fs from 'fs';

export namespace Core {
    let MODPACKS_DIR: string;
    
    export function setModpacksDirectory(dir: string) {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    
        MODPACKS_DIR = dir;
    }
    
    export function getModpacksDirectory(): string {
        if (!MODPACKS_DIR) throw "MODPACKS_DIR is not set! Use setModpacksDirectory(dir) first";
    
        return MODPACKS_DIR;
    }
    
    export function isInitialised(): boolean {
        return MODPACKS_DIR !== undefined;
    }
}