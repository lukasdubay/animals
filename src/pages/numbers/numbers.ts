import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundProvider } from '../../providers/background/background';

@Component({
  selector: 'page-numbers',
  templateUrl: 'numbers.html'
})
export class NumbersPage {

  constructor(public navCtrl: NavController, private background:BackgroundProvider) {
    this.background.setMyGlobalVar('sub-view');
  }
  goBack() {
    this.background.setMyGlobalVar('');
    this.navCtrl.pop({animate:false});
  }


}
