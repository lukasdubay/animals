import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeAudio } from '@ionic-native/native-audio';
import { IonicStorageModule } from '@ionic/storage';

import { AnimalsApp } from './app.component';

import { MainPage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';

import { BackgroundProvider } from '../providers/background/background';

@NgModule({
  declarations: [
    AnimalsApp,
    MainPage,
    GamePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AnimalsApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AnimalsApp,
    MainPage,
    GamePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackgroundProvider
  ]
})
export class AppModule {}
