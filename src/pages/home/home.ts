import { Component  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundProvider } from '../../providers/background/background';
import { NativeAudio } from '@ionic-native/native-audio';

import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class MainPage {
  gameloaded: boolean = false;

  constructor(public navCtrl: NavController, private transition: BackgroundProvider, private page: BackgroundProvider, private nativeAudio: NativeAudio) {


  }
  ionViewDidEnter(){
    this.page.setPage('home-page');
    this.transition.setTranstition('');
    this.nativeAudio.loop('introM');
  }
  ionViewWillLeave(){
    this.nativeAudio.stop('introM');
  }
  play(){
    this.transition.setTranstition('transition-on');
    setTimeout(() => {
      if(this.gameloaded){
        this.nativeAudio.stop('introM');
        this.nativeAudio.loop('ambientM');
        this.page.setPage('game-page');
        this.transition.setTranstition('');
      }else{
        this.gameloaded = true;
        this.navCtrl.push(GamePage,{},{animate:false});
      }
    },1000);
  }
  credits(){
   //this.navCtrl.push(CreditsPage,{},{animate:false});
  }

}
