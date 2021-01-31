
export declare class Command {
    name: string;
    private callback;
    inputs: Inputs;
    defaultInputs: DefaultInputs;
    private pressed;
    constructor(name: string, ctrlKeys: CtrlKeys | null, keys: Array<string | number>, callback: Function, options: Options | null);
    start(a: KeyboardEvent): boolean;
    stop(key: number): boolean;
    setInputs(ctrlKeys: CtrlKeys, keys: Array<string | number>): boolean;
    default(): void;
    private static getAsciiCodes;
    private static inputValidation;
    private static toASCII;
}

export declare class DefaultInputs {
    asciiCodes: number[];
    ctrlKeys: CtrlKeys;
    constructor(ctrlKeys: CtrlKeys | null, asciiCodes: number[]);
    private setCtrlKeys;
}

export declare class Group {
    name: string;
    watch: boolean;
    private commands;
    constructor(name: string);
    down(a: KeyboardEvent): void;
    up(key: number): void;
    addCommand(name: string, ctrlKeys: CtrlKeys | null, keys: Array<string | number>, callback: Function, options: Options | null): Command;
    setInputs(name: string, ctrlKeys: CtrlKeys, keys: Array<string | number>): boolean;
    default(name: string): boolean;
    getCommand(name: string): Command | null;
    private static sortCommands;
}
export declare class Input {
    pressed: boolean;
    constructor();
    down(a: KeyboardEvent, preventDefault: boolean): void;
    up(): void;
}

export declare class Inputs {
    length: number;
    private keys;
    private ctrlKeys;
    private preventDefault;
    constructor(ctrlKeys: CtrlKeys, asciiCodes: number[], preventDefault: boolean);
    start(a: KeyboardEvent): boolean;
    stop(key: number): boolean;
    setCtrlKeys(ctrlKeys: CtrlKeys): void;
    setKeys(asciiCodes: number[]): void;
}

export interface CtrlKeys {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    [key: string]: boolean | undefined;
}
export interface Options {
    preventDefault?: boolean;
    scope?: this;
    [key: string]: boolean | this | undefined;
}
export interface Keys {
    [key: number]: Input;
}

export declare class Keyboard {
    private groups;
    constructor();
    private initListeners;
    down(a: KeyboardEvent): void;
    up(a: KeyboardEvent): void;
    watch(groupName: string): boolean;
    ignore(groupName: string): boolean;
    addCommand(groupName: string, commandName: string, ctrlKeys: CtrlKeys, keys: Array<string | number>, callback: Function, scope: any): Command;
    setInputs(groupName: string, commandName: string, ctrlKeys: CtrlKeys, keys: Array<string | number>): boolean;
    default(groupName: string, commandName: string): boolean;
    getGroup(name: string): Group | null;
    getCommand(groupName: string, commandName: string): Command | null;
}
