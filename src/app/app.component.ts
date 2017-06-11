import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BackgroundProvider } from '../providers/background/background';



@Component({
  templateUrl: 'app.html',
  providers: [BackgroundProvider]
})
export class AnimalsApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private background:BackgroundProvider) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }
}
