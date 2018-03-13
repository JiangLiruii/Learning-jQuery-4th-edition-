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

$(document).on('click', '#categories a',function(event){
    event.preventDefault();
    $(this).parent().toggleClass('active').siblings('.active').removeClass('active');
    $('#ajax-form').triggerHandler('submit');
});
$ajaxForm.on('submit', function(event) {
    event.preventDefault();
    $response.empty();
    let title = $('#title').val(),
        category = $('#categories').find('li.active').text(),
        api = {};
    search = category + '-' + title;
    if (search === '') {
        return;
    }
    $response.addClass('loading');
    if (!api[search]) {
        api[search] = $.ajax({
            url: 'http://book.learningjquery.com/api/',
            dataType: 'jsonp',
            data: {
                title: title,
                category:category
            },
            timeout: 15000
        });
    }
    api[search].done(response).fail(function(){
        $response.html(failed);
    }).always(function(){
        $response.removeClass('loading');
    })
})
$('#title').on('keyup', function(event) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function(){
        $ajaxForm.triggerHandler('submit');
    },searchDelay);
});


// adding ajax prefilters
$.ajaxPrefilter(function(options) {
    if(/\.yml$/.test(options.url)) {
        return 'yaml'
    }
});

// send and abort
$.ajaxTransport('img', function(settings) {
    let $img, img, prop;
    return {
        send: function(headers, complete) {
            function callback(success) {
                if (success) {
                    complete(200, 'OK', {img:img})
                } else {
                    $img.remove();
                    complete(404, 'Not Found');
                }
            }
            $img = $('<img>',{
                src:settings.url // the browser will trying to load the reference
            });
            img = $img[0];
            prop = typeof img.natureWidth === 'undefined' ? 'width' : 'natureWidth';
            if (img.complete) {
                callback(!!img[prop]);
            } else {
                $img.on('load error', function(event) {
                    callback(event.type === 'load');
                });
            }
        },
        abort: function() {
            if ($img) {
                $img.remove();
            }
        }
    }
});
// new ajax for new transport
$(document).ready(function() {
    $.ajax({
        url: 'missing.jpg',// if url: 'sunset.jpg'
        dataType: 'img',
    }).done(function(img) {
        $('<div></div>',{
            id: 'picture',
            html: img
        }).appendTo('body');
    }).fail(function(xhr, textStatus, msg) {
        $('<div></div>', {
            id: 'picture',
            html: textStatus + ': ' + msg
        }).appendTo('body');
    });
});