//Developing Plugins
// using $ in plugins
(function($) {
    $.sum = function(array) {
        let total = 0;
        $.each(array,function(index,value) {
            value = $.trim(value);
            value = parseInt(value) || 0;
            total += value;
        });
        return total;
    }
}(jQuery));

// adding jquery object method
jQuery.fn.myMethod = function() {
    alert('Nothing happends');
};

$('div').myMethod();

// swap 2 classes
(function($) {
    $.fn.swapClass = function(class1,class2) {
        return this.each(function() {// implicit iteration and return for chaining call
            let $element = $(this);
            if ($element.hasClass(class1)) {
                $element.removeClass(class1).addClass(class2);
            } else if ($element.hasClass(class2)) {
                $element.removeClass(class2).addClass(class1);
            }
        })
    }
}(jQuery));
$(document).ready(function() {
    $('table').click(function() {
        $('tr').swapClass('one', 'two');
    });
});

// providing flexible method parameters
(function($){
    $.fn.shadow = function() {
        return this.each(function(opt) {
            let defaults = {
                copies: 5,
                opacity: 0.1,
                copyOffset: function(index) {
                    return {x: index, y: index};
                }
            };
            let options = $.extend(default,opt);
            console.log(options);
            let $originElement = $(this);
            for (let i = 0; i < options.copies; i += 1) {
                let offset = options.copyOffset(i)
                $originElement
                .clone()
                .css({
                    position: 'absolute',
                    left: $originElement.offset().left + offset.x,
                    top: $originElement.offset().top + offset.y,
                    margin: 0,
                    zIndex: -1,
                    opacity: options.opacity
                }).appendTo('body');
            }
        })
    }
}(jQuery));

$('h1').shadow({copyOffset: function(index) {
    return {x: -index, y: -1 * index}
}});

// customize default options
$.fn.shadow.defaults = {
    copies: 5,
    opacity: 0.1,
    copyOffset: function(index) {
        return {x: index, y: index};
    }
};

// to create widget
(function($) {
    $.widget('ljq.tooltip', {
        _create: function() {
            this.tooltipDiv = $('<div></div>')
            .addClass('ljq-tooltip-text')
        }
    })
}(jQuery));
