// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(document).ready(function(){
    const $speech = $('div.speech');
    $speech.fadeIn('slow');
    $speech.mouseover(function(event) {
        if ($(event.target).is('p')) {
            $(event.target).css('background-color', 'yellow');
        }
    });
    $('h2').click(function() {
        $(this)
        .animate({'opacity': 0.25, 'margin-left': 20},function(){
            $speech.animate({'opacity': 0.5});
        })
    });
    $(document).keydown(function(e) {
        const $switcher = $('#switcher');
        // $switcher.css(position,'absolute');
        const directionDict = ['Left','Top','Right','Bottom'];

        let marginDirection = 'margin' + directionDict[e.which - 37];
        let marginValue = parseInt($switcher.css('margin' + directionDict[e.which - 37])) || 0;
        marginValue += 20;
        console.log(marginDirection);
        $switcher.animate({[marginDirection]: marginValue},{queue: false});
    })
});