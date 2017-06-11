import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { BackgroundProvider } from '../../../providers/background/background';
import { NativeAudio } from '@ionic-native/native-audio';

import  shuffle from 'shuffle-array';

@Component({
  selector: 'page-learn-sounds',
  templateUrl: 'sounds.html'
})
export class LearnSoundsPage {
  @ViewChild(Slides) slides: Slides;

  showPrevArrow:any = true;
  showNextArrow:any = false;

  //TODO V2 -> get from API if user has more
  animals: any = [
    {name:'pig',picture:'piggy'},
    {name:'dog',picture:'doggy'},
    {name:'hen',picture:'henny'},
    {name:'rooster',picture:'rooster'},
    {name:'cow',picture:'cowy'},
  ];
  shuffledAnimals: any = shuffle(this.animals);

  constructor(public navCtrl: NavController, private background:BackgroundProvider, private nativeAudio: NativeAudio) {
    this.background.setMyGlobalVar('');
    this.nativeAudio.preloadSimple(this.shuffledAnimals[0].name, 'audio/'+this.shuffledAnimals[0].name+'.mp3');
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.nativeAudio.preloadSimple(this.shuffledAnimals[currentIndex].name, 'audio/'+this.shuffledAnimals[currentIndex].name+'.mp3');

    if(currentIndex > 0){
      this.showPrevArrow = false;
    }else{
      this.showPrevArrow = true;
    }
    if(currentIndex < this.animals.length - 1){
      this.showNextArrow = false;
    }else{
      this.showNextArrow = true;
    }
  }
  goBack() {
    this.background.setMyGlobalVar('sub-view');
    this.navCtrl.pop({animate:false});
  }
  playSound(animal) {
    this.nativeAudio.play(animal);
  }
  next() {
    this.slides.slideNext(500);
  }
  prev() {
   this.slides.slidePrev(500);
  }


}
