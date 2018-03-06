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