(function () {
  "use strict";
  var _inited;
    _.templateSettings.interpolate = /\{\{([\s\S]+?)\}\}/g;

  var itemHtml = _.template('<div data-url="{{url}}" data-type="{{type}}" data-desc="{{desc}}" data-ctg="{{ctg}}" class="video-item nav-item">{{title}}</div>');

  window.App.scenes.catalog = {

    init: function () {
      this.$el = $('.catalog');
      var $info = $('.info');
      this.$el.on('click', '.video-item', this.onItemClick);
      this.renderItems(App.videos);

      this.$el
        .find('.video-item')
          .on(
          {
            'nav_focus': function (e) {
                var content = e.currentTarget.getAttribute('data-desc') + "<br>";
                content += "Категория: " + e.currentTarget.getAttribute('data-ctg');
              $info.html(content);
            },
            'nav_blur': function (e) {
              $info.html('');
            }
          });

      _inited = true;

    },

    show: function () {
      if (!_inited) {
        this.init();
      }

      this.$el.show();
    },

    hide: function () {
      this.$el.hide();
    },

    // handler for click event
    onItemClick: function (e) {
      var url = e.currentTarget.getAttribute('data-url');
      Player.play({
        url: url,
        type: e.currentTarget.getAttribute('data-type')
      });
      $('.wrap').hide();
      window.App.isShown = false;
      $$legend.hide();

      Player.on('complete', function(){
        window.App.isShown = true;
        $('.wrap').show();
        $('.bg').show();
        $$legend.show();
        $('#smart_player').hide();
      });
    },

    renderItems: function (items) {
      var html = '';
      for ( var i = 0, len = items.length; i < len; i++ ) {
        html += itemHtml(items[i]);
      }

      this.$el
        .empty()
        .html(html);
    }

  }
})();
