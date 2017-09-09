import { Component, ViewChild  } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { BackgroundProvider } from '../../providers/background/background';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',

})
export class GamePage {
  @ViewChild(Slides) slides: Slides;

  showTutorial: boolean = true;
  showCongratulation: boolean = false;
  menuActive: boolean = false;
  showFinishTutorial: boolean = false;
  //local storage
  showedCongratulation: boolean = false;
  showedTutorial: boolean = false;
  //end local storage
  exploredAnimals: any = [];
  tutorialSteps: any = [
    {step: 1, showed: false},
    {step: 2, showed: false},
    {step: 3, showed: false},
  ];
  animals: any = [
    {id: 0, name: 'sheep', picture: 'sheep.png', showed: false, animated: false},
    {id: 1, name: 'cow', picture: 'cow.png', showed: false, animated: false},
    {id: 2, name: 'pig', picture: 'pig.png', showed: false, animated: false},
    {id: 3, name: 'hen', picture: 'hen.png', showed: false, animated: false},
    {id: 4, name: 'rooster', picture: 'rooster.png', showed: false, animated: false},
    {id: 5, name: 'turkey', picture: 'turkey.png', showed: false, animated: false},
    {id: 6, name: 'goose', picture: 'goose.png', showed: false, animated: false},
    {id: 7, name: 'duck', picture: 'duck.png', showed: false, animated: false},
    {id: 8, name: 'bull', picture: 'bull.png', showed: false, animated: false},
    {id: 9, name: 'horse', picture: 'horse.png', showed: false, animated: false},
    {id: 10, name: 'donkey', picture: 'donkey.png', showed: false, animated: false},
    {id: 11, name: 'goat', picture: 'goat.png', showed: false, animated: false},
    {id: 12, name: 'rabbit', picture: 'rabbit.png', showed: false, animated: false},
    {id: 13, name: 'cat', picture: 'cat.png', showed: false, animated: false},
    {id: 14, name: 'dog', picture: 'dog.png', showed: false, animated: false},
  ];
  constructor(public navCtrl: NavController, private storage: Storage, private nativeAudio: NativeAudio, private transition: BackgroundProvider, private page: BackgroundProvider) {
    this.nativeAudio.preloadComplex('reveal','audio/reveal.mp3', 1, 1, 0);
    for(var i=0; i<= this.animals.length-1; i++){
      this.nativeAudio.preloadComplex(this.animals[i].name, 'audio/'+this.animals[i].name+'.mp3', 1, 1, 0);
    }
    this.storage.get('tutorial').then((val) => {
      this.showedTutorial =  val;
      if(this.showedTutorial){
        this.showTutorial = false;
      }
    });
    this.storage.get('congratulation').then((val) => {
      this.showedCongratulation =  val;
    });
  }
  ionViewDidEnter(){
    this.page.setPage('game-page');
    this.transition.setTranstition('');
    this.nativeAudio.loop('ambientM');
    this.slides.slideTo(0,500);
  }
  tutorialSlideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex == 2){
      this.showFinishTutorial = true;
    }
  }
  hideTutorial() {
    this.showTutorial = false;
    this.showedTutorial = true;
    this.storage.set('tutorial', true);
  }
  slideChanged() {
    //let currentIndex = this.slides.getActiveIndex();
  }
  toggleMenu(){
    this.menuActive = !this.menuActive;
  }
  goHome(){

    this.transition.setTranstition('transition-on');
    this.nativeAudio.stop('ambientM');
    this.nativeAudio.loop('introM');
    this.menuActive = !this.menuActive;
    for(var i=0; i<= this.animals.length-1; i++){
      this.animals[i].showed = false
    }
    setTimeout(() => {
      this.slides.slideTo(0,500);
      this.page.setPage('home-page');
      this.transition.setTranstition('');
    },1500);
  }
  playAgain(){
    this.menuActive = !this.menuActive;
    for(var i=0; i<= this.animals.length-1; i++){
      this.animals[i].showed = false
    }
    this.slides.slideTo(0,500);
  }
  playSound(id) {
    if(this.animals[id].showed == false){
      this.animals[id].showed = true;
      this.nativeAudio.play('reveal');
    }else{
      this.animals[id].animated = true;
      setTimeout(() => {
        this.animals[id].animated = false;
      },1200);
      this.nativeAudio.play(this.animals[id].name);

      if(this.exploredAnimals.indexOf(this.animals[id].name) == -1){
        this.exploredAnimals.push(this.animals[id].name);
      }
      if(this.exploredAnimals.length == this.animals.length && !this.showedCongratulation){
        var congratulationTimeout = setTimeout(() => {
          clearTimeout(congratulationTimeout);
          this.showCongratulation = true;
          setTimeout(() => {
            this.showCongratulation = false;
            this.showedCongratulation = true;
            this.storage.set('congratulation', true);
          },5000);
        },2000);
      }
    }
  }
}
