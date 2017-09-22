import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';

import { MainPage } from '../pages/home/home';
import { BackgroundProvider } from '../providers/background/background';

@Component({
  templateUrl: 'app.html',
  providers: [BackgroundProvider]
})
export class AnimalsApp {
  rootPage:any = MainPage;

  constructor(platform: Platform, storage: Storage, statusBar: StatusBar, splashScreen: SplashScreen, private background:BackgroundProvider, private nativeAudio: NativeAudio) {
    platform.ready().then(() => {

      background.setLoadedApp('loaded');
      statusBar.overlaysWebView(true);
      statusBar.hide();
      splashScreen.hide();

      storage.length().then((val) => {
        console.log('storage: ',val);
         if(val == 0){
            storage.set('tutorial', false);
            storage.set('congratulation', false);
         }
      });
      if(platform.is('cordova')){

        this.nativeAudio.preloadComplex('introM', 'audio/intro.mp3', 0.1, 1, 2).then(() => {
          this.nativeAudio.loop('introM');
        });
        this.nativeAudio.preloadComplex('ambientM', 'audio/ambient.mp3', 0.1, 1, 0);
      }
    });
  }
}
