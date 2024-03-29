$(function(){
  var fetching = false;

  $(document).ready(function() {

    loadGallery();

    $("#lightbox_overlay, header").click(function() {
      hideLightbox();
    });

    // username text field 
    var defaultUsername = 'sjackson';
    $("#username").val(defaultUsername);
    $("#username").focus(function() {
      if($(this).val() == defaultUsername) {
        $(this).val('');
      }
    });
    $('#username').blur(function() {
      if($(this).val() == '') {
        $(this).val(defaultUsername);
      }
    });

  });

  // When they scroll to the bottom of the page...
  $(window).scroll(function() {
    if($(window).scrollTop() >= $(document).height() - $(window).height() - 400) {
      if(!fetching) {
        fetching = true;
        getNextPage();
      }
    }
  });

  function getNextPage() {
    $.get('/getNextPage', function(data) {
      $('#content_container').append(data);
      fetching = false;
      loadGallery();
    });
  };

  function loadGallery() {
    $('.gallery-page:last .gallery-image').click(function() {
      var afterScroll = function(me) {

        showLightbox($(window).width() / 2 - 140, $(window).height() / 2 - 140);
        var photoFullURL = me.children('#full').attr('title');
        $('#lightbox').html('<img src="' + photoFullURL + '" />');
        $('#lightbox img').css("display", "block");

        var afterLoaded = function() {
          var width = $('#lightbox img').width();
          var height = $('#lightbox img').height();

          $('#lightbox').animate({
            'top': '50%',
            'left': '50%',
            'margin-top': -height / 2,
            'margin-left': -width / 2,
            'width': width,
            'height': height,
            'opacity': 1
          }, 1000);
        };

        $('#lightbox').preloader({'ondone':afterLoaded, 'spinner':'/images/ajax-loader-white.gif', 'preloader_class': 'preloader-white'});
      };

      $(window).scrollTo( $(this).offset().top - 45, 500, {onAfter: afterScroll($(this))});

    });

    $('.gallery-page:last .thumb').preloader();
  };

  function showLightbox(x, y) {
    $('#content_container').animate({
      'opacity': 0.1
    }, 500);

    $('#lightbox').css({
      'left': x,
      'top': y,
      'width': '280px',
      'height': '280px',
      'margin-top': 0,
      'margin-left': 0
    });

    $('#lightbox').animate({'opacity': 1}, 500);

    $('#lightbox').show();
    $('#lightbox_overlay').show();
  };

  function hideLightbox() {
    $('#content_container').animate({
      'opacity': 1.0
    }, 500);

    $('#lightbox').animate({
      'opacity': 0
    }, 500);

    $('#lightbox').hide();
    $('#lightbox_overlay').hide();
  };
});
