import { Component, ViewChild  } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class MainPage {
  @ViewChild(Slides) slides: Slides;
  helpScroll: any = false;
  scrollNeed: any;
  soundsLoaded: any = [];

  animals: any = [
    {id:0,name:'sheep',picture:'sheep.png',showed:false},
    {id:1,name:'cow',picture:'cow.png',showed:false},
    {id:2,name:'pig',picture:'pig.png',showed:false},
    {id:3,name:'hen',picture:'hen.png',showed:false},
    {id:4,name:'rooster',picture:'rooster.png',showed:false},
  ];
  constructor(public navCtrl: NavController, private nativeAudio: NativeAudio, platform: Platform,) {
    platform.ready().then(() => {
        this.scrollNeed = setTimeout(() => {
          this.helpScroll = true;
        },10000);
    });
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    clearTimeout(this.scrollNeed);
    if(currentIndex != 0 && currentIndex < 6){
      // if audio exists don't preload it again!
      this.nativeAudio.preloadSimple(this.animals[currentIndex-1].name, 'audio/'+this.animals[currentIndex-1].name+'.mp3');
    }
  }
  playSound(id) {
    if(this.animals[id].showed == false){
      this.animals[id].showed = true;
      this.nativeAudio.play('reveal');
    }else{
      //set animation only on play
      this.nativeAudio.play(this.animals[id].name);
    }
  }
}
