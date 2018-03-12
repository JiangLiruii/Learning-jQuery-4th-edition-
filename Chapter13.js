// Advanced Ajax
/**
 * 1 Error Handle
 * 2 Ajax with deffered object
 * 3 cache and throttle
 * 4 ways to extend the inner working for Ajax system
 */
$(document).ready(function() {
    let $ajaxForm = $('#ajax-form'),
        $response = $('#response');

    $ajaxForm.on('submit', function(e) {
        e.preventDefault();
        $response.load('http://api.jquery.com/ #content', $ajaxFOrm.serialize())
    })
})
// Harvesting JSONP data
$(document).ready(function() {
    let $ajaxForm = $('#ajax-form'),
        $response = $('#response'),
        noresults = 'There were no search results.',
        failed = 'Sorry, but the request could not reach the destination';


    let response = function(json) {
        let output = '';
        if (json && json.length) {
            output += '<ol>';
            $.each(json, function(index, val) {
                output += buildItem(val);
            });
            output += '</ol>';
        } else {
            output += noresults;
        }
        $response.html(output);
    };
    $ajaxForm.on('submit', function(e) {
        $response.addClass('loading').empty();// 添加loading
        e.preventDefault();
        $.ajax({
            url: 'https://book.learningjquery.com/api/',
            dataType: 'jsonp',
            data: {
                title: $('#title').val()
            },
            success: response,
            error: function() {
                $response.html(failed);
            },
            timeout: 15000
        });
    });
});
// use jqXHR
$.ajax({
    url: 'https://book.learningjquery.com/api/',
    dataType: 'jsonp',
    data: {
        title: $('#title').val()
    },
    timeout: 15000,
})
.done(response)
.fail(function() {
    $response.html(failed);
})
.always(function(){$response.removeClass('loading')});// 一定会执行删除操作

// caching responses
let api = {};
let search = $('#title').val();
if (search==='') return;
if(!api[search]) {
    api[search] = $.ajax({
        url: 'https://book.learningjquery.com/api/',
        dataType: 'jsonp',
        data: {
            title: $('#title').val()
        },
        timeout: 15000,
    });
}
api[search]
.done(response)
.fail(function() {
    $response.html(failed);
})
.always(function() {$response.removeClass('loading')});

// throttling Ajax request
$('#title').on('keyup',function(event) {
    $ajaxForm.triggerHandler('submit');
})
// previous will request many times if no delay, low effeciency
let searchTimeout,
    searchDelay = 300;
$('#title').on('keyup', function(event) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function() {
        $ajaxForm.triggerHandler('submit');
    },searchDelay);
});

// extending ajax capabilities --> yaml
$.ajaxSetup({
    accepts: {
        yaml: 'application/x-yaml, text/yaml'
    },
    contents: {
        yaml: /yaml/
    },
    converters: {
        'text yaml': function(textValue) {
            let result = YAML.eval(textValue);
            let errors = YAML.getErrors();
            if(errors.length) {
                throw errors;
            }
            return result;
        }
    }
});
$.ajax({
    url: 'categories.yml',
    dataType: 'yaml'
});
// use yaml.js to handle this

$.getScript('yaml.js').done(function(){
    $.ajax({
        url: 'categories.yml',
        dataType: 'yaml'
    }).done(function(data) {
        let cats = '';
        $.each(data,function(category, subcategories) {
            cats += '<li><a href="#">' + category + '</a></li>';
        });
        $(document).ready(function(){
            let $cats = $('#categories').removeClass('hide');
            $('<ul></ul>',{
                html: cats // shorthand to manipulate
            }).appendTo($cats);
        });
    });
});
