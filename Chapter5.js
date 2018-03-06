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

