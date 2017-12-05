game.module(
    'game.menu'
)
.require(
    'engine.renderer'
)
.body(function() {

  game.createClass('Menu', 'Class', {
    init: function(container) {
      var fader = new game.Fader({
          color: 0x000000,
          speed: 250
      });

      var menuModal = new game.Container().addTo(container);
      menuModal.width = game.System.width;
      menuModal.height = game.System.height;
      menuModal.visible = false;

      if(game.menuOpen){
        menuModal.visible = true;
      }

      var menu = new game.Sprite('ui/menu.png');
      menu.scale.set(0.6, 0.6);
      menu.position.set(60, 50);
      menu.interactive = true;
      menu.anchor.set(0.5, 0.5);
      menu.zIndex=10;
      container.addChild(menu);

      menu.mousedown = menu.touchstart = function () {
        var tween = new game.Tween(menu.scale);
        tween.to({x:0.45, y:0.45}, 300);
        tween.easing('Circular.InOut');
        tween.start();
      };
      menu.mouseup = menu.touchend = function () {
        var tween = new game.Tween(menu.scale);
        tween.to({x:0.6, y:0.6}, 300);
        tween.easing('Circular.InOut');
        tween.start();
      };

      menu.click = menu.tap = function (){
        var tween = new game.Tween(menuModal);
        tween.easing('Circular.InOut');
        if(game.menuOpen){
          tween.to({ alpha: 0 }, 1000);
          tween.onComplete = function () {
              game.menuOpen = false;
              menuModal.visible = false;
          };
        }else{
          menuModal.visible = true;
          game.menuOpen = true;
          tween.to({ alpha: 1 }, 1000);
          tween.onComplete = function () {
              menuModal.visible = true;
          };
        }
        tween.start();

        // fader.fadeOut(function() {
        //   game.audio.stopMusic();
        //   game.system.setScene('Main');
        //
        // });
        //open modal
      };
    }

  });

});