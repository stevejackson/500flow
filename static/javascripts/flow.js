$(document).ready(function() {

});

// When they scroll to the bottom of the page...
$(window).scroll(function() {
  if($(window).scrollTop() == $(document).height() - $(window).height()) {
    getNextPage();
  }
});

function getNextPage() {
  $.get('/getNextPage', function(data) {
    $('.content_container').append(data);
  });
};
