// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(document).ready(function() {
    $('#letter-e a').click(function(e){
        e.preventDefault();
        let requestData = {term: $(this).text()};
        $.get('http://localhost/e.php', requestData, function(data) {
            $('#dictionary').html(data);
        })
    })
})