import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundProvider } from '../../providers/background/background';
import { LearnNamesPage } from '../learn/names/names';

@Component({
  selector: 'page-names',
  templateUrl: 'names.html'
})
export class NamesPage {

  constructor(public navCtrl: NavController, private background:BackgroundProvider) {
    this.background.setMyGlobalVar('sub-view');
  }
  goBack() {
    this.background.setMyGlobalVar('');
    this.navCtrl.pop({animate:false});
  }
  goToLearn() {
    this.navCtrl.push(LearnNamesPage, {},{animate:false});
  }
  goToPlay() {
    //this.navCtrl.push(PlayNamesPage, {},{animate:false});
  }


}
