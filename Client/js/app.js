(function () {
  "use strict";


  window.App = {
    currentScene: null,
    scenes: {},
    isShown: true,

    initialize: function () {
      this.$wrap = $('.wrap');
      $$legend.show();
      this.setEvents();
      $$nav.on();
    },

    setEvents: function () {
      var self = this,
        $bg = $('.bg');
        self.showContent('catalog');
      $('.menu').on('click', '.menu-item', function ( e ) {
        var scene = e.currentTarget.getAttribute('data-content');
        self.showContent(scene);
      });

      function infoImage(title){
        var informer = function(){
          $('#info_player').html("");
        };
        $('#info_player').html('<img src="./img/' + title + '"></img>');
        setTimeout(informer, 500);
      }

      $(document.body).on({
        'nav_key:blue': _.bind(this.toggleView, this),
        'nav_key:stop': function () {
          Player.seek(0);
          Player.pause();
          $('#info_player').html('');
        },
        'nav_key:play': function () {
          if (Player.state !== 'play'){
            infoImage('play.png');
          }
          Player.play();
        },
        'nav_key:pause': function () {
          Player.pause();
          $('#info_player').html('<img src="./img/pause.png"></img>');
        },
        'nav_key:ff': function () {
          Player.seek(Player.videoInfo.currentTime + 5);
          infoImage('ff.png');
        },
        'nav_key:return': function () {
          location.reload();
        },
        'nav_key:rw': function () {
          Player.seek(Player.videoInfo.currentTime - 5);
          infoImage('rw.png');
        },
        'nav_key:exit': function(){
          SB.exit();
        }
      });

      Player.on('ready', function () {
        window.App.isShown = false;
        $('.wrap').hide();
        $('.bg').hide();
        $$legend.hide();
        $('#smart_player').show();
      });
      Player.on('stop', function () {
        $bg.show();
    });
    },

    toggleView: function () {
      if (this.isShown) {
        this.$wrap.hide();
        $$legend.hide();
      } else {
        this.$wrap.show();
        $$legend.show();
      }
      this.isShown = !this.isShown;
    },

    showContent: function ( scene ) {
      var cur = this.currentScene,
        newScene = this.scenes[scene];

      if ( cur !== newScene ) {
        if ( !newScene ) {
          $$error('Scene ' + scene + ' doesn\'t exist');
        } else {
          if ( cur ) {
            cur.hide();
          }
          newScene.show();
          this.currentScene = newScene;
        }
      }
    }
  };

  SB(_.bind(App.initialize, App));
})();
