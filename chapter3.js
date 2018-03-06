// listing 3.11 
$(document).reay(function(){
    $('#switcher').click(function(){
        $('#switcher button').toggleClass('hidden');
    });
});

//get Event object,who first received the event
$(document).ready(function(){
    $('#switcher').click(function(event){
        $('#switcher button').toggleClass('hidden');
    });
})

//Event Target
$(document).reay(function(){
    $('#switcher').click(function(event){
        if (event.target === this) {
            $('#switcher button').toggleClass('hidden');
        }
    });
});
//stop event propagation
$(document).reay(function(){
    $('#switcher').click(function(event){
        if (event.target === this) {
            $('#switcher button').toggleClass('hidden');
        }
    });
});
$(document).ready(function(){
    $('#switch-default').addClass('selected')
    $('#switcher button').click(function(event){
        const bodyClass = this.id.split('-')[1];
        $('body').removeClass().addClass('bodyClass');
        $('#switcher button').removeClass('selected');
        $(this).addClass('selected')
        event.stopPropagation();
    });
});


// prevent default actions .preventDefault() in form submition(we need check firstly)
// use both
event.stopPropagation();
event.preventDefault();
//one line instead the functions
return false;

// delegating events: to use bubble non-hindrance
$(document).ready(function(){
    $('#switcher').click(function(event) {
        if ($(event.target).is('button')) { // .is() or .hasClass()
            const bodyClass = event.target.id.split('-')[1];
            $('body').removeClass().addClass(bodyClass);
            $('#switcher button').removeClass('selected');
            $(event.target).addClass('selectedd');
            event.stopPropagation();
        }
    })
})
// some side-effect this stopPropagation

$(document).ready(function(){
    $('#switcher').hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
    });
});
$(document).ready(function(){
    $('#switcher').click(function(event){
        if (!$(event.target).is('button')) {
            $('#switcher button').toggleClass('hidden');
        }
    });
});
$(document).ready(function(){
    $('#switcher').click(function(event){
        if ($(event.target).is('button')) {
            let bodyClass = event.target.id.split('-')[1];
            $('body').removeClass().addClass(bodyClass);
            $('#switcher button').removeClass('selected');
            $(event.target).addClass('selected');
        }
    });
});

// overComplicated
$(document).ready(function(){
    $('#switcher').click(function(event){
        if ($(event.target).is('button')) {
            let bodyClass = event.target.id.split('-')[1];
            $('body').removeClass().addClass(bodyClass);
            $('#switcher button').removeClass('selected');
            $(event.target).addClass('selected');
        } else {
            $('#switcher button').toggleClass('hidden');            
        }
    });
});

//using built-in event-delegation capabilities
// if on has second parameter, it will compare it with event.target, if true exec.
$('#switcher').on('click','button',function(event){
    let bodyClass = $(event.target).id.split('-')[1];
    $('body').removeClass().addClass(bodyClass);
    $('#switcher button').removeClass('selected');
    $(event.target).addClass('selected');
});

// removing an event handler
// .off()
$(document).ready(function() {
    $('#switcher').click(function(evt){
        if (!$(evt.target).is('button')) {
            $('switcher button').toggleClass('hiden');
        }
    });
    $('switcher-narrow, #switcher-large').click(function() {
        $('#switcher').off('click');
    });
});

//giving namespaces to event handlers
// .on() the first parameter is the name of event
$(document).ready(function() {
    $('#switcher').on('click.collapse', function(event) {
        if (!$(event.target).is('button')) {
            $('#switcher button').toggleClass('hidden');
        }
    });
    $('#switcher-narrow, #switcher-large').click(function(){
        $('#switcher').off('click.collapse')
    })
})

//rebind handler
$(document).ready(function(){
    const toggleSwitcher = function(event) {
        if (!$(event.target).is('button')){
            $('#switcher button').toggleClass('hidden');
        }
    };
    $('#switcher').on('click.collapse', toggleSwitcher);
});
const toggleSwitcher = function(event) {
    if (!$(event.target).is('button')){
        $('#switcher button').toggleClass('hidden');
    }
};
$('#switcher').on('click.collapse', toggleSwitcher);
$('#switcher-narrow, #switcher-large').off('click.collapse', toggleSwitcher);
$('#switcher-default').click(function(){
    $('#switcher').on('click-collapse',toggleSwitcher);
});

$(document).ready(function(){
    const toggleSwitcher = function(event) {
        if (!$(event.target).is('button')){
            $('#switcher button').toggleClass('hidden');
        }
    };
    $('#switcher').on('click', toggleSwitcher);
    $('#switcher button').click(function() {
        $('#switcher').off('click',toggleClass);
        if(this.id === 'switcher-default') {
            $('#switcher').on('click', toggleSwitcher);
        }
    })
});
// .one() calling one and only one time
$('#switcher').one('click',toggleSwitcher);

//SImulating user.trigger
$(document).ready(function() {
    $('#switcher').trigger('click');
});

// Reacting to keyboard events
// keyup(D,N or L key) and keydown ,keypress(react to the text input)
//.which ASCII(uppercase letter)
$(document).ready(function() {
    const triggers = {
        D: 'default',
        N: 'narrow',
        L: 'large'
    };
    $(document).keyup(function(event) {
        const key = String.fromCharCode(event.which);
        if (key in triggers) {
            $('#switcher-' + triggers[key]).click();
        }
    });
});

// eliminating code redundancy
$(document).ready(function(){
    // enable hover
    $('#switcher').hover(function() {
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
    });
    // allow the style switcher to sxtend and collapse
    const toggleSwitcher = function(evnt) {
        if (!$(event.target).is('button')) {
            $('#switcher button').toggleClass('hidden');
        }
    };
    $('#switcher').on('click', toggleSwitcher);
    $('#switcher').click();
    const setBodyClass = function(className) {
        $('body').removeClass().addClass(className);
        $('#switcher button').removeClass('selected');
        $('#switcher-' + className).addClass('selected');
        $('#switcher').off('click', toggleSwitcher);
        if (className === 'default') {
            $('#switcher').on('click',toggleSwitcher);
        }
    };
    // begin with default 
    $('#switcher-default').addClass('selected');
    // map keys
    const triggers = {
        D: 'default',
        N: 'narrow',
        L: 'large'
    };
    // call setBodyClass when button clicked
    $('#switcher').click(function(event) {
        if ($(event.target).is('button')) {
            setBodyClass(event.target.id.split('-')[1]);
        }
    });
    // call setBodyClass when key press
    $(document).keyup(function(event){
        const key = String.fromCharCode(event.which);
        if (key in triggers) {
            setBodyClass(triggers[key]);
        }
    })
});


