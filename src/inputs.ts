import { CtrlKeys, Keys } from "./interfaces";
import { Input } from "./input";

export class Inputs {
  // public defaultASCII: number; //first ascii code assigned will be kept here
  public length: number;
  private keys: Keys;
  private ctrlKeys: CtrlKeys;
  private preventDefault: boolean;

  constructor(
    ctrlKeys: CtrlKeys,
    asciiCodes: number[],
    preventDefault: boolean
  ) {
    this.length = 0;
    this.keys = {};
    this.setCtrlKeys(ctrlKeys);
    this.setKeys(asciiCodes);
    this.preventDefault = preventDefault;
  }

  public start(a: KeyboardEvent): boolean {
    if (this.keys.hasOwnProperty(a.which)) {
      this.keys[a.which].down(a, this.preventDefault);
      // check if every input is pressed
      if (this.length > 1) {
        for (let property in this.keys) {
          if (this.keys.hasOwnProperty(property)) {
            if (!this.keys[property].pressed) {
              return false;
            }
          }
        }
      }
      // Check if controlkeys are pressed
      if (
        this.ctrlKeys.ctrl === a.ctrlKey &&
        this.ctrlKeys.alt === a.altKey &&
        this.ctrlKeys.shift === a.shiftKey
      ) {
        return true;
      }
    }
    return false;
  }

  public stop(key: number): boolean {
    if (this.keys.hasOwnProperty(key)) {
      this.keys[key].up();
      return true;
    }
    return false;
  }

  public setCtrlKeys(ctrlKeys: CtrlKeys): void {
    this.ctrlKeys = {
      ctrl: ctrlKeys.ctrl,
      alt: ctrlKeys.alt,
      shift: ctrlKeys.shift
    };
  }

  public setKeys(asciiCodes: number[]): void {
    for (let asciiCode of asciiCodes) {
      this.keys[asciiCode] = new Input();
    }
    this.length = asciiCodes.length;
  }

  // public getKeysAscii(): string[] {
  //   return Object.keys(this.keys);
  // }
}
