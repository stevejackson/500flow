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
  if($(window).scrollTop() >= $(document).height() - $(window).height()) {
    getNextPage();
  }
});

function getNextPage() {
  $.get('/getNextPage', function(data) {
    $('#content_container').append(data);
    loadGallery();
  });
};

function loadGallery() {
  $('.gallery-image').click(function() {
    var afterScroll = function(me) {

      showLightbox($(window).width() / 2 - 140, $(window).height() / 2 - 140);
      var photoFullURL = me.children('#full').attr('title');
      $('#lightbox').html('<img src="' + photoFullURL + '" />');
      $('#lightbox img').css("display", "block");

      var afterLoaded = function() {
        var width = $('#lightbox img').width();
        var height = $('#lightbox img').height();
        
        //alert('ok');
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
        
      $('#lightbox').preloader({'ondone':afterLoaded});
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
