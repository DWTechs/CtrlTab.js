import { isInteger, isAscii } from "@dwtechs/checkhard";
import { Inputs } from "./inputs";
import { DefaultInputs } from "./defaultInputs";
import { CtrlKeys, Options } from "./interfaces";

export class Command {
  public name: string;
  private callback: Function;
  public inputs: Inputs;
  public defaultInputs: DefaultInputs;
  private pressed: boolean;
  private repeat: boolean;

  constructor(
    name: string,
    ctrlKeys: CtrlKeys | null,
    keys: Array<string | number>,
    callback: Function,
    options: Options | null
  ) {
    this.name = name;
    this.pressed = false;
    let asciiCodes = Command.getAsciiCodes(keys);
    if (asciiCodes) {
      this.defaultInputs = new DefaultInputs(ctrlKeys, asciiCodes);
      this.inputs = new Inputs(
        this.defaultInputs.ctrlKeys,
        asciiCodes,
        options?.preventDefault ? true : false
      );
      this.repeat = options?.repeat ? true : false;
      this.callback = callback;
      if (options?.scope) {
        this.callback = this.callback.bind(options.scope);
      }
    }
  }

  public start(a: KeyboardEvent): boolean {
    if (!this.repeat && this.pressed) {
      return false;
    }
    if (this.inputs.start(a)) {
      this.pressed = true;
      this.callback(this.pressed);
      return this.pressed;
    }
    return false;
  }

  public stop(key: number): boolean {
    if (this.pressed && this.inputs.stop(key)) {
      this.pressed = false;
      this.callback(this.pressed);
      return true;
    }
    return false;
  }

  public setInputs(ctrlKeys: CtrlKeys, keys: Array<string | number>): boolean {
    let asciiCodes = Command.getAsciiCodes(keys);
    if (asciiCodes) {
      this.inputs.setCtrlKeys(ctrlKeys);
      this.inputs.setKeys(asciiCodes);
      return true;
    }
    return false;
  }

  // public getInputsAscii(): string[] {
  //   return this.inputs.getKeysAscii();
  // }

  public default(): void {
    this.inputs.setCtrlKeys(this.defaultInputs.ctrlKeys);
    this.inputs.setKeys(this.defaultInputs.asciiCodes);
  }

  private static getAsciiCodes(keys: Array<string | number>): number[] | false {
    let asciiCodes = [];
    for (let key of keys) {
      let ascii: number | false = Command.inputValidation(key);
      if (!ascii) {
        return false;
      }
      asciiCodes.push(ascii);
    }
    return asciiCodes;
  }

  private static inputValidation(ascii: string | number): number | false {
    if (!isInteger(ascii, false)) {
      ascii = Command.toASCII(<string>ascii);
    }
    if (isAscii(ascii)) {
      //valid ascii code
      return <number>ascii;
    }
    return false;
  }

  private static toASCII(code: string): number {
    return code.charCodeAt(0);
  }

  // private setName(asciiCodes: Array<number>): string {
  //   let name = '';
  //   for(let asciiCode of asciiCodes) {
  //     name += asciiCode + '+';
  //   }
  //   return name.slice(0, -1);
  // }
}
