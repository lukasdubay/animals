import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { BackgroundProvider } from '../../../providers/background/background';
import  shuffle from 'shuffle-array';

@Component({
  selector: 'page-learn-names',
  templateUrl: 'names.html'
})
export class LearnNamesPage {
  @ViewChild(Slides) slides: Slides;

  showPrevArrow:any = true;
  showNextArrow:any = false;

  //TODO V2 -> get from API if user has more
  animals: any = [
    {name:'pig',picture:'piggy'},
    {name:'dog',picture:'doggy'},
    {name:'hen',picture:'henny'},
    {name:'cock',picture:'cocky'},
    {name:'cow',picture:'cowy'},
  ];
  shuffledAnimals: any = shuffle(this.animals);

  constructor(public navCtrl: NavController, private background:BackgroundProvider) {
    this.background.setMyGlobalVar('');
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();

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
  next() {
    this.slides.slideNext(500);
  }
  prev() {
   this.slides.slidePrev(500);
  }


}
