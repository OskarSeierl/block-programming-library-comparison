import 'turbowarp-types';

declare module "scratch-blocks" {
    // Extend existing interfaces here!
    export interface Block {
        id: string;
        type: string;
        getFieldValue(name: string): any;
        getInput(name: string): any;
        getInputTargetBlock(name: string): any;
    }

    export interface Workspace {
        glowBlock(id: string, status: boolean): void;
        glowStack(id: string, status: boolean): void;
    }
}
