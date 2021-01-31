import { Command } from "./command";
import { CtrlKeys, Options } from "./interfaces";

export class Group {
  // map: Object;
  public name: string;
  public watch: boolean;
  private commands: Command[];

  constructor(name: string) {
    this.name = name;
    this.commands = [];
    this.watch = false;
  }

  public down(a: KeyboardEvent): void {
    if (this.watch) {
      for (let command of this.commands) {
        command.start(a);
      }
    }
  }

  public up(key: number): void {
    if (this.watch) {
      for (let command of this.commands) {
        command.stop(key);
      }
    }
  }

  public addCommand(
    name: string,
    ctrlKeys: CtrlKeys | null,
    keys: Array<string | number>,
    callback: Function,
    options: Options | null
  ): Command {
    let command = new Command(name, ctrlKeys, keys, callback, options);
    this.commands.push(command);
    this.commands = Group.sortCommands(this.commands);
    return command;
  }

  public setInputs(
    name: string,
    ctrlKeys: CtrlKeys,
    keys: Array<string | number>
  ): boolean {
    let command = this.getCommand(name);
    if (command) {
      command.setInputs(ctrlKeys, keys);
      this.commands = Group.sortCommands(this.commands);
      return true;
    }
    return false;
  }

  public default(name: string): boolean {
    let command = this.getCommand(name);
    if (command) {
      command.default();
      this.commands = Group.sortCommands(this.commands);
      return true;
    }
    return false;
  }

  public getCommand(name: string): Command | null {
    for (let command of this.commands) {
      if (command.name == name) {
        return command;
      }
    }
    return null;
  }

  // public getCommandInputs(name: string): string[] | false {
  //   let command = this.getCommand(name);
  //   return command ? command.getInputsAscii() : false;
  // }

  private static sortCommands(commands: Command[]): Command[] {
    commands.sort(function(a, b) {
      return b.inputs.length - a.inputs.length;
    });
    return commands;
  }
}
