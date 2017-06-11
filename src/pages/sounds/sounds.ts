import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundProvider } from '../../providers/background/background';
import { LearnSoundsPage } from '../learn/sounds/sounds';

@Component({
  selector: 'page-sounds',
  templateUrl: 'sounds.html'
})
export class SoundsPage {

  constructor(public navCtrl: NavController, private background:BackgroundProvider) {
    this.background.setMyGlobalVar('sub-view');
  }
  goBack() {
    this.background.setMyGlobalVar('');
    this.navCtrl.pop({animate:false});
  }
  goToLearn() {
    this.navCtrl.push(LearnSoundsPage, {},{animate:false});
  }
  goToPlay() {
    //this.navCtrl.push(PlaySoundsPage, {},{animate:false});
  }

}
