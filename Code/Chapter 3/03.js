// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(document).ready(function(){
    $('.author').click(function(){
        $(this).addClass('selected');
    });
    $('.chapter-title').dblclick(function() {
        console.log($(this).parent());
        $(this).parent().children('p').toggleClass('hidden');
    });
    const setBodyClass = function() {
        const bodyClasses = ['default', 'narrow', 'large'];
        currentBodyClass = $('body').attr('class') || 'default';
        currentKey = bodyClasses.indexOf(currentBodyClass);
        nextKey = currentKey + 1;
        if (nextKey > 2) {
            nextKey = 0;
        }
        $('body').removeClass().addClass(bodyClasses[nextKey]);
    }
    $(document).keyup(function(event){
        console.log(event.which);
        if (event.which === 39) {
            setBodyClass();
        }
    });
    $('p').mouseover(function(event) {
        console.log(event.originalEvent.x||event.originalEvent.layerX||0, event.originalEvent.y||event.originalEvent.layerY||0)
    })
    // $(document).mousedown(function() {
    //     $('p').addClass('hidden');
    // });
    // $(document).mouseup(function() {
    //     $('p').removeClass('hidden');
    // })
})