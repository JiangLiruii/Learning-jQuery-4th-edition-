// advanced DOM manipulation
/**
 * 1 sorting page elements using .append()
 * 2 attaching custom data to elements
 * 3 reading HTML5 data attributes
 * 4 creating Elements from JSON data
 * 5 extending the DOM manipulation system using CSS hooks
 */

 // sorting with ajax
 $(function(){
     $('#my-data th a').click(function(event) {
         event.preventDefault();
         $('#my-data tbody').load($(this).attr('href'));
     });
 });

// 3 ways to complete
/**
 * 1 data extracted from the content of HTML
 * 2 HTML5 custom data attributes
 * 3 a JSON representation of the table data
*/
$(function() {
    let $table1 = $('#t-1');
    let $headers = $table1.find('thead th').slice(1);
    $headers
        .wrapInner('<a href="#"></a>')
        .addClass('sort');
    $headers.on('click', function(event) {
        event.preventDefault();
        let column  = $(this).index();
        let rows = $table1.find('tbody > tr').get();
        rows.sort(function(a,b){
            let keyA = $(a).children('td').eq(column).text();
            keyA = $.trim(keyA).toUpperCase();
            let keyB = $(b).children('td').eq(column).text();
            keyB = $.trim(keyB).toUpperCase();
            if (keyA < keyB) {
                return -1;
            } else if (keyA > keyB) {
                return 1;
            } else {
                return 0;
            }
        });
        $.each(rows, function(index, row) {
            $table1.children('tbody').append(row); // because row already exist so row is a reference and manipulate origin element instead create a new one
        });
    })
});

// use .data() method
let rows = $table1.find('tbody > tr').each(function() {
    let key = $(this).children('td').eq(column).text();
    $(this).data('sortKey', $.trim(key).toUpperCase());// to store the sortKey in data
}).get();
rows.sort(function(a,b) {
    let keyA = $(a).data('sortKey');
    let keyB = $(b).data('sortKey');
});
// if html = <td>David <span class="sort-key">Mercer</span></td>
let rows = $table1.find('tbody > tr').each(function() {
    let $cell = $(this).children('td').eq(column);
    let key = $cell.find('span.sort-key').text() + ' ';
    key += $.trim($cell.text()).toUpperCase();
    $(this).data('sortKey', key);
}).get();

// not string
let key = parseFloat($cell.text().replace(/^[^\d.]*/,''));
if (isNaN(key)) { // if not a number
    key = 0;
};
let key = Date.parse('1' + $cell.text());

$headers
.each(function() {
    let keyType = this.className.replace(/^sort-/, '');
    $(this).data('keyType', keyType);
})
.wrapInner('<a href="#"></a>')
.addClass('sort');
let sortKeys = {
    alpha: function($cell) {
        let key = $cell.find('span.sort-key').text();
        key += $.trim($cell.text()).toUpperCase();
        return key;
    },
    numeric: function($cell) {
        let num = $cell.text().replace(/^[\d.]*/, '');
        let key = parseFloat(num);
        if (isNaN(key)) {
            key = 0;
        }
        return key;
    },
    date: function($cell) {
        let key = Date.parse('1' + $cell.text());
        return key;
    }
}

$headers.on('click',function(e) {
    e.preventDefault();
    let $header = $(this),
    column = $header.index(),
    keyType = $header.data(keyType);
    if (!$.isFunction(sortKeys[keyType])) {
        return;
    }
    let rows = $table1.find('tbody > tr').each(function() {
        let $cell = $(this).children('td').eq(column);
        $(this).data('sortKey',sortKeys[keyType]($cell));
    }).get();
    rows.sort(function(a,b) {
        let keyA = $(a).data('sortKey');
        let keyB = $(b).data('sortKey');
        if (keyA < keyB) {return -1}
        else if (keyA > keyB) {return 1}
        else{return 0}
    });
    $.each(rows,function(index,row) {
        $table1.children('tbody').append(row);
    })
});

//direction
$headers.on('click',function(e) {
    e.preventDefault();
    let $header = $(this),
    column = $header.index(),
    keyType = $header.data(keyType),
    direction = 1;
    if (!$.isFunction(sortKeys[keyType])) {
        return;
    }
    if ($header.hasClass('sorted-asc')) {
        direction = -1
    }
    let rows = $table1.find('tbody > tr').each(function() {
        let $cell = $(this).children('td').eq(column);
        $(this).data('sortKey',sortKeys[keyType]($cell));
    }).get();
    rows.sort(function(a,b) {
        let keyA = $(a).data('sortKey');
        let keyB = $(b).data('sortKey');
        if (keyA < keyB) {return -direction}
        else if (keyA > keyB) {return direction}
        else{return 0}
    });
    $header.removeClass('sorted-asc sorted-desc');
    $header.addClass(direction === 1 ? 'sorted-desc' : 'sorted-asc');// set one parameter to display the state of sort
    $.each(rows,function(index,row) {
        $table1.children('tbody').append(row);
    })
});

// use HTML5 custom data attributes data-* attributes
// if html <th data-sort='{"key":"title"}'>
$('th').first().data('sort').key

// use table2
$headers.on('click',function(e) {
    e.preventDefault();
    let $header = $(this),
    column = $header.index(),
    sortKey = $header.data('sort').key,
    direction = 1;
    if (!$.isFunction(sortKeys[sortKey])) {
        return;
    }
    if ($header.hasClass('sorted-asc')) {
        direction = -1
    }
    let rows = $table1.find('tbody > tr').get();// no need to store the sortkey data
    rows.sort(function(a,b) {
        let keyA = $(a).data('book')[sortKey];
        let keyB = $(b).data('book')[sortKey];
        if (keyA < keyB) {return -direction}
        else if (keyA > keyB) {return direction}
        else{return 0}
    });
    $header.removeClass('sorted-asc sorted-desc');
    $header.addClass(direction === 1 ? 'sorted-desc' : 'sorted-asc');// set one parameter to display the state of sort
    $.each(rows,function(index,row) {
        $table1.children('tbody').append(row);
    })
});

//second method sorting and building rows with JSON

function buildRow(row) {
    var authors = [];
    $.each(row.authors, function(index, auth) {
        authors[index] = auth.first_name + ' ' + auth.last_name;
    });
    var html = '<tr>';
    html += '<td><img src="images/' + row.img + '"></td>';
    html += '<td>' + row.title + '</td>';
    html += '<td>' + authors.join(', ') + '</td>';
    html += '<td>' + row.published + '</td>';
    html += '<td>$' + row.price + '</td>';
    html += '</tr>';
    return html;
}
function buildRows(rows) {
var allRows = $.map(rows, buildRow);
return allRows.join('');
}

$.getJSON('books.json', function(json) {
    $(document).ready(function() {
        let $table3 = $('#t-3');
        $table3.find('tbody').html(builRows(json));
    });
});

// using shorthand element-creation syntax
$(document).ready(function() {
    $('table').each(function(index) {
        let $table = $(this);
        $('<h3></h3>',{
            id: 'table-title-' + index,
            'class':'table-title',
            text: 'Table ' + (index + 1),
            data: {'index': index},
            click: function(event) {
                event.preventDefault();
                $table.fadeToggle();
            },
            css: {glowColor: '#00ff00'}
        }).insertBefore($table);
    });
});

// DOM manipulation hooks
//$.attrHooks-->.attr() $.cssHooks-->.css() $.propHooks-->.prop()-->selected $.valHooks-->.val

// writing a CSS hook
(function($){
    let div = document.createElement('div'); // for test
    $.support.textShadow = div.style.testShadow === '';
    $.support.filter = div.style.filter === '';
    div = null;
    if ($.support.textShadow) {
        $.cssHooks.glowColor = {
            set: function(elem, value) {
                if (value === 'none') {
                    elem.style.testShadow = '';
                } else {
                    elem.style.testShadow = '0 0 2px ' + value; // text-shadow: h-shadow v-shadow blur color;
                }
            }
        };
    } else {
        $.cssHooks.glowColor = {// if nor support textshadow prop
            set: function(elem, value) {
                if (value === 'none') {
                    elem.style.filter = '';
                } else {
                    elem.style.zoom = 1;
                    elem.style.filter = 
                        'progrid:DXImageTransform.Mircrosoft' + 
                        '.Glow(Strength=2,Color=' + value +')'
                }
            }
        }
    }
}(jQuery))
