// Advanced Selectors and Transversing
// Sizzle
/**
 * 1 selectors
 * 2 new method to write plugins
 * 3 optimizing selector expressions
 * 4 inner wordings of Sizzle engine
 * 
 */

 // Dynamic tables filtering
 $(document).ready(function(){
     $('#topics a').click(function(event){
         event.preventDefault();
         let topics = $(event).text();
         $('#topics a.selected').removeClass('selected');
         $(this).addClass('selected');
         $('#news tr').show();
         if (topics !== 'All') {
             $('#news tr:has(td):not(:contains("'+topics+'"))')
             .hide()
         }
     });
 });

 // some function
 $(document).ready(function(){
    $('#topics a').click(function(event){
        event.preventDefault();
        let topics = $(this).text();
        $('#topics a.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#news tr').show();
        if (topics !== 'All') {
            $('#news').find('tr:has(td)').not(function() {
                return $(this).children(':nth-child(4)').text() === topics;
            })
            .hide();
        }
    });
});

// striping tables rows
$('#news').find('tr:nth-child(even)').addClass('alt');
$('#news').filter(function(index){ // 0 based
    return (index % 4) < 2;
}).addClass('alt');

// skip table header rows
$('#news tbody').each(function() {
    $(this).children().has('td').filter(function(index) {
        return (index % 4) < 2;
    })
    .addClass('alt');
});
//Combining filtering and striping
(function stripe($) {
    $('#news tbody').each(function() {
        $(this).children(':visible').has('td').filter(function(index) {
            return (index % 4) < 2;
        })
        .addClass('alt');
    });
}(jQuery));
(function clickFilter($) {
    $('#topics a').click(function(event){
        event.preventDefault();
        let topics = $(this).text();
        $('#topics a.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#news tr').show();
        if (topics !== 'All') {
            $('#news').find('tr:has(td)').not(function() {
                return $(this).children(':nth-child(4)').text() === topics;
            })
            .hide();
        }
    }); 
}(jQuery));

// pseudo-class:group
(function($) {
    $.extend($.expr[':']),{
        group: function(element, index, matches, set) {
            let num = parseInt(matches[3], 10);
            if (isNaN(num)) {
                return false;
            }
            return index % (num *2) < num;
        }
    }
}(jQuery))

function Sizzle(selector, context, result, seed) {

}


//<input type = "text">
$('input[type="text"]')
$('input:text')
// for performance prefer selectors ths are part of the css specification
// .nextAll()
// .next()
// .parent()

$(document).ready(function() {
    let $cell = $('#release').nextAll();
    console.log($cell.context); // document
    console.log($cell.selector); // $('#release').nextAll()
    console.log($cell.prevObject);// td: refer to original object before call .nextAll  
});

// DOM stack .addBack(), .end()
$(document).ready(function() {
    $('#release').nextAll().addBack().addClass('hightlight');
});

// method plugin
(function($){
    $.fn.column = function() {
        let $cell = $();
        this.each(function() { // the jq obj may be 0,1 or more, so each is the besty
            let $td = $(this).closest('td, th');
            if ($td.length) {
                let colNum = $td[0].cellIndex + 1;
                let $columnCells = $td
                    .closest('table')
                    .find('td, th')
                    .filter(':nth-child('+ colNum +')')
            $cells = $cells.add($columnCells);
            }
        });
        return this.pushStack($cells);
    };
}(jQuery))

$(function(){
    $('#news td').click(function() {
        $('#news td.active').removeClass('active');
        $(this).column.addClass('active');
    });
});

// avoid repetition
// chaining use pushStack .end() .addBack()
$(function() {
    function strip () {
        $('#news')
        .find('tr.alt').removeClass('alt').end()
        .find('tbody').each(function() {
            $(this).children(':visible').has('td')
                .filter(':group(3)').addClass('alt');
        });
    }
    strip();
});
//caching
$(function() {
    let $news = $('#news');
    function strip() {
        $news.find('tr.alt').removeClass('alt');
        $news.find('tbody').each(function() {
            $(this).children(':visible').has('td')
                .filter(':group(3)').addClass('alt');
        });
    };
    strip();
})
