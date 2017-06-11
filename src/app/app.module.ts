import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeAudio } from '@ionic-native/native-audio';

import { AnimalsApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { NamesPage } from '../pages/names/names';
import { SoundsPage } from '../pages/sounds/sounds';
import { NumbersPage } from '../pages/numbers/numbers';

//import { LearnNumbersPage } from '../pages/learn/numbers';
import { LearnSoundsPage } from '../pages/learn/sounds/sounds';
import { LearnNamesPage } from '../pages/learn/names/names';

import { BackgroundProvider } from '../providers/background/background';

@NgModule({
  declarations: [
    AnimalsApp,
    HomePage,
    NamesPage,
    SoundsPage,
    NumbersPage,
    LearnNamesPage,
    LearnSoundsPage,
    //LearnNumbersPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AnimalsApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AnimalsApp,
    HomePage,
    NamesPage,
    SoundsPage,
    NumbersPage,
    LearnNamesPage,
    LearnSoundsPage,
    //LearnNumbersPage,
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
