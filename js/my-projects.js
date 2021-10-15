$(window).on("load", function() {
    //console.log(view);
    $(".o-card_headerHeroImg").each(function() {
      var bg = $(this).attr("data-image");
      $(this).css({ "background-image": "url(" + bg + ")" });
    });
  
    $(document).on("click touch", ".o-card-headerList--openIcons", function(e) {
      $(this).parent().toggleClass("isOpen");
      $(this).parent().next().toggleClass("isOpen");
      var btnOffset = $(this).offset(),
      xPos = e.pageX - btnOffset.left,
      yPos = e.pageY - btnOffset.top;
      //console.log(xPos +' / '+ yPos);
      return false;
    });
    
    $(document).on("click touch", ".o-card-headerList li", function(e) {
      e.stopPropagation();
      return false;
    });
    
    $(document).on("click touch", function() {
      $(".o-card-headerList,.o-card_logo").removeClass("isOpen");
    });
    
    $('.o-card_paragraph').each(function(){
      var _this = $(this);
      var pHeight = _this.height();
      console.log(pHeight);
      _this.after('<span class="a-more"></span>')
    });
    
    $(document).on( 'click' , '.a-more' , function(){
      $(this).prev('p').toggleClass('isToggle');
      $(this).toggleClass('isActive');
    });
    
    $('.a-readMore').on('click touch', function(event) {
      event.preventDefault();
      $(id_target).find('.o-modal__close').attr('data-close','');
      var this_target = $(this).attr('data-href');
      var _this = $(this);
      var id_target = '#'+this_target.replace(/\./g,'');
      console.log(id_target);
      $(id_target).find('.a-loader').show();
      $(id_target).find('.o-modal__close').attr('data-close',id_target);
      
      $.ajax({
          url: 'https://en.wikipedia.org/w/api.php',
          data: {
              format: 'json',
              action: 'parse',
              page: this_target,
              prop:'text',
              section:0,
          },
          dataType: 'jsonp',
          success: function (data) {
          //console.log(data)
          $(id_target).find('.o-modal__inner').html('');
          $(id_target).find('.o-modal__title').html('').hide();    
          $(id_target).find('.o-modal').addClass('isOpen');
          if(!$(id_target).find('.a-more').hasClass('isActive')){
              $(id_target).find('.a-more').trigger('click');
           }
          var markup = data.parse.text['*'];
          var i = $('<div></div>').html(markup);
          i.find('a').each(function() { $(this).replaceWith($(this).html()); });
          i.find('sup').remove();
          i.find('.mw-ext-cite-error').remove();
           setTimeout(function() {
              $(id_target).find('.o-modal__title').html( data.parse.title).fadeIn(300);
              $(id_target).find('.o-modal__inner').html($(i).find('p'));
              $(id_target).find('.a-loader').hide();
            }, 1000);
          }
      });
    });
    
    $('.o-modal__close').on('click touch', function(){
      var close_target = $(this).attr('data-close');
      $(close_target).find('.o-modal').removeClass('isOpen');
      $(close_target).find('.o-modal__inner').html('');
      $(close_target).find('.o-modal__title').html('').hide();       
      $(close_target).find('.a-more').trigger('click');
    });
    
  });
  