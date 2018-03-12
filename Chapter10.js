// Chapter 10 advanced events 
/**
 * 1 Event Delegation
 * 2 Performance pitfalls
 * 3 Custom events
 * 4 Special event
 */

 // Loading additional pages of data
 $(function() {
     let pageNum = 1;
     $('#more-photo').click(function(event) {
        event.preventDefault();
        let $link = $(this);
        let url = $link.attr('href');
        if (url) {
            $.get(url,function(data) {
                $('#gallery').append(data);
            });
            pageNum += 1;
            if (pageNum < 20) {
                $link.attr('href', 'pages/' + package + '.html');
            }else {
                $link.remove();
            }
        }
     });
 });

 // display data on hovering

 $(function() {
     $('div.photo').hover(function() {
         $(this).find('.details').fadeTo('fast', 0.7);
     }, function() {
        $(this).find('details').fadeOut('fast')
     })
 })

 // mouseout and enter
 $(function() {
    $('div.photo')
    .on('mouseenter mouseleave', function(event) {
        let $details = $(this).find('.details');
        if (event.type === 'mouseenter') {
            $details.fadeTo('fast', 0.7);
        } else {
            $details.fadeOut('fast');
        }
    });
});

// if sth toggled instead if-else
$(this).find('.details').toggleClass('enter', event.type === 'mouseenter');

// on delegation
$(function() {
    $('#gallery').on('mouseenter mouseleave', 'div.photo', function(event) {
        let $details = $(this).find('.details');
        if (event.type === 'mouseenter') {
            $details.fadeTo('fast', 0.7);
        } else {
            $details.fadeOut('fast');
        }
    });
});
// delegation scope
$(function() {
    $(document).on('mouseenter mouseleave', 'div.photo', function(event) {
        let $details = $(this).find('.details');
        if (event.type === 'mouseenter') {
            $details.fadeTo('fast', 0.7);
        } else {
            $details.fadeOut('fast');
        }
    });
});
// bubble to document is costly but if siginature the context such as div.photo can reduce this work. this point to the second parameter

// delegation earlier, no need to wait until the dom ready
(function($){
    $(document).on('mouseenter mouseleave', 'div.photo', function(event) {
        let $details = $(this).find('.details');
        if (event.type === 'mouseenter') {
            $details.fadeTo('fast', 0.7);
        } else {
            $details.fadeOut('fast');
        }
    });
}(jQuery))


// defining custom events .on()  .trigger()
$(function(){
    $('#more-photo').click(function(e) {
        e.preventDefault();
        $(this).trigger('nextPage');
    });
});
(function($){
    $().on('nextPage', function() {
        let url = $(this).attr('href');
        if (url) {
            $.get(url, function(data) {
                $('#gallery').append(data);
            })
        }
    });
    let pageNum = 1;
    $().on('nextPage', function() {
        pageNum += 1;
        if (pageNum < 20) {
            $('#more-photo').attr('href', 'pages/' + pageNum + '.html');
        } else {
            $('#more-photo').remove();
        }
    })
}(jQuery));

// infinite scrolling
(function($) {
    function checkScrollerPosition() {
        let distance = $(window).scrollTop() + $(window).height();
        if ($('#container').height() <= distance) {
            $(document).trigger('nextPage');
        }
    };
    $(function() {
        $(window).scroll(checkScrollerPosition).trigger('scroll'); // trigger the scroll event immediately
    })
}(jQuery));

// custom event parameters
(function($) {
    $(document).on('nextPage', function(event, scrollToVisible) {
        let url = $('#more-photos').attr('href');
        if (url) {
            $.get(url,function(data) {
                let $data = $(data).appentTo('#gallery');
                if (scrollToVisible) {
                    let newTop = $data.offset().top;
                    $(window).scrollTop(newTop);
                }
                checkScrollerPosition();
            }) 
        }
    })
}(jQuery));
$(function(){
    $('#more-photo').click(function() {
        $(this).trigger('nextPage', [true]);
        return false;
    })
    $(window).scroll(checkScrollerPosition).trigger('scroll');
});
// throttling events
$(function() {
    let timer = 0;
    $(window).scroll(function() {
        if(!timer) {
            timer = setTimeout(function(){
                checkScrollerPosition();
                timer = 0
            },300);
        }
    }).trigger('scroll');
})