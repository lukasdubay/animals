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
  game.ended = false;
  game.menuAnim = false;

  game.createScene('Main', {

      init: function() {
        var fader = new game.Fader({
            color: 0x000000,
            speed: 400
        });
        game.audio.playMusic("intro", true);
        game.audio.setMusicVolume(1);

        if(game.loaded){
          fader.fadeIn();
        }
        var mainBg = new game.Sprite('bg/bg-intro.jpg').addTo(this.stage);
        mainBg.zIndex=1;
        mainBg.position.set(game.System.width / 2 , game.System.height / 2);
        mainBg.scale.set(0.565, 0.565);
        mainBg.interactive = true;
        mainBg.anchor.set(0.5, 0.5);

        if(!game.loaded){
          var video = new game.Video('video/intro.m4v');
          video.sprite.anchor.set(0.5, 0.5);
          video.sprite.position.set(game.System.width / 2, game.System.height / 2);
          video.sprite.addTo(this.stage);
          video.sprite.scale.set(0.565, 0.565);
          video.onLoaded(function() {
              video.play();
              startAnimation();
          });
        }
        var cloudLeft = new game.Sprite('bg/cloud-left.png').addTo(this.stage);
        cloudLeft.position.set(50, 250);
        cloudLeft.scale.set(0.5, 0.5);
        cloudLeft.anchor.set(0.5, 0.5);
        cloudLeft.alpha = 0;

        var cloudRight = new game.Sprite('bg/cloud-right.png').addTo(this.stage);
        cloudRight.position.set(game.System.width - 80, 150);
        cloudRight.scale.set(0.5, 0.5);
        cloudRight.anchor.set(0.5, 0.5);
        cloudRight.alpha = 0;

        if(game.loaded){
          var logo = new game.Sprite('bg/logo.png').addTo(this.stage);
          logo.zIndex=5;
          logo.position.set(game.System.width / 2 + 8, game.System.height / 2 - 72 );
          logo.scale.set(0.565, 0.565);
          logo.anchor.set(0.5, 0.5);
        }
        var playButton = new game.Sprite('ui/play.png').addTo(this.stage);
        playButton.alpha = 0;
        playButton.scale.set(0.5, 0.5);
        playButton.position.set(game.system.width / 2, game.system.height / 2 + playButton.height-10 );
        playButton.anchor.set(0.5, 0.5);
        playButton.zIndex=5;

        if(game.loaded){
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
          });
        };
        if(game.loaded){
          cloudLeft.alpha = 1;
          cloudRight.alpha = 1;
          cloudAnimation();
        }
        function cloudAnimation() {
          var groupCL = new game.TweenGroup();
          var tweenCL = new game.Tween(cloudLeft.position);
          tweenCL.to({x: 170 }, 10000);
          tweenCL.yoyo(true);
          tweenCL.repeat('Infinity');
          tweenCL.delay(2300);
          var tweenCL2 = new game.Tween(cloudLeft);
          tweenCL2.to({ alpha: 1 }, 1500);
          tweenCL2.delay(800);
          groupCL.add(tweenCL);
          groupCL.add(tweenCL2);
          groupCL.start();

          var groupCR = new game.TweenGroup();
          var tweenCR = new game.Tween(cloudRight.position);
          tweenCR.to({x: game.System.width - 200 }, 10000);
          tweenCR.yoyo(true);
          tweenCR.repeat('Infinity');
          tweenCR.delay(1500);
          var tweenCR2 = new game.Tween(cloudRight);
          tweenCR2.to({ alpha: 1 }, 1500);
          groupCR.add(tweenCR);
          groupCR.add(tweenCR2);
          groupCR.start();
        }
        function startAnimation(){
          game.loaded = true;

          var groupPB = new game.TweenGroup();
          var tweenPB = new game.Tween(playButton.position);
          tweenPB.to({y: game.system.height / 2 + playButton.height+25 }, 1000);
          tweenPB.delay(2900);
          tweenPB.easing('Back.Out');
          var tweenPB2 = new game.Tween(playButton);
          tweenPB2.to({ alpha: 1 }, 1000);
          tweenPB2.delay(2900);
          tweenPB2.easing('Back.Out');
          groupPB.add(tweenPB);
          groupPB.add(tweenPB2);
          groupPB.start();
          groupPB.onComplete = function () {
            playButton.interactive = true;
          };
          cloudAnimation();
        }
      }
  });
  game.createScene('Bull', {

      init: function() {

        var animal = new game.Animal(this.stage, 'bull', 'Goat', 'Horse', 0, 210, 1000);

      }
  });
  game.createScene('Cow', {

      init: function() {

        var animal = new game.Animal(this.stage, 'cow', 'Pig', 'Sheep', 0, 90, 1350);

      }
  });
  game.createScene('Cat', {

      init: function() {

        var animal = new game.Animal(this.stage, 'cat', 'Dog', 'Turkey', 90, 200, 1350);

      }
  });
  game.createScene('Dog', {

      init: function() {

        var animal = new game.Animal(this.stage, 'dog', 'Rabbit', 'Cat', 60, 140, 1350);

      }
  });
  game.createScene('Donkey', {

      init: function() {

        var animal = new game.Animal(this.stage, 'donkey', 'Horse', 'Rabbit', 30, 270, 1350);

      }
  });
  game.createScene('Duck', {

      init: function() {

        var animal = new game.Animal(this.stage, 'duck', 'Turkey', 'Goose', 30, 230, 1000);

      }
  });
  game.createScene('Goat', {

      init: function() {

        var animal = new game.Animal(this.stage, 'goat', 'End', 'Bull', 20, 200, 1350);

      }
  });
  game.createScene('Goose', {

      init: function() {

        var animal = new game.Animal(this.stage, 'goose', 'Duck', 'Rooster', 30, 200, 1350);

      }
  });
  game.createScene('Hen', {

      init: function() {

        var animal = new game.Animal(this.stage, 'hen', 'Rooster', 'Pig', 20, 50, 1350);

      }
  });
  game.createScene('Horse', {

      init: function() {

        var animal = new game.Animal(this.stage, 'horse', 'Bull', 'Donkey', 70, 200, 1350);

      }
  });
  game.createScene('Pig', {

      init: function() {

        var animal = new game.Animal(this.stage, 'pig', 'Hen', 'Cow', 0, 90, 900);

      }
  });
  game.createScene('Rabbit', {

      init: function() {

        var animal = new game.Animal(this.stage, 'rabbit', 'Donkey', 'Dog', 80, 160, 1150);

      }
  });
  game.createScene('Rooster', {

      init: function() {

        var animal = new game.Animal(this.stage, 'rooster', 'Goose', 'Hen', 50, 200, 1500);

      }
  });
  game.createScene('Sheep', {

      init: function() {
        game.audio.playMusic('ambient',true);

        if(!game.isMuted){
          game.audio.setMusicVolume(0.2);
        }else{
          game.audio.setMusicVolume(0);
        }

        var animal = new game.Animal(this.stage, 'sheep', 'Cow', 'Main', 0, 90, 1350);
      }
  });
  game.createScene('Turkey', {

      init: function() {

        var animal = new game.Animal(this.stage, 'turkey', 'Cat', 'Duck', 50, 200, 1150);

      }
  });
  game.createScene('End', {

      init: function() {
        var fader = new game.Fader({
            color: 0xffffff,
            speed: 400
        });
        fader.fadeIn();
        game.audio.stopMusic();
        //TODO add end music
        if(game.ended){
          var mainBg = new game.Sprite('bg/bg-end-loaded.jpg').addTo(this.stage);

        }else{
          var mainBg = new game.Sprite('bg/bg-end.jpg').addTo(this.stage);
        }
        mainBg.zIndex=1;
        mainBg.position.set(game.System.width / 2 , game.System.height / 2);
        mainBg.scale.set(0.565, 0.565);
        mainBg.interactive = true;
        mainBg.anchor.set(0.5, 0.5);

        if(!game.ended){
          var video = new game.Video('video/end.m4v');
          video.sprite.anchor.set(0.5, 0.5);
          video.sprite.position.set(game.System.width / 2, game.System.height / 2);
          video.sprite.addTo(this.stage);
          video.sprite.scale.set(0.565, 0.565);
          video.onLoaded(function() {
              video.play();
          });
        }
        var replayButton = new game.Sprite('ui/replay.png').addTo(this.stage);
        replayButton.scale.set(0.5, 0.5);
        replayButton.position.set(game.system.width / 2, game.system.height / 2 + replayButton.height / 2 + 20);
        replayButton.anchor.set(0.5, 0.5);
        replayButton.zIndex=5;

        var facebookButton = new game.Sprite('ui/facebook.png').addTo(this.stage);
        facebookButton.scale.set(0.5, 0.5);
        facebookButton.position.set(game.system.width / 2 - replayButton.width, game.system.height / 2 + replayButton.height / 2 + 20);
        facebookButton.anchor.set(0.5, 0.5);
        facebookButton.zIndex=5;

        var twitterButton = new game.Sprite('ui/twitter.png').addTo(this.stage);
        twitterButton.scale.set(0.5, 0.5);
        twitterButton.position.set(game.system.width / 2 + replayButton.width, game.system.height / 2 + replayButton.height / 2 + 20);
        twitterButton.anchor.set(0.5, 0.5);
        twitterButton.zIndex=5;

        if(!game.ended){
          replayButton.alpha = 0;
          facebookButton.alpha = 0;
          twitterButton.alpha = 0;
          replayButton.scale.set(0, 0);
          twitterButton.scale.set(0, 0);
          facebookButton.scale.set(0, 0);

          var groupReplay = new game.TweenGroup();
          var tweenReplay1 = new game.Tween(replayButton.scale);
          tweenReplay1.to({x:0.5, y:0.5}, 1500);
          tweenReplay1.easing('Back.Out');
          tweenReplay1.delay(4000);
          var tweenReplay2 = new game.Tween(replayButton);
          tweenReplay2.to({ alpha: 1 }, 1300);
          tweenReplay2.delay(4000);
          tweenReplay2.easing('Back.Out');
          groupReplay.add(tweenReplay1);
          groupReplay.add(tweenReplay2);
          groupReplay.start();
          groupReplay.onComplete = function () {
            replayButton.interactive = true;
          };

          var groupFacebook = new game.TweenGroup();
          var tweenFacebook1 = new game.Tween(facebookButton.scale);
          tweenFacebook1.to({x:0.5, y:0.5}, 1000);
          tweenFacebook1.easing('Back.Out');
          tweenFacebook1.delay(5400);
          var tweenFacebook2 = new game.Tween(facebookButton);
          tweenFacebook2.to({ alpha: 1 }, 850);
          tweenFacebook2.delay(5400);
          tweenFacebook2.easing('Back.Out');
          groupFacebook.add(tweenFacebook1);
          groupFacebook.add(tweenFacebook2);
          groupFacebook.start();
          groupFacebook.onComplete = function () {
            facebookButton.interactive = true;
          };

          var groupTwitter = new game.TweenGroup();
          var tweenTwitter1 = new game.Tween(twitterButton.scale);
          tweenTwitter1.to({x:0.5, y:0.5}, 1000);
          tweenTwitter1.easing('Back.Out');
          tweenTwitter1.delay(6300);
          var tweenTwitter2 = new game.Tween(twitterButton);
          tweenTwitter2.to({ alpha: 1 }, 850);
          tweenTwitter2.delay(6300);
          tweenTwitter2.easing('Back.Out');
          groupTwitter.add(tweenTwitter1);
          groupTwitter.add(tweenTwitter2);
          groupTwitter.start();
          groupTwitter.onComplete = function () {
            twitterButton.interactive = true;
          };
          game.ended = true;
        }else{
          replayButton.interactive = true;
          facebookButton.interactive = true;
          twitterButton.interactive = true;
        }
        replayButton.mousedown = replayButton.touchstart = function () {
          var tween = new game.Tween(replayButton.scale);
          tween.to({x:0.45, y:0.45}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };
        replayButton.mouseup = replayButton.touchend = function () {
          var tween = new game.Tween(replayButton.scale);
          tween.to({x:0.5, y:0.5}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };

        facebookButton.mousedown = facebookButton.touchstart = function () {
          var tween = new game.Tween(facebookButton.scale);
          tween.to({x:0.45, y:0.45}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };
        facebookButton.mouseup = facebookButton.touchend = function () {
          var tween = new game.Tween(facebookButton.scale);
          tween.to({x:0.5, y:0.5}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };

        twitterButton.mousedown = twitterButton.touchstart = function () {
          var tween = new game.Tween(twitterButton.scale);
          tween.to({x:0.45, y:0.45}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };
        twitterButton.mouseup = twitterButton.touchend = function () {
          var tween = new game.Tween(twitterButton.scale);
          tween.to({x:0.5, y:0.5}, 300);
          tween.easing('Circular.InOut');
          tween.start();
        };

        mainBg.mouseup = mainBg.touchend = function () {
          var tweenReplay = new game.Tween(replayButton.scale);
          tweenReplay.to({x:0.5, y:0.5}, 300);
          tweenReplay.easing('Circular.InOut');
          tweenReplay.start();
          var tweenTwitter = new game.Tween(twitterButton.scale);
          tweenTwitter.to({x:0.5, y:0.5}, 300);
          tweenTwitter.easing('Circular.InOut');
          tweenTwitter.start();
          var tweenFacebook = new game.Tween(facebookButton.scale);
          tweenFacebook.to({x:0.5, y:0.5}, 300);
          tweenFacebook.easing('Circular.InOut');
          tweenFacebook.start();
        };
        replayButton.click = replayButton.tap = function (){
          fader = new game.Fader({
              color: 0x000000,
              speed: 400
          });
          fader.fadeOut(function() {
            game.system.setScene('Sheep');
          });
        };
        facebookButton.click = facebookButton.tap = function (){
          //open new browser!!
          window.open('https://www.facebook.com/pRoXYcz','_blank');
        };
        twitterButton.click = twitterButton.tap = function (){
          //open new browser!!
          window.open('http://','_blank');
        };
      }
  });
  game.Loader.inject({
      bgColor: 0xffffff,

      initStage: function() {
        var video = new game.Video('video/preloader.m4v');
        video.sprite.anchor.set(0.5, 0.5);
        video.sprite.position.set(game.System.width / 2, game.System.height / 2);
        video.sprite.addTo(this.stage);
        video.sprite.scale.set(0.565, 0.565);
        video.onLoaded(function() {
            video.play();
        });
        video.onComplete(function() {
          game.system.setScene('Main');
        });
      },
      ready: function(event) {
        //if loaded!
      }
  });

});
