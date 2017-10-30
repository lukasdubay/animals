import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AnimalsApp } from './app.component';



@NgModule({
  declarations: [
    AnimalsApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AnimalsApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AnimalsApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
