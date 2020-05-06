import $ from 'jquery';

$(document.body).on('keypress', function (event) {
  if (event.which === 9) {
    alert('boo!');
  }
});
