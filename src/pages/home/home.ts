import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NamesPage} from '../names/names';
import {SoundsPage} from '../sounds/sounds';
import {NumbersPage} from '../numbers/numbers';

import { BackgroundProvider } from '../../providers/background/background';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  constructor(public navCtrl: NavController, private background:BackgroundProvider) {

  }
  goToNames() {
    this.navCtrl.push(NamesPage, {},{animate:false});
  }
  goToSounds() {
    this.navCtrl.push(SoundsPage, {},{animate:false});
  }
  goToNumbers() {
    this.navCtrl.push(NumbersPage, {},{animate:false});
  }
  //popToRoot(opts)
}
