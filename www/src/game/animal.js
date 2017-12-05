game.module(
    'game.animal'
)
.require(
    'engine.renderer'
)
.body(function() {

  game.createClass('Animal', 'Class', {
    init: function(container, animal, nextAnimal, prevAnimal, positionX, positionY, AudioTimer) {
      var fader = new game.Fader({
          color: 0x000000,
          speed: 250
      });
      var mainBg = new game.Sprite('bg/bg-'+animal+'.jpg');
      mainBg.position.set(game.System.width / 2 , game.System.height / 2);
      mainBg.anchor.set(0.5, 0.5);
      mainBg.scale.set(0.565, 0.565);
      mainBg.interactive = true;
      container.addChild(mainBg);
      //
      //
      // this.spineAnimation = new game.Spine('spine_anim.json');
      // this.spineAnimation.position.set(game.System.width / 2 , game.System.height / 2 + 200);
      //
      //
      // //this.spineAnimation.play('animation0', true);
      // container.addChild(this.spineAnimation);


      var animalImage = new game.Sprite('animals/'+animal+'/'+animal+'-1.png');
      animalImage.scale.set(0.55, 0.55);
      animalImage.interactive = true;
      animalImage.position.set(game.System.width / 2 - animalImage.width / 2 , positionY);
      animalImage.zIndex=4;
      container.addChild(animalImage);

      animalImage.click = animalImage.tap = function (){
        game.audio.playSound(animal);
        animalImage.setTexture('animals/'+animal+'/'+animal+'-2.png');
        var myTimer = game.scene.addTimer(AudioTimer, function() {
          animalImage.setTexture('animals/'+animal+'/'+animal+'-1.png');
        });
      };

      if(prevAnimal != 'Main'){

        var prevButton = new game.Sprite('ui/arrow-left.png');
        prevButton.interactive = true;
        prevButton.zIndex=5;
        prevButton.scale.set(0.5, 0.5);
        prevButton.position.set(90,game.system.height - 65);
        prevButton.anchor.set(0.5, 0.5);
        container.addChild(prevButton);

        prevButton.click = prevButton.tap = function (){
          fader.fadeOut(function() {
            game.system.setScene(prevAnimal);
          });
        };

        prevButton.mousedown = prevButton.touchstart = function () {
          var tween = new game.Tween(prevButton.scale);
          tween.to({x:0.45, y:0.45}, 300);
          tween.easing('Circular.InOut');

          tween.start();
        };
        prevButton.mouseup = prevButton.touchend = function () {
          var tween = new game.Tween(prevButton.scale);
          tween.to({x:0.5, y:0.5}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };
      }

      mainBg.mouseup = mainBg.touchend = function () {
        if(prevAnimal != 'Main'){

          var tween = new game.Tween(prevButton.scale);
          tween.to({x:0.5, y:0.5}, 300);
          tween.easing('Circular.InOut');

          tween.start();
        }
        if(nextAnimal != ''){
            var tween2 = new game.Tween(nextButton.scale);
            tween2.to({x:0.5, y:0.5}, 300);
            tween2.easing('Circular.InOut');
            tween2.start();
        }
      };
      if(nextAnimal != ''){
        var nextButton = new game.Sprite('ui/arrow-right.png');
        nextButton.interactive = true;
        nextButton.zIndex=5;
        nextButton.scale.set(0.5, 0.5);
        nextButton.position.set(game.system.width - 95,game.system.height - 65);
        nextButton.anchor.set(0.5, 0.5);
        container.addChild(nextButton);

        nextButton.mousedown = nextButton.touchstart = function () {
          var tween = new game.Tween(nextButton.scale);
          tween.to({x:0.45, y:0.45}, 300);
          tween.easing('Circular.InOut');

          tween.start();
        };
        nextButton.mouseup = nextButton.touchend = function () {
          var tween = new game.Tween(nextButton.scale);
          tween.to({x:0.5, y:0.5}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };

        nextButton.click = nextButton.tap = function (){
          fader.fadeOut(function() {
            game.system.setScene(nextAnimal);
          });
        };
      }
      var menu = new game.Menu(container);

    }

  });

});
