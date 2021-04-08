import { Group } from "./group";
import { Command } from "./command";
import { CtrlKeys, Options } from "./interfaces";

export class Keyboard {
  private groups: Group[];

  constructor() {
    this.initListeners();
    this.groups = [];
  }

  private initListeners(): void {
    //keyboard listeners
    document.onkeydown = (a: KeyboardEvent) => {
      this.down(a);
    };
    document.onkeyup = (a: KeyboardEvent) => {
      this.up(a);
    };
  }

  public down(a: KeyboardEvent): void {
    for (let group of this.groups) {
      group.down(a);
    }
  }

  public up(a: KeyboardEvent): void {
    for (let group of this.groups) {
      group.up(a.which);
    }
  }

  public listen(groupName: string): boolean {
    let group = this.getGroup(groupName);
    if (group) {
      return (group.watch = true);
    }
    return false;
  }

  public ignore(groupName: string): boolean {
    let group = this.getGroup(groupName);
    if (group) {
      return (group.watch = false);
    }
    return true;
  }

  public addCmd(
    commandName: string,
    ctrlKeys: CtrlKeys,
    keys: Array<string | number>,
    callback: Function,
    options: Options
  ): Command {
    let group = options?.groupName && this.getGroup(options?.groupName);
    if (!group) {
      group = new Group(options?.groupName);
      this.groups.push(group);
    }
    delete options?.groupName;
    return group.addCmd(commandName, ctrlKeys, keys, callback, options);
  }

  public setInputs(
    groupName: string,
    commandName: string,
    ctrlKeys: CtrlKeys,
    keys: Array<string | number>
  ): boolean {
    let group = this.getGroup(groupName);
    return group ? group.setInputs(commandName, ctrlKeys, keys) : false;
  }

  public default(groupName: string, commandName: string): boolean {
    let group = this.getGroup(groupName);
    return group ? group.default(commandName) : false;
  }

  public getGroup(name: string): Group | null {
    return this.groups.find((group: Group) => group.name === name) || null;
  }

  public getCmd(groupName: string, commandName: string): Command | null {
    let group = this.getGroup(groupName);
    return group ? group.getCmd(commandName) : null;
  }

  // public getCommandInputsAscii(
  //   groupName: string,
  //   commandName: string
  // ): Array<string> | false {
  //   let command = this.getCommand(groupName, commandName);
  //   return command ? command.getInputsAscii() : false;
  // }
}
