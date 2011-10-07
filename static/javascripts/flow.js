
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
    $(window).scrollTo( $(this).offset().top - 65, 500 );

    // grab the full image, stick it into the lightbox
    showLightbox($(this).position().left, $(this).position().top);
    $('#lightbox').html($(this).children('.full').html());
    $('#lightbox .full').css('display', 'block');

    var afterLoaded = function() {
      var width = $('#lightbox img').width();
      var height = $('#lightbox img').height();
      
      $('#lightbox').animate({
        'left': '50%',
        'top': '50%',
        'margin-top': -height / 2,
        'margin-left': -width / 2,
        'width': width,
        'height': height
      }, 1000);
    };

    $('#lightbox').preloader({'ondone':afterLoaded});

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
    'height': '280px'
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
