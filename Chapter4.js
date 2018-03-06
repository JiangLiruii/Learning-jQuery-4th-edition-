// Styling and Animating
// 1 changing the styling of elements on the fly
// 2 Hiding and showing elenents with various built-in effects
// 3 Creating custom animations of elements
// 4 Sequencing effects tp happen one after another

// .css('property')   .css('property':'value')
$(document).ready(function(){
    const $speech = $('div.speech');
    $('#switcher button').click(function(){
        let num = parseFloat($speech.css('fontSize'));
        if (this.id === 'switcher-large') {
            num *= 1.4;
        } else if (this.id === 'switcher-small')
        $speech.css('fontSize',num + 'px');
    })
});
// switch case
$(document).ready(function(){
    const $speech = $('div.speech');
    const defaultSize = $speech.css('fontSize');
    $('#switcher button').click(function(){
        let num = parseFloat($speech.css('fontSize'));
        switch(this.id){
            case 'switcher-large':
                num *= 1.4;
                break;
            case 'switcher-small':
                num /= 1.4;
                break;
            default:
                num = parseFloat(defaultSize);
        }
        $speech.css('fontSize',num + 'px');
    })
});

// Hiding and Showing elements
// .hide() === display:none 
$(document).ready(function(){
    $('p').eq(1).hide();
    $('a.more').click(function(){
        event.preventDefault();
        $('p').eq(1).show('slow');
        $(this).hide();
    })
});
// effect and duration
// .show(fast) 200ms .show(slow) 600ms  

// differ from show(height and width) and fadeIn(alpha:opacity)
$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('a.more').click(function(){
        event.preventDefault();
        if ($firstPara.is(':hidden')){
            $firstPara.fadeIn('slow');
            $(this).text('read less');
        } else {
            $firstPara.fadeOut('slow');
            $(this).text('read more');
        }
    })
});

$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('a.more').click(function(){
        event.preventDefault();
        $firstPara.slideToggle('slow');
        let $link = $(this);
        if ($link.text()=== 'read more'){
            $(this).text('read less');
        } else {
            $(this).text('read more');
        }
    })
});

// Creating custom animations   .animate()
// 1   .animate({property1: value1, property2: value2},duration, easing, function(){alert('the animation is finished.')})
// 2   .animation({properties}, {options})
$({}).animate({
    property1: 'value1',
    property2: 'value2'
},{
    duration: 'value',
    easing: 'value',
    specialEasing: {
        property1: 'easing1',
        property2: 'easing2'
    },
    complete: function() {
        alert('The animation is finished')
    },
    queue: true,
    step: callback
});

$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('a.more').click(function(){
        event.preventDefault();
        $firstPara.animate({height: 'toggle'},'slow')
        let $link = $(this);
        if ($link.text()=== 'read more'){
            $(this).text('read less');
        } else {
            $(this).text('read more');
        }
    })
});

$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('a.more').click(function(){
        event.preventDefault();
        $firstPara.animate({height: 'toggle',opecity: 'toggle'},'slow')
        let $link = $(this);
        if ($link.text()=== 'read more'){
            $(this).text('read less');
        } else {
            $(this).text('read more');
        }
    })
});
// other properties left top fontSize,margin,padding,borderWidth
$(document).ready(function(){
    const $speech = $('div.speech');
    const defaultSize = $speech.css('fontSize');
    $('#switcher button').click(function(){
        let num = parseFloat($speech.css('fontSize'));
        switch(this.id){
            case 'switcher-large':
                num *= 1.4;
                break;
            case 'switcher-small':
                num /= 1.4;
                break;
            default:
                num = parseFloat(defaultSize);
        }
        $speech.animate({fontSize: num + 'px'});
    });
});

//flexible-width layout
$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('div.label').click(function(){
        event.preventDefault();
        const paraWidth = $('div .speech p').outerWidth();
        const $switcher = $(this).parent();
        const switcherWidth = $switcher.outerWidth();
        $switcher.animate({
            borderWidth: '5px',
            left: paraWidth - switcherWidth,
            height: '+=20px'
    }, 'slow');
    });
});
// position with CSS relative absolute default block-level: static
$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('div.label').click(function(){
        event.preventDefault();
        const paraWidth = $('div .speech p').outerWidth();
        const $switcher = $(this).parent();
        const switcherWidth = $switcher.outerWidth();
        $switcher.css({position: 'relative'}).animate({
            borderWidth: '5px',
            left: paraWidth - switcherWidth,
            height: '+=20px'
    }, 'slow');
    });
});

// simultanious versus queued effects
$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('div.label').click(function(){
        event.preventDefault();
        const paraWidth = $('div .speech p').outerWidth();
        const $switcher = $(this).parent();
        const switcherWidth = $switcher.outerWidth();
        $switcher
        .css({position: 'relative'})
        .animate({left: paraWidth - switcherWidth},'slow')
        .animate({borderWidth: '5px'},'slow')
        .animate({height: '+=20px'},'slow')
    });
});

$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('div.label').click(function(){
        event.preventDefault();
        const paraWidth = $('div .speech p').outerWidth();
        const $switcher = $(this).parent();
        const switcherWidth = $switcher.outerWidth();
        $switcher
        .css({position: 'relative'})
        .fadeTo('fast', 0.5)
        .animate({left: paraWidth - switcherWidth},'slow')
        .fadeTo('slow', 1.0)
        .slideUp('slow')
        .slideDown('slow')
    });
});

// by passing the queue, form2
$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('div.label').click(function(){
        event.preventDefault();
        const paraWidth = $('div .speech p').outerWidth();
        const $switcher = $(this).parent();
        const switcherWidth = $switcher.outerWidth();
        $switcher
        .css({position: 'relative'})
        .fadeTo('fast', 0.5)
        .animate({left: paraWidth - switcherWidth},{
            duration: 'slow',
            queue: false
        })
        .fadeTo('slow', 1.0)
        .slideUp('slow')
        .slideDown('slow')
    });
});

// Queuing effects manually
$(document).ready(function(){
    const $firstPara = $('p').eq(1);
    $firstPara.hide();
    $('div.label').click(function(){
        event.preventDefault();
        const paraWidth = $('div .speech p').outerWidth();
        const $switcher = $(this).parent();
        const switcherWidth = $switcher.outerWidth();
        $switcher
        .css({position: 'relative'})
        .fadeTo('fast', 0.5)
        .animate({left: paraWidth - switcherWidth},{
            duration: 'slow',
            queue: false
        })
        .fadeTo('slow', 1.0)
        .slideUp('slow')
        .queue(function(next) { // queue already exsist when click
            $switcher.css({background: '#f00'});
            next();
        })
        .slideDown('slow')
    });
});

// Working with multiple sets of elements
$(document).ready(function() {
    $('p').eq(2).css('border','1px solid #333');
    $('p').eq(3).css('backgroundColor','#ccc').hide();
})
// use next queue callback

$(document).ready(function() {
    $('p').eq(2).css('border','1px solid #333')
    .click(function() {
        const $clickItem = $(this)
        $clickItem.next().slideDown('slow',function() {
            $clickItem.slideUp('slow');
        });
    })
    $('p').eq(3).css('backgroundColor','#ccc').hide();
})


