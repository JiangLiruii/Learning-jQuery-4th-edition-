// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(document).ready(function() {
  let $movable = $('<div id="movable"></div>').appendTo('body');
  let bioBaseStyle = {
    display: 'none',
    height: '5px',
    width: '25px'
  },
  bioEffect = {
    duration: 800,
    easing: 'easeOutQuart',
    specialEasing: {
      opacity: 'linear'
    }
  };
  $.fx.speeds.zippy = 3000;
  function showBio() {
    $movable.stop(true,true);
    let $elem = $(this).parent(),
        $bio = $elem.find('p.bio'),
        startStyle = $.extend(bioBaseStyle,$elem.offset());
        endStyle = {
          width: $bio.width(),
          top: $elem.offset().top + 5,
          left: $elem.width() + $elem.offset().left - 5,
          opacity: 'show'
        };
    $movable
        .html($bio.clone())
        .css(startStyle)
        .delay(2000)
        .animate(endStyle,bioEffect)
        .animate({height: $bio.height()},{easing: 'easeOutQuart'},{duration: 'zippy'})
  };
  function showDetails() {
    let $elem = $(this).parent();
    if ($elem.hasClass('active')) {
      return;
    }
    $movable.stop(true,true);
    $movable.fadeOut();

    $('div.member.active')
      .removeClass('active')
        .children('div').fadeOut();
    $elem.addClass('active');
    $elem.find('div').css({
      display: 'block',
      left: '-300px',
      top: 0
    }).each(function(index) {
      $(this).animate({
        left: 0,
        top: 25 * index
      },{
        duration: 'slow',
        specialEasing: {
          top: 'easeInQuart'
        }
      });
    }).promise().done(function() {
      $(this).parent().find('div').addClass('highlight');
      showBio.apply(this);
    });
  }
  $('div.member').on('mouseenter mouseleave', function(event) {
    var size = event.type == 'mouseenter' ? 85 : 75;
    var pad = event.type == 'mouseenter' ? 0 : 5;
    $(this).find('img').stop(true,true).animate({
      width: size,
      height: size,
      paddingTop: pad,
      paddingLeft: pad
    });
  })
    .find('img').click(showDetails);
})