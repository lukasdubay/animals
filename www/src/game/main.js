game.module(
    'game.main'
)
.require(
  'game.assets',
  'plugins.fader',
  'game.menu',
  'game.animal',
  'engine.core'
)
.body(function() {

  game.withNarration = true;
  game.menuOpen = false;
  game.loaded = false;
  game.videoStoped = false;

  game.createScene('Main', {

      init: function() {
        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        game.audio.playMusic("intro", true);
        game.audio.setMusicVolume(1);

        if(!game.loaded){

        }else{
          //TODO logo add
          fader.fadeIn();
        }
        var mainBg = new game.Sprite('bg/bg-intro.jpg').addTo(this.stage);
        mainBg.zIndex=1;
        mainBg.position.set(game.System.width / 2 , game.System.height / 2);
        mainBg.scale.set(0.564, 0.565);
        mainBg.interactive = true;
        mainBg.anchor.set(0.5, 0.5);

        //TODO add clouds

        if(!game.loaded){

          var video = new game.Video('video/intro.mp4');
          video.sprite.anchor.set(0.5, 0.5);
          video.sprite.position.set(game.System.width / 2, game.System.height / 2);
          video.sprite.addTo(this.stage);
          video.sprite.scale.set(0.565, 0.565);
          video.onLoaded(function() {
              video.play();
          });
          video.onComplete(function() {
            //TODO change graphics
          });
        }

        var playButton = new game.Sprite('ui/play.png').addTo(this.stage);
        playButton.alpha = 0;
        playButton.scale.set(0.5, 0.5);
        playButton.position.set(game.system.width / 2, game.system.height / 2 + playButton.height-10 );
        playButton.anchor.set(0.5, 0.5);
        playButton.zIndex=5;

        if(!game.loaded){
          var group = new game.TweenGroup();
          var tween1 = new game.Tween(playButton.position);
          tween1.to({y: game.system.height / 2 + playButton.height+25 }, 1000);
          tween1.delay(9900);
          tween1.easing('Back.Out');
          var tween2 = new game.Tween(playButton);
          tween2.to({ alpha: 1 }, 1000);
          tween2.delay(9900);
          tween2.easing('Back.Out');
          group.add(tween1);
          group.add(tween2);
          group.start();
          game.loaded = true;
          group.onComplete = function () {
            playButton.interactive = true;
          };

        }else{
          playButton.position.set(game.system.width / 2, game.system.height / 2 + playButton.height+25 );
          playButton.alpha = 1;
          playButton.interactive = true;
        }

        playButton.mousedown = playButton.touchstart = function () {
          var tween = new game.Tween(playButton.scale);
          tween.to({x:0.45, y:0.45}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };
        playButton.mouseup = playButton.touchend = function () {
          var tween = new game.Tween(playButton.scale);
          tween.to({x:0.5, y:0.5}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };

        mainBg.mouseup = mainBg.touchend = function () {
          var tween = new game.Tween(playButton.scale);
          tween.to({x:0.5, y:0.5}, 300);
          tween.easing('Circular.InOut');

          tween.start();
        };
        playButton.click = playButton.tap = function (){

          fader.fadeOut(function() {
            game.audio.stopMusic();
            game.system.setScene('Sheep');
            if(!game.videoStoped){
              video.stop(true);
              game.videoStoped = true;
            }
          });
        };

      }
  });
  game.createScene('Bull', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'bull', 'Goat', 'Horse', 240, 210, 1000);

      }
  });
  game.createScene('Cow', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'cow', 'Pig', 'Sheep', 310, 200, 1350);

      }
  });
  game.createScene('Cat', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'cat', 'Dog', 'Turkey', 320, 200, 1350);

      }
  });
  game.createScene('Dog', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'dog', 'Rabbit', 'Cat', 320, 140, 1350);

      }
  });
  game.createScene('Donkey', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'donkey', 'Horse', 'Rabbit', 180, 270, 1350);

      }
  });
  game.createScene('Duck', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'duck', 'Turkey', 'Goose', 300, 230, 1000);

      }
  });
  game.createScene('Goat', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'goat', '', 'Bull', 300, 200, 1350);

      }
  });
  game.createScene('Goose', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'goose', 'Duck', 'Rooster', 300, 200, 1350);

      }
  });
  game.createScene('Hen', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'hen', 'Rooster', 'Pig', 350, 200, 1350);

      }
  });
  game.createScene('Horse', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'horse', 'Bull', 'Donkey', 330, 200, 1350);

      }
  });
  game.createScene('Pig', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'pig', 'Hen', 'Cow', 220, 200, 900);

      }
  });
  game.createScene('Rabbit', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'rabbit', 'Donkey', 'Dog', 420, 160, 1150);

      }
  });
  game.createScene('Rooster', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'rooster', 'Goose', 'Hen', 330, 200, 1500);

      }
  });
  game.createScene('Sheep', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();
        game.audio.playMusic('ambient',true);

        if(!game.isMuted){
          game.audio.setMusicVolume(0.2);
        }else{
          game.audio.setMusicVolume(0);
        }

        var animal = new game.Animal(this.stage, 'sheep', 'Cow', 'Main', 320, 200, 1350);
      }
  });
  game.createScene('Turkey', {

      init: function() {

        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        fader.fadeIn();

        var animal = new game.Animal(this.stage, 'turkey', 'Cat', 'Duck', 330, 200, 1150);

      }
  });

  game.Loader.inject({
      bgColor: 0xffffff,

      initStage: function() {
        var video = new game.Video('video/preloader.mp4');
        video.sprite.anchor.set(0.5, 0.5);
        video.sprite.position.set(game.System.width / 2, game.System.height / 2);
        video.sprite.addTo(this.stage);
        video.sprite.scale.set(0.565, 0.565);
        video.onLoaded(function() {
            video.play();
        });
        video.onComplete(function() {
          //video completed
          game.system.setScene('Main');
        });
      },
      ready: function(event) {
        //if loaded!
      }
  });

});
