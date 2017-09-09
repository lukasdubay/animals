import { Injectable } from '@angular/core';

@Injectable()
export class BackgroundProvider {
  public loadedApp:any;
  public transition:any;
  public page:any;

  constructor() {
    this.loadedApp = "";
    this.transition= "";
  }
  setLoadedApp(value) {
    this.loadedApp = value;
  }

  getLoadedApp() {
    return this.loadedApp;
  }

  setTranstition(value) {
    this.transition = value;
  }

  getTransition() {
    return this.transition;
  }

  setPage(value) {
    this.page = value;
  }

  getPage() {
    return this.page;
  }
}
