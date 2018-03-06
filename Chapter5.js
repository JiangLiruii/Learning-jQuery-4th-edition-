//Manipulating the DOM
// modifying the document using the interface provided by the DOM
// creatin elements and text on apage
// moving elements and text on apage
// transforming a document by adding, removing, or modifying attributes and properties


// Non-class attributes id, rel, href -->  .attr() .removeAttr()

$(document).ready(function() {
    $('div.chapter a').attr({rel:'external', title: 'learn more at Wiki'});
});

// callback
$(document).ready(function() {
    $('div.chapter a').attr({
        rel:'external', 
        title: 'learn more at Wiki',
        id: function(index, oldValue) { // oldValue is prior id
            return 'Wikilink-' + index;
        }
    });
});
// more specific
$(document).ready(function() {
    $('div.chapter a[href*="wikipedia"]').attr({
        rel:'external', 
        title: 'learn more at Wiki',
        id: function(index, oldValue) { // oldValue is prior id
            return 'Wikilink-' + index;
        }
    });
});

// more title
$(document).ready(function() {
    $('div.chapter a[href*="wikipedia"]').attr({
        rel:'external', 
        title: function() {
            return 'learn more about' + $(this).text() + ' at Wiki';
        },
        id: function(index, oldValue) { // oldValue is prior id
            return 'Wikilink-' + index;
        }
    });
});

// defferences between attr and prop
// nodeName,nodeType,selectedIndex, childNodes have no .attr  checked has a string attr but boolean prop
const currentlyChecked = $('.my-checkbox').prop('checked');
$('.my-checkbox').prop('checked', false);

// the value of form controls text --> defaultValue select --> selectedIndex
const inputValue = $('#my-input').val();
const selectValue = $('#my-select').val();
$('#my-single-select').val('value3');
$('#my-multi-select').val(['value1','value2']);

//creating new elements
$(document).ready(function(){
    $('<a href = "#top">back to top</a>').insertAfter('div .chapter p');
    $('<a id="top"></a>').prependTo('body');// lat #top to know where to jump
});
//insertAfter insertBefore appendTo prependTo

$(document).ready(function() {
    $('span.footnote')
    .insertBefore('#footer')
    .wrapAll('<ol id="notes"></ol>')
    .wrap('<li></li>')
})

// each
$(document).ready(function() {
    let $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
    $('span.footnote').each(function(index){
        $('<sup>' + (index + 1) + '</sup>').insertBefore(this)
        $(this).appendTo($notes).wrap('<li></li>')
    });
});
// inverted insertion methods
$('<p>Hello</p>').appendTo('#container');
$('#container').append('<p>Hello</p>');

$(document).ready(function() {
    let $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
    $('span.footnote').each(function(index){
        $(this)
        .before('<sup>' + (index + 1) + '</sup>')
        .appendTo($notes).wrap('<li></li>')
    });
});

// add link to the sup number
$(document).ready(function() {
    let $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
    $('span.footnote').each(function(index){
        $(this)
        .before(['<a href="#footnote-',
        index + 1,
        '" id="context-',
        index + 1,
        '" class="context"><sup>',
        index + 1,
        '</sup></a>'].join(''))
        .appendTo($notes).wrap('<li></li>')
    });
});
// reverse 
$(document).ready(function() {
    let $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
    $('span.footnote').each(function(index){
        $(this)
        .before([
        '<a href="#footnote-',
        index + 1,
        '" id="context-',
        index + 1,
        '" class="context"><sup>',
        index + 1,
        '</sup></a>'].join(''))
        .appendTo($notes)
        .append(['&nbsp;<a href="#context-', index + 1, '">context</a>'].join(''))
        .wrap('<li id="footnote-' + (index + 1) + '"></li>')
    });
});

//Coping elements
$('div .chapter p:eq(0)').clone().insertBefore('div .chapter');

// cloning for pull quotes
$(document).ready(function() {
    $('span.pull-quote').each(function(index) {
        let $parentParagragh = $(this).parent('p');
        $parentParagragh.css('position', 'relative');
        let $cloneCopy = $(this).clone();
        $cloneCopy
        .addClass('pulled')
        .prependTo($parentParagragh);
    });
});

// Content getter and setter methods
$('span.pull-quote').each(function(index) {
    let $parentParagragh = $(this).parent('p');
    $parentParagragh.css('position', 'relative');
    let $cloneCopy = $(this).clone();
    $cloneCopy
    .addClass('pulled')
    .find('span.drop')
        .html('&hellip;')
    .end()
    .prependTo($parentParagragh);
});

// summary
1 create new : $
2 insert new inside:
    1 .append()
    2 .appendTo()
    3 .prepend()
    4 .prependTo()
3 insert adjacent to:
    1 .after()
    2 .insertAfter()
    3 .before()
    4 .insertBefore()
4 insert new elements around every matched Element:
    1 .wrap()
    2 .wrapAll()
    3 .wrapInner()
5 replace
    1 .html()
    2 .text()
    3 .replaceAll()
    4 .replaceWith()
6 remove Element
    1 .empty()
7 remove element and descendants
    1 .remove()
    2 .detach()