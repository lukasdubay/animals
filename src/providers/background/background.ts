import { Injectable } from '@angular/core';

@Injectable()
export class BackgroundProvider {
  public background:any;

  constructor() {
    this.background = "";
  }
  setMyGlobalVar(value) {
    this.background = value;
  }

  getMyGlobalVar() {
    return this.background;
  }
}
