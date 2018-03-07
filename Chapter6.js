// sending data woth ajax(Asynchronous javascript and XML)
// 1 javascript 2 XMLHTTPRequest 3 Textual data

/**
 *  loading data without refresh
 *  sending data form js to server
 *  interpreting data in formats(HTML,XML,JSON)
 *  feedback to user
 */

$(document).ready(function() {
    $('#letter-a a').click(function(event) {
        event.preventDefault();
        $('#dictionary').load('a.html');
        alert('loaded~');
    })
})

// JSON javescript Object Notation,string must be double quotes
{
    "key": "value",
    "key2": ["array","of","items"]
}

// load javascript and use each method
$(document).ready(function() {
    $('#letter-c a').click(function(event) {
        event.preventDefault();
        $.getScript('c.js');
    });
});

// use XML formats, arbitrary use <entry> <definition>
$(document).ready(function() {
    $('#letter-d a').click(function(event) {
        event.preventDefault();
        $.get('d.xml',function(data){
            $('#dictionary').empty();
            $(data).find('entry').each(function() {
                let $entry = $(this);
                let html = '<div class="entry">';
                html += '<h3 class="term">' + $entry.attr('term') + '</h3>';
                html += '<div class="part">' + $entry.attr('part') + '</div>';
                html += '<div class="definition">';
                html += $entry.find('definition').text();
                let $quote = $entry.find('quote');
                if($quote.length) {
                    html += '<div class="quote">';
                    $quote.find('line').each(function() {
                        html += '<div class="quote-line">';
                        html += $(this).text() + '</div>'
                    });
                    if ($quote.attr('author')) {
                        html += '<div class="quote-author">';
                        html += $quote.attr('author') + '</div>'
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';                
                $('#dictionary').append(html);
        })
        });
    });
});

// strictly 
$(data).find('entry:has(quote[author]').each(function() {})

// load,getJSON,getScript,get,post
//get 
$(document).ready(function() {
    $('#letter-e a').click(function(e){
        e.preventDefault();
        let requestData = {term: $(this).text()};
        $.get('e.php', requestData, function(data) {
            $('#dictionary').html(data);
        })
    })
});
//post
$(document).ready(function() {
    $('#letter-e a') .click(function(e) {
        e.preventDefault();
        let requestData = {term: $(this).text()};
        $.post('e.php',requestData,function(data) {
            $('#dictionary').html(data);
        })
    })
});
// load
$(document).ready(function() {
    $('#letter-e a') .click(function(e) {
        e.preventDefault();
        let requestData = {term: $(this).text()};
        $('#dictionary').load('e.php',requestData)
    })
});
// serialize
$(document).ready(function() {
    $('#letter-f form') .submit(function(e) {
        e.preventDefault();
        let formValues = $(this).serialize();
        $.get('f.php',formValues,function(data) {
            $('#dictionary').html(data);
        })
    })
});
//ajaxStart and ajaxEnd
$(document).ready(function() {
    let $loading = $('<div id="loading">Loading...</div>').insertBefor('#dictionary');
    $(document).ajaxStart(function() {
        $loading.show();
    });
});
//  chains
$(document).ready(function() {
    let $loading = $('<div id="loading">Loading...</div>').insertBefore('#dictionary');
    $(document).ajaxStart(function() {
        $loading.fadeIn();
    }).ajaxStop(function() {
        $loading.fadeOut();
    });
});

// error handle .fail

$(document).ready(function() {
    $('#letter-e a') .click(function(e) {
        e.preventDefault();
        let values = $(this).text();
        $.get('z.php',values,function(data) {
            $('#dictionary').html(data);
        }).fail(function(jqXHR) {
            $('#dictionary')
            .html('An error occurred: ' + jqXHR.status)
            .append(jqXHR.responseText);
        });
    });
});
// 400: bad request;401: unauthorized;403: forbidden;404: not found;500: internal server error;

//Ajax and Events
$(document).ready(function() {
    $('h3.term').click(function(){
        $(this).siblings('.definition').slideToggle();
    })
});
//event delegation
$(document).ready(function() {
    $('#letter-e a') .click(function(e) {
        e.preventDefault();
        let requestData = {term: $(this).text()};
        $.post('e.php',requestData,function(data) {
            $('#dictionary').html(data);
            $(document).on('click','h3.term',function() {// delegation
                $(this).siblings('.definition').slideToggle();
            })
        })
    })
});
// security limitations
$(document.createElement('script'))
.attr('src', 'http://example.com/example.js')
.appendTo('head');

// <iframe> Cross-Origin Resource sharing
/**
 * php JSONP
 * <?php
    print($_GET['callback'] .'('. $data .')');
    ?>
 */
// should exec by trusted 3rd party
 $(document).ready(function() {
     // using ? as placeholder
     const url = 'http://examples.learningjquery.com/jsonp/g.php';
     $('#letter-g a').click(function(e) {
         e.preventDefault();
         $.getJSON(url + '?callback=?', function(data){
            var html = '';
            $.each(data, function(entryIndex, entry) {
            html += '<div class="entry">';
            html += '<h3 class="term">' + entry.term + '</h3>';
            html += '<div class="part">' + entry.part + '</div>';
            html += '<div class="definition">';
            html += entry.definition;
            if (entry.quote) {
            html += '<div class="quote">';
            $.each(entry.quote, function(lineIndex, line) {
            html += '<div class="quote-line">' + line +
            '</div>';
            });
            if (entry.author) {
            html += '<div class="quote-author">' +
            entry.author + '</div>';
            }
            html += '</div>';
            }
            html += '</div>';
            html += '</div>';
            });
            $('#dictionary').html(html);
         })
     })
 });
 // low-level Ajax method
 $.ajax({
     url: 'a.html',
     success: function(data){
         $('#dictionary').html(data);
     }
 });
//  modifying default options
$.ajaxSetup({
    url: 'a.html',
    type: 'POST',
    dataType: 'html'
});
$.ajax({
    type: 'GET',
    success: function(data) {
        $('#dictionary').html(data);
    }
});
// loading parts of an HTML page
// add some more special parameter for it.
$(document).ready(function() {
    const url = 'http://examples.learningjquery.com/jsonp/g.php';
    $('#letter-h a').click(function(e) {
        e.preventDefault();
        $('#dictionary').load('h.html .entry');
    });
});