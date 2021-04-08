import { CtrlKeys } from "./interfaces";

export class DefaultInputs {
  public asciiCodes: number[];
  public ctrlKeys: CtrlKeys;

  constructor(ctrlKeys: CtrlKeys | null, asciiCodes: number[]) {
    this.ctrlKeys = {
      ctrl: false,
      alt: false,
      shift: false
    };
    if (ctrlKeys) {
      this.setCtrlKeys(ctrlKeys);
    }
    this.asciiCodes = asciiCodes;
  }

  private setCtrlKeys(ctrlKeys: CtrlKeys): void {
    for (let property in this.ctrlKeys) {
      if (this.ctrlKeys.hasOwnProperty(property)) {
        this.ctrlKeys[property] = ctrlKeys[property] ? true : false;
      }
    }
  }
}
