/*
MIT License

Copyright (c) 2015 DWTechs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

https://github.com/DWTechs/CtrlTab.js
*/


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
    addCmd(name: string, ctrlKeys: CtrlKeys | null, keys: Array<string | number>, callback: Function, options: Options | null): Command;
    setCmd(name: string, ctrlKeys: CtrlKeys, keys: Array<string | number>): boolean;
    default(name: string): boolean;
    getCmd(name: string): Command | null;
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
    groupName?: string;
    scope?: any;
    repeat?: boolean; 
    [key: string]: string | boolean | this | undefined;
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
    listen(groupName: string): boolean;
    ignore(groupName: string): boolean;
    addCmd(commandName: string, ctrlKeys: CtrlKeys, keys: Array<string | number>, callback: Function, options: Options): Command;
    setInputs(groupName: string, commandName: string, ctrlKeys: CtrlKeys, keys: Array<string | number>): boolean;
    default(groupName: string, commandName: string): boolean;
    getGroup(name: string): Group | null;
    getCmd(groupName: string, commandName: string): Command | null;
}
