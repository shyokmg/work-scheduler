$(function () {
  var currentDay = dayjs();

  // Listener for click events on the save button. 
  $('.time-block').on('click', handleSavebtn);

  function handleSavebtn(event) {
    var element = event.target;
    if (element.matches('button') === true) {
      var getID = $(this).attr('id');
      var getInput = $(this).children('textarea').val();
      localStorage.setItem(getID, JSON.stringify(getInput.trim()));
      $('#save-result').text('Appointment Added to localstorage✔️');
      $('#save-result').removeClass('d-none');
    }
  }

  // Applies the past, present, or future class to each time
  // block by comparing the id to the current hour. 
  var currentHour = currentDay.format('H');
  for (var i = 9; i <= 17; i++) {
    if (i < currentHour) {
      $('#hour-' + i).addClass('past')
    } else if (i == currentHour) {
      $('#hour-' + i).addClass('present')
    } else {
      $('#hour-' + i).addClass('future')
    }
  }

  // Gets any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  function init() {
    for (var i = 9; i <= 17; i++) {
      var storedSched = JSON.parse(localStorage.getItem('hour-' + i));
      if (storedSched != null) {
        $('#hour-' + i).children('textarea').text(storedSched);
      }
    }
  }
  init();

  // Displays the current date in the header of the page.
  $('#currentDay').text(currentDay.format('dddd, MMMM Do'));
});
