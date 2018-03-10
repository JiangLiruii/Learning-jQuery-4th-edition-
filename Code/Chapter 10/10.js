// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
let timer = 0;
$(document).on('click', '.photo', function(e) {
  e.preventDefault();
  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected');
  } else {
    $(this).addClass('selected');
  }
  console.log(this);
});
$(document).on('pageLoaded',function() {
  $('#loading').hide();
})
$(document).on('nextPage', function(e){
  let url = $('#more-photos').attr('href');
  console.log(this);
  if ($('#loading')) {
    $('#loading').show();
  } else {
    $('<div id="loading">loading</div>').appendTo('#gallery')
  }
  $.get(url, function(data) {
    $(data).appendTo('#gallery');
    $(this).trigger('pageLoaded');    
  });
});
let pageNum = 1;
$(document).on('nextPage',function(){
  pageNum += 1;
  if(pageNum < 20) {
    $('#more-photos').attr('href','pages/' + pageNum + '.html'); 
  } else {
    $('#more-photos').hide();
  }
});
$(document).on('mouseenter mouseleave', 'div.photo', function(e) {
  var $details = $(this).find('.details');
  if (!timer) {
    timer = setTimeout(function() {
      console.log(e.pageX, e.pageY);
      timer = 0;
    },5000);
  }
  
  if (event.type == 'mouseenter') {
    $details.fadeTo('fast', 0.7);
  } else {
    $details.fadeOut('fast');
  }
});
count = 0;
$(document).on('tribleClick',function() {
  count += 1;
  console.log(count);
  setTimeout(function() {
    count = 0;
  },500);
  if (count === 3) {
    $('div#gallery').show();
  }
})
$(document).ready(function() {
  $('div#gallery').hide();  
  $('.photo.selected').removeClass('selected');
  $('#more-photos').click(function(e) {
    e.preventDefault();
    $(this).trigger('nextPage');
  });
  $('h1').click(function(){
    console.log(1);
    $(this).trigger('tribleClick');
  })
});