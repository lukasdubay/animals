import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';

import { MainPage } from '../pages/home/home';
import { BackgroundProvider } from '../providers/background/background';

@Component({
  templateUrl: 'app.html',
  providers: [BackgroundProvider]
})
export class AnimalsApp {
  rootPage:any = MainPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private background:BackgroundProvider, private nativeAudio: NativeAudio) {
    statusBar.hide();
    platform.ready().then(() => {
      if(platform.is('cordova')){
        statusBar.overlaysWebView(true);
        splashScreen.hide();
        nativeAudio.preloadSimple('reveal','audio/reveal.mp3');
        nativeAudio.preloadComplex('introM', 'audio/intro.mp3', 1, 1, 0).then(() => {
         nativeAudio.play('introM');
        });
        nativeAudio.preloadComplex('ambientM', 'audio/ambient.mp3', 1, 1, 0).then(() => {
          setTimeout(() => {
            nativeAudio.setVolumeForComplexAsset('ambientM', 0.1);
            nativeAudio.loop('ambientM');
          },20000);
        });
      }

      setTimeout(function() {
        background.setMyGlobalVar('loaded');
      },500);
    });
  }
}
