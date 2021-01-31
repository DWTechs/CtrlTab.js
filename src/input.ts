export class Input {
  public pressed: boolean;
  // public preventDefault: boolean;

  constructor(/*preventDefault: boolean*/) {
    this.pressed = false;
    // this.preventDefault = preventDefault;
  }

  down(a: KeyboardEvent, preventDefault: boolean): void {
    if (preventDefault) {
      a.preventDefault();
    }
    this.pressed = true;
  }

  up(): void {
    this.pressed = false;
  }
}
