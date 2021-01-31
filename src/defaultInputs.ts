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
    this.setCtrlKeys(ctrlKeys);
    this.asciiCodes = asciiCodes;
  }

  private setCtrlKeys(ctrlKeys: CtrlKeys | null): void {
    for (let property in this.ctrlKeys) {
      if (this.ctrlKeys.hasOwnProperty(property)) {
        this.ctrlKeys[property] =
          ctrlKeys && ctrlKeys.hasOwnProperty(property) && ctrlKeys[property]
            ? true
            : false;
      }
    }
  }
}
