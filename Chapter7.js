// using Plugins
/**
 * 1 download and setting up plugins
 * 2 calling jQuery methods provided by plugins
 * 3 finding elements using custom selectors defined by jquery plugins
 * 4 adding sophisticated user interface behaviors using jQuery UI
 * 5 Implementing mobile-friendly features using jQuery Mobile
 */

 $(document).reay(function(){
     $('#books').cycle({
         timeout: 200,
         speed: 100000,
         pause: true
     });
 })
 // redefine
 $.fn.cycle.default.timeout = 1000;
 $.fn.cycle.default.random = true;

// add two buttons to control the slide

 $(document).ready(function(){
    let $books = $('#books'),
        $controls = $('<div id="books-control"></div>');
        $controls.insertAfter($books);
        $('<button>Pause</button>').click(function(event) {
            event.preventDefault();
            $books.cycle('pause');
        }).appendTo($controls);
        $('<button>Resume</button>').click(function(event) {
            event.preventDefault();
            $books.cycle('resume');
        }).appendTo($controls);
});
// resume only from where paused.
$(document).ready(function(){
    let $books = $('#books'),
        $controls = $('<div id="books-control"></div>');
        $controls.insertAfter($books);
        $('<button>Pause</button>').click(function(event) {
            event.preventDefault();
            $books.cycle('pause');
        }).appendTo($controls);
        $('<button>Resume</button>').click(function(event) {
            event.preventDefault();
            $('ul:paused').cycle('resume');
        }).appendTo($controls);
        $('#books').cycle({
            timeout: 500,
            speed: 100,
            pause: true
        });
});
// exam cookies
if ($.cookie('cyclePaused')) {
    $book.cycle('pause');
}
//set cookies
$(document).ready(function(){
    let $books = $('#books'),
        $controls = $('<div id="books-control"></div>');
    $controls.insertAfter($books);
    $('<button>Pause</button>').click(function(event) {
        event.preventDefault();
        $books.cycle('pause');
        $.cookie('cyclePaused','y',{path: '/',expires: 7});
    }).appendTo($controls);
    $('<button>Resume</button>').click(function(event) {
        event.preventDefault();
        $('ul:paused').cycle('resume');
        $.cookie('cyclePaused',null);
    }).appendTo($controls);
    $('#books').cycle({
        timeout: 500,
        speed: 100,
        pause: true
    });
    $books.hover(function() {
        $books.find('.title').animate({
            backgroundColor: '#eee',
            color: '#000'
        },1000);
    },function() {
        $books.find('.title').animate({
            backgroundColor: '#000',
            color: '#fff'
        },1000);
    })
});
// easing effects

$('h1').click(function(){
    $(this).toggleClass('highlighted', 'slow','easeInExpo');
});
// additional effect 

$(this).effect('shake', {distance: 5});
// resizable

$books.find('.title').resizable({handles: 's'});

// widgets:
$('button').button({icons: {primary: 'ui-icon-play'}});


// add slider
$('<div id="slider"></div>').slider({
    min:0,
    max: $('#books li').length - 1,
//react with slider
    slide: function(event, ui) {
        $books.cycle(ui.value);
    }
}).appendTo($controls);
// interaction
$('#books').cycle({
    timeout: 500,
    speed: 100,
    pause: true,
    // manipulate the slider to coincident with the pics
    before: function() {
        $('#slider')
            .slider('value', $('#books li').index(this));
    }
});

// mobile
// HTML5 custom data attributes data-*
// mobile navigation


