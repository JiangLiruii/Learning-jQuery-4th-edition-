$(document).ready(function() {
    $('<a id="top"></a>').prependTo('body')
    const topinfo = $('<a id="topinfo" href="#top"></a>').text('Back to Top');
    $($('div.chapter p')[3]).after(topinfo);
    $('#topinfo').click(function(e) {
        $(this).after($('<p>you are here</p>'));
        e.preventDefault();
    });
    $('#f-author').click(function() {
        $(this).remove();
        let name = $('<div id="f-authorAnother">by Edwin A. Abbott</div>');
        name.css('font-weight','bold');
        $('h1').after(name);
        $('#f-authorAnother').click(function() {
            console.log($(this).css('font-weight') === '700');
            if ($(this).css('font-weight') === '700') {
                $(this).css('font-weight', 200);
                return;
            }
            $(this).css('font-weight', 700);
        });
    });

    $('p').each(function() {
        let attrs = $(this).attr('class');
        attrs += ' inhabitants';
        $(this).attr('class', attrs);
    });
});