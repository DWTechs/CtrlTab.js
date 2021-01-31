import { Input } from "./input";

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
