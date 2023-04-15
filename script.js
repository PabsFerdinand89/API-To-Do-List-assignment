
var filterAllResults = function (){
  
};

var getTasks = function () {
  $.ajax({
    type: 'GET',
    URL: ,
    dataType: 'json',
    success: function (response, textStatus) {
      filterAllResults();},
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
};

var tasksSubmitted = function () {
  var inputTheTask = $('.new-to-do input');

  $.ajax({
    type: 'POST',
    url:,
    dataType: 'application/json',
    data: JSON.stringify({
      
    });
    success: function (response, textStatus) {
      filterAllResults();},
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
  })
};

var Tasksdelete = function () {
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/:id?api_key=163',
    data:,
    success: function (response, textStatus) {
      filterAllResults();},
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
  })
};

var tasksCompleted = function (id) {
  $.ajax({
    type: 'PUT',
    url:,
    data:,
    success: function (response, textStatus) {
      filterAllResults();},
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
  })
};

var tasksActived = function (id) {
  $.ajax({
    type: 'PUT',
    url:,
    data:,
    success: function (response, textStatus) {
      filterAllResults();},
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
  })
};