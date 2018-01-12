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
          speed: 400
      });
      fader.fadeIn();
      var playSound = false;
      var mainBg = new game.Sprite('bg/bg-'+animal+'.jpg');
      mainBg.position.set(game.System.width / 2 , game.System.height / 2);
      mainBg.anchor.set(0.5, 0.5);
      mainBg.scale.set(0.565, 0.565);
      mainBg.interactive = true;
      container.addChild(mainBg);

      var spineAnimation = new game.Spine('animals/'+animal+'/'+animal+'_ske.json');
      spineAnimation.position.set(game.System.width / 2  + (positionX), game.System.height - positionY);
      spineAnimation.play('anim_idle', true);
      spineAnimation.interactive = true;
      container.addChild(spineAnimation);


      spineAnimation.click = spineAnimation.tap = function (){
        if(!playSound){
          playSound = true;
          game.audio.playSound(animal);
          spineAnimation.play('anim_voice',false);
          var myTimer = game.scene.addTimer(1800, function() {
            playSound = false;
            spineAnimation.play('anim_idle',true);
          });
        }
      };

      var ribbon = new game.Sprite('ui/ribbon.png');
      ribbon.position.set(game.System.width / 2 , -20);
      ribbon.anchor.set(0.5, 0.5);
      ribbon.alpha = 0;
      ribbon.scale.set(0.6, 0.6);
      //ribbon.interactive = true;
      container.addChild(ribbon);

      var name = new game.Sprite('text/'+animal+'.png');
      name.position.set(game.System.width / 2 , -20);
      name.anchor.set(0.5, 0.5);
      name.alpha = 0;
      name.zIndex = 10;
      name.scale.set(0.45, 0.45);
      container.addChild(name);

      var groupRibbon = new game.TweenGroup();
      var tweenRibbon1 = new game.Tween(ribbon.position);
      tweenRibbon1.to({y: 100 }, 1400);
      tweenRibbon1.easing('Back.Out');
      tweenRibbon1.delay(300);
      var tweenRibbon2 = new game.Tween(ribbon);
      tweenRibbon2.to({ alpha: 1 },1000);
      tweenRibbon2.easing('Circular.Out');
      tweenRibbon2.delay(300);
      var tweenName1 = new game.Tween(name.position);
      tweenName1.to({y: 87 }, 1400);
      tweenName1.easing('Back.Out');
      tweenName1.delay(800);
      var tweenName2 = new game.Tween(name);
      tweenName2.to({ alpha: 1 },1000);
      tweenName2.easing('Circular.Out');
      tweenName2.delay(800);
      groupRibbon.add(tweenRibbon1);
      groupRibbon.add(tweenRibbon2);
      groupRibbon.add(tweenName1);
      groupRibbon.add(tweenName2);
      groupRibbon.start();

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
        nextButton.zIndex=5;
        nextButton.scale.set(0.5, 0.5);
        nextButton.anchor.set(0.5, 0.5);

        if(!game.menuAnim){
          nextButton.position.set(game.system.width - 65,game.system.height - 65);
          nextButton.alpha = 0;
          var group = new game.TweenGroup();
          var tween1 = new game.Tween(nextButton.position);
          tween1.to({x: game.system.width - 95 }, 1000);
          tween1.delay(300);
          tween1.easing('Circular.Out');
          var tween2 = new game.Tween(nextButton);
          tween2.to({ alpha: 1 }, 1000);
          tween2.delay(300);
          tween2.easing('Circular.Out');
          group.add(tween1);
          group.add(tween2);
          group.start();
          group.onComplete = function () {
            nextButton.interactive = true;
          };
        }else{
          nextButton.interactive = true;
          nextButton.position.set(game.system.width - 95,game.system.height - 65);
        }
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
          if(nextAnimal == 'End'){
            fader = new game.Fader({
                color: 0xffffff,
                speed: 400
            });
          }
          fader.fadeOut(function() {
            game.system.setScene(nextAnimal);
          });
        };
      }
      var menu = new game.Menu(container);

    }

  });

});
