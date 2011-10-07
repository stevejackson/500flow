
$(document).ready(function() {

  loadGallery();

  $("#lightbox_overlay").click(function() {
    hideLightbox();
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
      // grab the full image, stick it into the lightbox
      showLightbox($(window).width() / 2 - 140, $(window).height() / 2 - 140);
      $('#lightbox').html(me.children('.full').html());
      $('#lightbox img').css("display", "block");

      var afterLoaded = function() {
        var width = $('#lightbox img').width();
        var height = $('#lightbox img').height();
        
        $('#lightbox').animate({
          'margin-top': -height / 2,
          'margin-left': -width / 2,
          'width': width,
          'height': height
        }, 1000);
      };
        
      $('#lightbox').preloader({'ondone':afterLoaded});
    };

    $(window).scrollTo( $(this).offset().top - 65, 500, {onAfter: afterScroll($(this))});

  });

  $('.gallery-page:last .thumb').preloader();
};

function showLightbox(x, y) {
  $('#content_container').animate({
    'opacity': 0.2
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

  $('#lightbox').hide();
  $('#lightbox_overlay').hide();
};
