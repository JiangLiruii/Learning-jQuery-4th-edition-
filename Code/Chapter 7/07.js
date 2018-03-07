// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
// $.fn.cycle.defaults.timeout = 1000;
// $.fn.cycle.defaults.random = true;
// $(document).ready(function(){
//     $('#books').cycle({
//         timeout: 1000,
//         speed: 200,
//         pause: true
//     });
// });
// custom selectors
$(document).ready(function(){
    let $books = $('#books');
    let $controls = $('<div id="books-control"></div>').insertAfter($books);
    $('<button>Pause</button>')
    .click(function(event) {
        event.preventDefault();
        $books.cycle('pause');
        $.cookie('cyclePaused','y',{path: '/',expires: 7});
    })
    .button({icons:{primary:'ui-icon-pause'}})
    .appendTo($controls);
    $('<button>Resume</button>')
    .click(function(event) {
        event.preventDefault();
        $('ul:paused').cycle('resume');
        $.cookie('cyclePaused',null);
    })
    .button({icons:{primary:'ui-icon-play'}})
    .appendTo($controls);
    $.cookie('cyclePause','y',{expire: 30});
    $books.find('.title').resizable({handles:'s',distance: 10});
    $books.cycle({
        timeout: 100,
        speed: 100,
        pause: true,
        fx: 'fadeout',
        before: function(){
            $('#slider')
            .slider('value', $('#books li').index(this))
        },
        autostop: ($('#books li').length - 1),
        end: function(){
            $('#slider').slider('disable', true);
            $('button').button('disable',true);
        }
    });
    $('<div id="slider"></div>').slider({
        min: 0,
        max: $('#books li').length - 1,
        slide: function(event,ui) {
            $books.cycle(ui.value);
        },
        animate: 'fast'
    }).appendTo($controls);
})