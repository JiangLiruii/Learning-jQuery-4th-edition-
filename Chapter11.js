// Advanced effects
/**
 * 1 ways to gather info about the state of animations
 * 2 methods for interrupting active animations
 * 3 global effect options that can affect all animations on the page at once
 * 4 deferred object
 * 4 easing
 */
$(function() {
    $('div.member').on('mouseenter mouseleave', function(event) {
        let size = event.type === 'mouseenter' ? 85:75;
        let padding = event.type === 'mouseenter' ? 0: 5;
        $(this).find('img').animate({
            width: size,
            height: size,
            paddingTop: padding,
            paddingLeft: padding
        });
    });
});
// judge the selector is in anmation or not, the event will queue
$(function() {
    $('div.member').on('mouseenter mouseleave', function(event) {
        let $img = $(this).find('img');
        if(!$img.is(':animate') || event.type === 'mouseleave') {
            let size = event.type === 'mouseenter' ? 85:75;
            let padding = event.type === 'mouseenter' ? 0: 5;
            $(this).find('img').animate({
                width: size,
                height: size,
                paddingTop: padding,
                paddingLeft: padding
            });
        }
    });
  });
  // halting a running animation, stop: will cause start next time at the same place
  $(document).ready(function() {
      $('div.member').on('mouseenter mouseleave', function(event) {
        let size = event.type === 'mouseenter' ? 85:75;
        let padding = event.type === 'mouseenter' ? 0: 5;
        $(this).find('img').stop().animate({ // stop(true,true)
            width: size,
            height: size,
            paddingTop: padding,
            paddingLeft: padding
        });
      })
  })
  // disable all effects
  $('fx-toggle').show().on('click', function() {
      $.fx.off = !$.fx.off;
  });

// definiing effect duration
//   speeds: {
//       slow: 600,
//       fast: 200,
//       _default: 400
//   }
$.fx.speeds.crawl = 1200;
$(someElement).animate({width: '300px'},' crawl');
// change default
$.fx.speeds._default = 250;

$(document).ready(function() {
    function showDetails() {
        let $member = $(this);
        if ($member.hasClass('active')){
            return;
        } else {
            $('div.member.active')
            .removeClass('active')
            .children('div').fadeOut();
            $member.addClass('active');
        }
        $(this).find('div').css({
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
                    top: 'easeInQuart' // multipropertiy easing need another plugin such as jquery UI
                }
            });
        }).promie().done(showBio); // deferred object
    }
    $('div.member').click(showDetails);
});
// using Deferred pbjects
/**
 * 1 done
 * 2 fail
 * 3 always
 */
// animation promise
let $movable = $('div id="movable"></div>')
    .appendTo('body');
let bioBaseStyles = {
    display: 'none',
    height: '5px',
    width: '25px'
},
    bioEffects = {
        duration: 800,
        easing: 'easeOutQuart',
        specialEasing: {
            opacity: 'linear'
        }
    };

function showBio() {
    let $member = $(this).parent(),
        $bio = $member.find('p.bio'),
        startStyles = $.extend(bioBaseStyles, $member.offset()),
        endStyle = {
            width: $bio.width(),
            top: $member.offset().top +5,
            left: $member.width() + $member.offset().left - 5,
            opacity: 'show'
        };
        movable
        .html($bio.clone())
        .css(startStyles)
        .animate(endStyle,bioEffects)
        .animate({height: $bio.height()}, {easing: 'easeOutQuart'}) // height change from 5px to $bio.height
};
$('#mydiv').animate({
    height: '200px',
    width: '400px'
},{
    step: function(now, tween) {// called every 13 ms
        // monitor height and width adjust tween properties
    },
    progress: function(animation, progress, remainingMs) {// progress-->0,1

    }
})

// requestAnimationFrame()-->setTimeout() 
// 2 methods .timer() and .stop()

$.Animation.prefilter(function(element, properties, options) {
    if (options.removeAfter) {
        this.done(function() {
            $(element).remove();
        })
    }
});
$('#my-div').fadeOut({removeAfter: true});